import { generateDocument } from '@/app/ai';
import { generatePrompt } from '../utils/generatePrompt';

interface GenerateCoverLetterParams {
	cvText: string;
	jobDescription: string;
	template: string;
	sender?: string;
	recipient?: string;
	customFields?: Record<string, string>;
	highlights?: string[];
}

export async function generateCoverLetter({
	cvText,
	jobDescription,
	template,
	recipient,
	customFields,
	highlights,
}: GenerateCoverLetterParams) {
	const customFieldsText = customFields
		? Object.entries(customFields)
				.map(([key, value]) => `${key}:\n${value}`)
				.join('\n\n')
		: '';

	const prompt = generatePrompt('coverLetter', {
		jobDescription,
		cv: cvText,
		recipient,
		template,
		customFields: customFieldsText,
		highlights: highlights || [],
	});

	return generateDocument({
		prompt,
		systemPrompt:
			'You are an AI assistant specialized in writing academic cover letters. Be concise, professional, and adhere strictly to the provided instructions.',
	});
}
