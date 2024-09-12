import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { TemplateCard } from './TemplateCard';


const templates = [
	{
		name: 'Traditional Academic',
		description: 'A formal structure emphasizing academic achievements and research experience.',
		pdfUrl: '/cover-letter-full.png',
		thumbnailUrl: '/cover-letter-thumb.png',
	},
	{
		name: 'Research Emphasis',
		description: 'Highlights your research contributions and potential for future projects.',
		pdfUrl: '/cover-letter-full.png',
		thumbnailUrl: '/cover-letter-thumb.png',
	},
	{
		name: 'Teaching Focus',
		description: 'Showcases your teaching philosophy and classroom experiences.',
		pdfUrl: '/cover-letter-full.png',
		thumbnailUrl: '/cover-letter-thumb.png',
	},
	{
		name: 'Interdisciplinary Approach',
		description: 'Demonstrates your ability to work across multiple academic disciplines.',
		pdfUrl: '/cover-letter-full.png',
		thumbnailUrl: '/cover-letter-thumb.png',
	},
];

export const TemplateSelector: React.FC = () => {
	const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
	const [viewingPdf, setViewingPdf] = useState<string | null>(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [maxHeight, setMaxHeight] = useState(0);
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		const updateMaxHeight = () => {
			const heights = cardRefs.current.map((ref) => ref?.offsetHeight || 0);
			setMaxHeight(Math.max(...heights));
		};

		updateMaxHeight();
		window.addEventListener('resize', updateMaxHeight);
		return () => window.removeEventListener('resize', updateMaxHeight);
	}, [currentIndex]);

	const handleNext = () => {
		if (currentIndex < templates.length - 3) {
			setCurrentIndex((prev) => prev + 1);
		}
	};

	const handlePrev = () => {
		if (currentIndex > 0) {
			setCurrentIndex((prev) => prev - 1);
		}
	};

	const handleViewPdf = (pdfUrl: string) => {
		setViewingPdf(pdfUrl);
	};

	return (
		<section className="py-12 px-4">
			<div className="max-w-6xl mx-auto">
				<h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Choose Your Cover Letter Style</h1>
				<div className="relative">
					<div className="overflow-hidden">
						<motion.div
							className="flex"
							initial={false}
							animate={{ x: `-${currentIndex * (100 / 3)}%` }}
							transition={{ type: 'spring', stiffness: 300, damping: 30 }}
							style={{ width: `${(templates.length / 3) * 100}%` }}
						>
							{templates.map((template, index) => (
								<div
									key={template.name}
									ref={(el) => {
										if (el) cardRefs.current[index] = el;
									}}
									className="w-1/3 px-2"
									style={{ height: maxHeight > 0 ? maxHeight : 'auto' }}
								>
									<TemplateCard
										template={template}
										isSelected={selectedTemplate === template.name}
										onSelect={() => setSelectedTemplate(template.name)}
										onView={handleViewPdf}
									/>
								</div>
							))}
						</motion.div>
					</div>
					<Button
						variant="outline"
						size="icon"
						onClick={handlePrev}
						disabled={currentIndex === 0}
						className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 ${currentIndex > 0 ? 'bg-[#E0F2F1] hover:bg-[#B2DFDB]' : ''}`}
					>
						<ChevronLeft className={`h-4 w-4 ${currentIndex > 0 ? 'text-[#006D77]' : ''}`} />
					</Button>
					<Button
						variant="outline"
						size="icon"
						onClick={handleNext}
						disabled={currentIndex >= templates.length - 3}
						className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 ${currentIndex < templates.length - 3 ? 'bg-[#E0F2F1] hover:bg-[#B2DFDB]' : ''}`}
					>
						<ChevronRight className={`h-4 w-4 ${currentIndex < templates.length - 3 ? 'text-[#006D77]' : ''}`} />
					</Button>
				</div>
				{selectedTemplate && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="mt-8 text-center"
					>
						<Button className="bg-[#006D77] hover:bg-[#005a63] text-white px-6 py-2 rounded-md text-lg font-semibold transition-colors duration-300">Continue with {selectedTemplate} Template</Button>
					</motion.div>
				)}
			</div>
			<Dialog
				open={!!viewingPdf}
				onOpenChange={() => setViewingPdf(null)}
			>
				<DialogContent className="max-w-5xl w-full h-[90vh] p-0 overflow-hidden">
					<div className="relative w-full h-full">
						<DialogClose className="absolute right-4 top-4 z-10"/ >
						<object
							data={viewingPdf || ''}
							type="application/pdf"
							className="w-full h-full"
						>
							<p>
								It appears you don't have a PDF plugin for this browser. You can <a href={viewingPdf || ''}>click here to download the PDF file.</a>
							</p>
						</object>
					</div>
				</DialogContent>
			</Dialog>
		</section>
	);
};
