import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface Template {
  name: string;
  preview: string;
  description: string;
}

interface TemplatePreviewProps {
  template: Template;
  selected: boolean;
  onSelect: (name: string) => void;
}

export const TemplatePreview: React.FC<TemplatePreviewProps> = ({ template, selected, onSelect }) => (
  <Card 
    className={`cursor-pointer transition-all h-full flex flex-col ${selected ? 'ring-2 ring-[#006D77]' : 'hover:shadow-md'}`}
    onClick={() => onSelect(template.name)}
  >
    <CardContent className="p-4 flex flex-col h-full">
      <img src={template.preview} alt={template.name} className="w-full h-auto mb-2" />
      <h3 className="text-sm font-semibold text-[#006D77] mb-1">{template.name}</h3>
      <p className="text-xs text-gray-600 flex-grow">{template.description}</p>
    </CardContent>
  </Card>
);