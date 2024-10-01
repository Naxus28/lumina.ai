import { Anthropic } from '@anthropic-ai/sdk';

const anthropicSDK = new Anthropic({
	apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface GenerateDocumentParams {
	prompt: string;
	anthropic?: Anthropic;
	model?: string;
	maxTokens?: number;
	temperature?: number;
	systemPrompt: string;
}

export async function generateDocument({
	prompt,
	anthropic = anthropicSDK,
	model = 'claude-3-sonnet-20240229',
	maxTokens = 1500,
	temperature = 0.3,
	systemPrompt,
}: GenerateDocumentParams) {
	return new ReadableStream({
		async start(controller) {
			const messageStream = anthropic.messages.stream({
				model,
				max_tokens: maxTokens,
				temperature,
				system: systemPrompt,
				messages: [{ role: 'user', content: prompt }],
			});

			for await (const chunk of messageStream) {
				if (chunk.type === 'content_block_delta' && 'text' in chunk.delta) {
					controller.enqueue(chunk.delta.text);
				}
			}
			controller.close();
		},
	});
}
