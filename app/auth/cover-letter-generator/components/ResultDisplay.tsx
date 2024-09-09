import React, { useRef, useEffect } from 'react';

interface ResultDisplayProps {
	content: string;
	isLoading: boolean;
	isEditable: boolean;
	onEdit?: (newContent: string) => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ content, isEditable, onEdit }) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto';
			textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 500)}px`;
		}
	}, [content]);

	const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (onEdit) {
			onEdit(e.target.value);
		}
		// Adjust height with a maximum
		e.target.style.height = 'auto';
		e.target.style.height = `${Math.min(e.target.scrollHeight, 500)}px`;
	};

	return (
		<div className="mt-8">
			<h2 className="text-xl font-semibold mb-2 text-gray-600">Generated Cover Letter</h2>
			<p className="font-semibold mb-2 text-gray-600">You can edit this document before downloading the PDF</p>
			<div className="bg-white p-4 border rounded">
				{isEditable ? (
					<textarea
						ref={textareaRef}
						className="w-full text-gray-600 focus:outline-none resize-none overflow-y-auto"
						value={content}
						onChange={handleTextareaChange}
						style={{ minHeight: '300px', maxHeight: '500px' }}
					/>
				) : (
					<pre
						className="whitespace-pre-wrap text-gray-600 overflow-y-auto"
						style={{ maxHeight: '500px' }}
					>
						{content}
					</pre>
				)}
			</div>
		</div>
	);
};
