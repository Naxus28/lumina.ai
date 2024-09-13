import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface JobDescriptionInputProps {
	jobDescription: string;
	setJobDescription: (description: string) => void;
}

export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({ jobDescription, setJobDescription }) => (
	<section className="mb-8">
		<div className="flex items-center mb-4">
			<div className="bg-[#006D77] text-white rounded-full w-6 h-6 flex items-center justify-center font-bold mr-2 text-xs">2</div>
			<h2 className="text-2xl font-semibold text-gray-700">Enter Job Description</h2>
		</div>
		<Textarea
			placeholder="Paste the job description here..."
			value={jobDescription}
			onChange={(e) => setJobDescription(e.target.value)}
			className="min-h-[200px] w-full p-4 border border-gray-300 rounded-lg"
		/>
	</section>
);
