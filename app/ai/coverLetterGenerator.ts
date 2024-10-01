import { Anthropic } from '@anthropic-ai/sdk';
import { generateDocument } from './documentGenerator';
import { createPromptGenerator } from './utils/generatePrompt';

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

interface GenerateCoverLetterParams {
    cvText: string;
    jobDescription: string;
    template: string;
    sender?: string;
    addressee?: string;
}

export async function generateCoverLetter({
    cvText,
    jobDescription,
    template,
    sender,
    addressee
}: GenerateCoverLetterParams) {
    const generateCoverLetterPrompt = createPromptGenerator('coverLetter', { template });
    const prompt = generateCoverLetterPrompt({ jobDescription, cv: cvText, addressee, sender });

    return generateDocument({
        prompt,
        anthropic,
        model: 'claude-3-sonnet-20240229',
        maxTokens: 1500,
        temperature: 0.3,
        systemPrompt: 'You are an AI assistant specialized in writing academic cover letters. Be concise, professional, and adhere strictly to the provided instructions.'
    });
}
