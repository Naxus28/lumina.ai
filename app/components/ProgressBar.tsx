import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { H3 } from './typography';

export interface ProgressStep {
	id: string;
	label: string;
	isMandatory: boolean;
	isCompleted: boolean;
}

interface ProgressBarProps {
	steps: ProgressStep[];
	currentStep: number;
	onStepClick: (index: number) => void;
	styleOverrides?: { card?: string; cardContent?: string };
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStep, onStepClick, styleOverrides }) => {
	const mandatorySteps = steps.filter((step) => step.isMandatory);
	const completedMandatorySteps = mandatorySteps.filter((step) => step.isCompleted);
	const allMandatoryCompleted = mandatorySteps.length === completedMandatorySteps.length;

	const progressPercentage = (completedMandatorySteps.length / mandatorySteps.length) * 100;

	return (
		<Card className={styleOverrides?.card}>
			<CardContent className={cn('pt-6', styleOverrides?.cardContent)}>
				<div className="w-full">
					<div className="flex flex-col xs:flex-row justify-between mb-4">
						{steps.map((step, index) => (
							<div
								key={step.id}
								className={cn(
									'flex items-center mb-2 xs:mb-0 xs:flex-col cursor-pointer',
									index <= currentStep ? 'text-purple-600' : 'text-gray-400'
								)}
								onClick={() => onStepClick(index)}
							>
								<div
									className={cn(
										'w-8 h-8 rounded-full flex items-center justify-center border-2 mr-2 xs:mr-0',
										step.isCompleted
											? 'bg-purple-600 border-purple-600 text-white'
											: index <= currentStep
											? 'border-purple-600'
											: 'border-gray-400',
										step.isMandatory ? 'font-bold' : 'font-normal'
									)}
								>
									{index + 1}
								</div>
								<span className="text-xs mt-0 xs:mt-1">{step.label}</span>
							</div>
						))}
					</div>
					<div className="relative pt-1">
						<div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
							<div
								style={{ width: `${progressPercentage}%` }}
								className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-600"
							></div>
						</div>
						<div className="flex items-center justify-between">
							<div className="text-xs inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
								Mandatory Fields Progress
							</div>
							{allMandatoryCompleted && (
								<div className="text-xs inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
									All Mandatory Fields Completed
								</div>
							)}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
