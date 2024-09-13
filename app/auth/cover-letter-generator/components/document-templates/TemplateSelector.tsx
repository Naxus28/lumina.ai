import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { TemplateCard } from './TemplateCard';
import { CoverLetterTemplate } from './models';

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
		<section className="pb-8">
			<div className="container mx-auto pt-4">
				<header className="mb-12">
					<h1 className="text-4xl font-bold text-gray-700 mb-4">Create Your Academic Cover Letter</h1>
					<p className="text-xl text-gray-600 max-w-2xl">Craft a compelling cover letter that showcases your academic achievements and potential.</p>
				</header>

				<div className="flex items-center mb-4">
					<div className="bg-[#006D77] text-white rounded-full w-6 h-6 flex items-center justify-center font-bold mr-2 text-xs">1</div>
					<h2 className="text-2xl font-semibold text-gray-700">Choose Your Cover Letter Style</h2>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{templates.map((template: CoverLetterTemplate) => (
						<TemplateCard
							key={template.name}
							template={template}
							isSelected={selectedTemplate === template.name}
							onSelect={() => handleSelectTemplate(template)}
							onView={handleViewPdf}
						/>
					))}
				</div>
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
