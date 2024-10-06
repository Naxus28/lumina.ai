'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Info, X } from 'lucide-react';
import { Container } from '@/app/layout-components/Container';
import { H1, Paragraph, Span } from '@/app/components/typography';
import { DocumentDisplay } from '@/app/components/shared/DocumentDisplay';
import { ErrorMessage } from '../cover-letter/components/ErrorMessage';
import { GenerateButton } from '@/app/components/GenerateButton';
import { cn } from '@/lib/utils';

const InfoTooltip = ({ content }: { content: string }) => {
	const [isOpen, setIsOpen] = useState(false);
	const tooltipRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<TooltipProvider>
			<Tooltip open={isOpen}>
				<TooltipTrigger asChild>
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="inline-flex items-center justify-center w-5 h-5 ml-2 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
					>
						<Info className="w-4 h-4" />
						<span className="sr-only">More information</span>
					</button>
				</TooltipTrigger>
				<TooltipContent
					side="top"
					align="center"
					className="max-w-xs text-sm bg-white p-2 rounded shadow-lg border border-gray-200"
					ref={tooltipRef}
				>
					<div className="flex justify-between items-start">
						<p>{content}</p>
						<button
							onClick={() => setIsOpen(false)}
							className="ml-2 text-gray-500 hover:text-gray-700"
						>
							<X className="w-4 h-4" />
						</button>
					</div>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

interface Inputs {
	discipline: string;
	experience: string;
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
	teachingPhilosophyEvolution: string;
	customFields: { [key: string]: string };
	studentAccomplishment: string;
	disciplinesTaught: string;
}

const TeachingPhilosophyGenerator = () => {
	const [inputs, setInputs] = useState<Inputs>({
		discipline: '',
		experience: '',
		educationPurpose: '',
		teachingMotivation: '',
		studentLearning: '',
		teachingGoals: '',
		teachingStyles: [],
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
		studentAccomplishment: '',
		disciplinesTaught: '',
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
		'teachingStyles',
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

	const renderTextArea = (name: keyof Inputs, label: string, example: string, isMandatory = false) => (
		<div key={name}>
			<Label
				htmlFor={name}
				className={cn('text-lg text-left mb-2 text-gray-600 font-normal', 'block')}
			>
				{label}
				{isMandatory && <span className="text-red-500">*</span>}
				<InfoTooltip content={`i.e., ${example}`} />
			</Label>
			<Textarea
				id={name}
				name={name}
				value={inputs[name] as string}
				onChange={handleInputChange}
				className="max-h-32 min-h-[80px]"
			/>
		</div>
	);

	const checkFormCompletion = useCallback(() => {
		const mandatoryFieldsFilled = mandatoryFields.every((field) => {
			const value = inputs[field as keyof Inputs];
			if (field === 'teachingStyles' || field === 'teachingValues' || field === 'assessmentMethods') {
				return (value as string[]).length > 0;
			}
			return value !== '';
		});
		setIsFormComplete(mandatoryFieldsFilled);
	}, [inputs]);

	useEffect(() => {
		checkFormCompletion();
	}, [inputs, checkFormCompletion]);

	return (
		<>
			<Container paddingX="none">
				<H1>Create Your Teaching Philosophy</H1>
				<Paragraph>
					Craft a compelling teaching philosophy that showcases your approach to education, your values as an educator,
					and your vision for student learning. Our AI-powered tool generates a personalized document based on your
					input. The more details you provide, the more unique your statement will be. However, you're free to include
					as much or as little information as you prefer – our AI adapts to create a meaningful philosophy statement
					regardless.
				</Paragraph>
				<Span className="text-xs block mt-2 italic">Items marked with * are required.</Span>
			</Container>

			<div className="w-full mt-8 space-y-6">
				<div className="space-y-2">
					<div className="flex justify-between items-center">
						<span className="text-sm font-medium">Progress</span>
						<span className="text-sm font-medium">{progress}%</span>
					</div>
					<Progress
						value={progress}
						className="w-full transition-all duration-500 ease-in-out bg-purple-100"
					/>
				</div>

				<Tabs
					value={activeTab}
					onValueChange={setActiveTab}
				>
					<TabsList className="grid w-full grid-cols-6 bg-transparent">
						<TabsTrigger
							value="basics"
							className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-purple-500 bg-transparent !bg-transparent data-[state=active]:!bg-transparent rounded-none"
						>
							Basics
						</TabsTrigger>
						<TabsTrigger
							value="approach"
							className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-purple-500 bg-transparent !bg-transparent data-[state=active]:!bg-transparent rounded-none"
						>
							Approach
						</TabsTrigger>
						<TabsTrigger
							value="methods"
							className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-purple-500 bg-transparent !bg-transparent data-[state=active]:!bg-transparent rounded-none"
						>
							Methods
						</TabsTrigger>
						<TabsTrigger
							value="growth"
							className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-purple-500 bg-transparent !bg-transparent data-[state=active]:!bg-transparent rounded-none"
						>
							Growth
						</TabsTrigger>
						<TabsTrigger
							value="reflection"
							className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-purple-500 bg-transparent !bg-transparent data-[state=active]:!bg-transparent rounded-none"
						>
							Reflection
						</TabsTrigger>
						<TabsTrigger
							value="custom"
							className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-purple-500 bg-transparent !bg-transparent data-[state=active]:!bg-transparent rounded-none"
						>
							Custom Fields
						</TabsTrigger>
					</TabsList>
					<div className="mt-12">
						<TabsContent
							value="basics"
							className="space-y-8"
						>
							<div>
								<Label
									htmlFor="discipline"
									className={cn('text-lg text-left mb-2 text-gray-600 font-normal', 'block')}
								>
									Academic Discipline<span className="text-red-500">*</span>
								</Label>
								<Input
									id="discipline"
									name="discipline"
									value={inputs.discipline}
									onChange={handleInputChange}
									placeholder="e.g., History"
								/>
							</div>
							<div>
								<Label
									htmlFor="experience"
									className={cn('text-lg text-left mb-2 text-gray-600 font-normal', 'block')}
								>
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
							<div>
								<Label
									htmlFor="disciplinesTaught"
									className={cn('text-lg text-left mb-2 text-gray-600 font-normal', 'block')}
								>
									Disciplines Taught and Where<span className="text-red-500">*</span>
								</Label>
								<Input
									id="disciplinesTaught"
									name="disciplinesTaught"
									value={inputs.disciplinesTaught}
									onChange={handleInputChange}
									placeholder="e.g., Modern European History at XYZ University, American Civil War at ABC College"
								/>
							</div>
							{renderTextArea(
								'educationPurpose',
								'Purpose of Education',
								'To cultivate critical thinking and foster a deep understanding of the subject matter, enabling students to apply their knowledge to real-world challenges.',
								true
							)}
							{renderTextArea(
								'teachingMotivation',
								'Teaching Motivation',
								"I'm driven by the opportunity to inspire curiosity and facilitate intellectual growth, guiding students to become lifelong learners and contributors in their chosen fields.",
								true
							)}
						</TabsContent>
						<TabsContent
							value="approach"
							className="space-y-8"
						>
							{renderTextArea(
								'studentLearning',
								'How Students Learn Best',
								'Students learn best through a combination of theoretical foundations and practical applications, including engaging discussions, hands-on activities, and real-world case studies.',
								true
							)}
							{renderTextArea(
								'teachingGoals',
								'Teaching Goals',
								"My goals are to develop students' critical thinking skills, foster creativity in problem-solving, build a strong foundation in core principles, and instill an understanding of the broader implications of their field.",
								true
							)}
							<div>
								<Label
									htmlFor="teachingStyles"
									className={cn('text-lg text-left mb-2 text-gray-600 font-normal', 'block')}
								>
									Primary Teaching Style<span className="text-red-500">*</span>
								</Label>
								<div className="grid grid-cols-2 gap-2">
									{['Lecture-based', 'Discussion-oriented', 'Experiential', 'Blended / Hybrid'].map((style) => (
										<div
											key={style}
											className="flex items-center"
										>
											<Checkbox
												id={`style-${style}`}
												checked={inputs.teachingStyles.includes(style)}
												onCheckedChange={(checked) => handleCheckboxChange('teachingStyles', style)}
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
							className="space-y-8"
						>
							{renderTextArea(
								'effectiveMethods',
								'Effective Teaching Methods',
								'I employ a mix of interactive lectures, group discussions, project-based learning, and field-specific case studies. These methods encourage active engagement and provide opportunities for practical application of concepts.',
								true
							)}
							<div>
								<Label
									htmlFor="teachingValues"
									className={cn('text-lg text-left mb-2 text-gray-600 font-normal', 'block')}
								>
									Teaching Values<span className="text-red-500">*</span>
								</Label>
								<div className="grid gap-2">
									{['Critical thinking', 'Ethical reasoning', 'Collaboration', 'Innovation', 'Lifelong learning'].map(
										(value) => (
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
										)
									)}
								</div>
							</div>
							<div>
								<Label
									htmlFor="assessmentMethods"
									className={cn('text-lg text-left mb-2 text-gray-600 font-normal', 'block')}
								>
									Assessment Methods<span className="text-red-500">*</span>
								</Label>
								<div className="grid gap-2">
									{[
										'Research projects',
										'Presentations',
										'Peer reviews',
										'Problem-solving tasks',
										'Reflective essays',
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
							{renderTextArea(
								'inclusiveness',
								'Inclusiveness Approach',
								'I create an inclusive environment by using diverse examples, promoting equitable participation, and providing multiple ways for students to demonstrate their understanding of complex concepts.'
							)}
						</TabsContent>
						<TabsContent
							value="growth"
							className="space-y-8"
						>
							{renderTextArea(
								'researchTeachingConnection',
								'Connection between Teaching, Research, and Service',
								'My research informs my teaching by providing current insights and methodologies. I involve students in research projects and community service initiatives that apply their skills to real-world issues, bridging academic learning with practical impact.'
							)}
							{renderTextArea(
								'challengesInnovations',
								'Challenges and Innovations',
								"To address evolving educational needs, I've implemented a flexible curriculum that incorporates current trends and invited guest speakers from relevant industries. I've also developed interactive online modules to support self-paced learning of foundational concepts."
							)}
							{renderTextArea(
								'professionalDevelopment',
								'Professional Development',
								"I regularly attend educational conferences, participate in workshops on innovative teaching methods, and collaborate with colleagues to refine my teaching approach. I'm also pursuing additional certifications to stay at the forefront of my field."
							)}
						</TabsContent>
						<TabsContent
							value="reflection"
							className="space-y-8"
						>
							{renderTextArea(
								'anecdote',
								'Memorable Teaching Anecdote',
								'During a class project, a student discovered an innovative approach that challenged existing methods in our field. This led to a class-wide discussion on critical thinking and innovation.'
							)}
							{renderTextArea(
								'studentAccomplishment',
								'Student Accomplishment',
								'A student who initially struggled with data analysis went on to present their research findings at a national conference, showcasing significant improvement in their analytical skills.'
							)}
							{renderTextArea(
								'teachingPhilosophyEvolution',
								'Evolution of Your Teaching Philosophy',
								'Reflect on how your teaching philosophy has evolved over time. Consider key experiences or insights that have shaped your approach to teaching and how you anticipate your philosophy might continue to develop in the future.'
							)}
						</TabsContent>
						<TabsContent
							value="custom"
							className="space-y-8"
						>
							<div className="space-y-8">
								<h3 className="text-lg font-semibold">Custom Fields</h3>
								<p className="text-sm text-gray-600">
									Add any additional information that you feel is important to your teaching philosophy. For example,
									you might add a field for "Desired Teaching Discipline" to specify a subject area you're interested in
									teaching at the new university.
								</p>
								{Object.entries(inputs.customFields).map(([fieldName, fieldValue]) => (
									<div key={fieldName}>
										<Label
											htmlFor={fieldName}
											className={cn('text-lg text-left mb-2 text-gray-600 font-normal', 'block')}
										>
											{fieldName}
										</Label>
										<Textarea
											id={fieldName}
											value={fieldValue}
											onChange={(e) => handleCustomFieldChange(fieldName, e.target.value)}
											className="max-h-32 min-h-[80px]"
										/>
									</div>
								))}
								<div className="flex items-center space-x-2">
									<Input
										placeholder="e.g., Desired Teaching Discipline"
										value={newFieldName}
										onChange={(e) => setNewFieldName(e.target.value)}
									/>
									<Button
										onClick={handleAddCustomField}
										className="bg-purple-600 hover:bg-purple-700 text-white"
									>
										Add Field
									</Button>
								</div>
							</div>
						</TabsContent>
					</div>
				</Tabs>

				<GenerateButton
					onClick={handleGenerate}
					disabled={!isFormComplete}
					isLoading={isGenerating}
					documentType="Teaching Philosophy"
				/>
			</div>

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
