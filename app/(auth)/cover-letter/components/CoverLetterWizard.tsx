import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TemplateSelector } from './document-templates/TemplateSelector';
import { JobDescriptionInput } from './JobDescriptionInput';
import { CVUpload } from './CVUpload';
import { SenderForm } from './address/SenderForm';
import { RecipientForm } from './address/RecipientForm';
import { HighlightInput } from './HighlightInput';
import { CustomFields } from './CustomFields';
import { CoverLetterTemplate } from './document-templates/models';
import { AddressFormData } from './address/hooks/useAddressForm';
import { Card, CardContent } from '@/components/ui/card';
import { H2, Paragraph, Span } from '@/app/components/typography';
import { Container } from '../../../layout-components/Container';

interface CoverLetterWizardProps {
	templates: CoverLetterTemplate[];
	selectedTemplate: string | null;
	onSelectTemplate: (template: CoverLetterTemplate) => void;
	jobDescription: string;
	setJobDescription: (value: string) => void;
	cvFile: File | null;
	setCvFile: (file: File | null) => void;
	senderData: AddressFormData;
	setSenderData: (data: AddressFormData) => void;
	recipientData: AddressFormData;
	setRecipientData: (data: AddressFormData) => void;
	highlights: string[];
	setHighlights: (highlights: string[]) => void;
	customFields: Record<string, string>;
	setCustomFields: React.Dispatch<React.SetStateAction<Record<string, string>>>;
	newFieldName: string;
	setNewFieldName: (value: string) => void;
}

const steps = [
	{ title: 'Choose Your Cover Letter Style', isMandatory: true, component: TemplateSelector },
	{ title: 'Job Description', isMandatory: true, component: JobDescriptionInput },
	{ title: 'Upload CV', isMandatory: true, component: CVUpload },
	{ title: 'Additional Details', isMandatory: false, component: null },
	{ title: '', isMandatory: false, component: null },
];

export const CoverLetterWizard: React.FC<CoverLetterWizardProps> = (props) => {
	const [currentStep, setCurrentStep] = useState(0);

	const renderStep = () => {
		switch (currentStep) {
			case 0:
				return (
					<TemplateSelector
						templates={props.templates}
						selectedTemplate={props.selectedTemplate}
						onSelectTemplate={props.onSelectTemplate}
					/>
				);
			case 1:
				return (
					<JobDescriptionInput
						jobDescription={props.jobDescription}
						setJobDescription={props.setJobDescription}
					/>
				);
			case 2:
				return <CVUpload onFileSelect={props.setCvFile} />;
			case 3:
				return (
					<>
						<Paragraph className="text-sm text-gray-600 pb-4">
							For additional customization, you may provide extra details in the form below. If left blank, our AI
							system will automatically extract relevant information from your CV and the provided job description
							(including recipient details if available). You'll have the opportunity to review and edit the final
							document before submission.
						</Paragraph>
						<SenderForm onDataChange={props.setSenderData} />
						<div className="mb-8" />
						<RecipientForm onDataChange={props.setRecipientData} />
					</>
				);
			case 4:
				return (
					<>
						<Container paddingY="none">
							<H2 className="text-lg mb-4">CV Highlights</H2>
							<Paragraph className="text-sm text-gray-600">
								Enter aspects of your CV you'd like to highlight in the cover letter.
							</Paragraph>
							<HighlightInput
								highlights={props.highlights}
								setHighlights={props.setHighlights as React.Dispatch<React.SetStateAction<string[]>>}
							/>
						</Container>
						<Container
							paddingY="none"
							className="mt-8"
						>
							<H2 className="text-lg mb-4">Custom Fields</H2>
							<Paragraph className="text-sm text-gray-600">
								Add any additional information that you feel is important to your cover letter. First add the field
								name, then you will have the opportunity to add a description for the field created. For example, you
								might add a field for "Personal Values", where you describe how your moral compass impacts your
								teaching, or add a field "Desired Teaching Discipline" to specify a subject area you're interested in
								teaching at the new university.
							</Paragraph>
							<CustomFields
								customFields={props.customFields}
								setCustomFields={props.setCustomFields}
								newFieldName={props.newFieldName}
								setNewFieldName={props.setNewFieldName as React.Dispatch<React.SetStateAction<string>>}
							/>
						</Container>
					</>
				);
			default:
				return null;
		}
	};

	const goToNextStep = () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1);
		}
	};

	const goToPreviousStep = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	return (
		<Card>
			<CardContent className="p-16">
				<div>
					<H2 className="text-lg mb-4">
						{steps[currentStep].title} {steps[currentStep].isMandatory ? <Span className="text-red-500">*</Span> : ''}
					</H2>
					{renderStep()}
					<div className="flex justify-between mt-16">
						<Button
							onClick={goToPreviousStep}
							className="bg-purple-600 hover:bg-purple-700"
							disabled={currentStep === 0}
						>
							Previous
						</Button>
						<Button
							onClick={goToNextStep}
							className="bg-purple-600 hover:bg-purple-700"
							disabled={currentStep === steps.length - 1}
						>
							Next
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

