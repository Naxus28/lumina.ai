import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface JobDescriptionInputProps {
	jobDescription: string;
	setJobDescription: (description: string) => void;
}

export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({ jobDescription, setJobDescription }) => (
	<section>
		<div className="flex items-center mb-4">
			<h2 className="text-2xl font-semibold text-gray-700">2. Enter Job Description</h2>
		</div>
		<Textarea
			placeholder="Paste the job description here..."
			value={jobDescription}
			onChange={(e) => setJobDescription(e.target.value)}
			className="min-h-[200px] w-full p-4 border border-gray-300 rounded-lg"
		/>
	</section>
);
