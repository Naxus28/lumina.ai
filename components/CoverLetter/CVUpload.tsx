// src/components/CoverLetter/CVUpload.tsx
import React from 'react';

interface CVUploadProps {
	onFileSelect: (file: File) => void;
}

const CVUpload: React.FC<CVUploadProps> = ({ onFileSelect }) => {
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			onFileSelect(file);
		}
	};

	return (
		<div className="mb-6">
			<h2 className="text-2xl font-semibold text-indigo-900 mb-4">Upload Your CV (PDF)</h2>
			<input
				type="file"
				accept=".pdf"
				onChange={handleFileChange}
				className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-indigo-50 file:text-indigo-700
          hover:file:bg-indigo-100"
			/>
		</div>
	);
};

export default CVUpload;
