import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CoverLetterTemplate } from './models';

interface TemplateCardProps {
	template: CoverLetterTemplate;
	isSelected: boolean;
	onSelect: () => void;
	onView: () => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, isSelected, onSelect, onView }) => (
	<Card className={`h-full ${isSelected ? 'ring-2 ring-[#006D77] ring-inset' : ''}`}>
		<CardContent className="p-4 flex flex-col h-full">
			<div className="mb-2">
				<template.icon className="h-10 w-10 text-[#006D77]" />
			</div>
			<h3 className={`text-m font-semibold mb-2 ${isSelected ? 'text-[#006D77]' : 'text-gray-800'}`}>{template.name}</h3>
			<p className="text-xs text-gray-600 mb-2 flex-grow">{template.description}</p>
			<div className="flex justify-between mt-auto pt-4 gap-2">
				<Button
					variant="outline"
					size="sm"
					onClick={onView}
					className="flex-1"
				>
					Preview
				</Button>
				<Button
					variant={isSelected ? 'secondary' : 'default'}
					size="sm"
					onClick={onSelect}
					className={`flex-1 ${isSelected ? 'bg-[#E0F2F1] text-[#006D77] hover:bg-[#B2DFDB]' : 'bg-[#006D77] text-white hover:bg-[#005a63]'}`}
				>
					{isSelected ? 'Selected' : 'Select'}
				</Button>
			</div>
		</CardContent>
	</Card>
);
