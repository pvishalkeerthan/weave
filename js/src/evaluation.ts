import { WeaveObject, WeaveObjectParameters } from "./weaveObject";
import { Op, getOpName } from "./opType";
import { boundOp } from "./op";
import { Dataset } from "./dataset";

interface EvaluationParameters extends WeaveObjectParameters {
    dataset: Dataset;
    scorers: Op<any>[];
    maxConcurrency?: number;
}

async function* asyncParallelMap<T, U>(
    asyncIterator: AsyncIterable<T>,
    fn: (item: T, ...args: any[]) => Promise<U>,
    fnParams: (item: T) => any[],
    maxConcurrency: number
) {
    const itemPromiseMap: Map<T, Promise<{ item: T, result: Awaited<U> }>> = new Map();
    async function runOne(item: T) {
        return {
            item,
            // @ts-ignore
            result: await fn(...fnParams(item))
        }
    }
    let nDone = 0;
    for await (const item of asyncIterator) {
        if (itemPromiseMap.size >= maxConcurrency) {
            const done = await Promise.race(itemPromiseMap.values());
            yield {
                ...done,
                nRunning: itemPromiseMap.size,
                nDone: ++nDone
            }
            itemPromiseMap.delete(done.item);
        }
        const prom = runOne(item);
        itemPromiseMap.set(item, prom);
    }
    while (itemPromiseMap.size > 0) {
        const done = await Promise.race(itemPromiseMap.values());
        yield {
            ...done,
            nRunning: itemPromiseMap.size,
            nDone: ++nDone
        }
        itemPromiseMap.delete(done.item);
    }
}

export class Evaluation extends WeaveObject {
    saveAttrNames = ['dataset', 'scorers'];
    private dataset: Dataset;
    private scorers: Op<any>[];

    constructor(parameters: EvaluationParameters) {
        super(parameters);
        this.dataset = parameters.dataset;
        this.scorers = parameters.scorers;
        this.evaluate = boundOp(this, this.evaluate);
        this.predict_and_score = boundOp(this, this.predict_and_score);
    }

    async evaluate({ model, maxConcurrency = 5 }: { model: Op<any>, maxConcurrency?: number }) {
        const results: Array<{ modelOutput: any, scores: { [key: string]: any }, modelLatency: number }> = [];

        for await (const { result, nRunning, nDone } of asyncParallelMap(
            this.dataset,
            this.predict_and_score,
            (item) => ([{ model, example: item }]),
            maxConcurrency,
        )) {
            results.push(result);
            console.log(`Evaluated ${nDone} of ${this.dataset.length} examples, ${nRunning} running`);
        }

        return this.summarizeResults(results);
    }

    async predict_and_score({ model, example }: { model: Op<any>, example: Record<string, any> }) {
        const startTime = new Date();
        let modelSucceeded = false;
        let modelOutput;
        try {
            modelOutput = await model(example);
            modelSucceeded = true;
        } catch (e) {
            console.log(e)
        }
        const endTime = new Date();
        const modelLatency = (endTime.getTime() - startTime.getTime()) / 1000; // Convert to seconds

        const scores: { [key: string]: any } = {};
        if (modelSucceeded) {
            for (const scorer of this.scorers) {
                const score = await scorer(modelOutput, example);
                if (modelSucceeded) {
                    scores[getOpName(scorer)] = score;
                } else {
                    scores[getOpName(scorer)] = undefined;
                }
            }
        }


        return { modelOutput, scores, modelLatency };
    }

    private summarizeResults(results: Array<{ modelOutput: any, scores: { [key: string]: any }, modelLatency: number }>) {
        const summarizeNestedObject = (obj: any, currentPath: string = ''): Record<string, any> => {
            const nestedSummary: Record<string, any> = {};

            for (const [key, value] of Object.entries(obj)) {
                const newPath = currentPath ? `${currentPath}.${key}` : key;

                if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                    nestedSummary[key] = summarizeNestedObject(value, newPath);
                } else {
                    const values = results.map(result => {
                        const keys = newPath.split('.');
                        return keys.reduce((acc: any, k) => acc && acc[k], result);
                    }).filter(v => v !== undefined);

                    const columnSummary = this.summarizeColumn(values);
                    if (Object.keys(columnSummary).length > 0) {
                        nestedSummary[key] = columnSummary;
                    }
                }
            }

            return nestedSummary;
        };

        // Find the first result with valid scores to use as a template
        const templateResult = results.find(r => r.scores && Object.keys(r.scores).length > 0) || results[0];
        return summarizeNestedObject(templateResult);
    }

    private summarizeColumn(values: any[]): Record<string, number> {
        if (values.length === 0) {
            return {}; // Return an empty object if there are no valid values
        }

        if (values.every(v => typeof v === 'boolean')) {
            const trueCount = values.filter(v => v).length;
            return {
                true_count: trueCount,
                true_fraction: values.length > 0 ? trueCount / values.length : 0
            };
        } else if (values.every(v => typeof v === 'number')) {
            const sum = values.reduce((acc, v) => acc + v, 0);
            return {
                mean: values.length > 0 ? sum / values.length : 0
            };
        }
        return {};
    }
}
