import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface JobDescriptionInputProps {
	jobDescription: string;
	setJobDescription: (description: string) => void;
}

export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({ jobDescription, setJobDescription }) => (
	<section className="mb-8">
		<h2 className="text-2xl font-bold text-gray-700 mb-4">2. Enter Job Description</h2>
		<Textarea
			placeholder="Paste the job description here..."
			value={jobDescription}
			onChange={(e) => setJobDescription(e.target.value)}
			className="min-h-[200px] w-full p-4 border border-gray-300 rounded-lg"
		/>
	</section>
);
