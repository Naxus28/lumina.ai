import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Save, FolderOpen, Search } from 'lucide-react';
import { H2, Paragraph } from '@/app/components/typography';
import { DocumentManagementCard } from './DocumentManagementCard';
import { Section } from '@/app/layout-components/components/Section';

const features = [
	{
		icon: Save,
		title: 'Easy Document Saving',
		description: 'Save all your generated documents directly within the platform for quick access anytime, anywhere.',
	},
	{
		icon: FolderOpen,
		title: 'Organized Folders',
		description:
			'Create custom folders to organize your application materials by institution, position, or any category that suits your needs.',
	},
	{
		icon: Search,
		title: 'Quick Retrieval',
		description:
			'Easily search and find the documents you need, when you need them, saving you time and reducing stress during your job search.',
	},
];

export const DocumentManagementSection: React.FC = () => {
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
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.2,
			},
		},
	};

	return (
		<Section id="document-management" ref={ref} paddingY="6xl" bgColor="bg-white" className="text-gray-900">
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={controls}
				variants={{
					visible: { opacity: 1, y: 0 },
				}}
				transition={{ duration: 0.5 }}
			>
				<H2 className="text-center text-gray-800 mb-6">Document Management Solution</H2>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={controls}
				variants={{
					visible: { opacity: 1, y: 0 },
				}}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				<Paragraph className="text-center text-gray-700 mb-16 max-w-3xl mx-auto">
					Lumina offers a straightforward solution to manage and organize all your academic application materials in one
					place, making your job search more organized, more efficient, and stress-free.
				</Paragraph>
			</motion.div>

			<motion.div
				className="grid grid-cols-1 md:grid-cols-3 gap-8"
				variants={containerVariants}
				initial="hidden"
				animate={controls}
			>
				{features.map((feature, index) => (
					<DocumentManagementCard key={index} feature={feature} index={index} />
				))}
			</motion.div>
		</Section>
	);
};
