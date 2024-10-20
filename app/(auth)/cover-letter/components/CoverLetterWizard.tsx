import React, { useState, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Span } from '@/app/components/typography';
import { cn } from '@/lib/utils';

export interface WizardStep {
	title: string;
	description: string;
	component: ReactNode;
	isMandatory: boolean;
}

interface CoverLetterWizardProps {
	steps: WizardStep[];
	currentStep: number;
	setCurrentStep: (step: number) => void;
	styleOverrides?: { card?: string; cardContent?: string };
}

export const CoverLetterWizard: React.FC<CoverLetterWizardProps> = ({
	steps,
	currentStep,
	setCurrentStep,
	styleOverrides,
}) => {
	const goToNextStep = () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1);
		}
	};

	const goToPreviousStep = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	return (
		<Card className={cn(styleOverrides?.card)}>
			<CardHeader>
				<CardTitle className={cn('text-2xl text-gray-600', styleOverrides?.cardContent)}>
					{steps[currentStep].title} {steps[currentStep].isMandatory ? <Span className="text-red-500">*</Span> : ''}
				</CardTitle>
				<CardDescription className="text-sm text-gray-600 mb-4">{steps[currentStep].description}</CardDescription>
			</CardHeader>
			<CardContent>{steps[currentStep].component}</CardContent>
			<CardFooter className="flex justify-between mt-16">
				<Button
					onClick={goToPreviousStep}
					className="bg-purple-700 hover:bg-purple-800"
					disabled={currentStep === 0}
				>
					Previous
				</Button>
				<Button
					onClick={goToNextStep}
					className="bg-purple-800 hover:bg-purple-700"
					disabled={currentStep === steps.length - 1}
				>
					Next
				</Button>
			</CardFooter>
		</Card>
	);
};
