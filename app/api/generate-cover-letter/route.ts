import { NextRequest } from 'next/server';
import { Anthropic } from '@anthropic-ai/sdk';
import { createPromptGenerator } from '../../../utils/generatePrompt';
const ANTHROPIC_API_KEY = '***REMOVED***';

const anthropic = new Anthropic({
	apiKey: ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
	if (!ANTHROPIC_API_KEY) {
		return new Response(JSON.stringify({ error: 'Anthropic API key not configured' }), { status: 500 });
	}

	const formData = await req.formData();
	const file = formData.get('file') as File | null;
	const template = formData.get('template') as string | null;
	const jobDescription = formData.get('jobDescription') as string | null;

	if (!file || !template || !jobDescription) {
		return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
	}

	try {
		// Parse PDF
		const pdfParse = await import('pdf-parse/lib/pdf-parse.js');
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		const pdfData = await pdfParse.default(buffer);
		const cvText = pdfData.text;

		const generateCoverLetterPrompt = createPromptGenerator('coverLetter', { template });
		const prompt = generateCoverLetterPrompt({ jobDescription, cv: cvText });

		// Create a ReadableStream to handle the Anthropic MessageStream
		const stream = new ReadableStream({
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

		// Return the streaming response
		return new Response(stream, {
			headers: {
				'Content-Type': 'text/plain; charset=utf-8',
				'Transfer-Encoding': 'chunked',
			},
		});
	} catch (error: any) {
		console.error(`Error in API route:`, error);
		return new Response(JSON.stringify({ error: `An error occurred: ${error.message}` }), { status: 500 });
	}
}
