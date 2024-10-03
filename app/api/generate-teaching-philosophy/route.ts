import { NextRequest } from 'next/server';
import { generateTeachingPhilosophy } from '@/app/ai';
import { z } from 'zod';

const inputSchema = z
	.object({
		discipline: z.string().min(1),
		experience: z.string().min(1),
		educationPurpose: z.string(),
		teachingMotivation: z.string(),
		studentLearning: z.string(),
		teachingGoals: z.string(),
		effectiveMethods: z.string(),
		teachingValues: z.array(z.string()),
		assessmentMethods: z.array(z.string()),
		inclusiveness: z.string(),
		researchTeachingConnection: z.string(),
		challengesInnovations: z.string(),
		professionalDevelopment: z.string(),
		teachingStyles: z.array(z.string()),
		anecdote: z.string(),
	})
	.catchall(z.union([z.string(), z.array(z.string())]));

export async function POST(req: NextRequest) {
	const formData = await req.formData();
	const inputs: Record<string, string | string[]> = {};

	formData.forEach((value, key) => {
		if (inputs[key]) {
			if (Array.isArray(inputs[key])) {
				(inputs[key] as string[]).push(value as string);
			} else {
				inputs[key] = [inputs[key] as string, value as string];
			}
		} else {
			inputs[key] = value as string;
		}
	});

	console.log('Received inputs:', JSON.stringify(inputs, null, 2));

	try {
		// Validate inputs
		const validationResult = inputSchema.safeParse(inputs);
		if (!validationResult.success) {
			console.error('Validation failed:', validationResult.error);
			return new Response(JSON.stringify({ 
				error: 'Invalid input', 
				details: validationResult.error.issues,
				receivedInputs: inputs
			}), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
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
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
