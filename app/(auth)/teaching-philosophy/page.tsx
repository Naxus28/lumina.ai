'use client';

import React, { useState } from 'react';
import { Container } from '@/app/layout-components/Container';
import { PageContent } from '@/app/layout-components/PageContent';
import { H1, Paragraph } from '@/app/components/typography';
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
	teachingStyle: string;
	anecdote: string;
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
		teachingStyle: '',
		anecdote: '',
	});

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

	const handleGenerate = () => {
		setIsLoading(true);
		console.log('Generating teaching philosophy...');
		setTimeout(() => setIsLoading(false), 2000);
	};

	const isFormValid = () => {
		return inputs.discipline !== '' && inputs.experience !== '';
	};

	return (
		<PageContent>
			<Container>
				<H1>Create Your Teaching Philosophy</H1>
				<Paragraph>
					Craft a compelling teaching philosophy that showcases your approach to education, your values as an educator,
					and your vision for student learning.
				</Paragraph>
			</Container>

			<BasicInformation
				inputs={{ discipline: inputs.discipline, experience: inputs.experience }}
				handleInputChange={handleInputChange}
			/>

			<PhilosophyDetails
				inputs={inputs}
				handleInputChange={handleInputChange}
			/>

			<TeachingValuesAndMethods
				inputs={{ teachingValues: inputs.teachingValues, assessmentMethods: inputs.assessmentMethods }}
				handleCheckboxChange={handleCheckboxChange}
			/>

			<TeachingStyle
				teachingStyle={inputs.teachingStyle}
				handleInputChange={(value) => setInputs((prev) => ({ ...prev, teachingStyle: value }))}
			/>

			<Container>
				<GenerateButton
					onClick={handleGenerate}
					disabled={!isFormValid()}
					isLoading={isLoading}
					documentType="Teaching Philosophy"
				/>
			</Container>
		</PageContent>
	);
};

export default TeachingPhilosophyGenerator;
