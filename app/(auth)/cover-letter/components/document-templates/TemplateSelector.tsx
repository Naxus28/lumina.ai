import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { TemplateCard } from './TemplateCard';
import { CoverLetterTemplate } from './models';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
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
			<div className="relative">
				<Carousel className="w-full">
					<CarouselContent className="-ml-2 md:-ml-4">
						{templates.map((template: CoverLetterTemplate) => (
							<CarouselItem
								key={template.name}
								className="pl-2 md:pl-4 basis-[85%] sm:basis-[45%] md:basis-1/3"
							>
								<TemplateCard
									template={template}
									isSelected={selectedTemplate === template.name}
									onSelect={() => handleSelectTemplate(template)}
									onView={() => handleViewExample(template.name)}
								/>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[calc(100%+8px)] hover:bg-purple-800 hover:text-white data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed hidden md:flex" />
					<CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[calc(100%+8px)] hover:bg-purple-800 hover:text-white data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed hidden md:flex" />
				</Carousel>
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
