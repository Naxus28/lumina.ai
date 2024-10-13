import { anthropicSDK } from '../sdk/anthropicClient';

export interface GenerateDocumentParams {
	prompt: string;
	model?: string;
	maxTokens?: number;
	temperature?: number;
	systemPrompt: string;
}

export async function generateDocument({
	prompt,
	model = 'claude-3-sonnet-20240229',
	maxTokens = 1500,
	temperature = 0.3,
	systemPrompt,
}: GenerateDocumentParams): Promise<ReadableStream<Uint8Array>> {
	console.log('prompt: ', prompt);
	return new ReadableStream({
		async start(controller) {
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
			} catch (error) {
				console.error('Error in generateDocument:', error);
				controller.error(error);
			}
		},
	});
}
