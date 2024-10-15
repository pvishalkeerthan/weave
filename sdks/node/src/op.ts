import { globalClient } from './clientApi';
import { TRACE_CALL_EMOJI } from './constants';
import { Op, OpOptions } from './opType';

export function op<T extends (...args: any[]) => any>(
  fn: T,
  options?: OpOptions<T>
): Op<(...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>> {
  const opWrapper = async function (...params: Parameters<T>): Promise<ReturnType<T>> {
    if (!globalClient) {
      return await fn(...params);
    }

    const { currentCall, parentCall, newStack } = globalClient.pushNewCall();
    const startTime = new Date();
    if (!globalClient.quiet && parentCall == null) {
      console.log(`${TRACE_CALL_EMOJI} https://wandb.ai/${globalClient.projectId}/r/call/${currentCall.callId}`);
    }
    const displayName = options?.callDisplayName ? options.callDisplayName(...params) : undefined;
    const thisArg = options?.bindThis;
    const startCallPromise = globalClient.startCall(
      opWrapper,
      params,
      options?.parameterNames,
      thisArg,
      currentCall,
      parentCall,
      startTime,
      displayName
    );

    try {
      let result = await globalClient.runWithCallStack(newStack, async () => {
        return await fn(...params);
      });

      if (options?.streamReducer && Symbol.asyncIterator in result) {
        const { initialState, reduceFn } = options.streamReducer;
        let state = initialState;

        const wrappedIterator = {
          [Symbol.asyncIterator]: async function* () {
            try {
              for await (const chunk of result as AsyncIterable<any>) {
                state = reduceFn(state, chunk);
                yield chunk;
              }
            } finally {
              if (globalClient) {
                // Check if globalClient still exists
                const endTime = new Date();
                await globalClient.finishCall(
                  state,
                  currentCall,
                  parentCall,
                  options?.summarize,
                  endTime,
                  startCallPromise
                );
              }
            }
          },
        };

        return wrappedIterator as unknown as ReturnType<T>;
      } else {
        const endTime = new Date();
        globalClient.finishCall(result, currentCall, parentCall, options?.summarize, endTime, startCallPromise);
        return result;
      }
    } catch (error) {
      // console.error(`Op ${actualOpName} failed:`, error);
      const endTime = new Date();
      globalClient.finishCallWithException(error, currentCall, parentCall, endTime, startCallPromise);
      throw error;
    } finally {
      // No need to do anything here.
    }
  };

  const fnName = options?.originalFunction?.name || fn.name || 'anonymous';
  const className = options?.bindThis && Object.getPrototypeOf(options.bindThis).constructor.name;
  const actualOpName = options?.name || (className ? `${className}.${fnName}` : fnName);

  opWrapper.__name = actualOpName;
  opWrapper.__isOp = true as true;
  opWrapper.__wrappedFunction = options?.originalFunction ?? fn;
  opWrapper.__boundThis = options?.bindThis;

  return opWrapper as Op<T>;
}

export function isOp(fn: any): fn is Op<any> {
  return fn?.__isOp === true;
}

export function boundOp<T extends (...args: any[]) => any>(bindThis: any, fn: T, options?: OpOptions<T>) {
  const boundFn = fn.bind(bindThis) as T;
  return op(boundFn, { originalFunction: fn, bindThis, ...options });
}
