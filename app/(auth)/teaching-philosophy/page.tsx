'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const InfoIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="inline-block ml-2 text-gray-500"
	>
		<circle
			cx="12"
			cy="12"
			r="10"
		></circle>
		<line
			x1="12"
			y1="16"
			x2="12"
			y2="12"
		></line>
		<line
			x1="12"
			y1="8"
			x2="12.01"
			y2="8"
		></line>
	</svg>
);

const InfoTooltip = ({ content }: { content: string }) => (
	<TooltipProvider>
		<Tooltip>
			<TooltipTrigger asChild>
				<span>
					<InfoIcon />
				</span>
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
		console.log('Generating teaching philosophy...');
	};

	return (
		<Card className="w-full max-w-3xl mx-auto">
			<CardHeader>
				<CardTitle className="text-2xl font-bold text-center">Create Your Teaching Philosophy</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				{/* Text Inputs */}
				<div className="space-y-4">
					<div>
						<Label htmlFor="discipline">
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
					<div>
						<Label htmlFor="experience">
							Years of Teaching Experience
							<InfoTooltip content="E.g., 7 years, including 3 years as a teaching assistant and 4 years as a lecturer" />
						</Label>
						<Input
							id="experience"
							name="experience"
							type="number"
							value={inputs.experience}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				{/* Textareas */}
				<div className="space-y-4">
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
						<div key={name}>
							<Label htmlFor={name}>
								{label}
								<InfoTooltip content={example} />
							</Label>
							<Textarea
								id={name}
								name={name as keyof typeof inputs}
								value={inputs[name as keyof typeof inputs]}
								onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleInputChange(e)}
								rows={3}
							/>
						</div>
					))}
				</div>

				{/* Multiple Choice (Checkboxes) */}
				<div className="space-y-4">
					<div>
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
						<Label>
							Assessment Methods
							<InfoTooltip content="Choose the methods you use to evaluate student learning and progress." />
						</Label>
						<div className="space-y-2">
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
				</div>

				{/* Single Choice (Radio Buttons) */}
				<div>
					<Label>
						Primary Teaching Style
						<InfoTooltip content="Select the teaching style that best describes your overall approach." />
					</Label>
					<RadioGroup
						onValueChange={(value) => setInputs((prev) => ({ ...prev, teachingStyle: value }))}
						value={inputs.teachingStyle}
					>
						<div className="flex items-center space-x-2">
							<RadioGroupItem
								value="lecture"
								id="r1"
							/>
							<Label htmlFor="r1">Lecture-based</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem
								value="discussion"
								id="r2"
							/>
							<Label htmlFor="r2">Discussion-oriented</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem
								value="hands-on"
								id="r3"
							/>
							<Label htmlFor="r3">Hands-on / Practical</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem
								value="blended"
								id="r4"
							/>
							<Label htmlFor="r4">Blended / Hybrid</Label>
						</div>
					</RadioGroup>
				</div>

				<Button
					onClick={handleGenerate}
					className="w-full"
				>
					Generate Teaching Philosophy
				</Button>
			</CardContent>
		</Card>
	);
};

export default TeachingPhilosophyGenerator;
