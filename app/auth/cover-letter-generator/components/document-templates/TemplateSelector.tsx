import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { TemplateCard } from './TemplateCard';
import { CoverLetterTemplate } from './models';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface TemplateSelectorProps {
	onSelectTemplate: (template: CoverLetterTemplate) => void;
	selectedTemplate: string | null;
	templates: CoverLetterTemplate[];
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelectTemplate, selectedTemplate, templates }) => {
	const [viewingPdf, setViewingPdf] = useState<string | null>(null);

	const handleViewPdf = (pdfUrl: string) => {
		setViewingPdf(pdfUrl);
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
								className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/3"
							>
								<TemplateCard
									template={template}
									isSelected={selectedTemplate === template.name}
									onSelect={() => handleSelectTemplate(template)}
									onView={handleViewPdf}
								/>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[calc(100%+8px)] hover:bg-[#E0F2F1] hover:text-[#006D77] data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed" />
					<CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[calc(100%+8px)] hover:bg-[#E0F2F1] hover:text-[#006D77] data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed" />
				</Carousel>
			</div>

			{selectedTemplate && (
				<div className="text-center mt-4">
					<span className="inline-block text-[#006D77] hover:text-[#005a63] text-lg font-semibold transition-colors duration-200 cursor-pointer border-b-2 border-[#006D77] hover:border-[#005a63] pb-1">Continue with {selectedTemplate}</span>
				</div>
			)}

			<Dialog
				open={!!viewingPdf}
				onOpenChange={() => setViewingPdf(null)}
			>
				<DialogContent className="max-w-4xl w-full h-[90vh] p-0 overflow-hidden">
					<div className="relative w-full h-full">
						<DialogClose className="absolute right-2 top-2 z-10">
							<Button
								variant="ghost"
								size="sm"
								className="p-1"
							>
								<X className="h-4 w-4" />
								<span className="sr-only">Close</span>
							</Button>
						</DialogClose>
						<object
							data={viewingPdf || ''}
							type="application/pdf"
							className="w-full h-full"
						>
							<p className="p-4 text-sm">
								PDF preview not available.{' '}
								<a
									href={viewingPdf || ''}
									className="text-blue-600 hover:underline"
								>
									Download PDF
								</a>
							</p>
						</object>
					</div>
				</DialogContent>
			</Dialog>
		</section>
	);
};
