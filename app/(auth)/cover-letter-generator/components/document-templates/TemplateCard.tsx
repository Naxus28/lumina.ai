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
	<Card className={`h-full ${isSelected ? 'ring-2 ring-purple-800 ring-inset' : ''}`}>
		<CardContent className="p-4 flex flex-col h-full">
			<div className="flex items-center mb-2">
				<template.icon className="h-6 w-6 text-purple-800 mr-2" />
				<h3 className={'text-m font-semibold text-gray-600'}>{template.name}</h3>
			</div>
			<Paragraph className="text-sm mb-2 flex-grow">{template.description}</Paragraph>
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
					className={`flex-1 ${
						isSelected ? 'bg-purple-500 text-white hover:bg-purple-600' : 'bg-purple-800 text-white hover:bg-purple-900'
					}`}
				>
					{isSelected ? 'Selected' : 'Select'}
				</Button>
			</div>
		</CardContent>
	</Card>
);
