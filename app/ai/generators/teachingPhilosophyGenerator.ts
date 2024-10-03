import { generateDocument } from './documentGenerator';
import { generatePrompt } from '../utils/generatePrompt';

interface Inputs {
	discipline: string;
	experience: string;
	educationPurpose: string;
	teachingMotivation: string;
	studentLearning: string;
	teachingGoals: string;
	effectiveMethods: string;
	teachingValues: string[];
	assessmentMethods: string[];
	inclusiveness: string;
	researchTeachingConnection: string;
	challengesInnovations: string;
	professionalDevelopment: string;
	teachingStyles: string[];
	anecdote: string;
	[key: string]: string | string[];
}

export async function generateTeachingPhilosophy(inputs: Inputs) {
	const prompt = generatePrompt('teachingPhilosophy', inputs);

	return generateDocument({
		prompt,
		systemPrompt:
			'You are an AI assistant specialized in writing academic teaching philosophy statements. Create a coherent, professional, and personalized teaching philosophy based on the provided information.',
	});
}
