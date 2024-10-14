'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { TemplateSelector } from './components/document-templates/TemplateSelector';
import { JobDescriptionInput } from './components/JobDescriptionInput';
import { CVUpload } from './components/CVUpload';
import { GenerateButton } from '@/app/components/GenerateButton';
import { DocumentDisplay } from '@/app/components/shared/DocumentDisplay';
import { ErrorMessage } from './components/ErrorMessage';
import jsPDF from 'jspdf';
import { CoverLetterTemplate } from './components/document-templates/models';
import { coverLetterTemplates } from './components/document-templates/templates';
import { Container } from '../../layout-components/Container';
import { SenderForm } from './components/address/SenderForm';
import { RecipientForm } from './components/address/RecipientForm';
import { AddressData } from './components/address/AddressFormBase';
import { H1, H2, Paragraph, Span } from '@/app/components/typography';
import { DownloadPdfButton } from '@/app/components/DownloadPdfButton';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

const CoverLetterGenerator: React.FC = () => {
	const [selectedTemplate, setSelectedTemplate] = useState<CoverLetterTemplate | null>(null);
	const [jobDescription, setJobDescription] = useState('');
	const [cvFile, setCvFile] = useState<File | null>(null);
	const [generatedCoverLetter, setGeneratedCoverLetter] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isGenerationComplete, setIsGenerationComplete] = useState(false);
	const [senderData, setSenderData] = useState<AddressData>({ name: '', title: '', institution: '', address: '' });
	const [addresseeData, setAddresseeData] = useState<AddressData>({
		name: '',
		title: '',
		institution: '',
		address: '',
	});
	const resultDisplayRef = useRef<HTMLDivElement>(null);
	const [isStreamStarted, setIsStreamStarted] = useState(false);
	const [customFields, setCustomFields] = useState<Record<string, string>>({});
	const [newFieldName, setNewFieldName] = useState('');
	const [additionalDetails, setAdditionalDetails] = useState<string>('');

	useEffect(() => {
		if (isStreamStarted && resultDisplayRef.current) {
			resultDisplayRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}, [isStreamStarted]);

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
			if (Object.values(addresseeData).some((value) => value !== '')) {
				formData.append('addressee', JSON.stringify(addresseeData));
			}
			formData.append('customFields', JSON.stringify(customFields));

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
	}, [selectedTemplate, jobDescription, cvFile, senderData, addresseeData, customFields]);

	const handleEdit = useCallback((newContent: string) => {
		setGeneratedCoverLetter(newContent);
	}, []);

	const handleAddCustomField = () => {
		if (newFieldName.trim() !== '') {
			setCustomFields((prev) => ({
				...prev,
				[newFieldName.trim()]: '',
			}));
			setNewFieldName('');
		}
	};

	const handleRemoveCustomField = (fieldName: string) => {
		setCustomFields((prev) => {
			const newFields = { ...prev };
			delete newFields[fieldName];
			return newFields;
		});
	};

	const handleCustomFieldChange = (fieldName: string, value: string) => {
		setCustomFields((prev) => ({
			...prev,
			[fieldName]: value,
		}));
	};

	return (
		<div className="min-h-screen bg-gray-50 w-full">
			<main>
				<Container>
					<header>
						<H1>Create Your Academic Cover Letter</H1>
						<Paragraph>
							Let our AI craft a tailored cover letter showcasing your scholarly achievements and academic potential.
							You'll then have the opportunity to refine and personalize the letter, ensuring it captivates hiring
							committees with your unique voice and qualifications.
						</Paragraph>
						<Span className="text-xs block mt-2 italic">Items marked with * are required.</Span>
					</header>
				</Container>

				<Container>
					<H2 className="text-lg">
						Choose Your Cover Letter Style<span className="text-red-500">*</span>
					</H2>
					<TemplateSelector
						templates={coverLetterTemplates}
						onSelectTemplate={handleSelectTemplate}
						selectedTemplate={selectedTemplate?.name || null}
					/>
				</Container>

				<Container>
					<H2 className="text-lg">
						Enter Job Description<span className="text-red-500">*</span>
					</H2>
					<JobDescriptionInput
						jobDescription={jobDescription}
						setJobDescription={setJobDescription}
					/>
				</Container>

				<Container>
					<H2 className="text-lg">
						Upload your CV<span className="text-red-500">*</span>
					</H2>
					<CVUpload onFileSelect={setCvFile} />
				</Container>

				<Container>
					<H2 className="text-lg">Additional details</H2>
					<Paragraph className="text-sm text-gray-600 pb-4">
						For additional customization, you may provide extra details in the form below. If left blank, our AI system
						will automatically extract relevant information from your CV and the provided job description (including
						recipient details if available). You'll have the opportunity to review and edit the final document before
						submission.
					</Paragraph>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<SenderForm onDataChange={handleSenderDataChange} />
						<RecipientForm onDataChange={handleAddresseeDataChange} />
					</div>
				</Container>

				<Container>
					<H2 className="text-lg">Custom Fields</H2>
					<Paragraph className="text-sm text-gray-600 pb-4">
						Add any additional sections you'd like to include in your cover letter.
					</Paragraph>
					<div className="space-y-4">
						{Object.entries(customFields).map(([fieldName, fieldValue]) => (
							<div
								key={fieldName}
								className="flex flex-col space-y-2"
							>
								<div className="flex justify-between items-center">
									<Label htmlFor={fieldName}>{fieldName}</Label>
									<Button
										onClick={() => handleRemoveCustomField(fieldName)}
										variant="ghost"
										size="sm"
									>
										Remove
									</Button>
								</div>
								<Textarea
									id={fieldName}
									value={fieldValue}
									onChange={(e) => handleCustomFieldChange(fieldName, e.target.value)}
									placeholder={`Enter content for ${fieldName}`}
								/>
							</div>
						))}
						<div className="flex space-x-2">
							<Input
								placeholder="New field name"
								value={newFieldName}
								onChange={(e) => setNewFieldName(e.target.value)}
							/>
							<Button
								className="bg-purple-500 hover:bg-purple-600"
								onClick={handleAddCustomField}
							>
								Add Field
							</Button>
						</div>
					</div>
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
