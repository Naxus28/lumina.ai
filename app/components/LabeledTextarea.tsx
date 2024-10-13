import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { InfoTooltip } from '@/app/components/InfoTooltip';
import { cn } from '@/lib/utils';

interface LabeledTextareaProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isMandatory?: boolean;
  tooltipContent?: string;
  className?: string;
}

export const LabeledTextarea: React.FC<LabeledTextareaProps> = ({
  name,
  label,
  value,
  onChange,
  isMandatory = false,
  tooltipContent,
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
    <Textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="max-h-32 min-h-[80px]"
    />
  </div>
);
