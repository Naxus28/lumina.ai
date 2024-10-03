import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Container } from '@/app/layout-components/Container';
import { H2 } from '@/app/components/typography';
import { InfoTooltip } from '@/app/components/InfoTooltip';

interface PhilosophyDetailsProps {
	inputs: Record<string, string>;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	addCustomField: (fieldName: string) => void;
	customFields: string[];
}

const philosophyFields = [
	{
		name: 'educationPurpose',
		label: 'Purpose of Education*',
		example:
			'e.g., To empower students with critical thinking skills and subject-specific knowledge, fostering their ability to contribute meaningfully to their field and society at large.',
	},
	{
		name: 'teachingMotivation',
		label: 'Teaching Motivation*',
		example:
			"e.g., I'm passionate about inspiring students to become lifelong learners, helping them develop the skills and mindset needed to tackle complex challenges in their future careers and personal lives.",
	},
	{
		name: 'studentLearning',
		label: 'How Students Learn Best*',
		example:
			'e.g., Students learn best through a combination of theoretical foundations and practical applications, including collaborative projects, hands-on experiences, and exposure to real-world scenarios in the field.',
	},
	{
		name: 'teachingGoals',
		label: 'Teaching Goals*',
		example:
			"e.g., My goals are to develop students' critical thinking and problem-solving skills, foster creativity and innovation, build a strong foundation in core principles, and instill an understanding of the ethical implications in our field.",
	},
	{
		name: 'effectiveMethods',
		label: 'Effective Teaching Methods*',
		example:
			'e.g., I employ a mix of interactive lectures, group discussions, project-based learning, and case studies. These methods encourage active participation and provide opportunities for practical application of concepts.',
	},
	{
		name: 'inclusiveness',
		label: 'Inclusiveness Approach',
		example:
			'e.g., I create an inclusive environment by using diverse examples in my teaching materials, promoting equitable participation in class discussions, and providing multiple ways for students to demonstrate their understanding of complex concepts.',
	},
	{
		name: 'researchTeachingConnection',
		label: 'Connection between Teaching, Research, and Service',
		example:
			'e.g., My research directly informs my teaching of advanced topics. I involve students in research projects and community service initiatives that apply their skills to real-world problems, bridging academic learning with practical impact.',
	},
	{
		name: 'challengesInnovations',
		label: 'Challenges and Innovations',
		example:
			"e.g., To address the challenge of keeping course content current, I've implemented a flexible curriculum that incorporates recent developments in the field and invited guest speakers from industry. I've also developed interactive online modules to support self-paced learning of foundational concepts.",
	},
	{
		name: 'professionalDevelopment',
		label: 'Professional Development',
		example:
			"e.g., I regularly attend educational conferences in my field, participate in workshops on innovative teaching methods, and collaborate with colleagues to refine my teaching approach. I'm also pursuing additional certifications in emerging areas to stay at the forefront of the field.",
	},
	{
		name: 'anecdote',
		label: 'Memorable Teaching Anecdote',
		example:
			'e.g., During a group project, students from diverse backgrounds collaborated to solve a complex problem, leading to an innovative solution that was later presented at a student conference. This experience highlighted the power of diverse perspectives and collaborative learning in fostering creativity and critical thinking.',
	},
];

export const PhilosophyDetails: React.FC<PhilosophyDetailsProps> = ({
	inputs,
	handleInputChange,
	addCustomField,
	customFields,
}) => {
	const [newFieldName, setNewFieldName] = useState('');

	const handleAddField = () => {
		if (newFieldName.trim()) {
			addCustomField(newFieldName.trim());
			setNewFieldName('');
		}
	};

	return (
		<Container paddingX="none">
			<H2 className="text-lg">Philosophy Details</H2>
			<div className="space-y-8">
				{philosophyFields.map(({ name, label, example }) => (
					<div
						key={name}
						className="space-y-2"
					>
						<Label
							htmlFor={name}
							className="text-gray-600 flex items-center"
						>
							{label}
							<InfoTooltip content={example} />
						</Label>
						<Textarea
							id={name}
							name={name}
							value={inputs[name]}
							onChange={handleInputChange}
							className="min-h-[128px] max-h-[256px] w-full p-4 border-gray-300 rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
							rows={3}
							required={
								name === 'educationPurpose' ||
								name === 'teachingMotivation' ||
								name === 'studentLearning' ||
								name === 'teachingGoals' ||
								name === 'effectiveMethods'
							}
						/>
					</div>
				))}
				{customFields.map((fieldName) => (
					<div
						key={fieldName}
						className="space-y-2"
					>
						<Label
							htmlFor={fieldName}
							className="text-gray-600"
						>
							{fieldName}
						</Label>
						<Textarea
							id={fieldName}
							name={fieldName}
							value={inputs[fieldName] || ''}
							onChange={handleInputChange}
							className="min-h-[128px] max-h-[256px] w-full p-4 border-gray-300 rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
							rows={3}
						/>
					</div>
				))}
				<div className="flex space-x-2">
					<Input
						value={newFieldName}
						onChange={(e) => setNewFieldName(e.target.value)}
						placeholder="New field name"
						className="flex-grow"
					/>
					<Button
						onClick={handleAddField}
						disabled={!newFieldName.trim()}
					>
						Add Field
					</Button>
				</div>
			</div>
		</Container>
	);
};
