import React, { useState, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Span } from '@/app/components/typography';
import { cn } from '@/lib/utils';
import { Container } from '@/app/layout-components/Container';

export interface WizardStep {
	title: string;
	description: string | ReactNode;
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
		<div>
			<Card className={cn(styleOverrides?.card)}>
				<CardHeader>
					<CardTitle className={cn('text-2xl text-gray-600', styleOverrides?.cardContent)}>
						{steps[currentStep].title} {steps[currentStep].isMandatory ? <Span className="text-red-500">*</Span> : ''}
					</CardTitle>
					<CardDescription className="text-sm text-gray-600 mb-4">{steps[currentStep].description}</CardDescription>
				</CardHeader>
				<CardContent>{steps[currentStep].component}</CardContent>
			</Card>

			<Container className="flex justify-between mt-4">
				<Button
					onClick={goToPreviousStep}
					variant="outline"
					className="text-purple-600 border-purple-600 hover:bg-purple-100 hover:text-purple-600 w-24"
					disabled={currentStep === 0}
				>
					Previous
				</Button>
				<Button
					onClick={goToNextStep}
					variant="outline"
					className="text-purple-600 border-purple-600 hover:bg-purple-100 hover:text-purple-600 w-24"
					disabled={currentStep === steps.length - 1}
				>
					Next
				</Button>
			</Container>
		</div>
	);
};
