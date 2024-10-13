import { generateDocument } from '@/app/ai';
import { generatePrompt } from '../utils/generatePrompt';

interface TeachingPhilosophyInputs {
	discipline: string;
	experience: string;
	disciplinesTaught: string;
	educationPurpose: string;
	teachingMotivation: string;
	studentLearning: string;
	teachingGoals: string;
	teachingStyles: string[];
	effectiveMethods: string;
	teachingValues: string[];
	assessmentMethods: string[];
	inclusiveness: string;
	researchTeachingConnection: string;
	challengesInnovations: string;
	professionalDevelopment: string;
	anecdote: string;
	studentAccomplishment: string;
	teachingPhilosophyEvolution: string;
	customFields: Record<string, string>;
}

export async function generateTeachingPhilosophy(inputs: TeachingPhilosophyInputs) {
	const prompt = generatePrompt('teachingPhilosophy', inputs);

	return generateDocument({
		prompt,
		systemPrompt:
			'You are an AI assistant specialized in writing academic teaching philosophy statements. Create a coherent, professional, and personalized teaching philosophy based on the provided information.',
	});
}
