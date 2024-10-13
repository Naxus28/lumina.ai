import { NextRequest } from 'next/server';
import { generateTeachingPhilosophy } from '@/app/ai';
import { z } from 'zod';

const inputSchema = z
	.object({
		discipline: z.string().min(1),
		experience: z.string().min(1),
		disciplinesTaught: z.string(),
		educationPurpose: z.string().min(1),
		teachingMotivation: z.string().min(1),
		studentLearning: z.string().min(1),
		teachingGoals: z.string().min(1),
		teachingStyles: z.array(z.string()).min(1),
		effectiveMethods: z.string().min(1),
		teachingValues: z.array(z.string()).min(1),
		assessmentMethods: z.array(z.string()).min(1),
		inclusiveness: z.string(),
		researchTeachingConnection: z.string(),
		challengesInnovations: z.string(),
		professionalDevelopment: z.string(),
		anecdote: z.string(),
		studentAccomplishment: z.string(),
		teachingPhilosophyEvolution: z.string(),
		customFields: z.record(z.string(), z.string()).default({}),
	})
	.catchall(z.union([z.string(), z.array(z.string())]));

export async function POST(req: NextRequest) {
	const formData = await req.formData();
	const inputs: Record<string, string | string[]> = {};

	formData.forEach((value, key) => {
		if (key === 'teachingStyles' || key === 'teachingValues' || key === 'assessmentMethods') {
			if (!inputs[key]) {
				inputs[key] = [];
			}
			(inputs[key] as string[]).push(value as string);
		} else if (key === 'customFields') {
			inputs[key] = JSON.parse(value as string);
		} else {
			inputs[key] = value as string;
		}
	});

	console.log('Received inputs:', JSON.stringify(inputs, null, 2));

	try {
		const validationResult = inputSchema.safeParse(inputs);
		console.log('validationResult: ', validationResult);
		if (!validationResult.success) {
			return new Response(
				JSON.stringify({
					error: 'Invalid input',
					details: validationResult.error.issues,
					receivedInputs: inputs,
				}),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}

		const stream = await generateTeachingPhilosophy(validationResult.data);

		// Return the streaming response
		return new Response(stream, {
			headers: {
				'Content-Type': 'text/plain; charset=utf-8',
				'Transfer-Encoding': 'chunked',
			},
		});
	} catch (error: any) {
		console.error(`Error in API route:`, error);
		return new Response(JSON.stringify({ error: `An error occurred: ${error.message}` }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
}
