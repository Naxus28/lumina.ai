import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { TemplateCard } from './TemplateCard';
import { CoverLetterTemplate } from './models';
import { CoverLetterExample } from './CoverLetterExample';
import { VisuallyHidden } from '@/components/ui/visually-hidden';

interface TemplateSelectorProps {
	onSelectTemplate: (template: CoverLetterTemplate) => void;
	selectedTemplate: string | null;
	templates: CoverLetterTemplate[];
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
	onSelectTemplate,
	selectedTemplate,
	templates,
}) => {
	const [viewingExample, setViewingExample] = useState<string | null>(null);

	const handleViewExample = (templateName: string) => {
		setViewingExample(templateName);
	};

	const handleSelectTemplate = (template: CoverLetterTemplate) => {
		onSelectTemplate(template);
	};

	return (
		<section className="space-y-4">
			<div className="grid xm:grid-cols-1 sm:grid-cols-2 gap-4 xs:gap-8">
				{templates.map((template: CoverLetterTemplate) => (
					<TemplateCard
						key={template.name}
						template={template}
						isSelected={selectedTemplate === template.name}
						onSelect={() => handleSelectTemplate(template)}
						onView={() => handleViewExample(template.name)}
					/>
				))}
			</div>

			<Dialog
				open={!!viewingExample}
				onOpenChange={() => setViewingExample(null)}
			>
				<DialogContent className="max-w-5xl w-full h-[90vh] overflow-scroll">
					<DialogTitle>
						<VisuallyHidden>Cover Letter Example</VisuallyHidden>
					</DialogTitle>
					<div className="relative w-full h-full p-4">
						<button
							onClick={() => setViewingExample(null)}
							className="absolute right-2 top-2 z-10 p-1 rounded-full hover:bg-gray-200 transition-colors"
							aria-label="Close"
						>
							<X className="h-4 w-4" />
							<span className="sr-only">Close</span>
						</button>
						{viewingExample && <CoverLetterExample templateType={viewingExample} />}
					</div>
				</DialogContent>
			</Dialog>
		</section>
	);
};
