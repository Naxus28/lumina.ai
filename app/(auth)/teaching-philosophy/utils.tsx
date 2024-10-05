import React from 'react';
import { Textarea } from '@/components/ui/textarea';

export interface TextAreaConfig {
	label: string;
	placeholder: string;
	example: string;
	isMandatory: boolean;
}

export const textAreaConfigs: Record<string, TextAreaConfig> = {
	educationPurpose: {
		label: 'Purpose of Education',
		placeholder: 'Describe your view on the purpose of education in your field',
		example:
			'To empower students with the knowledge and skills to solve complex computational problems while fostering a deep understanding of the ethical implications of technology in society.',
		isMandatory: true,
	},
	teachingMotivation: {
		label: 'Teaching Motivation',
		placeholder: 'Explain what motivates you to teach',
		example:
			"I'm passionate about guiding students to become not just skilled programmers, but innovative problem-solvers who can adapt to the rapidly evolving field of computer science and contribute meaningfully to technological advancements.",
		isMandatory: true,
	},
	studentLearning: {
		label: 'How Students Learn Best',
		placeholder: 'Describe your understanding of how students in your field learn best',
		example:
			'Students in computer science learn best through a combination of theoretical foundations and practical, hands-on coding experiences. This includes algorithmic problem-solving, collaborative projects, and exposure to real-world software development practices.',
		isMandatory: true,
	},
	teachingGoals: {
		label: 'Teaching Goals',
		placeholder: 'List your primary teaching goals',
		example:
			"My goals are to develop students' computational thinking skills, foster creativity in problem-solving, build a strong foundation in programming principles, and instill an understanding of the societal impact of technology.",
		isMandatory: true,
	},
	effectiveMethods: {
		label: 'Effective Teaching Methods',
		placeholder: 'Describe the teaching methods you find most effective',
		example:
			'I employ a mix of interactive coding demonstrations, pair programming sessions, project-based learning, and industry-relevant case studies. These methods simulate real-world software development environments and provide immediate feedback on code implementation.',
		isMandatory: true,
	},
	inclusiveness: {
		label: 'Inclusiveness Approach',
		placeholder: 'Explain your approach to creating an inclusive learning environment',
		example:
			'I create an inclusive environment by using diverse examples in my teaching materials, promoting equitable participation in class discussions and group projects, and providing multiple ways for students to demonstrate their understanding of complex concepts.',
		isMandatory: false,
	},
	researchTeachingConnection: {
		label: 'Connection between Teaching, Research, and Service',
		placeholder: 'Describe how you connect your teaching, research, and service',
		example:
			'My research in machine learning algorithms directly informs my teaching of advanced AI courses. I involve students in cutting-edge research projects and community service initiatives that apply their programming skills to solve local issues, bridging academic learning with real-world impact.',
		isMandatory: false,
	},
	challengesInnovations: {
		label: 'Challenges and Innovations',
		placeholder: "Discuss challenges you've faced and innovations you've implemented",
		example:
			"To address the challenge of teaching rapidly evolving technologies, I've implemented a flexible curriculum that incorporates current industry trends and invited guest speakers from tech companies. I've also developed interactive online modules to support self-paced learning of foundational concepts.",
		isMandatory: false,
	},
	professionalDevelopment: {
		label: 'Professional Development',
		placeholder: 'Describe your approach to professional development',
		example:
			"I regularly attend computer science education conferences, participate in workshops on innovative teaching methods, and collaborate with colleagues to refine my teaching approach. I'm also pursuing additional certifications in emerging areas like quantum computing to stay at the forefront of the field.",
		isMandatory: false,
	},
	anecdote: {
		label: 'Memorable Teaching Anecdote',
		placeholder: 'Share a memorable teaching experience',
		example:
			'During a machine learning project, a student discovered an innovative approach to optimizing a neural network that outperformed existing methods. This led to a class-wide exploration of the algorithm, resulting in a collaborative research paper. This experience exemplified the power of fostering creativity and critical thinking in the classroom.',
		isMandatory: false,
	},
	teachingPhilosophyEvolution: {
		label: 'Evolution of Your Teaching Philosophy',
		placeholder: 'Reflect on how your teaching philosophy has evolved over time',
		example:
			'Reflect on how your teaching philosophy has evolved over time. Consider key experiences or insights that have shaped your approach to teaching and how you anticipate your philosophy might continue to develop in the future.',
		isMandatory: false,
	},
};

export const renderTextArea = (
	config: TextAreaConfig,
	value: string,
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
) => (
	<div
		key={config.label}
		className="mb-4"
	>
		<label
			htmlFor={config?.label}
			className="block text-sm font-medium text-gray-700 mb-1"
		>
			{config?.label}
		</label>
		<Textarea
			id={config?.label}
			name={config?.label}
			value={value}
			onChange={onChange}
			placeholder={config.placeholder}
			className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
		/>
	</div>
);
