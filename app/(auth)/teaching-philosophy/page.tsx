'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Info } from 'lucide-react';
import { Container } from '@/app/layout-components/Container';
import { H1, Paragraph, Span } from '@/app/components/typography';
import { DocumentDisplay } from '@/app/components/shared/DocumentDisplay';
import { ErrorMessage } from '../cover-letter/components/ErrorMessage';
import { GenerateButton } from '@/app/components/GenerateButton';

const InfoTooltip = ({ content }: { content: string }) => (
	<TooltipProvider>
		<Tooltip>
			<TooltipTrigger asChild>
				<Info className="inline-block ml-2 h-4 w-4 text-gray-500" />
			</TooltipTrigger>
			<TooltipContent>
				<p className="w-80 text-sm">{content}</p>
			</TooltipContent>
		</Tooltip>
	</TooltipProvider>
);

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

	const renderTextArea = (name: keyof Inputs, label: string, example: string, isMandatory = false) => (
		<div key={name}>
			<Label htmlFor={name}>
				{label}
				{isMandatory && <span className="text-red-500">*</span>}
				<InfoTooltip content={example} />
			</Label>
			<Textarea
				id={name}
				name={name}
				value={inputs[name] as string}
				onChange={handleInputChange}
				rows={3}
			/>
		</div>
	);

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
		<Container>
			<H1>Create Your Teaching Philosophy</H1>
			<Paragraph>
				Craft a compelling teaching philosophy that showcases your approach to education, your values as an educator,
				and your vision for student learning. Our AI-powered tool will generate a personalized document based on your
				input.
			</Paragraph>
			<Span className="text-xs block mt-2 italic">Items marked with * are required.</Span>

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
							{renderTextArea(
								'educationPurpose',
								'Purpose of Education',
								'To empower students with the knowledge and skills to solve complex computational problems while fostering a deep understanding of the ethical implications of technology in society.',
								true
							)}
							{renderTextArea(
								'teachingMotivation',
								'Teaching Motivation',
								"I'm passionate about guiding students to become not just skilled programmers, but innovative problem-solvers who can adapt to the rapidly evolving field of computer science and contribute meaningfully to technological advancements.",
								true
							)}
						</TabsContent>

						<TabsContent
							value="approach"
							className="space-y-4"
						>
							{renderTextArea(
								'studentLearning',
								'How Students Learn Best',
								'Students in computer science learn best through a combination of theoretical foundations and practical, hands-on coding experiences. This includes algorithmic problem-solving, collaborative projects, and exposure to real-world software development practices.',
								true
							)}
							{renderTextArea(
								'teachingGoals',
								'Teaching Goals',
								"My goals are to develop students' computational thinking skills, foster creativity in problem-solving, build a strong foundation in programming principles, and instill an understanding of the societal impact of technology.",
								true
							)}
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
							{renderTextArea(
								'effectiveMethods',
								'Effective Teaching Methods',
								'I employ a mix of interactive coding demonstrations, pair programming sessions, project-based learning, and industry-relevant case studies. These methods simulate real-world software development environments and provide immediate feedback on code implementation.',
								true
							)}
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
							{renderTextArea(
								'inclusiveness',
								'Inclusiveness Approach',
								'I create an inclusive environment by using diverse examples in my teaching materials, promoting equitable participation in class discussions and group projects, and providing multiple ways for students to demonstrate their understanding of complex concepts.'
							)}
						</TabsContent>

						<TabsContent
							value="growth"
							className="space-y-4"
						>
							{renderTextArea(
								'researchTeachingConnection',
								'Connection between Teaching, Research, and Service',
								'My research in machine learning algorithms directly informs my teaching of advanced AI courses. I involve students in cutting-edge research projects and community service initiatives that apply their programming skills to solve local issues, bridging academic learning with real-world impact.'
							)}
							{renderTextArea(
								'challengesInnovations',
								'Challenges and Innovations',
								"To address the challenge of teaching rapidly evolving technologies, I've implemented a flexible curriculum that incorporates current industry trends and invited guest speakers from tech companies. I've also developed interactive online modules to support self-paced learning of foundational concepts."
							)}
							{renderTextArea(
								'professionalDevelopment',
								'Professional Development',
								"I regularly attend computer science education conferences, participate in workshops on innovative teaching methods, and collaborate with colleagues to refine my teaching approach. I'm also pursuing additional certifications in emerging areas like quantum computing to stay at the forefront of the field."
							)}
						</TabsContent>

						<TabsContent
							value="reflection"
							className="space-y-4"
						>
							{renderTextArea(
								'anecdote',
								'Memorable Teaching Anecdote',
								'During a machine learning project, a student discovered an innovative approach to optimizing a neural network that outperformed existing methods. This led to a class-wide exploration of the algorithm, resulting in a collaborative research paper. This experience exemplified the power of fostering creativity and critical thinking in the classroom.'
							)}
							{renderTextArea(
								'teachingPhilosophyEvolution',
								'Evolution of Your Teaching Philosophy',
								'Reflect on how your teaching philosophy has evolved over time. Consider key experiences or insights that have shaped your approach to teaching and how you anticipate your philosophy might continue to develop in the future.'
							)}

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
		</Container>
	);
};

export default TeachingPhilosophyGenerator;
