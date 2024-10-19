import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

// ... (keep the examples array as is)

export function CoverLetterExamples({ templateType }: { templateType: string }) {
  const selectedExample = examples.find(example => example.type === templateType) || examples[0];

  return (
    <div>
      <Alert className="mb-4">
        <AlertTriangle className="h-4 w-4 mr-2" />
        <AlertDescription>
          <strong>Example Only:</strong> This is an AI-generated sample for inspiration. Your actual cover letter will be uniquely tailored based on your specific inputs and requirements.
        </AlertDescription>
      </Alert>
      <h2 className="text-xl font-bold mb-4">{selectedExample.title}</h2>
      {selectedExample.sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-4 pl-4 border-l-2 border-gray-300">
          <h3 className="font-medium mb-2">{section.title}</h3>
          <p className="whitespace-pre-wrap text-sm">{section.content}</p>
        </div>
      ))}
    </div>
  );
}
