'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Container } from '@/app/layout-components/Container';
import { H1, H2, Paragraph, Span } from '@/app/components/typography';
import { DocumentDisplay } from '@/app/components/shared/DocumentDisplay';
import { ErrorMessage } from '../cover-letter/components/ErrorMessage';
import { GenerateButton } from '@/app/components/GenerateButton';
import { cn } from '@/lib/utils';
import { InfoTooltip } from '@/app/components/InfoTooltip';

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
	const resultDisplayRef = useRef<HTMLDivElement>(null);
	const [isStreamStarted, setIsStreamStarted] = useState(false);
	const [isFormComplete, setIsFormComplete] = useState(false);
	const [filledFieldsCount, setFilledFieldsCount] = useState(0);

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
		if (name === 'experience') {
			const numValue = Math.max(0, parseInt(value) || 0);
			setInputs((prev) => ({ ...prev, [name]: numValue.toString() }));
		} else {
			setInputs((prev) => ({ ...prev, [name]: value }));
		}
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

	const handleRemoveCustomField = (fieldName: string) => {
		setInputs((prev) => {
			const updatedCustomFields = { ...prev.customFields };
			delete updatedCustomFields[fieldName];
			return { ...prev, customFields: updatedCustomFields };
		});
	};

	const handleGenerate = async () => {
		setIsLoading(true);
		setError(null);
		setGeneratedPhilosophy('');
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

	const calculateProgress = useCallback(() => {
		const filledMandatoryFields = mandatoryFields.filter(
			(field) =>
				inputs[field as keyof Inputs] !== '' &&
				(typeof inputs[field as keyof Inputs] !== 'object' || (inputs[field as keyof Inputs] as any).length > 0)
		).length;
		setFilledFieldsCount(filledMandatoryFields);
		return Math.round((filledMandatoryFields / mandatoryFields.length) * 100);
	}, [inputs]);

	useEffect(() => {
		const newProgress = calculateProgress();
		setProgress(newProgress);
	}, [inputs, calculateProgress]);

	useEffect(() => {
		if (isStreamStarted && resultDisplayRef.current) {
			resultDisplayRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}, [isStreamStarted]);

	const renderInput = (
		name: keyof Inputs,
		label: string,
		example: string,
		type: string = 'text',
		isMandatory = false
	) => (
		<div key={name}>
			<Label
				htmlFor={name}
				className={cn('text-lg text-left mb-2 text-gray-600 font-normal', 'block')}
			>
				{label}
				{isMandatory && <span className="text-red-500">*</span>}
				<InfoTooltip content={`e.g., ${example}`} />
			</Label>
			<Input
				id={name}
				name={name}
				type={type}
				value={inputs[name] as string}
				onChange={handleInputChange}
				min={type === 'number' ? 0 : undefined}
				step={type === 'number' ? 1 : undefined}
			/>
		</div>
	);

	const renderTextArea = (name: keyof Inputs, label: string, example: string, isMandatory = false) => (
		<div key={name}>
			<Label
				htmlFor={name}
				className={cn('text-lg text-left mb-2 text-gray-600 font-normal', 'block')}
			>
				{label}
				{isMandatory && <span className="text-red-500">*</span>}
				<InfoTooltip content={`e.g., ${example}`} />
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
		<div className="pb-20">
			<Container>
				<H1>Create Your Teaching Philosophy</H1>
				<Paragraph>
					Articulate your educational vision with our AI-powered Teaching Philosophy Generator. This tool transforms
					your insights into a cohesive narrative that reflects your teaching experience, pedagogical approaches, and
					aspirations for student learning. Some fields are mandatory to ensure our AI has essential information to
					craft a compelling statement. While more detailed responses naturally yield a more personalized philosophy,
					our AI adapts to your input, generating a meaningful document regardless of detail level. After generation,
					you'll have the opportunity to edit and refine, ensuring it truly resonates with your teaching practice.
				</Paragraph>
				<Span className="text-xs block mt-2 italic">Items marked with * are required.</Span>
			</Container>

			<Container className="w-full mt-8">
				<Container
					className={cn(
						'space-y-2 p-4 py-8 border border-gray-200 rounded-lg mb-12',
						isFormComplete && 'border-purple-500'
					)}
				>
					<H2 className="text-lg mb-4">Your Progress</H2>
					<div className="space-y-2">
						<Progress
							value={progress}
							className="w-full transition-all duration-500 ease-in-out bg-gray-200 h-2"
						/>
						<div className="flex justify-between items-center text-sm text-gray-600">
							<span>{progress}% Complete</span>
							<span>
								{filledFieldsCount} of {mandatoryFields.length} mandatory fields filled
							</span>
						</div>
					</div>
					{isFormComplete && (
						<p className="text-sm text-purple-600 mt-2">
							Great job! You've completed all mandatory fields. Feel free to add more optional and custom fields to
							personalize your document even further.
						</p>
					)}
				</Container>

				<H2 className="text-2xl font-semibold my-6">Teaching Philosophy Details</H2>
				<Tabs
					value={activeTab}
					onValueChange={setActiveTab}
				>
					<TabsList className="grid w-full grid-cols-6 bg-transparent">
						{['basics', 'approach', 'methods', 'growth', 'reflection', 'custom'].map((tab) => (
							<TabsTrigger
								key={tab}
								value={tab}
								className={cn(
									'px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none',
									'border-b-2 border-transparent',
									'data-[state=active]:text-gray-900 data-[state=active]:border-purple-500',
									'bg-transparent !bg-transparent data-[state=active]:!bg-transparent',
									'transition-colors duration-200',
									'rounded-none'
								)}
							>
								{tab.charAt(0).toUpperCase() + tab.slice(1)}
							</TabsTrigger>
						))}
					</TabsList>
					<Container className="mt-12 pb-8 fixed-height-container">
						<TabsContent
							value="basics"
							className="space-y-8"
						>
							{renderInput('discipline', 'Academic Discipline', 'History', 'text', true)}
							{renderInput('experience', 'Years of Teaching Experience', '5', 'number', true)}
							{renderInput(
								'disciplinesTaught',
								'Disciplines Taught and Where',
								'Modern European History at XYZ University, American Civil War at ABC College'
							)}
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
									<InfoTooltip content="Select all that apply to your teaching approach" />
								</Label>
								<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
									{[
										'Lecture-based',
										'Discussion-oriented',
										'Experiential',
										'Blended / Hybrid',
										'Inquiry-based',
										'Project-based',
										'Flipped classroom',
										'Collaborative learning',
										'Problem-based learning',
										'Gamification',
										'Case study method',
										'Socratic method',
										'Differentiated instruction',
										'Peer instruction',
										'Team-based learning',
									].map((style) => (
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
							{renderTextArea(
								'inclusiveness',
								'Inclusiveness Approach',
								'I create an inclusive environment by using diverse examples, promoting equitable participation, and providing multiple ways for students to demonstrate their understanding of complex concepts.'
							)}
							<div>
								<Label
									htmlFor="teachingValues"
									className={cn('text-lg text-left mb-2 text-gray-600 font-normal', 'block')}
								>
									Teaching Values<span className="text-red-500">*</span>
									<InfoTooltip content="Select the values that are most important to your teaching philosophy" />
								</Label>
								<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
									{[
										'Critical thinking',
										'Ethical reasoning',
										'Collaboration',
										'Innovation',
										'Lifelong learning',
										'Diversity and inclusion',
										'Academic integrity',
										'Intellectual curiosity',
										'Effective communication',
										'Problem-solving',
										'Global awareness',
										'Interdisciplinary approach',
										'Analytical skills',
										'Creativity',
										'Research skills',
										'Professional development',
										'Social responsibility',
										'Adaptability',
										'Leadership',
										'Reflective practice',
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
								<Label
									htmlFor="assessmentMethods"
									className={cn('text-lg text-left mb-2 text-gray-600 font-normal', 'block')}
								>
									Assessment Methods<span className="text-red-500">*</span>
									<InfoTooltip content="Select the assessment methods you use or plan to use in your teaching" />
								</Label>
								<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
									{[
										'Research projects',
										'Presentations',
										'Peer reviews',
										'Problem-solving tasks',
										'Reflective essays',
										'Written exams',
										'Oral exams',
										'Group projects',
										'Portfolio assessments',
										'Lab reports',
										'Case study analyses',
										'Literature reviews',
										'Practical demonstrations',
										'Simulations',
										'Debates',
										'Quizzes',
										'Online discussions',
										'Field work reports',
										'Capstone projects',
										'Thesis/Dissertation',
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
								<h3 className={cn('text-lg text-left mb-2 text-gray-600 font-normal', 'block')}>Custom Fields</h3>
								<p className="text-sm text-gray-600">
									Add any additional information that you feel is important to your teaching philosophy. For example,
									you might add a field for "Desired Teaching Discipline" to specify a subject area you're interested in
									teaching at the new university.
								</p>
								{Object.entries(inputs.customFields).map(([fieldName, fieldValue]) => (
									<div
										key={fieldName}
										className="space-y-2"
									>
										<div className="flex justify-between items-center">
											<Label
												htmlFor={fieldName}
												className={cn('text-lg text-left mb-2 text-gray-600 font-normal', 'block')}
											>
												{fieldName}
											</Label>
											<Button
												type="button"
												variant="outline"
												size="sm"
												onClick={() => handleRemoveCustomField(fieldName)}
											>
												Remove
											</Button>
										</div>
										<Textarea
											id={fieldName}
											value={fieldValue}
											onChange={(e) => handleCustomFieldChange(fieldName, e.target.value)}
											className="max-h-32 min-h-[80px] w-full"
										/>
									</div>
								))}
								<div className="flex items-center space-x-2">
									<Input
										placeholder="e.g., Desired Teaching Discipline"
										value={newFieldName}
										onChange={(e) => setNewFieldName(e.target.value)}
										className="flex-grow"
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
					</Container>
				</Tabs>
				<Container className="py-8">
					<GenerateButton
						onClick={handleGenerate}
						disabled={!isFormComplete}
						isLoading={isLoading}
						documentType="Teaching Philosophy"
					/>
				</Container>
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
		</div>
	);
};

export default TeachingPhilosophyGenerator;