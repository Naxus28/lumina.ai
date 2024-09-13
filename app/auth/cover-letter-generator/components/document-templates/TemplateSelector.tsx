import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { TemplateCard } from './TemplateCard';
import { CoverLetterTemplate } from './models';
import { motion } from 'framer-motion';

const steps = ['Choose Your Cover Letter Style', 'Enter Job Description', 'Upload Your CV', 'Generate Cover Letter'];

export default function AnimatedSteps() {
	const [currentStep, setCurrentStep] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentStep((prevStep) => {
				if (prevStep < steps.length - 1) {
					return prevStep + 1;
				}
				clearInterval(timer);
				return prevStep;
			});
		}, 2000); // Change step every 2 seconds for a slower animation
		return () => clearInterval(timer);
	}, []);

	return (
		<div className="max-w-4xl mx-auto my-12 px-4">
			<h3 className="text-2xl font-semibold text-gray-900 mb-10 text-center">Create Your Cover Letter in 4 Easy Steps</h3>
			<div className="relative">
				<div className="flex justify-between items-center mb-4">
					{steps.map((_, index) => (
						<div
							key={index}
							className="relative"
						>
							<motion.div
								className="bg-[#006D77] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold z-10 relative"
								initial={{ scale: 0 }}
								animate={{ scale: currentStep >= index ? 1 : 0 }}
								transition={{ duration: 0.5, delay: index * 1.5 }}
							>
								{index + 1}
							</motion.div>
						</div>
					))}
				</div>
				<div className="flex justify-between items-start mt-2">
					{steps.map((step, index) => (
						<motion.p
							key={step}
							className="text-sm text-center text-gray-700 w-1/4 px-2"
							initial={{ opacity: 0 }}
							animate={{ opacity: currentStep >= index ? 1 : 0 }}
							transition={{ duration: 0.5, delay: index * 1.5 + 0.25 }}
						>
							{step}
						</motion.p>
					))}
				</div>
				{/* Animated connecting lines */}
				<div
					className="absolute top-6 left-0 w-full"
					style={{ height: '1px' }}
				>
					{[0, 1, 2].map((index) => (
						<motion.div
							key={`line-${index}`}
							className="absolute bg-[#006D77] h-0.5"
							style={{
								left: index === 0 ? '3rem' : `${index * 33.33}%`,
								width: index === 0 ? 'calc(33.33% - 3rem)' : '33.33%',
								transformOrigin: 'left',
							}}
							initial={{ scaleX: 0 }}
							animate={{ scaleX: currentStep > index ? 1 : 0 }}
							transition={{ duration: 1, delay: index * 1.5 }}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

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
					<p className="text-xl text-gray-900 max-w-2xl">Craft a compelling cover letter that showcases your academic achievements and potential.</p>
				</header>

				<AnimatedSteps />

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
