import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FileText, Clock, Sparkles, Award, BrainCircuit } from 'lucide-react';

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
		description: 'Leverage advanced Large Language Models (LLMs) to craft compelling narratives that showcase your achievements.',
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

export const FeaturesSection: React.FC = () => {
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
				delayChildren: 0.6,
				staggerChildren: 0.6,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
		},
	};

	return (
		<section
			ref={ref}
			className="py-20 bg-gray-50"
		>
			<div className="container mx-auto px-4">
				<h2 className="text-4xl font-bold text-center text-[#4FD1C5] mb-12">Why Choose Lumina?</h2>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate={controls}
				>
					<motion.div
						variants={itemVariants}
						className="mb-16 text-center"
					>
						<p className="text-xl text-gray-700 max-w-3xl mx-auto">Recognizing the myriad demands on an academic's time, Lumina eliminates the added burden of crafting numerous, tailored job application materials. Whether you're applying to multiple positions or seeking that perfect role, Lumina ensures each application is customized to the specific requirements of the position and institution.</p>
					</motion.div>

					<div className="relative max-w-4xl mx-auto">
						<div className="absolute left-1/2 top-[92px] -bottom-24 w-1 bg-[#4FD1C5] transform -translate-x-1/2"></div>

						{benefits.map((benefit, index) => (
							<motion.div
								key={index}
								variants={itemVariants}
								className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
							>
								<div className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
									<h3 className={`text-2xl font-semibold mb-2 ${index % 2 === 0 ? 'text-right' : 'text-left'} text-[#4FD1C5]`}>{benefit.title}</h3>
									<div className="bg-white p-6 rounded-lg shadow-lg">
										<p className="text-gray-700 font-medium text-left">{benefit.description}</p>
									</div>
								</div>
								<div className="w-16 h-16 rounded-full bg-white border-4 border-[#4FD1C5] z-10 flex items-center justify-center flex-shrink-0">
									<benefit.icon className="w-8 h-8 text-[#4FD1C5]" />
								</div>
								<div className="w-1/2"></div>
							</motion.div>
						))}
					</div>

					<motion.div
						variants={itemVariants}
						className="mt-24 bg-[#4FD1C5] text-white p-8 rounded-lg shadow-xl max-w-3xl mx-auto relative"
					>
						{/* <div className="absolute left-1/2 top-0 w-1 bg-[#4FD1C5] h-24 -translate-x-1/2 -translate-y-full"></div> */}
						<h3 className="text-2xl font-semibold mb-4">Your Brilliance, Our Focus</h3>
						<p className="text-lg">Your brilliance should shine through your research, teaching, and field contributions, not your ability to write applications. You've invested years perfecting your craft; we believe your focus should remain there.</p>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};
