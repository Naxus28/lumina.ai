import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface InfoTooltipProps {
	content: string;
	icon?: React.ReactNode;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({ content, icon = <Info className="w-4 h-4" /> }) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<span className="inline-flex items-center justify-center ml-2 text-gray-500 cursor-pointer">{icon}</span>
				</TooltipTrigger>
				<TooltipContent className="max-w-md border border-purple-500 p-3 text-[14px]">
					<p style={{ whiteSpace: 'pre-wrap' }}>{content}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
