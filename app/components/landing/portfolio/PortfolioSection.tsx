import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FileText, BookType, SquarePen, Users, BookOpenText } from 'lucide-react';
import { H2, Paragraph } from '@/app/components/typography';
import { PortfolioItem } from './PortfolioItem';

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

export function PortfolioSection() {
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

	const containerVariants = {
		hidden: {},
		visible: {
			transition: {
				delayChildren: 0.4,
				staggerChildren: 0.4,
			},
		},
	};

	return (
		<section id="portfolio" className="py-32 bg-gray-50 overflow-hidden" ref={ref}>
			<div className="container mx-auto px-4">
				<H2 className="text-center text-gray-800 mb-6">Craft Your Complete Academic Portfolio</H2>
				<Paragraph className="text-center text-gray-900 mb-12 max-w-3xl mx-auto">
					Lumina empowers you to create a comprehensive academic portfolio, tailored to your field and career stage. Our
					AI-driven platform helps you develop a suite of professional documents that showcase your unique
					qualifications and potential.
				</Paragraph>

				<div className="relative">
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="w-1/2 h-1/2 bg-[#4FD1C5] opacity-10 rounded-full filter blur-3xl"></div>
					</div>

					<motion.div
						className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 relative z-10"
						variants={containerVariants}
						initial="hidden"
						animate={controls}
					>
						{documentTypes.map((doc, index) => (
							<div key={index} className="w-full">
								<PortfolioItem icon={doc.icon} title={doc.title} description={doc.description} />
							</div>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
