'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Container } from '@/app/layout-components/Container';
import { H1, Paragraph, Span } from '@/app/components/typography';
import { DocumentDisplay } from '@/app/components/shared/DocumentDisplay';
import { ErrorMessage } from '../cover-letter/components/ErrorMessage';
import { GenerateButton } from '@/app/components/GenerateButton';
import { renderTextArea, textAreaConfigs } from './utils';

interface Inputs {
	discipline: string;
	experience: string;
	educationPurpose: string;
	teachingMotivation: string;
	studentLearning: string;
	teachingGoals: string;
	teachingStyle: string[];
	effectiveMethods: string;
	teachingValues: string[];
	assessmentMethods: string[];
	inclusiveness: string;
	researchTeachingConnection: string;
	challengesInnovations: string;
	professionalDevelopment: string;
	anecdote: string;
	teachingPhilosophyEvolution: string;
	customFields: { [key: string]: string };
}

const TeachingPhilosophyGenerator = () => {
	const [inputs, setInputs] = useState<Inputs>({
		discipline: '',
		experience: '',
		educationPurpose: '',
		teachingMotivation: '',
		studentLearning: '',
		teachingGoals: '',
		teachingStyle: [],
		effectiveMethods: '',
		teachingValues: [],
		assessmentMethods: [],
		inclusiveness: '',
		researchTeachingConnection: '',
		challengesInnovations: '',
		professionalDevelopment: '',
		anecdote: '',
		teachingPhilosophyEvolution: '',
		customFields: {},
	});

	const [activeTab, setActiveTab] = useState('basics');
	const [progress, setProgress] = useState(0);
	const [newFieldName, setNewFieldName] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [generatedPhilosophy, setGeneratedPhilosophy] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isGenerationComplete, setIsGenerationComplete] = useState(false);
	const resultDisplayRef = useRef<HTMLDivElement>(null);
	const [isStreamStarted, setIsStreamStarted] = useState(false);
	const [isFormComplete, setIsFormComplete] = useState(false);
	const [isGenerating, setIsGenerating] = useState(false);

	const mandatoryFields = [
		'discipline',
		'experience',
		'educationPurpose',
		'teachingMotivation',
		'studentLearning',
		'teachingGoals',
		'teachingStyle',
		'effectiveMethods',
		'teachingValues',
		'assessmentMethods',
	];

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setInputs((prev) => ({ ...prev, [name]: value }));
	};

	const handleCheckboxChange = (name: string, value: string) => {
		setInputs((prev) => ({
			...prev,
			[name]: (prev[name as keyof typeof prev] as string[]).includes(value)
				? (prev[name as keyof typeof prev] as string[]).filter((item) => item !== value)
				: [...(prev[name as keyof typeof prev] as string[]), value],
		}));
	};

	const handleCustomFieldChange = (name: string, value: string) => {
		setInputs((prev) => ({
			...prev,
			customFields: { ...prev.customFields, [name]: value },
		}));
	};

	const handleAddCustomField = () => {
		if (newFieldName.trim() !== '') {
			setInputs((prev) => ({
				...prev,
				customFields: { ...prev.customFields, [newFieldName.trim()]: '' },
			}));
			setNewFieldName('');
		}
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
				} else if (typeof value === 'object') {
					formData.append(key, JSON.stringify(value));
				} else {
					formData.append(key, value);
				}
			});

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

	const calculateProgress = () => {
		const filledMandatoryFields = mandatoryFields.filter(
			(field) =>
				inputs[field as keyof Inputs] !== '' &&
				(typeof inputs[field as keyof Inputs] !== 'object' || (inputs[field as keyof Inputs] as any).length > 0)
		).length;
		return Math.round((filledMandatoryFields / mandatoryFields.length) * 100);
	};

	useEffect(() => {
		const newProgress = calculateProgress();
		setProgress(newProgress);
	}, [inputs]);

	useEffect(() => {
		if (isStreamStarted && resultDisplayRef.current) {
			resultDisplayRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}, [isStreamStarted]);

	// Update renderTextArea to use the utility function
	const renderConfiguredTextArea = (key: string) => {
		const config = textAreaConfigs[key as keyof typeof textAreaConfigs];
		return renderTextArea(config, inputs[key as keyof Inputs] as string, handleInputChange);
	};

	// Add a function to check if the form is complete
	const checkFormCompletion = () => {
		// Add your logic here to check if all required fields are filled
		// For example:
		const allFieldsFilled = Object.values(inputs).every((field) => field.length > 0);
		setIsFormComplete(allFieldsFilled);
	};

	// Call checkFormCompletion whenever form data changes
	useEffect(() => {
		checkFormCompletion();
	}, [inputs]);

	return (
		<>
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

			<Card className="w-full mt-8">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-center">Teaching Philosophy Generator</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="space-y-2">
						<div className="flex justify-between items-center">
							<span className="text-sm font-medium">Progress</span>
							<span className="text-sm font-medium">{progress}%</span>
						</div>
						<Progress
							value={progress}
							className="w-full"
						/>
					</div>

					<Tabs
						value={activeTab}
						onValueChange={setActiveTab}
					>
						<TabsList className="grid w-full grid-cols-5">
							<TabsTrigger value="basics">Basics</TabsTrigger>
							<TabsTrigger value="approach">Approach</TabsTrigger>
							<TabsTrigger value="methods">Methods</TabsTrigger>
							<TabsTrigger value="growth">Growth</TabsTrigger>
							<TabsTrigger value="reflection">Reflection</TabsTrigger>
						</TabsList>

						<TabsContent
							value="basics"
							className="space-y-4"
						>
							<div>
								<Label htmlFor="discipline">
									Academic Discipline<span className="text-red-500">*</span>
								</Label>
								<Input
									id="discipline"
									name="discipline"
									value={inputs.discipline}
									onChange={handleInputChange}
									placeholder="e.g., Computer Science"
								/>
							</div>
							<div>
								<Label htmlFor="experience">
									Years of Teaching Experience<span className="text-red-500">*</span>
								</Label>
								<Input
									id="experience"
									name="experience"
									type="number"
									value={inputs.experience}
									onChange={handleInputChange}
									placeholder="e.g., 5"
								/>
							</div>
							{renderConfiguredTextArea('educationPurpose')}
							{renderConfiguredTextArea('teachingMotivation')}
						</TabsContent>

						<TabsContent
							value="approach"
							className="space-y-4"
						>
							{renderConfiguredTextArea('studentLearning')}
							{renderConfiguredTextArea('teachingGoals')}
							<div>
								<Label>
									Primary Teaching Style<span className="text-red-500">*</span>
								</Label>
								<div className="grid grid-cols-2 gap-2">
									{['Lecture-based', 'Discussion-oriented', 'Hands-on / Practical', 'Blended / Hybrid'].map((style) => (
										<div
											key={style}
											className="flex items-center"
										>
											<Checkbox
												id={`style-${style}`}
												checked={inputs.teachingStyle.includes(style)}
												onCheckedChange={(checked) => handleCheckboxChange('teachingStyle', style)}
											/>
											<label
												htmlFor={`style-${style}`}
												className="ml-2 text-sm"
											>
												{style}
											</label>
										</div>
									))}
								</div>
							</div>
						</TabsContent>

						<TabsContent
							value="methods"
							className="space-y-4"
						>
							{renderConfiguredTextArea('effectiveMethods')}
							<div>
								<Label>
									Teaching Values<span className="text-red-500">*</span>
								</Label>
								<div className="grid grid-cols-2 gap-2">
									{[
										'Critical thinking',
										'Technological ethics',
										'Collaboration',
										'Innovation',
										'Lifelong learning',
									].map((value) => (
										<div
											key={value}
											className="flex items-center"
										>
											<Checkbox
												id={`value-${value}`}
												checked={inputs.teachingValues.includes(value)}
												onCheckedChange={(checked) => handleCheckboxChange('teachingValues', value)}
											/>
											<label
												htmlFor={`value-${value}`}
												className="ml-2 text-sm"
											>
												{value}
											</label>
										</div>
									))}
								</div>
							</div>
							<div>
								<Label>
									Assessment Methods<span className="text-red-500">*</span>
								</Label>
								<div className="grid grid-cols-2 gap-2">
									{[
										'Coding projects',
										'Technical presentations',
										'Peer code reviews',
										'Algorithm design challenges',
										'Research papers',
									].map((method) => (
										<div
											key={method}
											className="flex items-center"
										>
											<Checkbox
												id={`assessment-${method}`}
												checked={inputs.assessmentMethods.includes(method)}
												onCheckedChange={(checked) => handleCheckboxChange('assessmentMethods', method)}
											/>
											<label
												htmlFor={`assessment-${method}`}
												className="ml-2 text-sm"
											>
												{method}
											</label>
										</div>
									))}
								</div>
							</div>
							{renderConfiguredTextArea('inclusiveness')}
						</TabsContent>

						<TabsContent
							value="growth"
							className="space-y-4"
						>
							{renderConfiguredTextArea('researchTeachingConnection')}
							{renderConfiguredTextArea('challengesInnovations')}
							{renderConfiguredTextArea('professionalDevelopment')}
						</TabsContent>

						<TabsContent
							value="reflection"
							className="space-y-4"
						>
							{renderConfiguredTextArea('anecdote')}
							{renderConfiguredTextArea('teachingPhilosophyEvolution')}

							<div className="space-y-4">
								<h3 className="text-lg font-semibold">Custom Fields</h3>
								{Object.entries(inputs.customFields).map(([fieldName, fieldValue]) => (
									<div key={fieldName}>
										<Label htmlFor={fieldName}>{fieldName}</Label>
										<Textarea
											id={fieldName}
											value={fieldValue}
											onChange={(e) => handleCustomFieldChange(fieldName, e.target.value)}
											rows={3}
										/>
									</div>
								))}
								<div className="flex items-center space-x-2">
									<Input
										placeholder="New field name"
										value={newFieldName}
										onChange={(e) => setNewFieldName(e.target.value)}
									/>
									<Button onClick={handleAddCustomField}>Add Field</Button>
								</div>
							</div>
						</TabsContent>
					</Tabs>

					<GenerateButton
						onClick={handleGenerate}
						disabled={!isFormComplete}
						isLoading={isGenerating}
						documentType="Teaching Philosophy"
					/>
				</CardContent>
			</Card>

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
		</>
	);
};

export default TeachingPhilosophyGenerator;
