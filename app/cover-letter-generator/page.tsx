// src/app/cover-letter-generator/page.tsx
'use client';

import React, { useState } from 'react';
import Header from '../../components/ui/Header/Header';
import TemplateSelection from '../../components/CoverLetter/TemplateSelection';
import JobDescriptionInput from '../../components/CoverLetter/JobDescriptionInput';
import CVUpload from '../../components/CoverLetter/CVUpload';
import GenerateButton from '../../components/CoverLetter/GenerateButton';
import ResultDisplay from '../../components/CoverLetter/ResultDisplay';
import ErrorMessage from '../../components/CoverLetter/ErrorMessage';

const CoverLetterGenerator = () => {
	const [selectedTemplate, setSelectedTemplate] = useState('');
	const [jobDescription, setJobDescription] = useState('');
	const [cvFile, setCVFile] = useState<File | null>(null);
	const [generatedCoverLetter, setGeneratedCoverLetter] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleGenerate = async () => {
		setIsLoading(true);
		setError(null);
		setGeneratedCoverLetter('');

		try {
			const response = await fetch('/api/generate-cover-letter', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					template: selectedTemplate,
					jobDescription,
					cv: cvFile ? await cvFile.text() : '',
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to generate cover letter');
			}

			const data = await response.json();
			console.log('data: ', data.coverLetter);
			setGeneratedCoverLetter(data.coverLetter);
		} catch (error) {
			console.error('Error generating cover letter:', error);
			setError('An error occurred while generating the cover letter. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

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
				{error && <ErrorMessage message={error} />}
				<ResultDisplay
					content={generatedCoverLetter}
					isLoading={isLoading}
				/>
			</div>
		</div>
	);
};

export default CoverLetterGenerator;
