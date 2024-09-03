// src/app/cover-letter-generator/page.tsx
'use client';

import React, { useState, useCallback, useRef } from 'react';
import Header from '../../components/ui/Header/Header';
import TemplateSelection from '../../components/CoverLetter/TemplateSelection';
import JobDescriptionInput from '../../components/CoverLetter/JobDescriptionInput';
import CVUpload from '../../components/CoverLetter/CVUpload';
import GenerateButton from '../../components/CoverLetter/GenerateButton';
import ResultDisplay from '../../components/CoverLetter/ResultDisplay';
import ErrorMessage from '../../components/CoverLetter/ErrorMessage';
import Loading from '../../components/ui/Loading/Loading';
import { jsPDF } from 'jspdf';

const CoverLetterGenerator = () => {
	const [selectedTemplate, setSelectedTemplate] = useState('');
	const [jobDescription, setJobDescription] = useState('');
	const [cvFile, setCVFile] = useState<File | null>(null);
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
			formData.append('template', selectedTemplate);
			formData.append('jobDescription', jobDescription);
			if (cvFile) {
				formData.append('file', cvFile);
			}

			const response = await fetch('/api/generate-cover-letter', {
				method: 'POST',
				body: formData,
			});

			console.log('Response status:', response.status);

			if (!response.ok) {
				const errorText = await response.text();
				console.error('Error response:', errorText);
				throw new Error(`Failed to generate cover letter: ${response.status} ${errorText}`);
			}

			// Handle streaming response
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
		const doc = new jsPDF();
		const pageHeight = doc.internal.pageSize.height;
		const margin = 15;
		let y = margin;

		// Split the content into lines
		const lines = doc.splitTextToSize(editableCoverLetter, doc.internal.pageSize.width - 2 * margin);

		// Add lines to pages
		lines.forEach((line: string) => {
			if (y > pageHeight - margin) {
				doc.addPage();
				y = margin;
			}
			doc.text(line, margin, y);
			y += 7; // Adjust line height as needed
		});

		// Save the PDF
		doc.save('cover_letter.pdf');
	}, [editableCoverLetter]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
			<Header />
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<h1 className="text-4xl font-bold text-indigo-900 mb-8">Cover Letter Generator</h1>
				<div className="bg-white shadow-md rounded-lg p-6 mb-8">
					<TemplateSelection onSelect={setSelectedTemplate} />
					<JobDescriptionInput onChange={setJobDescription} />
					<CVUpload onFileSelect={setCVFile} />
					<div className="mt-8">
						<GenerateButton
							onClick={handleGenerate}
							disabled={!selectedTemplate || !jobDescription || !cvFile || isLoading}
							isLoading={isLoading}
						/>
					</div>
				</div>

				{isLoading && <Loading message="Generating Cover Letter" />}
				{error && <ErrorMessage message={error} />}
				{generatedCoverLetter && (
					<div>
						<ResultDisplay
							content={editableCoverLetter}
							isLoading={isLoading}
							isEditable={true}
							onEdit={setEditableCoverLetter}
						/>
						{isGenerationComplete && (
							<button
								onClick={handleDownloadPDF}
								className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
							>
								Download as PDF
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default CoverLetterGenerator;
