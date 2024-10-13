import React, { useState, useEffect, useRef } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, X } from 'lucide-react';

interface InfoTooltipProps {
	content: string;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({ content }) => {
	const [isOpen, setIsOpen] = useState(false);
	const tooltipRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<TooltipProvider>
			<Tooltip open={isOpen}>
				<TooltipTrigger asChild>
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="inline-flex items-center justify-center w-5 h-5 ml-2 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
					>
						<Info className="w-4 h-4" />
						<span className="sr-only">More information</span>
					</button>
				</TooltipTrigger>
				<TooltipContent
					side="top"
					align="center"
					className="max-w-xs text-sm bg-white p-2 rounded shadow-lg border border-gray-200"
					ref={tooltipRef}
				>
					<div className="flex justify-between items-start">
						<p>{content}</p>
						<button
							onClick={() => setIsOpen(false)}
							className="ml-2 text-gray-500 hover:text-gray-700"
						>
							<X className="w-4 h-4" />
						</button>
					</div>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
