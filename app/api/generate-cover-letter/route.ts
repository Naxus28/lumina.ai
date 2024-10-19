import { NextRequest } from 'next/server';
import { parsePDF } from '@/app/utils/pdfParser';
import { generateCoverLetter } from '@/app/ai';

export async function POST(req: NextRequest) {
	const formData = await req.formData();
	const file = formData.get('file') as File | null;
	const template = formData.get('template') as string | null;
	const jobDescription = formData.get('jobDescription') as string | null;
	const sender = formData.get('sender') as string | null;
	const recipient = formData.get('recipient') as string | null;
	const customFieldsJson = formData.get('customFields') as string;
	let customFields: Record<string, string> = {};

	if (customFieldsJson) {
		try {
			customFields = JSON.parse(customFieldsJson);
		} catch (error) {
			console.error('Error parsing custom fields:', error);
		}
	}

	if (!file || !template || !jobDescription) {
		return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
	}

	try {
		const cvText = await parsePDF(file);
		console.log('recipient', recipient);
		const stream = await generateCoverLetter({
			template,
			cvText,
			jobDescription,
			sender: sender || undefined,
			recipient: recipient || undefined,
			customFields,
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
