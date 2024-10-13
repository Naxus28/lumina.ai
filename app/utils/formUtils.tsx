import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { InfoTooltip } from '@/app/components/InfoTooltip';
import { cn } from '@/lib/utils';

interface RenderInputProps {
  name: string;
  label: string;
  example: string;
  type?: string;
  isMandatory?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const renderInput = ({
  name,
  label,
  example,
  type = 'text',
  isMandatory = false,
  value,
  onChange
}: RenderInputProps) => (
  <div key={name}>
    <Label
      htmlFor={name}
      className={cn('text-lg text-left mb-2 text-gray-600 font-normal', 'block')}
    >
      {label}
      {isMandatory && <span className="text-red-500">*</span>}
      <InfoTooltip content={`e.g., ${example}`} />
    </Label>
    <Input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      min={type === 'number' ? 0 : undefined}
      step={type === 'number' ? 1 : undefined}
    />
  </div>
);

interface RenderTextAreaProps {
  name: string;
  label: string;
  example: string;
  isMandatory?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const renderTextArea = ({
  name,
  label,
  example,
  isMandatory = false,
  value,
  onChange
}: RenderTextAreaProps) => (
  <div key={name}>
    <Label
      htmlFor={name}
      className={cn('text-lg text-left mb-2 text-gray-600 font-normal', 'block')}
    >
      {label}
      {isMandatory && <span className="text-red-500">*</span>}
      <InfoTooltip content={`e.g., ${example}`} />
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
