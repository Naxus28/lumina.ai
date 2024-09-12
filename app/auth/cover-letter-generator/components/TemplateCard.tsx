import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Check } from 'lucide-react'

interface TemplateCardProps {
  template: {
    name: string;
    description: string;
    thumbnailUrl: string;
    pdfUrl: string;
  };
  isSelected: boolean;
  onSelect: () => void;
  onView: (pdfUrl: string) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, isSelected, onSelect, onView }) => (
  <div className={`p-1 h-full ${isSelected ? 'bg-[#E0F2F1]' : ''}`}>
    <Card className={`h-full ${isSelected ? 'ring-2 ring-[#006D77]' : ''}`}>
      <CardContent className="p-4 flex flex-col h-full">
        <div className="aspect-[3/4] mb-3 overflow-hidden rounded-md">
          <img 
            src={template.thumbnailUrl} 
            alt={`Preview of ${template.name} template`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <h3 className="text-sm font-semibold text-[#006D77] mb-1">{template.name}</h3>
        <p className="text-xs text-gray-600 mb-3 flex-grow">{template.description}</p>
        <div className="flex justify-between mt-auto">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onView(template.pdfUrl)}
            className="text-xs px-2 py-1"
          >
            <Eye className="mr-1 h-3 w-3" />
            View PDF
          </Button>
          <Button 
            variant={isSelected ? "secondary" : "default"}
            size="sm" 
            onClick={onSelect}
            className="text-xs px-2 py-1 flex items-center"
          >
            {isSelected ? <Check className="h-3 w-3 mr-1" /> : null}
            Select
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
)