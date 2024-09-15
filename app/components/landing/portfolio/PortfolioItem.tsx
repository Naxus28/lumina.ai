import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IconWrapper } from '@/components/ui/iconWrapper';
import { Paragraph, Span } from '@/app/components/typography';

interface PortfolioItemProps {
	icon: React.ElementType;
	title: string;
	description: string;
	examples: string[];
}

export const PortfolioItem: React.FC<PortfolioItemProps> = ({ icon: Icon, title, description, examples }) => (
	<Card className="flex flex-col h-full border border-gray-200 shadow-sm">
		<CardHeader className="flex flex-row items-center space-y-0 pb-2">
			<IconWrapper Icon={Icon} />
			<CardTitle className="text-xl font-semibold text-[#006D77]">{title}</CardTitle>
		</CardHeader>
		<CardContent>
			<Paragraph className="text-gray-900 mb-4">{description}</Paragraph>
			<Paragraph className="text-gray-900 mb-4 italic text-sm">Available document styles:</Paragraph>
			<div className="flex flex-wrap gap-2">
				{examples.map((example, index) => (
					<Span
						key={index}
						className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700"
					>
						{example}
					</Span>
				))}
			</div>
		</CardContent>
	</Card>
);
