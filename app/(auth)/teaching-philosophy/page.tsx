'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Container } from '@/app/layout-components/Container';
import { PageContent } from '@/app/layout-components/PageContent';
import { H1, H2, Paragraph } from '@/app/components/typography';
import { InfoTooltip } from '@/app/components/InfoTooltip';
import { GenerateButton } from '@/app/components/GenerateButton';
import { cn } from '@/lib/utils';

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

const checkboxStyle = {
	backgroundColor: '#e5e7eb', // Tailwind's gray-200
	borderColor: '#d1d5db', // Tailwind's gray-300
	color: '#7c3aed', // Tailwind's purple-600
	'&:hover': {
		backgroundColor: '#d1d5db', // Tailwind's gray-300
	},
	'&:focus': {
		boxShadow: '0 0 0 2px rgba(124, 58, 237, 0.5)', // Tailwind's purple-500 with opacity
	},
};

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
			[name]: (prev[name as keyof typeof prev] as string[]).includes(value)
				? (prev[name as keyof typeof prev] as string[]).filter((item) => item !== value)
				: [...(prev[name as keyof typeof prev] as string[]), value],
		}));
	};

	const handleGenerate = () => {
		setIsLoading(true);
		console.log('Generating teaching philosophy...');
		// Add your generation logic here
		setTimeout(() => setIsLoading(false), 2000); // Simulating API call
	};

	const isFormValid = () => {
		// Add your form validation logic here
		return inputs.discipline !== '' && inputs.experience !== '';
	};

	return (
		<div className="min-h-screen bg-gray-50 w-full">
			<main>
				<Container>
					<H1>Create Your Teaching Philosophy</H1>
					<Paragraph>
						Craft a compelling teaching philosophy that showcases your approach to education, your values as an
						educator, and your vision for student learning.
					</Paragraph>
				</Container>

				<Container>
					<H2 className="text-lg">Basic Information</H2>
					<div className="space-y-6">
						<div className="space-y-2">
							<Label
								htmlFor="discipline"
								className="text-gray-600"
							>
								Academic Discipline
								<InfoTooltip content="E.g., Computer Science, focusing on artificial intelligence and machine learning" />
							</Label>
							<Input
								id="discipline"
								name="discipline"
								value={inputs.discipline}
								onChange={handleInputChange}
							/>
						</div>
						<div className="space-y-2">
							<Label
								htmlFor="experience"
								className="text-gray-600"
							>
								Years of Teaching Experience
								<InfoTooltip content="E.g., 7 years, including 3 years as a teaching assistant and 4 years as a lecturer" />
							</Label>
							<Input
								id="experience"
								name="experience"
								type="number"
								min="0" // Add this line to prevent negative numbers
								value={inputs.experience}
								onChange={handleInputChange}
							/>
						</div>
					</div>
				</Container>

				<Container>
					<H2 className="text-lg">Philosophy Details</H2>
					<div className="space-y-8">
						{[
							{
								name: 'educationPurpose',
								label: 'Purpose of Education',
								example:
									'To empower students with the knowledge and skills to solve complex computational problems while fostering a deep understanding of the ethical implications of technology in society.',
							},
							{
								name: 'teachingMotivation',
								label: 'Teaching Motivation',
								example:
									"I'm passionate about guiding students to become not just skilled programmers, but innovative problem-solvers who can adapt to the rapidly evolving field of computer science and contribute meaningfully to technological advancements.",
							},
							{
								name: 'studentLearning',
								label: 'How Students Learn Best',
								example:
									'Students in computer science learn best through a combination of theoretical foundations and practical, hands-on coding experiences. This includes algorithmic problem-solving, collaborative projects, and exposure to real-world software development practices.',
							},
							{
								name: 'teachingGoals',
								label: 'Teaching Goals',
								example:
									"My goals are to develop students' computational thinking skills, foster creativity in problem-solving, build a strong foundation in programming principles, and instill an understanding of the societal impact of technology.",
							},
							{
								name: 'effectiveMethods',
								label: 'Effective Teaching Methods',
								example:
									'I employ a mix of interactive coding demonstrations, pair programming sessions, project-based learning, and industry-relevant case studies. These methods simulate real-world software development environments and provide immediate feedback on code implementation.',
							},
							{
								name: 'inclusiveness',
								label: 'Inclusiveness Approach',
								example:
									'I create an inclusive environment by using diverse examples in my teaching materials, promoting equitable participation in class discussions and group projects, and providing multiple ways for students to demonstrate their understanding of complex concepts.',
							},
							{
								name: 'researchTeachingConnection',
								label: 'Connection between Teaching, Research, and Service',
								example:
									'My research in machine learning algorithms directly informs my teaching of advanced AI courses. I involve students in cutting-edge research projects and community service initiatives that apply their programming skills to solve local issues, bridging academic learning with real-world impact.',
							},
							{
								name: 'challengesInnovations',
								label: 'Challenges and Innovations',
								example:
									"To address the challenge of teaching rapidly evolving technologies, I've implemented a flexible curriculum that incorporates current industry trends and invited guest speakers from tech companies. I've also developed interactive online modules to support self-paced learning of foundational concepts.",
							},
							{
								name: 'professionalDevelopment',
								label: 'Professional Development',
								example:
									"I regularly attend computer science education conferences, participate in workshops on innovative teaching methods, and collaborate with colleagues to refine my teaching approach. I'm also pursuing additional certifications in emerging areas like quantum computing to stay at the forefront of the field.",
							},
							{
								name: 'anecdote',
								label: 'Memorable Teaching Anecdote',
								example:
									'During a machine learning project, a student discovered an innovative approach to optimizing a neural network that outperformed existing methods. This led to a class-wide exploration of the algorithm, resulting in a collaborative research paper. This experience exemplified the power of fostering creativity and critical thinking in the classroom.',
							},
						].map(({ name, label, example }) => (
							<div
								key={name}
								className="space-y-2"
							>
								<Label
									htmlFor={name}
									className="text-gray-600"
								>
									{label}
									<InfoTooltip content={example} />
								</Label>
								<Textarea
									id={name}
									name={name as keyof typeof inputs}
									value={inputs[name as keyof typeof inputs]}
									onChange={handleInputChange}
									className="min-h-[128px] max-h-[256px] w-full p-4 border-gray-300 rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
									rows={3}
								/>
							</div>
						))}
					</div>
				</Container>

				<Container>
					<H2 className="text-lg">Teaching Values and Methods</H2>
					<div className="space-y-6">
						<div className="space-y-2">
							<Label>
								Teaching Values
								<InfoTooltip content="Select the core values that guide your teaching philosophy and approach." />
							</Label>
							<div className="space-y-2">
								{['Critical thinking', 'Technological ethics', 'Collaboration', 'Innovation', 'Lifelong learning'].map(
									(value) => (
										<div
											key={value}
											className="flex items-center"
										>
											<Checkbox
												id={`value-${value}`}
												checked={inputs.teachingValues.includes(value)}
												onCheckedChange={(checked) => handleCheckboxChange('teachingValues', value)}
												style={checkboxStyle}
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
						<div className="space-y-2">
							<Label>
								Assessment Methods
								<InfoTooltip content="Choose the methods you use to evaluate student learning and progress." />
							</Label>
							<div className="space-y-2">
								{[
									'Projects and assignments',
									'Oral presentations',
									'Peer evaluations',
									'Written exams',
									'Research papers',
									'Class participation',
									'Practical demonstrations',
									'Portfolio assessments',
									'Group work',
									'Reflective journals'
								].map((method) => (
									<div
										key={method}
										className="flex items-center"
									>
										<Checkbox
											id={`assessment-${method}`}
											checked={inputs.assessmentMethods.includes(method)}
											onCheckedChange={(checked) => handleCheckboxChange('assessmentMethods', method)}
											style={checkboxStyle}
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
					</div>
				</Container>

				<Container>
					<H2 className="text-lg">Teaching Style</H2>
					<div className="space-y-2">
						<Label>
							Primary Teaching Style
							<InfoTooltip content="Select the teaching style that best describes your overall approach." />
						</Label>
						<RadioGroup
							onValueChange={(value) => setInputs((prev) => ({ ...prev, teachingStyle: value }))}
							value={inputs.teachingStyle}
						>
							{['Lecture-based', 'Discussion-oriented', 'Hands-on / Practical', 'Blended / Hybrid'].map(
								(style, index) => (
									<div
										key={style}
										className="flex items-center space-x-2"
									>
										<RadioGroupItem
											value={style.toLowerCase()}
											id={`r${index + 1}`}
											className={cn(
												"border-gray-300 text-purple-600 focus:ring-purple-500",
												"bg-gray-200 hover:bg-gray-300"
											)}
										/>
										<Label
											htmlFor={`r${index + 1}`}
											className="text-gray-600"
										>
											{style}
										</Label>
									</div>
								)
							)}
						</RadioGroup>
					</div>
				</Container>

				<Container>
					<GenerateButton
						onClick={handleGenerate}
						disabled={!isFormValid()}
						isLoading={isLoading}
						documentType="Teaching Philosophy"
					/>
				</Container>
			</main>
		</div>
	);
};

export default TeachingPhilosophyGenerator;