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
import { useProgressCalculator } from '@/app/hooks/useProgressCalculator';
import { LabeledTextarea } from '@/app/components/LabeledTextarea';
import { LabeledInput } from '@/app/components/LabeledInput';
import { Info } from 'lucide-react';
import { DownloadPdfButton } from '@/app/components/DownloadPdfButton';

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
	const [newFieldName, setNewFieldName] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isGenerationComplete, setIsGenerationComplete] = useState(false);
	const [generatedPhilosophy, setGeneratedPhilosophy] = useState('');
	const [error, setError] = useState<string | null>(null);
	const resultDisplayRef = useRef<HTMLDivElement>(null);
	const [isStreamStarted, setIsStreamStarted] = useState(false);

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
	] as const;

	const inputConfigs = [
		{
			name: 'discipline',
			label: 'Academic Discipline',
			example: 'History',
			type: 'text',
			isMandatory: true,
		},
		{
			name: 'experience',
			label: 'Years of Teaching Experience',
			example: '5',
			type: 'number',
			isMandatory: true,
		},
		{
			name: 'disciplinesTaught',
			label: 'Disciplines Taught and Where',
			example: 'Modern European History at XYZ University, American Civil War at ABC College',
			type: 'text',
			isMandatory: false,
		},
	] as const;

	const approachTextAreaConfigs = [
		{
			name: 'studentLearning',
			label: 'How Students Learn Best',
			example:
				'Students learn best through a combination of theoretical foundations and practical applications, including engaging discussions, hands-on activities, and real-world case studies.',
			isMandatory: true,
		},
		{
			name: 'teachingGoals',
			label: 'Teaching Goals',
			example:
				"My goals are to develop students' critical thinking skills, foster creativity in problem-solving, build a strong foundation in core principles, and instill an understanding of the broader implications of their field.",
			isMandatory: true,
		},
	] as const;

	const methodsTextAreaConfigs = [
		{
			name: 'effectiveMethods',
			label: 'Effective Teaching Methods',
			example:
				'I employ a mix of interactive lectures, group discussions, project-based learning, and field-specific case studies. These methods encourage active engagement and provide opportunities for practical application of concepts.',
			isMandatory: true,
		},
		{
			name: 'inclusiveness',
			label: 'Inclusiveness Approach',
			example:
				'I create an inclusive environment by using diverse examples, promoting equitable participation, and providing multiple ways for students to demonstrate their understanding of complex concepts.',
			isMandatory: false,
		},
	] as const;

	const growthTextAreaConfigs = [
		{
			name: 'researchTeachingConnection',
			label: 'Connection between Teaching, Research, and Service',
			example:
				'My research informs my teaching by providing current insights and methodologies. I involve students in research projects and community service initiatives that apply their skills to real-world issues, bridging academic learning with practical impact.',
			isMandatory: false,
		},
		{
			name: 'challengesInnovations',
			label: 'Challenges and Innovations',
			example:
				"To address evolving educational needs, I've implemented a flexible curriculum that incorporates current trends and invited guest speakers from relevant industries. I've also developed interactive online modules to support self-paced learning of foundational concepts.",
			isMandatory: false,
		},
		{
			name: 'professionalDevelopment',
			label: 'Professional Development',
			example:
				"I regularly attend educational conferences, participate in workshops on innovative teaching methods, and collaborate with colleagues to refine my teaching approach. I'm also pursuing additional certifications to stay at the forefront of my field.",
			isMandatory: false,
		},
	] as const;

	const reflectionTextAreaConfigs = [
		{
			name: 'anecdote',
			label: 'Memorable Teaching Anecdote',
			example:
				'In my Research Methods course, a student proposed using social media analysis for data collection, challenging our traditional survey methods. This sparked a class-wide debate on research ethics and data validity. The discussion led to a student-organized workshop exploring new techniques, and ultimately resulted in a collaborative paper presented at a conference. This experience showcased how encouraging critical thinking and innovation in the classroom can lead to meaningful contributions to our field.',
			isMandatory: false,
		},
		{
			name: 'studentAccomplishment',
			label: 'Student Accomplishment',
			example:
				"A shy student, initially hesitant to participate, flourished through our course's scaffolded discussion techniques and small group activities. Gradually exposed to low-stakes presentations and peer feedback sessions, they built confidence over the semester. By the end, they voluntarily led a class debate, articulating complex ideas with clarity and engaging peers in thoughtful dialogue. This transformation highlighted how our structured approach to building communication skills can empower students to overcome personal barriers and excel academically.",
			isMandatory: false,
		},
		{
			name: 'teachingPhilosophyEvolution',
			label: 'Evolution of Your Teaching Philosophy',
			example:
				"When I started teaching, I focused primarily on content delivery. However, after observing increased student engagement during group projects, I've shifted towards a more collaborative, problem-based approach. This evolution has led to deeper learning outcomes. Looking ahead, I'm excited to incorporate more technology-enhanced learning methods to further boost student interaction and real-world application of concepts.",
			isMandatory: false,
		},
	] as const;

	const primaryTeachingStyleCheckboxes = [
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
	] as const;

	const teachingValuesCheckboxes = [
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
	] as const;

	const assessmentMethodsCheckboxes = [
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
	] as const;

	const { progress, filledFieldsCount, isFormComplete } = useProgressCalculator({
		inputs,
		mandatoryFields: mandatoryFields as unknown as (keyof Inputs)[],
	});

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
		setIsGenerationComplete(false);
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

	useEffect(() => {
		if (isStreamStarted && resultDisplayRef.current) {
			resultDisplayRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}, [isStreamStarted]);

	const customFieldsTooltipContent = `Enhance your teaching philosophy with additional, personalized information. Consider adding fields such as:

1. "Personal Values": Describe how your moral compass influences your teaching approach.
2. "Desired Teaching Discipline": Specify subject areas you're passionate about teaching.
3. "Interdisciplinary Connections": Explain how you integrate knowledge from various fields.
4. "Technology Integration": Discuss your approach to incorporating technology in education.
5. "Mentorship Philosophy": Share your views on guiding and supporting students beyond the classroom.

Choose fields that best complement your unique perspective and aspirations as an educator.`;

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
							{inputConfigs.map((config) => (
								<LabeledInput
									key={config.name}
									name={config.name}
									label={config.label}
									value={String(inputs[config.name as keyof typeof inputs])}
									onChange={handleInputChange}
									isMandatory={config.isMandatory}
									tooltipContent={`e.g., ${config.example}`}
									type={config.type}
								/>
							))}
							<LabeledTextarea
								name="educationPurpose"
								label="Purpose of Education"
								value={inputs.educationPurpose}
								onChange={handleInputChange}
								isMandatory={true}
								tooltipContent="e.g., To cultivate critical thinking and foster a deep understanding of the subject matter, enabling students to apply their knowledge to real-world challenges."
							/>
							<LabeledTextarea
								name="teachingMotivation"
								label="Teaching Motivation"
								value={inputs.teachingMotivation}
								onChange={handleInputChange}
								isMandatory={true}
								tooltipContent="e.g., I'm driven by the opportunity to inspire curiosity and facilitate intellectual growth, guiding students to become lifelong learners and contributors in their chosen fields."
							/>
						</TabsContent>
						<TabsContent
							value="approach"
							className="space-y-8"
						>
							{approachTextAreaConfigs.map((config) => (
								<LabeledTextarea
									key={config.name}
									name={config.name}
									label={config.label}
									value={String(inputs[config.name as keyof typeof inputs])}
									onChange={handleInputChange}
									isMandatory={config.isMandatory}
									tooltipContent={`e.g., ${config.example}`}
								/>
							))}
							<div>
								<Label
									htmlFor="teachingStyles"
									className={cn('text-lg text-left mb-2 text-gray-600 font-normal', 'block')}
								>
									Primary Teaching Style<span className="text-red-500">*</span>
									<InfoTooltip content="Select teaching styles that define your unique approach. Focus on methods you consistently employ and find most effective in engaging students and facilitating learning." />
								</Label>
								<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
									{primaryTeachingStyleCheckboxes.map((style) => (
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
							{methodsTextAreaConfigs.map((config) => (
								<LabeledTextarea
									key={config.name}
									name={config.name}
									label={config.label}
									value={String(inputs[config.name as keyof typeof inputs])}
									onChange={handleInputChange}
									isMandatory={config.isMandatory}
									tooltipContent={`e.g., ${config.example}`}
								/>
							))}
							<div>
								<Label
									htmlFor="teachingValues"
									className={cn('text-lg text-left mb-2 text-gray-600 font-normal', 'block')}
								>
									Teaching Values<span className="text-red-500">*</span>
									<InfoTooltip content="Identify the core values that genuinely shape your teaching approach. Focus on those that consistently guide your decisions and actions in the classroom, reflecting the essence of your educational philosophy." />
								</Label>
								<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
									{teachingValuesCheckboxes.map((value) => (
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
									<InfoTooltip content="Choose assessment methods that you've successfully implemented or plan to prioritize. Focus on approaches that best reflect your teaching philosophy and have proven effective in your experience." />
								</Label>
								<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
									{assessmentMethodsCheckboxes.map((method) => (
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
							{growthTextAreaConfigs.map((config) => (
								<LabeledTextarea
									key={config.name}
									name={config.name}
									label={config.label}
									value={String(inputs[config.name as keyof typeof inputs])}
									onChange={handleInputChange}
									isMandatory={config.isMandatory}
									tooltipContent={`e.g., ${config.example}`}
								/>
							))}
						</TabsContent>
						<TabsContent
							value="reflection"
							className="space-y-8"
						>
							{reflectionTextAreaConfigs.map((config) => (
								<LabeledTextarea
									key={config.name}
									name={config.name}
									label={config.label}
									value={String(inputs[config.name as keyof typeof inputs])}
									onChange={handleInputChange}
									isMandatory={config.isMandatory}
									tooltipContent={`e.g., ${config.example}`}
								/>
							))}
						</TabsContent>
						<TabsContent
							value="custom"
							className="space-y-8"
						>
							<div>
								<h3 className={cn('text-lg text-left mb-2 text-gray-600 font-normal', 'block')}>
									Custom Fields
									<InfoTooltip
										content={customFieldsTooltipContent}
										icon={<Info className="inline-block w-4 h-4 ml-2 text-gray-500" />}
									/>
								</h3>
								{Object.entries(inputs.customFields).map(([fieldName, fieldValue]) => (
									<div key={fieldName}>
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
											className="mb-6 max-h-32 min-h-[80px] w-full"
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
						isGenerationComplete={isGenerationComplete}
					/>
				</div>
			)}
			{isGenerationComplete && (
				<DownloadPdfButton
					content={generatedPhilosophy}
					fileName="teaching_philosophy.pdf"
				/>
			)}
		</div>
	);
};

export default TeachingPhilosophyGenerator;
