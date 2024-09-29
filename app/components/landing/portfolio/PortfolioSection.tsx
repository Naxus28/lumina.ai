import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FileText, BookType, SquarePen, Users, BookOpenText } from 'lucide-react';
import { H2, Paragraph } from '@/app/components/typography';
import { PortfolioItem } from './PortfolioItem';
import { Section } from '@/app/layout-components/Section';

const documentTypes = [
	{
		icon: FileText,
		title: 'CVs & Resumes',
		description:
			'Tailored academic CVs and professional resumes that highlight your unique qualifications and achievements.',
	},
	{
		icon: SquarePen,
		title: 'Cover Letters',
		description: 'Compelling cover letters for academic positions that showcase your passion and fit for the role.',
	},
	{
		icon: BookOpenText,
		title: 'Research Statements',
		description: 'In-depth research statements highlighting your work, methodologies, and future directions.',
	},
	{
		icon: BookType,
		title: 'Teaching Philosophies',
		description: 'Articulate teaching philosophy statements that reflect your educational approach and values.',
	},
	{
		icon: Users,
		title: 'Diversity Statements',
		description:
			'Thoughtful diversity statements that demonstrate your commitment to inclusivity and equity in academia.',
	},
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			delayChildren: 0.3,
			staggerChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { x: 100, opacity: 0 },
	visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 20 } },
};

export function PortfolioSection() {
	const controls = useAnimation();
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	React.useEffect(() => {
		if (inView) {
			controls.start('visible');
		}
	}, [controls, inView]);

	return (
		<Section
			id="portfolio"
			ref={ref}
			paddingY="6xl"
			bgColor="bg-white"
			className="overflow-hidden"
		>
			<H2 className="text-center text-gray-800 mb-6">Craft a Complete Academic Portfolio</H2>
			<Paragraph className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
				Lumina empowers you to create a comprehensive academic portfolio, tailored to your field and career stage. Our
				AI-driven platform helps you develop a suite of professional documents that showcase your unique qualifications
				and potential.
			</Paragraph>

			<motion.div
				className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
				variants={containerVariants}
				initial="hidden"
				animate={controls}
			>
				{documentTypes.map((doc, index) => (
					<motion.div
						key={index}
						variants={itemVariants}
					>
						<PortfolioItem
							icon={doc.icon}
							title={doc.title}
							description={doc.description}
						/>
					</motion.div>
				))}
			</motion.div>
		</Section>
	);
}
