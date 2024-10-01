import { Anthropic } from '@anthropic-ai/sdk';

export const anthropicSDK = new Anthropic({
	apiKey: process.env.ANTHROPIC_API_KEY,
});
