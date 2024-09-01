// src/app/api/generate-cover-letter/route.ts
import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

process.env.ANTHROPIC_API_KEY = '***REMOVED***';

const anthropic = new Anthropic({
	apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
	console.log('process.env.ANTHROPIC_API_KEY: ', process.env.ANTHROPIC_API_KEY);

	if (!process.env.ANTHROPIC_API_KEY) {
		return NextResponse.json({ error: 'Anthropic API key not configured' }, { status: 500 });
	}

	try {
		const body = await req.json();
		const { template, jobDescription, cv } = body;

		if (!template || !jobDescription || !cv) {
			return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
		}

		const message = await anthropic.messages.create({
			model: 'claude-3-sonnet-20240229',
			max_tokens: 1000,
			messages: [
				{
					role: 'user',
					content: generatePrompt(template, jobDescription, cv),
				},
			],
		});

		if (message.content && message.content[0] && message.content[0].type === 'text') {
			return NextResponse.json({ coverLetter: message.content[0].text });
		} else {
			throw new Error('Unexpected response format from Anthropic API');
		}
	} catch (error: any) {
		console.error(`Error with Anthropic API request: ${error.message}`);
		return NextResponse.json({ error: 'An error occurred during your request.' }, { status: 500 });
	}
}
// src/app/api/generate-cover-letter/route.ts

function generatePrompt(template: string = 'classic', jobDescription: string, cv: string) {
	return `
Human: I need you to generate a ${template} professional cover letter for a job application. Here are the details:

Job Description:
${jobDescription}

My CV:
${cv}

Please write a professional cover letter that highlights relevant experience from my CV and shows enthusiasm for the position. The cover letter should be in a ${template} style.

Assistant:
`;
}
