import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface Feature {
	icon: LucideIcon;
	title: string;
	description: string;
}

interface DocumentManagementCardProps {
	feature: Feature;
	index: number;
}

export const DocumentManagementCard: React.FC<DocumentManagementCardProps> = ({ feature, index }) => {
	return (
		<motion.div
			className="bg-white p-8 rounded-lg shadow-lg"
			variants={{
				hidden: { opacity: 0, y: 50 },
				visible: { opacity: 1, y: 0 },
			}}
			transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
		>
			<div className="flex items-center mb-4">
				<div className="bg-[#4FD1C5] p-3 rounded-full mr-4">
					<feature.icon className="w-6 h-6 text-white" />
				</div>
				<h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
			</div>
			<p className="text-gray-700">{feature.description}</p>
		</motion.div>
	);
};
