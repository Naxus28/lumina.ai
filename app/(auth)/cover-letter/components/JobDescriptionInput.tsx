import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface JobDescriptionInputProps {
	jobDescription: string;
	setJobDescription: (description: string) => void;
}

export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({ jobDescription, setJobDescription }) => (
	<Textarea
		placeholder="Paste the job description here..."
		value={jobDescription}
		onChange={(e) => setJobDescription(e.target.value)}
		className="min-h-[256px] max-h-[500px] w-full p-4 border-gray-300 rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
	/>
);
