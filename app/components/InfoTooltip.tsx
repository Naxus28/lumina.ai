import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface InfoTooltipProps {
  content: string;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({ content }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Info className="w-4 h-4 ml-2 text-gray-400 inline-block cursor-help" />
      </TooltipTrigger>
      <TooltipContent>
        <p className="w-80 text-sm">{content}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);