import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { uuidv7 } from 'uuidv7';
import { Api as TraceServerApi } from './traceServerApi';
import { WandbServerApi } from './wandbServerApi';
import { packageVersion } from './userAgent';

let traceServerApi: TraceServerApi<any>;
let wandbServerApi: WandbServerApi;
let globalProjectName: string;
let activeCallStack: { callId: string; traceId: string }[] = [];

// Queue for batching calls
let callQueue: Array<{ mode: 'start' | 'end', data: any }> = [];
let batchProcessTimeout: NodeJS.Timeout | null = null;
let isBatchProcessing = false;
const BATCH_INTERVAL = 200; // 200 milliseconds

function readApiKeyFromNetrc(host: string): string | undefined {
    const netrcPath = path.join(os.homedir(), '.netrc');
    if (!fs.existsSync(netrcPath)) {
        return undefined;
    }

    const netrcContent = fs.readFileSync(netrcPath, 'utf-8');
    const lines = netrcContent.split('\n');
    let foundMachine = false;
    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('machine') && trimmedLine.includes(host)) {
            foundMachine = true;
        } else if (foundMachine && trimmedLine.startsWith('password')) {
            return trimmedLine.split(' ')[1];
        }
    }
    return undefined;
}

async function init(projectName: string): Promise<void> {
    const host = 'https://api.wandb.ai';
    const apiKey = readApiKeyFromNetrc('api.wandb.ai');

    if (!apiKey) {
        throw new Error("API key not found in .netrc file");
    }

    const headers: Record<string, string> = {
        'User-Agent': `W&B Internal JS Client ${process.env.VERSION || 'unknown'}`,
        'Authorization': `Basic ${Buffer.from(`api:${apiKey}`).toString('base64')}`
    };

    try {
        // Initialize WandbApi
        wandbServerApi = new WandbServerApi(host, apiKey);

        // Get default entity name
        const defaultEntityName = await wandbServerApi.defaultEntityName();

        // Set global project name
        globalProjectName = `${defaultEntityName}/${projectName}`;

        traceServerApi = new TraceServerApi({
            baseUrl: 'https://trace.wandb.ai',
            baseApiParams: {
                headers: headers,
            },
        });

        console.log(`Initializing project: ${globalProjectName}`);

        // Start the batch processing
        scheduleBatchProcessing();
    } catch (error) {
        console.error("Error during initialization:", error);
        throw error;
    }
}

function scheduleBatchProcessing() {
    if (batchProcessTimeout || isBatchProcessing) return;
    batchProcessTimeout = setTimeout(processBatch, BATCH_INTERVAL);
}

async function processBatch() {
    if (isBatchProcessing || callQueue.length === 0) {
        batchProcessTimeout = null;
        return;
    }

    isBatchProcessing = true;

    const batchToProcess = [...callQueue];
    callQueue = [];

    const batchReq = {
        batch: batchToProcess.map(item => ({
            mode: item.mode,
            req: item.data
        }))
    };

    try {
        await traceServerApi.call.callStartBatchCallUpsertBatchPost(batchReq);
    } catch (error) {
        console.error('Error processing batch:', error);
        // Re-add failed items to the queue
        callQueue = [...batchToProcess, ...callQueue];
    } finally {
        isBatchProcessing = false;
        batchProcessTimeout = null;
        if (callQueue.length > 0) {
            scheduleBatchProcessing();
        }
    }
}

function op(fn: Function, opName?: string) {
    const actualOpName = opName || fn.name || 'anonymous';

    return async function (...args: any[]) {
        if (!globalProjectName) {
            throw new Error("Project not initialized. Call init() first.");
        }

        const startTime = new Date().toISOString();
        const callId = generateCallId();
        let traceId: string;
        let parentId: string | null = null;

        if (activeCallStack.length === 0) {
            traceId = generateTraceId();
        } else {
            traceId = activeCallStack[activeCallStack.length - 1].traceId;
            parentId = activeCallStack[activeCallStack.length - 1].callId;
        }

        activeCallStack.push({ callId, traceId });

        // Add this new logging for top-level operations
        if (activeCallStack.length === 1) {
            console.log(`🍩 https://wandb.ai/${globalProjectName}/r/call/${callId}`);
        }

        const startReq = {
            start: {
                project_id: globalProjectName,
                id: callId,
                op_name: actualOpName,
                trace_id: traceId,
                parent_id: parentId,
                started_at: startTime,
                attributes: {
                    weave: {
                        client_version: packageVersion,
                        source: 'js-sdk'
                    }
                }, // Add any relevant attributes
                inputs: args.reduce((acc, arg, index) => ({ ...acc, [`arg${index}`]: arg }), {}),
            }
        };

        callQueue.push({ mode: 'start', data: startReq });
        scheduleBatchProcessing();

        try {
            const result = await Promise.resolve(fn(...args));

            const endTime = new Date().toISOString();
            const endReq = {
                end: {
                    project_id: globalProjectName,
                    id: callId,
                    ended_at: endTime,
                    output: result,
                    summary: {}, // Add any relevant summary information
                }
            };

            callQueue.push({ mode: 'end', data: endReq });
            scheduleBatchProcessing();

            return result;
        } catch (error) {
            const endTime = new Date().toISOString();
            const endReq = {
                end: {
                    project_id: globalProjectName,
                    id: callId,
                    ended_at: endTime,
                    exception: error instanceof Error ? error.message : String(error),
                    summary: {}, // Add any relevant summary information
                }
            };

            callQueue.push({ mode: 'end', data: endReq });
            scheduleBatchProcessing();

            throw error;
        } finally {
            activeCallStack.pop();
        }
    }
}

function ref(uri: string) {
    console.log(`Ref: ${uri}`);
}

function generateCallId(): string {
    return uuidv7(); // Using v7 for callId
}

export { init, op, ref };
