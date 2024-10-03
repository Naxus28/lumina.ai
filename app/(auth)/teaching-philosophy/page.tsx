'use client';

import React, { useState } from 'react';
import { Container } from '@/app/layout-components/Container';
import { PageContent } from '@/app/layout-components/PageContent';
import { H1, Paragraph, Span } from '@/app/components/typography';
import { GenerateButton } from '@/app/components/GenerateButton';
import { BasicInformation } from './components/BasicInformation';
import { PhilosophyDetails } from './components/PhilosophyDetails';
import { TeachingValuesAndMethods } from './components/TeachingValuesAndMethods';
import { TeachingStyle } from './components/TeachingStyle';

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
	teachingStyles: string[]; // Changed from string to string[]
	anecdote: string;
	[key: string]: string | string[]; // Allow for dynamic keys
}

const TeachingPhilosophyGenerator = () => {
	const [inputs, setInputs] = useState<Inputs>({
		discipline: '',
		experience: '',
		educationPurpose: '',
		teachingMotivation: '',
		studentLearning: '',
		teachingGoals: '',
		effectiveMethods: '',
		teachingValues: [],
		assessmentMethods: [],
		inclusiveness: '',
		researchTeachingConnection: '',
		challengesInnovations: '',
		professionalDevelopment: '',
		teachingStyles: [], // Initialize as an empty array
		anecdote: '',
	});

	const [customFields, setCustomFields] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setInputs((prev) => ({ ...prev, [name]: value }));
	};

	const handleCheckboxChange = (name: string, value: string) => {
		setInputs((prev) => ({
			...prev,
			[name]: prev[name as keyof typeof prev].includes(value)
				? (prev[name as keyof typeof prev] as string[]).filter((item) => item !== value)
				: [...(prev[name as keyof typeof prev] as string[]), value],
		}));
	};

	const addCustomField = (fieldName: string) => {
		setCustomFields((prev) => [...prev, fieldName]);
		setInputs((prev) => ({ ...prev, [fieldName]: '' }));
	};

	const handleGenerate = () => {
		setIsLoading(true);
		console.log('Generating teaching philosophy...');
		setTimeout(() => setIsLoading(false), 2000);
	};

	const isFormValid = () => {
		return (
			inputs.discipline !== '' && inputs.experience !== '' && inputs.teachingStyles.length > 0 // Changed from inputs.teachingStyle !== ''
		);
	};

	return (
		<main>
			<Container>
				<H1>Create Your Teaching Philosophy</H1>
				<Paragraph>
					Craft a compelling teaching philosophy that showcases your approach to education, your values as an educator,
					and your vision for student learning. Our AI-powered tool is designed to generate a personalized document
					based on your input. By collaborating with the AI, you'll provide the essential insights and experiences,
					while the AI transforms them into a cohesive teaching philosophy statement.
				</Paragraph>
				<Span className="text-xs block mt-2 italic">Items marked with * are required.</Span>
			</Container>

			<BasicInformation
				inputs={{ discipline: inputs.discipline, experience: inputs.experience }}
				handleInputChange={handleInputChange}
			/>

			<PhilosophyDetails
				inputs={Object.fromEntries(
					Object.entries(inputs).map(([key, value]) => [key, Array.isArray(value) ? value.join(', ') : value])
				)}
				handleInputChange={handleInputChange}
				addCustomField={addCustomField}
				customFields={customFields}
			/>

			<TeachingValuesAndMethods
				inputs={{ teachingValues: inputs.teachingValues, assessmentMethods: inputs.assessmentMethods }}
				handleCheckboxChange={handleCheckboxChange}
			/>

			<TeachingStyle
				selectedStyles={inputs.teachingStyles}
				handleCheckboxChange={handleCheckboxChange}
			/>

			<Container>
				<GenerateButton
					onClick={handleGenerate}
					disabled={!isFormValid()}
					isLoading={isLoading}
					documentType="Teaching Philosophy"
				/>
			</Container>
		</main>
	);
};

export default TeachingPhilosophyGenerator;
