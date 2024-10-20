import { anthropicSDK } from '../sdk/anthropicClient';

const MAX_RETRIES = 3;
const INITIAL_BACKOFF = 1000; // 1 second

export interface GenerateDocumentParams {
	prompt: string;
	model?: string;
	maxTokens?: number;
	temperature?: number;
	systemPrompt: string;
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface CustomError extends Error {
	status: number;
	headers: { 'retry-after': string };
	type: 'rate_limit_error';
}

export async function generateDocument({
	prompt,
	model = 'claude-3-sonnet-20240229',
	maxTokens = 1500,
	temperature = 0.3,
	systemPrompt,
}: GenerateDocumentParams): Promise<ReadableStream<Uint8Array>> {
	// console.log('prompt: ', prompt);

	return new ReadableStream({
		async start(controller) {
			let retries = 0;

			while (retries <= MAX_RETRIES) {
				try {
					const messageStream = anthropicSDK.messages.stream({
						model,
						max_tokens: maxTokens,
						temperature,
						system: systemPrompt,
						messages: [{ role: 'user', content: prompt }],
					});

					for await (const chunk of messageStream) {
						if (chunk.type === 'content_block_delta' && 'text' in chunk.delta) {
							controller.enqueue(new TextEncoder().encode(chunk.delta.text));
						}
					}
					controller.close();
					return; // Success, exit the retry loop
				} catch (err) {
					const error = err as CustomError;
					console.error('Error in generateDocument:', error);

					if (error.status === 429) {
						const retryAfter = parseInt(error.headers['retry-after'] || '1', 10);
						const backoffTime = Math.max(retryAfter * 1000, INITIAL_BACKOFF * Math.pow(2, retries));
						console.log(`Rate limited. Retrying in ${backoffTime / 1000} seconds...`);
						await sleep(backoffTime);
						retries++;

						// Optionally reduce maxTokens if we're hitting token limits
						if (error?.type === 'rate_limit_error' && error?.message.includes('tokens')) {
							maxTokens = Math.floor(maxTokens * 0.8); // Reduce by 20%
							console.log(`Reducing max tokens to ${maxTokens}`);
						}
					} else {
						// For non-rate-limit errors, fail immediately
						controller.error(error);
						return;
					}
				}
			}

			// If we've exhausted all retries
			controller.error(new Error('Max retries reached. Unable to generate document.'));
		},
	});
}

/**
 * CHAT WITH IDEAS FOR LIMITING TOKEN USAGE PER USER: https://claude.ai/chat/2391e297-8045-47e6-9c3c-8256f8bc0d95
 * TODO: Usage-Aware generateDocument Function
 * export async function generateDocument({
  prompt,
  model = 'claude-3-sonnet-20240229',
  maxTokens = 1500,
  temperature = 0.3,
  systemPrompt,
}: GenerateDocumentParams): Promise<ReadableStream<Uint8Array>> {
  return new ReadableStream({
    async start(controller) {
      try {
        const messageStream = await anthropicSDK.messages.stream({
          model,
          max_tokens: maxTokens,
          temperature,
          system: systemPrompt,
          messages: [{ role: 'user', content: prompt }],
        });

        let accumulatedText = '';
        for await (const chunk of messageStream) {
          if (chunk.type === 'content_block_delta' && 'text' in chunk.delta) {
            accumulatedText += chunk.delta.text;
            controller.enqueue(new TextEncoder().encode(chunk.delta.text));
          }
        }

        // After streaming is complete, get usage information
        const tokensUsed = parseInt(messageStream.headers['anthropic-token-usage'], 10);
        tokenTracker.addUsage(tokensUsed);

        console.log(`Tokens used in this request: ${tokensUsed}`);
        console.log(`Total tokens used in the last minute: ${tokenTracker.getCurrentUsage()}`);

        controller.close();
      } catch (error) {
        console.error('Error in generateDocument:', error);
        controller.error(error);
      }
    },
  });
}
 * 
 * 
 */
