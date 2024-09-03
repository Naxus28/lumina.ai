// src/components/CoverLetter/ResultDisplay.tsx
import React, { useRef, useEffect } from 'react';

interface ResultDisplayProps {
	content: string;
	isLoading: boolean;
	isEditable: boolean;
	onEdit?: (newContent: string) => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ content, isEditable, onEdit }) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto';
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	}, [content]);

	const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (onEdit) {
			onEdit(e.target.value);
		}
		// Adjust height
		e.target.style.height = 'auto';
		e.target.style.height = `${e.target.scrollHeight}px`;
	};

	return (
		<div className="mt-8">
			<h2 className="text-xl font-semibold mb-2 text-gray-600">Generated Cover Letter</h2>
			<p className="font-semibold mb-2 text-gray-600">You can edit this document before downloading the PDF</p>
			<div className="bg-white p-4 border rounded">
				{isEditable ? (
					<textarea
						ref={textareaRef}
						className="w-full text-gray-600 focus:outline-none resize-none overflow-hidden"
						value={content}
						onChange={handleTextareaChange}
						style={{ minHeight: '300px' }}
					/>
				) : (
					<pre className="whitespace-pre-wrap text-gray-600">{content}</pre>
				)}
			</div>
		</div>
	);
};

export default ResultDisplay;
