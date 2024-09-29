import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FileText, Clock, Sparkles, Award, BrainCircuit } from 'lucide-react';
import { H2, Paragraph } from '@/app/components/typography';
import { AdvantageCard } from './AdvantageCard';
import { Section } from '@/app/layout-components/Section';

const benefits = [
	{
		icon: Clock,
		title: 'Save Time',
		description: 'Automate the creation of application documents, freeing you to focus on your academic pursuits.',
	},
	{
		icon: FileText,
		title: 'Tailored Documents',
		description: 'Get customized CVs, cover letters, and statements for each specific position and institution.',
	},
	{
		icon: BrainCircuit,
		title: 'AI-Powered Precision',
		description: 'Leverage advanced AI Models to craft compelling narratives that showcase your achievements.',
	},
	{
		icon: Sparkles,
		title: 'Stand Out',
		description: 'Distinguish yourself in a competitive field with professionally crafted application materials.',
	},
	{
		icon: Award,
		title: 'Focus on Excellence',
		description: 'Let your research, teaching, and field contributions shine while we handle the application process.',
	},
];

export const AdvantagesSection: React.FC = () => {
	const controls = useAnimation();
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.2,
	});

	useEffect(() => {
		if (inView) {
			controls.start('visible');
		}
	}, [controls, inView]);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				delayChildren: 0,
				staggerChildren: 1.25,
			},
		},
	};

	const lineVariants = {
		hidden: { height: 0 },
		visible: {
			height: '100%',
			transition: {
				delay: 1.5,
				duration: 6.5,
				ease: [0.4, 0.3, 0.4, 0.5],
			},
		},
	};

	return (
		<Section id="why-choose-lumina" ref={ref} paddingY="6xl" bgColor="bg-gray-800" className="text-white">
			<H2 className="text-center text-[#4FD1C5] mb-6">Why Choose Lumina?</H2>

			<motion.div variants={containerVariants} initial="hidden" animate={controls}>
				<motion.div className="mb-16 text-center">
					<Paragraph className="text-gray-300 text-center max-w-3xl mx-auto mb-16">
						Recognizing the myriad demands on an academic's time, Lumina eliminates the added burden of crafting
						numerous, tailored job application materials. Whether you're applying to multiple positions or seeking that
						perfect role, Lumina ensures each application is customized to the specific requirements of the position and
						institution.
					</Paragraph>
				</motion.div>

				<div className="relative max-w-4xl mx-auto">
					<motion.div
						className="absolute left-1/2 top-[110px] w-1 bg-[#4FD1C5] transform -translate-x-1/2"
						variants={lineVariants}
					/>

					{benefits.map((benefit, index) => (
						<AdvantageCard
							key={index}
							icon={benefit.icon}
							title={benefit.title}
							description={benefit.description}
							index={index}
							isEven={index % 2 === 0}
						/>
					))}
				</div>

				<motion.div
					variants={containerVariants}
					className="mt-24 bg-[#4FD1C5] text-gray-900 p-8 rounded-lg shadow-xl max-w-3xl mx-auto relative"
				>
					<h3 className="text-2xl font-semibold mb-4">Your Brilliance, Our Focus</h3>
					<Paragraph>
						Your brilliance should shine through your research, teaching, and field contributions, not your ability to
						write applications. You've invested years perfecting your craft; we believe your focus should remain there.
					</Paragraph>
				</motion.div>
			</motion.div>
		</Section>
	);
};
