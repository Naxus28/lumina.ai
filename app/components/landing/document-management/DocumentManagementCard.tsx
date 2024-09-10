import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IconWrapper } from '@/components/ui/iconWrapper';
interface DocumentManagementCardProps {
	icon: React.ElementType;
	title: string;
	description: string;
}

export const FeatureCard: React.FC<DocumentManagementCardProps> = ({ icon: Icon, title, description }) => (
	<Card className="flex flex-col h-full border border-gray-200 shadow-sm">
		<CardHeader className="flex flex-row items-center space-y-0 pb-2">
			<IconWrapper Icon={Icon} />
			<CardTitle className="text-xl font-semibold text-[#006D77]">{title}</CardTitle>
		</CardHeader>
		<CardContent>
			<p className="text-gray-600">{description}</p>
		</CardContent>
	</Card>
);
