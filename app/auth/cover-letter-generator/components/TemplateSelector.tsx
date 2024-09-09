import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Template {
  name: string;
  preview: string;
  description: string;
}

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplate: string | null;
  setSelectedTemplate: (name: string) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ templates, selectedTemplate, setSelectedTemplate }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Choose a Template</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {templates.map((template) => (
        <Dialog key={template.name}>
          <DialogTrigger asChild>
            <Card 
              className={`cursor-pointer transition-all h-full ${selectedTemplate === template.name ? 'ring-2 ring-[#006D77]' : 'hover:shadow-md'}`}
              onClick={() => setSelectedTemplate(template.name)}
            >
              <CardContent className="p-4">
                <img src={template.preview} alt={template.name} className="w-full h-auto mb-2" />
                <h3 className="text-sm font-semibold text-[#006D77] mb-1">{template.name}</h3>
                <p className="text-xs text-gray-600">{template.description}</p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{template.name}</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <img 
                src={template.preview}
                alt={`${template.name} full preview`} 
                className="w-full h-auto max-h-[calc(90vh-100px)] object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  </section>
);