import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface PortfolioItemProps {
	icon: LucideIcon;
	title: string;
	description: string;
}

const itemVariants = {
	hidden: { x: 100, opacity: 0 },
	visible: {
		x: 0,
		opacity: 1,
		transition: {
			type: 'spring',
			stiffness: 100,
			damping: 20,
			duration: 0.3,
		},
	},
};

export const PortfolioItem: React.FC<PortfolioItemProps> = ({ icon: Icon, title, description }) => (
	<motion.div className="bg-white p-6 rounded-lg shadow-md flex flex-col h-full" variants={itemVariants}>
		<div className="flex items-center mb-4">
			<Icon className="w-8 h-8 text-[#4FD1C5] mr-3 flex-shrink-0" />
			<h3 className="text-lg font-semibold text-gray-800">{title}</h3>
		</div>
		<p className="text-gray-600 text-sm flex-grow">{description}</p>
		<div className="mt-4">
			<a href="#" className="text-[#4FD1C5] text-sm font-semibold hover:underline">
				Learn more
			</a>
		</div>
	</motion.div>
);
