import cliProgress from 'cli-progress';
import { Dataset, DatasetRow } from './dataset';
import { isMedia } from './media';
import { boundOp } from './op';
import { Op, getOpName } from './opType';
import { WeaveObject, WeaveObjectParameters } from './weaveObject';

export type ColumnMapping = { [key: string]: string };
type Row = { [key: string]: any };
type ArgsObject = { [key: string]: any };

const PROGRESS_BAR = false;

interface EvaluationParameters<R extends DatasetRow, M> extends WeaveObjectParameters {
  dataset: Dataset<R>;
  scorers: WeaveCallable<(...args: [{ datasetRow: R; modelOutput: M }]) => any>[];
  maxConcurrency?: number;
  columnMapping?: ColumnMapping;
}

interface Callable<T extends (...args: any[]) => any> {
  id: string;
  call: (...args: Parameters<T>) => ReturnType<T>;
}

type WeaveCallable<T extends (...args: any[]) => any> = Op<T> | Callable<T>;

function callWeaveCallable<T extends (...args: any[]) => any>(callable: WeaveCallable<T>, ...args: Parameters<T>) {
  if (typeof callable === 'function') {
    return callable(...args);
  }
  return callable.call(...args);
}

function weaveCallableName<T extends (...args: any[]) => any>(callable: WeaveCallable<T>) {
  if (typeof callable === 'function') {
    return getOpName(callable);
  }
  return callable.id;
}

async function* repeatAsyncIterator<T>(asyncIterator: AsyncIterable<T>, repeatCount: number) {
  for (let i = 0; i < repeatCount; i++) {
    yield* asyncIterator;
  }
}

async function* asyncParallelMap<T, U>(
  asyncIterator: AsyncIterable<T>,
  fn: (item: T, ...args: any[]) => Promise<U>,
  fnParams: (item: T) => any[],
  maxConcurrency: number
) {
  const inProgressTasks: Map<T, Promise<{ item: T; result: Awaited<U> }>> = new Map();
  async function runOne(item: T) {
    return {
      item,
      // @ts-ignore
      result: await fn(...fnParams(item)),
    };
  }
  let nDone = 0;
  for await (const item of asyncIterator) {
    if (inProgressTasks.size >= maxConcurrency) {
      const done = await Promise.race(inProgressTasks.values());
      inProgressTasks.delete(done.item);
      yield {
        ...done,
        nRunning: inProgressTasks.size,
        nDone: ++nDone,
      };
    }
    const prom = runOne(item);
    inProgressTasks.set(item, prom);
  }

  // Flush remaining items
  while (inProgressTasks.size > 0) {
    const done = await Promise.race(inProgressTasks.values());
    inProgressTasks.delete(done.item);
    yield {
      ...done,
      nRunning: inProgressTasks.size,
      nDone: ++nDone,
    };
  }
}

export class Evaluation<R extends DatasetRow, M> extends WeaveObject {
  private dataset: Dataset<R>;
  private scorers: WeaveCallable<(...args: [{ datasetRow: R; modelOutput: M }]) => any>[];
  private columnMapping?: ColumnMapping;

  constructor(parameters: EvaluationParameters<R, M>) {
    super(parameters);
    this.dataset = parameters.dataset;
    this.scorers = parameters.scorers;
    this.evaluate = boundOp(this, this.evaluate, {
      parameterNames: 'useParam0Object',
      callDisplayName: inputs => `${this.id}_${weaveCallableName(inputs.model)}`,
    });
    this.predictAndScore = boundOp(this, this.predictAndScore, {
      parameterNames: 'useParam0Object',
    });
    this.columnMapping = parameters.columnMapping;
  }

  async evaluate({
    model,
    nTrials = 1,
    maxConcurrency = 5,
  }: {
    model: WeaveCallable<(...args: [{ datasetRow: R }]) => Promise<M>>;
    nTrials?: number;
    maxConcurrency?: number;
  }) {
    const results: Array<{
      model_output: M;
      model_success: boolean;
      model_latency: number;
      [key: string]: any;
    }> = [];

    const progressBar = new cliProgress.SingleBar({
      format:
        'Evaluating |{bar}| {percentage}% | ETA: {eta}s | {modelErrors} errors | {value}/{total} examples | {running} running',
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
      hideCursor: true,
    });

    if (PROGRESS_BAR) {
      progressBar.start(this.dataset.length * nTrials, 0, {
        running: 0,
        modelErrors: 0,
      });
    }

    let modelErrors = 0;
    let datasetExamples = this.dataset;
    if (nTrials > 1) {
      // @ts-ignore
      datasetExamples = repeatAsyncIterator(this.dataset, nTrials);
    }

    for await (const { result, nRunning, nDone } of asyncParallelMap(
      datasetExamples,
      this.predictAndScore,
      item => [{ model, example: item, columnMapping: this.columnMapping }],
      maxConcurrency
    )) {
      const { scores } = result;
      results.push({
        model_success: result.model_success,
        model_output: result.model_output,
        ...scores,
        model_latency: result.model_latency,
      });
      modelErrors += result.model_success ? 0 : 1;
      if (PROGRESS_BAR) {
        progressBar.update(nDone, { running: nRunning, modelErrors });
      } else {
        console.log(
          `Evaluating ${nDone}/${this.dataset.length * nTrials} examples (${nRunning} running, ${modelErrors} errors)`
        );
      }
    }

    if (PROGRESS_BAR) {
      progressBar.stop();
    }

    return this.summarizeResults(results);
  }

  async predictAndScore({
    model,
    example,
    columnMapping,
  }: {
    model: WeaveCallable<(...args: [{ datasetRow: R }]) => Promise<M>>;
    example: R;
    columnMapping?: ColumnMapping;
  }) {
    console.log('calling predictAndScore with example=', example, 'columnMapping=', columnMapping);
    const startTime = new Date();
    let modelOutput;
    let modelError = false;
    let datasetRow = example;
    if (columnMapping) {
      datasetRow = mapArgs(example, columnMapping) as R;
    }
    console.log('datasetRow=', datasetRow);
    try {
      modelOutput = await callWeaveCallable(model, { datasetRow });
      console.log('modelOutput=', modelOutput);
    } catch (e) {
      console.error(e);
      modelError = true;
    }
    const endTime = new Date();
    const modelLatency = (endTime.getTime() - startTime.getTime()) / 1000; // Convert to seconds

    const scores: { [key: string]: any } = {};
    if (!modelError) {
      for (const scorer of this.scorers) {
        let score = undefined;
        try {
          score = await callWeaveCallable(scorer, { datasetRow, modelOutput });
        } catch (e) {
          console.error(e);
        }
        scores[weaveCallableName(scorer)] = score;
      }
    }

    return {
      model_success: !modelError,
      model_output: modelOutput,
      scores,
      model_latency: modelLatency,
    };
  }

  private summarizeResults(
    results: Array<{
      model_output: any;
      model_success: boolean;
      model_latency: number;
      [key: string]: any;
    }>
  ) {
    const summarizeNestedObject = (results: Array<any>): Record<string, any> => {
      const nestedSummary: Record<string, any> = {};

      // Get all unique keys from all results
      const allKeys = new Set(results.flatMap(obj => Object.keys(obj ?? {})));

      for (const key of allKeys) {
        const values = results.map(result => (result == null ? null : result[key]));
        if (values.some(v => typeof v === 'object' && v !== null && !Array.isArray(v) && !isMedia(v))) {
          const result = summarizeNestedObject(values);
          if (Object.keys(result).length > 0) {
            nestedSummary[key] = result;
          }
        } else {
          const columnSummary = this.summarizeColumn(values);
          if (Object.keys(columnSummary).length > 0) {
            nestedSummary[key] = columnSummary;
          }
        }
      }

      return nestedSummary;
    };

    return summarizeNestedObject(results);
  }

  private summarizeColumn(values: any[]): Record<string, number> {
    const nonNilValues = values.filter(v => v != null);
    if (nonNilValues.length === 0) {
      return {}; // Return an empty object if there are no valid values
    }

    if (nonNilValues.every(v => typeof v === 'boolean')) {
      const trueCount = nonNilValues.filter(v => v).length;
      return {
        true_count: trueCount,
        true_fraction: values.length > 0 ? trueCount / values.length : 0,
      };
    } else if (nonNilValues.every(v => typeof v === 'number')) {
      const sum = nonNilValues.reduce((acc, v) => acc + v, 0);
      return {
        mean: values.length > 0 ? sum / values.length : 0,
      };
    }
    return {};
  }
}

export function getFunctionArguments(fn: Function): ArgsObject {
  // This naive impl works for basic funcs, arrows, and methods.  It doesn't work yet for
  // destructuring or rest params
  const match = fn.toString().match(/\(([^)]*)\)/); // Find the function signature
  if (!match) {
    return {};
  }

  const argsString = match[1].replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, ''); // Strip out comments
  const args = argsString
    .split(',')
    .map(arg => arg.trim())
    .filter(arg => arg !== '');

  return args.reduce(
    (acc, v) => {
      if (v.startsWith('...')) {
        acc[v.slice(3)] = '...rest';
      } else {
        const [name, defaultValue] = v.split('=').map(s => s.trim());
        acc[name] = defaultValue;
      }
      return acc;
    },
    {} as Record<string, string | undefined>
  );
}

function mapArgs(row: Row, mapping: ColumnMapping): Row {
  return Object.fromEntries(Object.entries(row).map(([k, v]) => [mapping[k] || k, v]));
}

function prepareArgsForFn(args: ArgsObject, fn: Function): ArgsObject {
  const fnArgs = getFunctionArguments(fn);
  const preparedArgs: ArgsObject = {};

  for (const [argName, defaultValue] of Object.entries(fnArgs)) {
    if (argName in args) {
      preparedArgs[argName] = args[argName];
    } else if (defaultValue != null) {
      preparedArgs[argName] = defaultValue;
    } else {
      throw new Error(`Missing required argument: ${argName}`);
    }
  }
  return preparedArgs;
}

export function invoke(fn: Function, args: ArgsObject, mapping: ColumnMapping | null) {
  if (mapping) {
    args = mapArgs(args, mapping);
  }
  const orderedArgs = prepareArgsForFn(args, fn);
  return fn(...Object.values(orderedArgs));
}
