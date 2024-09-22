import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Paragraph } from '../../typography';

interface StepItemProps {
	icon: LucideIcon;
	title: string;
	description: string;
}

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
		},
	},
};

export const StepItem: React.FC<StepItemProps> = ({ icon: Icon, title, description }) => (
	<motion.div className="flex flex-col items-center w-full md:w-1/3 px-4 mb-8 md:mb-0" variants={itemVariants}>
		<div className="mb-4">
			<div className="w-20 h-20 rounded-full bg-[#4FD1C5] flex items-center justify-center">
				<Icon className="w-10 h-10 text-white" />
			</div>
		</div>
		<h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">{title}</h3>
		<Paragraph className="text-gray-700 text-center text-lg">{description}</Paragraph>
	</motion.div>
);
