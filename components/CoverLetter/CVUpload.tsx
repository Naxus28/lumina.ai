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
			<h2 className="text-2xl font-semibold text-indigo-900 mb-4">Upload Your CV</h2>
			<label className="flex flex-col items-center px-4 py-6 bg-white text-indigo-600 rounded-lg shadow-lg tracking-wide uppercase border border-indigo-300 cursor-pointer hover:bg-indigo-50">
				<svg
					className="w-8 h-8"
					fill="currentColor"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
				>
					<path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
				</svg>
				<span className="mt-2 text-base leading-normal">Select a file</span>
				<input
					type="file"
					className="hidden"
					onChange={handleFileChange}
					accept=".pdf,.doc,.docx"
				/>
			</label>
		</div>
	);
};

export default CVUpload;
