import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pencil, Save, X } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Alert, AlertDescription } from '@/components/ui/alert'; // Import these components
import { H2, Paragraph } from '../typography';

interface DocumentDisplayProps {
	content: string;
	isLoading: boolean;
	isEditable: boolean;
	documentType: string;
	onEdit?: (newContent: string) => void;
	showAIWarning?: boolean;
	isGenerationComplete: boolean;
}

const fontFamilies = ['Times New Roman', 'Arial', 'Calibri', 'Georgia'];
const fontSizes = ['10pt', '11pt', '12pt', '14pt'];
const lineSpacings = ['1', '1.15', '1.5', '2'];

export const DocumentDisplay: React.FC<DocumentDisplayProps> = ({
	content,
	isEditable: initialIsEditable,
	onEdit,
	isLoading,
	documentType,
	showAIWarning = true,
	isGenerationComplete,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editableContent, setEditableContent] = useState(content);
	const [originalContent, setOriginalContent] = useState(content);
	const [fontFamily, setFontFamily] = useState('Times New Roman');
	const [fontSize, setFontSize] = useState('12pt');
	const [lineSpacing, setLineSpacing] = useState('1.15');
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setEditableContent(content);
		setOriginalContent(content);
	}, [content]);

	const handleEdit = () => {
		setIsEditing(true);
		setOriginalContent(editableContent);
	};

	const handleSave = () => {
		setIsEditing(false);
		if (onEdit) {
			onEdit(editableContent);
		}
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditableContent(originalContent);
	};

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setEditableContent(e.target.value);
	};

	const handleFontFamilyChange = (value: string) => {
		setFontFamily(value);
	};

	const handleFontSizeChange = (value: string) => {
		setFontSize(value);
	};

	const handleLineSpacingChange = (value: string) => {
		setLineSpacing(value);
	};

	const commonStyles: React.CSSProperties = {
		fontFamily: fontFamily,
		fontSize: fontSize,
		lineHeight: lineSpacing,
		padding: '1in',
		width: '100%',
		height: '100%',
		boxSizing: 'border-box',
		margin: 0,
		border: 'none',
		overflowY: 'auto',
		whiteSpace: 'pre-wrap',
		wordWrap: 'break-word',
	};

	const formattedContent = editableContent.split('\n\n').map((paragraph, index) => (
		<p
			key={index}
			style={{ marginTop: 0, marginBottom: '1em' }}
		>
			{paragraph}
		</p>
	));

	return (
		<div className="mt-8">
			<div className="mb-8">
				<H2 className="text-2xl text-gray-800 mb-4">Generated {documentType}</H2>
				<Paragraph className="text-sm text-gray-600 mb-4">
					You can edit this document before downloading the PDF
				</Paragraph>
			</div>

			<div className="mb-4 flex items-center space-x-4">
				{!isLoading && initialIsEditable && (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								{isEditing ? (
									<div className="flex space-x-2">
										<Button
											variant="outline"
											size="sm"
											onClick={handleSave}
											className="flex items-center gap-2"
										>
											<Save className="h-4 w-4" />
											<span>Save Changes</span>
										</Button>
										<Button
											variant="outline"
											size="sm"
											onClick={handleCancel}
											className="flex items-center gap-2"
										>
											<X className="h-4 w-4" />
											<span>Cancel</span>
										</Button>
									</div>
								) : (
									<Button
										variant="outline"
										size="sm"
										onClick={handleEdit}
										className="flex items-center gap-2"
									>
										<Pencil className="h-4 w-4" />
										<span>Edit</span>
									</Button>
								)}
							</TooltipTrigger>
							<TooltipContent>
								<p>{isEditing ? 'Save changes or cancel' : `Click to edit the ${documentType}`}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}
				<Select
					onValueChange={handleFontFamilyChange}
					value={fontFamily}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Font Family" />
					</SelectTrigger>
					<SelectContent>
						{fontFamilies.map((font) => (
							<SelectItem
								key={font}
								value={font}
							>
								{font}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Select
					onValueChange={handleFontSizeChange}
					value={fontSize}
				>
					<SelectTrigger className="w-[100px]">
						<SelectValue placeholder="Font Size" />
					</SelectTrigger>
					<SelectContent>
						{fontSizes.map((size) => (
							<SelectItem
								key={size}
								value={size}
							>
								{size}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Select
					onValueChange={handleLineSpacingChange}
					value={lineSpacing}
				>
					<SelectTrigger className="w-[120px]">
						<SelectValue placeholder="Line Spacing" />
					</SelectTrigger>
					<SelectContent>
						{lineSpacings.map((spacing) => (
							<SelectItem
								key={spacing}
								value={spacing}
							>
								{spacing}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div
				className="bg-white border rounded shadow-md"
				style={{ height: '11in', margin: 'auto', overflow: 'hidden' }}
			>
				<div
					ref={contentRef}
					className="w-full h-full text-gray-900 focus:outline-none"
					style={commonStyles}
				>
					{isEditing ? (
						<textarea
							value={editableContent}
							onChange={handleChange}
							style={{
								...commonStyles,
								padding: 'none',
								resize: 'none',
								outline: 'none',
								backgroundColor: 'transparent',
							}}
						/>
					) : (
						<div>{formattedContent}</div>
					)}
				</div>
			</div>
			{showAIWarning && isGenerationComplete && (
				<Alert className="mb-4 mt-4">
					<AlertDescription>
						This document was generated using AI technology. While it provides a solid foundation, we recommend
						carefully reviewing and personalizing the content to ensure it accurately reflects your unique experiences
						and voice. Your expertise and personal touch will enhance the document's effectiveness and authenticity.
					</AlertDescription>
				</Alert>
			)}
		</div>
	);
};
