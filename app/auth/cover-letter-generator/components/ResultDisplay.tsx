import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface ResultDisplayProps {
	content: string;
	isLoading: boolean;
	isEditable: boolean;
	onEdit?: (newContent: string) => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ content, isEditable: initialIsEditable, onEdit, isLoading }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editableContent, setEditableContent] = useState(content);
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

	const commonStyles: React.CSSProperties = {
		fontFamily: 'Times New Roman, serif',
		fontSize: '12pt',
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
			<h2 className="text-xl font-semibold mb-2 text-gray-600">Generated Cover Letter</h2>
			<p className="font-semibold mb-2 text-gray-600">You can edit this document before downloading the PDF</p>
			<div
				className="bg-white border rounded shadow-md"
				style={{ width: '8.5in', height: '11in', margin: 'auto', overflow: 'hidden' }}
			>
				<div
					ref={contentRef}
					className="w-full h-full text-gray-600 focus:outline-none"
					style={commonStyles}
				>
					{isEditing ? (
						<textarea
							value={editableContent}
							onChange={handleChange}
							style={{
								...commonStyles,
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
