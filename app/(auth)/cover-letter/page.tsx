'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { CoverLetterWizard, WizardStep } from './components/CoverLetterWizard';
import { coverLetterTemplates } from './components/document-templates/templates';
import { Container } from '@/app/layout-components/Container';
import { H1, H2, Paragraph, Span } from '@/app/components/typography';
import { AddressFormData } from './components/address/hooks/useAddressForm';
import { CoverLetterTemplate } from './components/document-templates/models';
import { DocumentDisplay } from '@/app/components/shared/DocumentDisplay';
import { ErrorMessage } from './components/ErrorMessage';
import { DownloadPdfButton } from '@/app/components/DownloadPdfButton';
import { GenerateButton } from '@/app/components/GenerateButton';
import { TemplateSelector } from './components/document-templates/TemplateSelector';
import { JobDescriptionInput } from './components/JobDescriptionInput';
import { CVUpload } from './components/CVUpload';
import { SenderForm } from './components/address/SenderForm';
import { RecipientForm } from './components/address/RecipientForm';
import { HighlightInput } from './components/HighlightInput';
import { CustomFields } from './components/CustomFields';

const CoverLetterGenerator: React.FC = () => {
	const [selectedTemplate, setSelectedTemplate] = useState<CoverLetterTemplate | null>(null);
	const [jobDescription, setJobDescription] = useState('');
	const [cvFile, setCvFile] = useState<File | null>(null);
	const [generatedCoverLetter, setGeneratedCoverLetter] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isGenerationComplete, setIsGenerationComplete] = useState(false);
	const [senderData, setSenderData] = useState<AddressFormData>({ name: '', title: '', institution: '', address: '' });
	const [recipientData, setRecipientData] = useState<AddressFormData>({
		name: '',
		title: '',
		institution: '',
		address: '',
	});
	const [highlights, setHighlights] = useState<string[]>([]);
	const [customFields, setCustomFields] = useState<Record<string, string>>({});
	const [newFieldName, setNewFieldName] = useState('');
	const resultDisplayRef = useRef<HTMLDivElement>(null);
	const [isStreamStarted, setIsStreamStarted] = useState(false);

	const handleSelectTemplate = (template: CoverLetterTemplate) => {
		console.log('template', template);
		setSelectedTemplate(template);
	};

	const handleGenerate = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		setGeneratedCoverLetter('');
		setIsGenerationComplete(false);
		setIsStreamStarted(false);

		try {
			const formData = new FormData();
			if (selectedTemplate) {
				formData.append('template', selectedTemplate.name);
			}

			formData.append('jobDescription', jobDescription);

			if (cvFile) {
				formData.append('file', cvFile);
			}
			if (Object.values(senderData).some((value) => value !== '')) {
				formData.append('sender', JSON.stringify(senderData));
			}
			if (Object.values(recipientData).some((value) => value !== '')) {
				formData.append('recipient', JSON.stringify(recipientData));
			}
			if (Object.values(customFields).length > 0) {
				formData.append('customFields', JSON.stringify(customFields));
			}
			console.log('highlights page', highlights);
			if (highlights.length > 0) {
				formData.append('highlights', JSON.stringify(highlights));
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
						if (!isStreamStarted) {
							setIsStreamStarted(true);
						}
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
	}, [selectedTemplate, jobDescription, cvFile, senderData, recipientData, customFields]);

	const handleEdit = (newContent: string) => {
		setGeneratedCoverLetter(newContent);
	};

	useEffect(() => {
		if (isStreamStarted && resultDisplayRef.current) {
			resultDisplayRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [isStreamStarted]);

	const steps: WizardStep[] = [
		{
			title: 'Choose Your Cover Letter Structure',
			description: 'Select a template that best fits the style and format you want for your cover letter.',
			component: (
				<TemplateSelector
					templates={coverLetterTemplates}
					selectedTemplate={selectedTemplate?.name || null}
					onSelectTemplate={handleSelectTemplate}
				/>
			),
		},
		{
			title: 'Job Description',
			description:
				'Paste or type the job description here. This will help tailor your cover letter to the specific position.',
			component: (
				<JobDescriptionInput
					jobDescription={jobDescription}
					setJobDescription={setJobDescription}
				/>
			),
		},
		{
			title: 'Upload CV',
			description: 'Your CV will be used to extract relevant information for your cover letter.',
			component: <CVUpload onFileSelect={setCvFile} />,
		},
		{
			title: 'Additional Details',
			description:
				'Optionally add sender and recipient details. If omitted, the AI will extract the sender details from your CV and recipient details from the job description (if available). You can review and edit the final letter later, adding the details if needed.',
			component: (
				<>
					<SenderForm
						onDataChange={setSenderData}
						styleOverrides={{ card: 'mb-8' }}
					/>
					<RecipientForm onDataChange={setRecipientData} />
				</>
			),
		},
		{
			title: 'Custom Fields',
			description: 'Add specific aspects of your CV to highlight and include custom fields in your cover letter.',
			component: (
				<Container>
					<Container
						paddingY="none"
						className="border-b border-gray-300 pb-8"
					>
						<H2 className="text-md font-medium text-gray-900">CV Highlights</H2>
						<Paragraph className="text-sm text-gray-600">
							Enter aspects of your CV you'd like to highlight in the cover letter (e.g. publications, grants acquired,
							teaching approach, etc). For better results, limit to a maximum of two aspects.
						</Paragraph>
						<HighlightInput
							highlights={highlights}
							setHighlights={setHighlights}
						/>
					</Container>
					<Container
						paddingY="none"
						className="mt-8"
					>
						<H2 className="text-md font-medium text-gray-900">Custom Fields</H2>
						<Paragraph className="text-sm text-gray-600">
							Add custom fields for important additional information. Specify a field name, then provide its
							description. Examples: "Personal Values" (how your ethics influence teaching) or "Desired Teaching
							Discipline" (subject you would like to teach if hired).
						</Paragraph>
						<CustomFields
							customFields={customFields}
							setCustomFields={setCustomFields}
							newFieldName={newFieldName}
							setNewFieldName={setNewFieldName}
						/>
					</Container>
				</Container>
			),
		},
	];

	return (
		<div className="container mx-auto px-4 py-8">
			<main>
				<H1>Cover Letter Generator</H1>
				<Paragraph>
					Our AI analyzes your CV and the job description to craft a tailored cover letter. It highlights your relevant
					scholarly achievements, research experience, and academic potential, aligning them with the position's
					requirements. Once generated, you can refine and personalize the letter, ensuring it captivates hiring
					committees with your unique voice and qualifications.
				</Paragraph>
				<Span className="text-xs block mt-2 italic">
					Items marked with <Span className="text-red-500">*</Span> are required.
				</Span>
				<Container>
					<CoverLetterWizard
						steps={steps}
						onComplete={handleGenerate}
						isLoading={isLoading}
					/>
				</Container>
				<Container>
					<GenerateButton
						onClick={handleGenerate}
						disabled={!selectedTemplate || !jobDescription || !cvFile}
						isLoading={isLoading}
						documentType="Cover Letter"
					/>
				</Container>

				{error && <ErrorMessage message={error} />}
				{generatedCoverLetter && (
					<div ref={resultDisplayRef}>
						<DocumentDisplay
							content={generatedCoverLetter}
							isLoading={isLoading}
							isEditable={true}
							documentType="Cover Letter"
							onEdit={handleEdit}
							isGenerationComplete={isGenerationComplete}
						/>
					</div>
				)}
				{isGenerationComplete && (
					<DownloadPdfButton
						content={generatedCoverLetter}
						fileName="cover_letter.pdf"
					/>
				)}
			</main>
		</div>
	);
};

export default CoverLetterGenerator;
