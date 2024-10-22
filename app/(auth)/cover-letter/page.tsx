'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { CoverLetterWizard, WizardStep } from './components/CoverLetterWizard';
import { coverLetterTemplates } from './components/document-templates/templates';
import { Container } from '@/app/layout-components/Container';
import { H1, Paragraph, Span } from '@/app/components/typography';
import { AddressFormData, useAddressForm } from './components/address/hooks/useAddressForm';
import { CoverLetterTemplate } from './components/document-templates/models';
import { DocumentDisplay } from '@/app/components/shared/DocumentDisplay';
import { ErrorMessage } from './components/ErrorMessage';
import { DownloadPdfButton } from '@/app/components/DownloadPdfButton';
import { GenerateButton } from '@/app/components/GenerateButton';
import { TemplateSelector } from './components/document-templates/TemplateSelector';
import { JobDescriptionInput } from './components/JobDescriptionInput';
import { CVUpload } from './components/CVUpload';
import { RecipientForm } from './components/address/RecipientForm';
import { HighlightInput } from './components/HighlightInput';
import { CustomFields } from './components/CustomFields';
import { ProgressBar, ProgressStep } from '@/app/components/ProgressBar';

const CoverLetterGenerator: React.FC = () => {
	const [selectedTemplate, setSelectedTemplate] = useState<CoverLetterTemplate | null>(null);
	const [jobDescription, setJobDescription] = useState('');
	const [cvFile, setCvFile] = useState<File | null>(null);
	const [cvFileName, setCVFileName] = useState<string | undefined>(undefined);
	const [generatedCoverLetter, setGeneratedCoverLetter] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isGenerationComplete, setIsGenerationComplete] = useState(false);
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
	const [currentStep, setCurrentStep] = useState(0);

	const handleSelectTemplate = (template: CoverLetterTemplate) => {
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
			if (Object.values(recipientData).some((value) => value !== '')) {
				formData.append('recipient', JSON.stringify(recipientData));
			}
			if (Object.values(customFields).length > 0) {
				const validCustomFields = Object.fromEntries(Object.entries(customFields).filter(([_, v]) => v !== ''));
				formData.append('customFields', JSON.stringify(validCustomFields));
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
	}, [selectedTemplate, jobDescription, cvFile, recipientData, customFields]);

	const handleEdit = (newContent: string) => {
		setGeneratedCoverLetter(newContent);
	};

	useEffect(() => {
		if (isStreamStarted && resultDisplayRef.current) {
			resultDisplayRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [isStreamStarted]);

	const progressSteps: ProgressStep[] = [
		{ id: 'template', label: 'Template', isMandatory: true, isCompleted: !!selectedTemplate },
		{ id: 'jobDescription', label: 'Job Description', isMandatory: true, isCompleted: !!jobDescription },
		{ id: 'cv', label: 'CV', isMandatory: true, isCompleted: !!cvFile },
		{ id: 'recipient', label: 'Recipient', isMandatory: false, isCompleted: !!recipientData.name },
		{ id: 'highlights', label: 'Highlights', isMandatory: false, isCompleted: highlights.length > 0 },
		{
			id: 'customFields',
			label: 'Custom Fields',
			isMandatory: false,
			isCompleted: Object.values(customFields).filter(Boolean).length > 0,
		},
	];

	const steps: WizardStep[] = [
		{
			title: 'Choose Your Cover Letter Structure',
			description: 'Select a template that best fits the style and format you want for your cover letter.',
			isMandatory: true,
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
			isMandatory: true,
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
			isMandatory: true,
			component: (
				<CVUpload
					onFileSelect={setCvFile}
					setCVFileName={setCVFileName}
					cvFileName={cvFileName}
				/>
			),
		},
		{
			title: 'Additional Details (optional)',
			description:
				'Enter recipient details here. If omitted the AI will use details from the job description (if receiver info is available). Sender details come from your CV. You can add or edit all details when reviewing the final letter.',
			isMandatory: false,
			component: (
				<RecipientForm
					handleInputChange={setRecipientData}
					formData={recipientData}
				/>
			),
		},
		{
			title: 'Highligts (optional)',
			description:
				'Add specific aspects of your CV to highlight in the cover letter (e.g. publications, grants acquired, teaching approach, etc). For better results, limit to a maximum of two items.',
			isMandatory: false,
			component: (
				<HighlightInput
					highlights={highlights}
					setHighlights={setHighlights}
				/>
			),
		},
		{
			title: 'Custom Fields (optional)',
			description:
				'Include custom fields in your cover letter. Specify a field name, then provide its description. Examples: "Personal Values" (how your ethics shape your teaching) or "Desired Teaching Discipline" (subject you would like to teach if hired).',
			isMandatory: false,
			component: (
				<CustomFields
					customFields={customFields}
					setCustomFields={setCustomFields}
					newFieldName={newFieldName}
					setNewFieldName={setNewFieldName}
				/>
			),
		},
	];

	const handleStepClick = (index: number) => {
		setCurrentStep(index);
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<main>
				<H1>Cover Letter Generator</H1>
				<Paragraph>
					Our AI analyzes your CV, the job description, and custom fields to craft a tailored cover letter. It
					highlights your relevant scholarly achievements, research experience, and academic potential, aligning them
					with the position's requirements. Once generated, you can refine and personalize the letter, ensuring it
					captivates hiring committees with your unique voice and qualifications.
				</Paragraph>
				<Span className="text-xs block mt-2 italic">
					Items marked with <Span className="text-red-500">*</Span> are required.
				</Span>
				<ProgressBar
					steps={progressSteps}
					currentStep={currentStep}
					onStepClick={handleStepClick}
					styleOverrides={{ card: 'mt-8' }}
				/>
				<Container>
					<CoverLetterWizard
						steps={steps}
						currentStep={currentStep}
						setCurrentStep={setCurrentStep}
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
