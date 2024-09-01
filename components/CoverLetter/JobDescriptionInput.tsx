// src/components/CoverLetter/JobDescriptionInput.tsx
import React from 'react';

interface JobDescriptionInputProps {
	onChange: (value: string) => void;
}

const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({ onChange }) => {
	return (
		<div className="mb-6">
			<h2 className="text-2xl font-semibold text-indigo-900 mb-4">Job Description</h2>
			<textarea
				className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-gray-600"
				rows={6}
				placeholder="Paste the job description here"
				onChange={(e) => onChange(e.target.value)}
			></textarea>
		</div>
	);
};

export default JobDescriptionInput;
