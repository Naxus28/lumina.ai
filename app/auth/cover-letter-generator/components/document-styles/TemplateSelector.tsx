import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { TemplateCard } from './TemplateCard';
import { documentStyleList as templates } from './document-style-list';
import { DocumentStyle } from './models';

export const TemplateSelector: React.FC = ({}) => {
	const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
	const [viewingPdf, setViewingPdf] = useState<string | null>(null);

	const handleViewPdf = (pdfUrl: string) => {
		setViewingPdf(pdfUrl);
	};

	return (
		<section className="py-8 px-4">
			<div className="max-w-6xl mx-auto">
				<h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Choose Your Cover Letter Style</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{templates.map((template: DocumentStyle) => (
						<TemplateCard
							key={template.name}
							template={template}
							isSelected={selectedTemplate === template.name}
							onSelect={() => setSelectedTemplate(template.name)}
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
