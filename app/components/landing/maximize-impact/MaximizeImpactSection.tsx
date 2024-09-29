import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap, Target, TrendingUp, ListOrdered } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { H2, Paragraph } from '@/app/components/typography';
import { FeatureCard } from './FeatureCard';
import { Section } from '@/app/layout-components/Section';

const features = [
	{
		icon: Zap,
		title: 'Instant Analysis',
		description: 'Get immediate feedback on how well your CV matches job descriptions.',
	},
	{
		icon: Target,
		title: 'Precision Matching',
		description: 'Our AI compares your skills and experience with job requirements point by point.',
	},
	{
		icon: TrendingUp,
		title: 'Improvement Suggestions',
		description: 'Receive tailored advice on how to enhance your CV for better job fit.',
	},
	{
		icon: ListOrdered,
		title: 'Ranked Matches',
		description: 'See how your CV ranks against different job descriptions, prioritizing your best fits.',
	},
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			when: 'beforeChildren',
		},
	},
};

const itemVariants = {
	hidden: { y: 20, opacity: 0 },
	visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

export const MaximizeImpactSection: React.FC = () => {
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
		<Section
			id="maximize-impact"
			ref={ref}
			paddingY="6xl"
			bgColor="bg-gray-50"
		>
			<motion.div
				initial="hidden"
				animate={controls}
				variants={containerVariants}
				className="text-center mb-12"
			>
				<motion.div variants={itemVariants}>
					<H2 className="text-gray-600 mb-6 text-center">Maximize Your Application Impact</H2>
				</motion.div>
				<motion.div variants={itemVariants}>
					<Paragraph className="text-gray-700 max-w-3xl mx-auto">
						Our AI-powered CV Analysis Tool gives you the edge in your job search by providing personalized insights and
						recommendations across multiple job opportunities.
					</Paragraph>
				</motion.div>
			</motion.div>

			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate={controls}
				className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
			>
				{features.map((feature, index) => (
					<FeatureCard
						key={index}
						feature={feature}
						variants={itemVariants}
					/>
				))}
			</motion.div>

			<motion.div
				variants={itemVariants}
				initial="hidden"
				animate={controls}
				className="text-center"
			>
				<Button
					size="lg"
					className="bg-[#4FD1C5] text-white hover:bg-[#3DB1A5]"
				>
					Try CV Analysis Now
				</Button>
			</motion.div>
		</Section>
	);
};
