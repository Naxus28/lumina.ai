'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Header } from './components/Header';
import { TemplateSelector } from './components/document-templates/TemplateSelector';
import { JobDescriptionInput } from './components/JobDescriptionInput';
import { CVUpload } from './components/CVUpload';
import { GenerateButton } from './components/GenerateButton';
import { ResultDisplay } from './components/ResultDisplay';
import { ErrorMessage } from './components/ErrorMessage';
import { jsPDF } from 'jspdf';
import { CoverLetterTemplate } from './components/document-templates/models';
import { coverLetterTemplates } from './components/document-templates/templates';
import { Container } from '../../layout-components/components/Container';
import { SenderForm } from './components/address/SenderForm';
import { AddresseeForm } from './components/address/AddresseeForm';
import { AddressData } from './components/address/AddressFormBase';

const CoverLetterGenerator: React.FC = () => {
	const [selectedTemplate, setSelectedTemplate] = useState<CoverLetterTemplate | null>(null);
	const [jobDescription, setJobDescription] = useState('');
	const [cvFile, setCvFile] = useState<File | null>(null);
	const [generatedCoverLetter, setGeneratedCoverLetter] = useState('');
	const [editableCoverLetter, setEditableCoverLetter] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isGenerationComplete, setIsGenerationComplete] = useState(false);
	const [senderData, setSenderData] = useState<AddressData>({ name: '', title: '', institution: '', address: '' });
	const [addresseeData, setAddresseeData] = useState<AddressData>({ name: '', title: '', institution: '', address: '' });
	const [sender, setSender] = useState({});
	const [addressee, setAddressee] = useState({});

	const handleSelectTemplate = useCallback((template: CoverLetterTemplate) => {
		console.log('template: ', template);
		setSelectedTemplate(template);
	}, []);

	const handleSenderDataChange = useCallback((data: AddressData) => {
		setSenderData(data);
	}, []);

	const handleAddresseeDataChange = useCallback((data: AddressData) => {
		setAddresseeData(data);
	}, []);

	const handleGenerate = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		setGeneratedCoverLetter('');
		setEditableCoverLetter('');
		setIsGenerationComplete(false);

		try {
			const formData = new FormData();
			if (selectedTemplate) {
				formData.append('template', selectedTemplate.name);
			}
			formData.append('jobDescription', jobDescription);
			if (cvFile) {
				formData.append('file', cvFile);
			}
			// Only append sender and addressee data if they are not empty
			if (Object.values(senderData).some((value) => value !== 'p')) {
				formData.append('sender', JSON.stringify(senderData));
			}
			if (Object.values(addresseeData).some((value) => value !== '')) {
				formData.append('addressee', JSON.stringify(addresseeData));
			}

			const response = await fetch('/api/generate-cover-letter', {
				method: 'POST',
				body: formData,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
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
	}, [selectedTemplate, jobDescription, cvFile, senderData, addresseeData]);

	const handleDownloadPDF = useCallback(() => {
		const doc = new jsPDF();
		const pageHeight = doc.internal.pageSize.height;
		const margin = 15;
		const fontSize = 12;
		const lineHeight = 1.15;
		const font = ['times', 'roman'];
		const indent = 36; // 0.5 inch indent (36 points)
		let y = margin;

		doc.setFont(font[0], font[1]);
		doc.setFontSize(fontSize);

		const lines = doc.splitTextToSize(editableCoverLetter, doc.internal.pageSize.width - 2 * margin);

		lines.forEach((line: string, lineIndex: number) => {
			if (y > pageHeight - margin) {
				doc.addPage();
				y = margin;
			}

			const x = lineIndex > 0 ? margin : margin + indent;
			doc.text(line, x, y);
			y += fontSize * lineHeight;
		});

		doc.save('cover_letter.pdf');
	}, [editableCoverLetter]);

	return (
		<div className="min-h-screen bg-gray-50">
			<Header />
			<main className="max-w-4xl mx-auto py-12">
				<Container
					className="mb-16"
					paddingX="none"
				>
					<header>
						<h1 className="text-4xl font-bold text-gray-700 mb-4">Create Your Academic Cover Letter</h1>
						<p className="text-xl text-gray-700">
							In 4 easy steps, create a tailored cover letter that highlights your scholarly accomplishments, demonstrates your academic potential, and captivates hiring committees.<span className="text-xs block mt-2 italic underline">Items marked with * are required.</span>
						</p>
					</header>
				</Container>

				<Container
					className="mb-16"
					paddingX="none"
				>
					<h2 className="text-lg font-semibold text-gray-700 mb-4 uppercase">1. Choose Your Cover Letter Style *</h2>
					<TemplateSelector
						templates={coverLetterTemplates}
						onSelectTemplate={handleSelectTemplate}
						selectedTemplate={selectedTemplate?.name || null}
					/>
				</Container>

				<Container
					className="mb-16"
					paddingX="none"
				>
					<h2 className="text-lg font-semibold text-gray-700 mb-4 uppercase">2. Enter Job Description *</h2>
					<JobDescriptionInput
						jobDescription={jobDescription}
						setJobDescription={setJobDescription}
					/>
				</Container>

				<Container
					className="mb-16"
					paddingX="none"
				>
					<h2 className="text-lg font-semibold text-gray-700 mb-4 uppercase">3. Upload your CV *</h2>
					<CVUpload onFileSelect={setCvFile} />
				</Container>

				<Container
					className="mb-16"
					paddingX="none"
				>
					<h2 className="text-lg font-semibold text-gray-700 uppercase">4. Additional details (optional)</h2>
					<p className="text-sm text-gray-600 mb-4">For precise control, fill in the form below. Otherwise, the AI will extract info from your CV and job description (if provided). You can also edit the final document later as well.</p>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<SenderForm onDataChange={handleSenderDataChange} />
						<AddresseeForm onDataChange={handleAddresseeDataChange} />
					</div>
				</Container>

				<Container
					className="mb-16"
					paddingX="none"
				>
					<GenerateButton
						onClick={handleGenerate}
						disabled={!selectedTemplate || !jobDescription || !cvFile}
						isLoading={isLoading}
					/>
				</Container>

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
						className="mt-4 bg-[#006D77] hover:bg-[#005a63] text-white"
					>
						Download as PDF
					</Button>
				)}
			</main>
		</div>
	);
};

export default CoverLetterGenerator;
