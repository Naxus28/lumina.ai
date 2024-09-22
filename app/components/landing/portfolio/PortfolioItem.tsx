import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface PortfolioItemProps {
	icon: LucideIcon;
	title: string;
	description: string;
	detail?: string;
}

const itemVariants = {
	hidden: { x: '100%', opacity: 0 },
	visible: {
		x: 0,
		opacity: 1,
		transition: {
			type: 'spring',
			stiffness: 100,
			damping: 20,
			duration: 0.5,
		},
	},
};

export const PortfolioItem: React.FC<PortfolioItemProps> = ({ icon: Icon, title, description, detail }) => (
	<motion.div
		className="bg-white p-8 rounded-lg shadow-lg flex flex-col justify-between h-full"
		variants={itemVariants}
	>
		<div>
			<Icon className="w-16 h-16 text-[#4FD1C5] mb-6" />
			<h3 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h3>
			<p className="text-gray-600 mb-4">{description}</p>
			<p className="text-gray-500 text-sm">{detail}</p>
		</div>
		<div className="mt-1">
			<a href="#" className="text-[#4FD1C5] font-semibold hover:underline">
				Learn more
			</a>
		</div>
	</motion.div>
);
