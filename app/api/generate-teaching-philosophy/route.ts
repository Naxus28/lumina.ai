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
	const inputs = Object.fromEntries(formData.entries());

	try {
		// Validate inputs
		const validationResult = inputSchema.safeParse(inputs);
		if (!validationResult.success) {
			return new Response(JSON.stringify({ error: 'Invalid input', details: validationResult.error.issues }), {
				status: 400,
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
		return new Response(JSON.stringify({ error: `An error occurred: ${error.message}` }), { status: 500 });
	}
}
