import { Anthropic } from '@anthropic-ai/sdk';
import { createPromptGenerator } from './utils/generatePrompt';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

const anthropic = new Anthropic({
    apiKey: ANTHROPIC_API_KEY,
});

export async function generateCoverLetter(cvText: string, jobDescription: string, template: string, sender?: string, addressee?: string) {
    const generateCoverLetterPrompt = createPromptGenerator('coverLetter', { template });
    const prompt = generateCoverLetterPrompt({ jobDescription, cv: cvText, addressee, sender });

    return new ReadableStream({
        async start(controller) {
            const messageStream = anthropic.messages.stream({
                model: 'claude-3-sonnet-20240229',
                max_tokens: 1500,
                temperature: 0.3,
                system: 'You are an AI assistant specialized in writing academic cover letters. Be concise, professional, and adhere strictly to the provided instructions.',
                messages: [
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
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