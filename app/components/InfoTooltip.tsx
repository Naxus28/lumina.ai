import React, { useState, useEffect, useRef } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface InfoTooltipProps {
	content: string;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({ content }) => {
	const [isOpen, setIsOpen] = useState(false);
	const tooltipRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				tooltipRef.current &&
				!tooltipRef.current.contains(event.target as Node) &&
				triggerRef.current &&
				!triggerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const toggleTooltip = () => {
		setIsOpen(!isOpen);
	};

	return (
		<TooltipProvider>
			<Tooltip open={isOpen}>
				<TooltipTrigger asChild>
					<button
						ref={triggerRef}
						onClick={toggleTooltip}
						className="ml-1 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-full"
						aria-label="More information"
					>
						<Info className="h-4 w-4 text-gray-500" />
					</button>
				</TooltipTrigger>
				<TooltipContent
					className="max-w-xs"
					ref={tooltipRef}
					onPointerDownOutside={(e) => e.preventDefault()}
				>
					<p>{content}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
