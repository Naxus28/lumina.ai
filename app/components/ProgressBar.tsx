import React from 'react';
import { cn } from '@/lib/utils';

export interface ProgressStep {
	id: string;
	label: string;
	isMandatory: boolean;
	isCompleted: boolean;
}

interface ProgressBarProps {
	steps: ProgressStep[];
	currentStep: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStep }) => {
	const allMandatoryCompleted = steps
		.filter(step => step.isMandatory)
		.every(step => step.isCompleted);

	return (
		<div className="w-full mb-8">
			<div className="flex justify-between mb-2">
				{steps.map((step, index) => (
					<div
						key={step.id}
						className={cn(
							"flex flex-col items-center",
							index <= currentStep ? "text-purple-600" : "text-gray-400"
						)}
					>
						<div
							className={cn(
								"w-8 h-8 rounded-full flex items-center justify-center border-2",
								step.isCompleted ? "bg-purple-600 border-purple-600 text-white" : 
									(index <= currentStep ? "border-purple-600" : "border-gray-400"),
								step.isMandatory ? "font-bold" : "font-normal"
							)}
						>
							{index + 1}
						</div>
						<span className="text-xs mt-1">{step.label}</span>
					</div>
				))}
			</div>
			<div className="relative pt-1">
				<div className="flex mb-2 items-center justify-between">
					<div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
						Progress
					</div>
					{allMandatoryCompleted && (
						<div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
							All Mandatory Fields Completed
						</div>
					)}
				</div>
				<div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
					<div
						style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
						className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-600"
					></div>
				</div>
			</div>
		</div>
	);
};
