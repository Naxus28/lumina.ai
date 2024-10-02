import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface InputGroupProps {
	label: string;
	name: string;
	placeholder: string;
	icon: React.ReactNode;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	tooltip?: string;
}

export function InputGroup({ label, name, placeholder, icon, value, onChange, tooltip }: InputGroupProps) {
	return (
		<div className="space-y-2">
			<div className="flex items-center">
				<Label htmlFor={name} className="text-sm font-medium text-gray-700">
					{label}
				</Label>
				{tooltip && (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Info className="w-4 h-4 ml-2 text-gray-400" />
							</TooltipTrigger>
							<TooltipContent>
								<p>{tooltip}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}
			</div>
			<div className="relative">
				<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					{icon}
				</div>
				<Input
					id={name}
					name={name}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					className="pl-10 w-full border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-md shadow-sm transition-all duration-200 ease-in-out"
				/>
			</div>
		</div>
	);
}
