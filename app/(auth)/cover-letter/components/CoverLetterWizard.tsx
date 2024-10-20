import React, { useState, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export interface WizardStep {
	title: string;
	description: string;
	component: ReactNode;
}

interface CoverLetterWizardProps {
	steps: WizardStep[];
	onComplete: () => void;
	isLoading: boolean;
}

export const CoverLetterWizard: React.FC<CoverLetterWizardProps> = ({ steps, onComplete, isLoading }) => {
	const [currentStep, setCurrentStep] = useState(0);

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

	const progressPercentage = ((currentStep + 1) / steps.length) * 100;

	return (
		<Card className="p-12">
			<CardHeader>
				{/* <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-4">
					<div
						className="bg-purple-600 h-2.5 rounded-full"
						style={{ width: `${progressPercentage}%` }}
					></div>
				</div> */}
				<CardTitle className="text-2xl text-gray-600">{steps[currentStep].title}</CardTitle>
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
