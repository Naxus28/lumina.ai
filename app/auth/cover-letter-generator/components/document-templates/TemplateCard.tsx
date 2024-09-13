import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { CoverLetterTemplate } from './models';

interface TemplateCardProps {
	template: CoverLetterTemplate;
	isSelected: boolean;
	onSelect: () => void;
	onView: (pdfUrl: string) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, isSelected, onSelect, onView }) => (
	<Card className={`overflow-hidden ${isSelected ? 'ring-2 ring-[#006D77]' : ''}`}>
		<CardContent className="p-4 flex flex-col h-full">
			<div
				className="mb-4 p-3 rounded-full w-12 h-12 flex items-center justify-center"
				style={{ backgroundColor: template.color }}
			>
				<template.icon className="h-6 w-6 text-white" />
			</div>
			<h3 className="text-sm font-semibold text-[#006D77] mb-2">{template.name}</h3>
			<p className="text-xs text-gray-600 mb-4 flex-grow">{template.description}</p>
			<div className="flex justify-between mt-auto pt-4 gap-2">
				<Button
					variant="outline"
					size="sm"
					onClick={() => onView(template.pdfUrl)}
					className="flex items-center justify-center flex-1 text-xs"
				>
					Preview
				</Button>
				<Button
					variant={isSelected ? 'secondary' : 'default'}
					size="sm"
					onClick={onSelect}
					className={`flex items-center justify-center flex-1 text-xs ${isSelected ? 'bg-[#e6f0f0] text-[#006D77] hover:bg-[#d1e5e5]' : 'bg-[#006D77] text-white hover:bg-[#005a63]'}`}
				>
					{isSelected ? <Check className="mr-2 h-4 w-4" /> : 'Select'}
				</Button>
			</div>
		</CardContent>
	</Card>
);
