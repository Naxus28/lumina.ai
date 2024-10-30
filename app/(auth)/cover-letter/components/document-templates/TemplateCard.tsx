import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CoverLetterTemplate } from './models';
import { Paragraph } from '@/app/components/typography';

interface TemplateCardProps {
	template: CoverLetterTemplate;
	isSelected: boolean;
	onSelect: () => void;
	onView: () => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, isSelected, onSelect, onView }) => (
	<Card className={`h-full ${isSelected ? 'transition-all duration-200 ease-in-out border-purple-500' : ''}`}>
		<CardContent className="p-4 flex flex-col h-full">
			<div className="flex items-center mb-2">
				<h3 className={'text-m font-semibold text-gray-600'}>{template.name}</h3>
			</div>
			<Paragraph className="text-sm mb-2 flex-grow">{template.description}</Paragraph>
			<div className="flex justify-between mt-auto pt-4 gap-2">
				{/* <Button
					variant="outline"
					size="sm"
					onClick={onView}
					className="flex-1"
				>
					Example
				</Button> */}
				<Button
					variant={'outline'}
					size="sm"
					onClick={onSelect}
					className={`flex-1 border hover:text-[#9333ea] ${
						isSelected
							? 'bg-[#9333ea]/30 text-[#9333ea] hover:bg-[#9333ea]/40'
							: 'bg-[#9333ea]/10 text-[#9333ea] hover:bg-[#9333ea]/20'
					}`}
				>
					{isSelected ? 'Selected' : 'Select'}
				</Button>
			</div>
		</CardContent>
	</Card>
);
