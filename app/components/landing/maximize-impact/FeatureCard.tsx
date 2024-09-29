import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FeatureCardProps {
	feature: {
		icon: LucideIcon;
		title: string;
		description: string;
	};
	variants: any;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature, variants }) => {
	return (
		<motion.div variants={variants}>
			<Card className="h-full">
				<CardHeader>
					<CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-600">
						<feature.icon className="w-8 h-8 text-[#4FD1C5] flex-shrink-0" />
						<span>{feature.title}</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-gray-600 text-base leading-relaxed">{feature.description}</p>
				</CardContent>
			</Card>
		</motion.div>
	);
};
