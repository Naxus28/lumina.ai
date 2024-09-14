import React, { useState, useEffect } from 'react';
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
		<section>
			<div className="container mx-auto pt-4">
				<header className="mb-12">
					<h1 className="text-4xl font-bold text-gray-700 mb-4">Create Your Academic Cover Letter</h1>
					<p className="text-xl text-gray-900 max-w-2xl">In 4 easy steps, craft a compelling cover letter that showcases your academic achievements and potential.</p>
				</header>
				{/* <Container padding="sm">
          <AnimatedSteps />
        </Container> */}
				<div className="flex items-center mb-4">
					<h2 className="text-lg font-semibold text-gray-700 uppercase">1. Choose Your Cover Letter Style</h2>
				</div>
				<Carousel className="w-full">
					<CarouselContent className="-ml-2 md:-ml-4">
						{templates.map((template: CoverLetterTemplate, index) => (
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
					<CarouselPrevious className="left-0 -translate-x-1/2" />
					<CarouselNext className="right-0 translate-x-1/2" />
				</Carousel>
				{selectedTemplate && (
					<div className="mt-8 text-center">
						<Button className="bg-[#006D77] hover:bg-[#005a63] text-white px-6 py-2 rounded-md text-lg font-semibold transition-colors duration-300">Continue with {selectedTemplate} Template</Button>
					</div>
				)}
			</div>
			<Dialog
				open={!!viewingPdf}
				onOpenChange={() => setViewingPdf(null)}
			>
				<DialogContent className="max-w-4xl w-full h-[90vh] p-0 overflow-hidden">
					<div className="relative w-full h-full">
						<DialogClose className="absolute right-4 top-4 z-10">
							<Button
								variant="ghost"
								className="flex items-center gap-2 text-sm"
							>
								<X className="h-5 w-5" />
								Close
							</Button>
						</DialogClose>
						<object
							data={viewingPdf || ''}
							type="application/pdf"
							className="w-full h-full"
						>
							<p className="p-4 text-sm">
								It appears you don't have a PDF plugin for this browser. You can{' '}
								<a
									href={viewingPdf || ''}
									className="text-blue-600 hover:underline"
								>
									click here to download the PDF file.
								</a>
							</p>
						</object>
					</div>
				</DialogContent>
			</Dialog>
		</section>
	);
};
