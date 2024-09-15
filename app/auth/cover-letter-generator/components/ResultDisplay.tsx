import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FontBoldIcon, FontItalicIcon, TextAlignLeftIcon, TextAlignCenterIcon, TextAlignRightIcon } from '@radix-ui/react-icons';

interface ResultDisplayProps {
	content: string;
	isLoading: boolean;
	isEditable: boolean;
	onEdit?: (newContent: string) => void;
}

const fontFamilies = ['Times New Roman', 'Arial', 'Calibri', 'Georgia'];
const fontSizes = ['10pt', '11pt', '12pt', '14pt'];

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ content, isEditable: initialIsEditable, onEdit, isLoading }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editableContent, setEditableContent] = useState(content);
	const [fontFamily, setFontFamily] = useState('Times New Roman');
	const [fontSize, setFontSize] = useState('12pt');
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setEditableContent(content);
	}, [content]);

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleSave = () => {
		setIsEditing(false);
		if (onEdit) {
			onEdit(editableContent);
		}
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

	const commonStyles: React.CSSProperties = {
		fontFamily: fontFamily,
		fontSize: fontSize,
		lineHeight: 1.15,
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
			<h2 className="text-xl font-semibold mb-2 text-gray-900">Generated Cover Letter</h2>
			<p className="font-semibold mb-2 text-gray-900">You can edit this document before downloading the PDF</p>

			<div className="mb-4 flex items-center space-x-4">
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

				<Button
					variant="outline"
					size="icon"
				>
					<FontBoldIcon className="h-4 w-4" />
				</Button>
				<Button
					variant="outline"
					size="icon"
				>
					<FontItalicIcon className="h-4 w-4" />
				</Button>
				<Button
					variant="outline"
					size="icon"
				>
					<TextAlignLeftIcon className="h-4 w-4" />
				</Button>
				<Button
					variant="outline"
					size="icon"
				>
					<TextAlignCenterIcon className="h-4 w-4" />
				</Button>
				<Button
					variant="outline"
					size="icon"
				>
					<TextAlignRightIcon className="h-4 w-4" />
				</Button>
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
			{!isLoading && (
				<div className="mt-4 flex justify-start space-x-2">
					{!isEditing && (
						<Button
							className="w-full"
							onClick={handleEdit}
						>
							Edit
						</Button>
					)}
					{isEditing && (
						<Button
							className="w-full"
							onClick={handleSave}
						>
							Save
						</Button>
					)}
				</div>
			)}
		</div>
	);
};
