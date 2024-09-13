import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IconWrapper } from '@/components/ui/iconWrapper';

interface FeatureCardProps {
	icon: React.ElementType;
	title: string;
	description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
	<Card className="border border-gray-200 shadow-sm">
		<CardHeader className="flex flex-row items-center space-y-0 pb-2">
			<IconWrapper Icon={Icon} />
			<CardTitle className="text-xl font-semibold text-[#006D77]">{title}</CardTitle>
		</CardHeader>
		<CardContent>
			<p className="text-gray-900">{description}</p>
		</CardContent>
	</Card>
);
