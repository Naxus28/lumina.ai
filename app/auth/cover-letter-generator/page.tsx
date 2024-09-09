'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Header } from './components/Header';
import { TemplateSelector } from './components/TemplateSelector';
import { JobDescriptionInput } from './components/JobDescriptionInput';
import { CVUpload } from './components/CVUpload';
import { GenerateButton } from './components/GenerateButton';
import { ResultDisplay } from './components/ResultDisplay';
import { ErrorMessage } from './components/ErrorMessage';
import { jsPDF } from 'jspdf';

const templates = [
	{
		name: 'Traditional Academic',
		preview: 'https://g-g1ekrvkztt3.vusercontent.net/placeholder.svg?height=100&width=80',
		description: 'A formal structure emphasizing academic achievements and research experience.',
	},
	{
		name: 'Research Emphasis',
		preview: 'https://g-g1ekrvkztt3.vusercontent.net/placeholder.svg?height=100&width=80',
		description: 'Highlights your research contributions and potential for future projects.',
	},
	{
		name: 'Teaching Focus',
		preview: 'https://g-g1ekrvkztt3.vusercontent.net/placeholder.svg?height=100&width=80',
		description: 'Showcases your teaching philosophy and classroom experiences.',
	},
	{
		name: 'Interdisciplinary Approach',
		preview: 'https://g-g1ekrvkztt3.vusercontent.net/placeholder.svg?height=100&width=80',
		description: 'Demonstrates your ability to work across multiple academic disciplines.',
	},
];

export const CoverLetterGenerator: React.FC = () => {
	const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
	const [jobDescription, setJobDescription] = useState('');
	const [cvFile, setCvFile] = useState<File | null>(null);
	const [generatedCoverLetter, setGeneratedCoverLetter] = useState('');
	const [editableCoverLetter, setEditableCoverLetter] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isGenerationComplete, setIsGenerationComplete] = useState(false);

	const handleGenerate = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		setGeneratedCoverLetter('');
		setEditableCoverLetter('');
		setIsGenerationComplete(false);

		try {
			const formData = new FormData();
			if (selectedTemplate) {
				formData.append('template', selectedTemplate);
			}
			formData.append('jobDescription', jobDescription);
			if (cvFile) {
				formData.append('file', cvFile);
			}

			const response = await fetch('/api/generate-cover-letter', {
				method: 'POST',
				body: formData,
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to generate cover letter');
			}

			const reader = response.body?.getReader();
			const decoder = new TextDecoder();

			if (reader) {
				while (true) {
					const { done, value } = await reader.read();
					if (done) {
						setIsGenerationComplete(true);
						break;
					}
					const chunk = decoder.decode(value, { stream: true });
					setGeneratedCoverLetter((prev) => {
						const newContent = prev + chunk;
						setEditableCoverLetter(newContent);
						return newContent;
					});
				}
			} else {
				throw new Error('Unable to read response stream');
			}
		} catch (error) {
			console.error('Error in handleGenerate:', error);
			setError(error instanceof Error ? error.message : 'An unknown error occurred');
		} finally {
			setIsLoading(false);
		}
	}, [selectedTemplate, jobDescription, cvFile]);

	const handleDownloadPDF = useCallback(() => {
		// ... (keep your existing PDF generation logic)
	}, [editableCoverLetter]);

	return (
		<div className="min-h-screen bg-gray-50">
			<Header />
			<main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<h1 className="text-4xl font-bold text-gray-900 mb-8">Generate Your Cover Letter</h1>
				<TemplateSelector
					templates={templates}
					selectedTemplate={selectedTemplate}
					setSelectedTemplate={setSelectedTemplate}
				/>
				<JobDescriptionInput
					jobDescription={jobDescription}
					setJobDescription={setJobDescription}
				/>
				<CVUpload onFileSelect={setCvFile} />
				<GenerateButton
					onClick={handleGenerate}
					disabled={!selectedTemplate || !jobDescription || !cvFile}
					isLoading={isLoading}
				/>

				{error && <ErrorMessage message={error} />}
				{generatedCoverLetter && (
					<ResultDisplay
						content={editableCoverLetter}
						isLoading={isLoading}
						isEditable={true}
						onEdit={setEditableCoverLetter}
					/>
				)}
				{isGenerationComplete && (
					<Button
						onClick={handleDownloadPDF}
						className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white"
					>
						Download as PDF
					</Button>
				)}
			</main>
		</div>
	);
};

export default CoverLetterGenerator;
