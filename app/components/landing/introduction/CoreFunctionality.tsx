import React from 'react';
import { H3, Paragraph } from '@/app/components/typography';
import { Zap } from 'lucide-react';

export const CoreFunctionality: React.FC = () => (
	<div className="space-y-6">
		<H3 className="text-3xl font-semibold flex items-center text-white">
			{/* <Zap className="w-8 h-8 mr-3" /> */}
			Core Functionality
		</H3>
		<Paragraph className="text-white text-xl">
			Lumina is an AI-driven platform tailored for academics at all career stages, offering comprehensive support in creating CVs, cover letters, research statements, teaching philosophy statements, and other essential job application documents. We use advanced Large Language Models (LLMs) to analyze your academic background, research accomplishments, and teaching experiences, transforming your academic journey into compelling, tailored application documents.
		</Paragraph>
	</div>
);
