import { generateDocument } from '@/app/ai';
import { generatePrompt } from '../utils/generatePrompt';

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
	addressee,
}: GenerateCoverLetterParams) {
	const prompt = generatePrompt('coverLetter', {
		jobDescription,
		cv: cvText,
		addressee,
		sender,
		template,
	});

	return generateDocument({
		prompt,
		systemPrompt:
			'You are an AI assistant specialized in writing academic cover letters. Be concise, professional, and adhere strictly to the provided instructions.',
	});
}
