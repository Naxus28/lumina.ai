import React, { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface InfoTooltipProps {
	content: string;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({ content }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<div className="inline-flex items-center justify-center w-5 h-5 ml-2 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
						<Info className="w-4 h-4" />
						<span className="sr-only">More information</span>
					</div>
				</TooltipTrigger>
				<TooltipContent
					side="top"
					align="center"
					className="max-w-xs text-sm bg-white p-4 rounded shadow-lg border border-purple-500 text-[14px]"
				>
					<p>{content}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
