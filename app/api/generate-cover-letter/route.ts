// src/app/api/generate-cover-letter/route.ts

import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createPromptGenerator } from '../../../utils/generatePrompt';
const ANTHROPIC_API_KEY = '***REMOVED***';
const anthropic = new Anthropic({
	apiKey: ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
	console.log('API route hit');

	if (!ANTHROPIC_API_KEY) {
		console.error('Anthropic API key is not set');
		return NextResponse.json({ error: 'Anthropic API key not configured' }, { status: 500 });
	}

	try {
		const formData = await req.formData();
		const file = formData.get('file') as File | null;
		const template = formData.get('template') as string | null;
		const jobDescription = formData.get('jobDescription') as string | null;

		if (!file || !template || !jobDescription) {
			return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
		}

		// Dynamically import pdf-parse
		const pdfParse = await import('pdf-parse/lib/pdf-parse.js');

		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		const pdfData = await pdfParse.default(buffer);
		const cvText = pdfData.text;

		const generateCoverLetterPrompt = createPromptGenerator('coverLetter', { template });
		const prompt = generateCoverLetterPrompt({ jobDescription, cv: cvText });

		const message = await anthropic.messages.create({
			model: 'claude-3-sonnet-20240229',
			max_tokens: 1500,
			messages: [
				{
					role: 'user',
					content: prompt,
				},
			],
		});

		if (message.content && message.content[0] && message.content[0].type === 'text') {
			let coverLetter = message.content[0].text.trim();
			return NextResponse.json({ coverLetter });
		}

		throw new Error('Unexpected response format from Anthropic API');
	} catch (error: any) {
		console.error(`Error in API route:`, error);
		return NextResponse.json({ error: `An error occurred: ${error.message}` }, { status: 500 });
	}
}
