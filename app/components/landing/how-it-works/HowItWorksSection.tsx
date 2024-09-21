import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FileText, MonitorCog, Edit } from 'lucide-react';
import { StepItem } from './StepItem';
import { H2, Paragraph } from '@/app/components/typography';

const steps = [
	{
		icon: FileText,
		title: '1. Input Your Information',
		description: 'Provide your academic background, research, and teaching experiences through our user-friendly interface.',
	},
	{
		icon: MonitorCog,
		title: '2. AI Generates Documents',
		description: 'Our AI crafts tailored CVs, cover letters, research statements, and teaching philosophies based on your input.',
	},
	{
		icon: Edit,
		title: '3. Review and Refine',
		description: 'Easily review, edit, and perfect your documents with our intuitive editing tools and AI suggestions.',
	},
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			delayChildren: 0.8,
			staggerChildren: 1.4,
		},
	},
};

export const HowItWorksSection: React.FC = () => {
	const controls = useAnimation();
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.2,
	});

	React.useEffect(() => {
		if (inView) {
			controls.start('visible');
		}
	}, [controls, inView]);

	return (
		<section
			className="py-20 bg-[#f8fafc]"
			id="how-it-works"
			ref={ref}
		>
			<div className="container mx-auto px-4">
				<H2 className="text-center text-gray-900 mb-6">How It Works</H2>
				<Paragraph className="text-xl text-gray-700 text-center max-w-3xl mx-auto mb-16">Lumina provides a clear and easy, step-by-step approach to creating your application materials, making the academic job application process fast, smooth, and efficient.</Paragraph>

				<motion.div
					className="flex flex-col md:flex-row justify-between items-start max-w-5xl mx-auto"
					variants={containerVariants}
					initial="hidden"
					animate={controls}
				>
					{steps.map((step, index) => (
						<StepItem
							key={index}
							icon={step.icon}
							title={step.title}
							description={step.description}
						/>
					))}
				</motion.div>
			</div>
		</section>
	);
};
