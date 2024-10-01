import { NextRequest } from 'next/server';
import { parsePDF } from '@/app/utils/pdfParser';
import { generateCoverLetter } from '@/app/ai/generators/coverLetterGenerator';

export async function POST(req: NextRequest) {
	const formData = await req.formData();
	const file = formData.get('file') as File | null;
	const template = formData.get('template') as string | null;
	const jobDescription = formData.get('jobDescription') as string | null;
	const sender = formData.get('sender') as string | null;
	const addressee = formData.get('addressee') as string | null;

	if (!file || !template || !jobDescription) {
		return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
	}

	try {
		const cvText = await parsePDF(file);
		const stream = await generateCoverLetter({
			template,
			cvText,
			jobDescription,
			sender: sender || undefined,
			addressee: addressee || undefined,
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
