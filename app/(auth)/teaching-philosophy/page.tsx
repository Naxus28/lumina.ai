'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Container } from '@/app/layout-components/Container';
import { H1, Paragraph, Span } from '@/app/components/typography';
import { GenerateButton } from '@/app/components/GenerateButton';
import { BasicInformation } from './components/BasicInformation';
import { PhilosophyDetails } from './components/PhilosophyDetails';
import { TeachingValuesAndMethods } from './components/TeachingValuesAndMethods';
import { TeachingStyle } from './components/TeachingStyle';
import { DocumentDisplay } from '@/app/components/shared/DocumentDisplay';
import { ErrorMessage } from '../cover-letter/components/ErrorMessage';

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
	const [generatedPhilosophy, setGeneratedPhilosophy] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isGenerationComplete, setIsGenerationComplete] = useState(false);
	const resultDisplayRef = useRef<HTMLDivElement>(null);
	const [isStreamStarted, setIsStreamStarted] = useState(false);

	useEffect(() => {
		if (isStreamStarted && resultDisplayRef.current) {
			resultDisplayRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}, [isStreamStarted]);

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

	const handleGenerate = async () => {
		setIsLoading(true);
		setError(null);
		setGeneratedPhilosophy('');
		setIsGenerationComplete(false);
		setIsStreamStarted(false);

		try {
			const formData = new FormData();
			Object.entries(inputs).forEach(([key, value]) => {
				if (Array.isArray(value)) {
					value.forEach((item) => formData.append(key, item));
				} else {
					formData.append(key, value);
				}
			});
			console.log('formData: ', formData);
			const response = await fetch('/api/generate-teaching-philosophy', {
				method: 'POST',
				body: formData,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const reader = response.body?.getReader();
			const decoder = new TextDecoder();

			if (reader) {
				while (true) {
					const { done, value } = await reader.read();
					if (done) {
						setIsGenerationComplete(true);
						break;
					}
					const chunk = decoder.decode(value, { stream: true });
					setGeneratedPhilosophy((prev) => {
						const newContent = prev + chunk;
						if (!isStreamStarted) {
							setIsStreamStarted(true);
						}
						return newContent;
					});
				}
			} else {
				throw new Error('Unable to read response stream');
			}
		} catch (error) {
			console.error('Error in handleGenerate:', error);
			setError(error instanceof Error ? error.message : 'An unknown error occurred');
		} finally {
			setIsLoading(false);
		}
	};

	const handleEdit = useCallback((newContent: string) => {
		setGeneratedPhilosophy(newContent);
	}, []);

	const isFormValid = () => {
		return (
			inputs.discipline !== '' && inputs.experience !== '' && inputs.teachingStyles.length > 0 // Changed from inputs.teachingStyle !== ''
		);
	};

	return (
		<main>
			<Container paddingX="none">
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

			<Container paddingX="none">
				<GenerateButton
					onClick={handleGenerate}
					disabled={!isFormValid()}
					isLoading={isLoading}
					documentType="Teaching Philosophy"
				/>
			</Container>

			{error && <ErrorMessage message={error} />}

			{generatedPhilosophy && (
				<div ref={resultDisplayRef}>
					<DocumentDisplay
						content={generatedPhilosophy}
						isLoading={isLoading}
						isEditable={true}
						documentType="Teaching Philosophy"
						onEdit={handleEdit}
					/>
				</div>
			)}
		</main>
	);
};

export default TeachingPhilosophyGenerator;
