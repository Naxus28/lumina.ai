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
			formData.append('sender', JSON.stringify(senderData));
			formData.append('addressee', JSON.stringify(addresseeData));

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
			<main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<Container padding="md">
					<TemplateSelector
						templates={coverLetterTemplates}
						onSelectTemplate={handleSelectTemplate}
						selectedTemplate={selectedTemplate?.name || null}
					/>
				</Container>
				<Container padding="md">
					<h2 className="text-lg font-semibold text-gray-800 mb-4 uppercase">2. Provide the sender and addressee details to add to your cover letter</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<SenderForm onDataChange={handleSenderDataChange} />
						<AddresseeForm onDataChange={handleAddresseeDataChange} />
					</div>
				</Container>
				<Container>
					<JobDescriptionInput
						jobDescription={jobDescription}
						setJobDescription={setJobDescription}
					/>
				</Container>
				<Container>
					<CVUpload onFileSelect={setCvFile} />
					<GenerateButton
						onClick={handleGenerate}
						disabled={!selectedTemplate || !jobDescription || !cvFile || !senderData.name || !addresseeData.name}
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
