import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { InfoTooltip } from '@/app/components/InfoTooltip';
import { cn } from '@/lib/utils';

interface LabeledInputProps {
	name: string;
	label: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	isMandatory?: boolean;
	tooltipContent?: string;
	type?: string;
	className?: string;
}

export const LabeledInput: React.FC<LabeledInputProps> = ({
	name,
	label,
	value,
	onChange,
	isMandatory = false,
	tooltipContent,
	type = 'text',
	className,
}) => (
	<div className={className}>
		<Label
			htmlFor={name}
			className={cn('text-lg text-left mb-2 text-gray-600 font-normal', 'block')}
		>
			{label}
			{isMandatory && <span className="text-red-500">*</span>}
			{tooltipContent && <InfoTooltip content={tooltipContent} />}
		</Label>
		<Input
			id={name}
			name={name}
			type={type}
			value={value}
			onChange={onChange}
		/>
	</div>
);
