import React from 'react';
import { H2, H3, Paragraph } from '@/app/components/typography';
import { Cpu } from 'lucide-react';

export const IntroductionSection: React.FC = () => (
	<section
		id="introduction"
		className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
	>
		<div className="max-w-7xl mx-auto">
			<H2>What is Lumina?</H2>
			<div className="mt-8 space-y-12">
				<div>
					<div className="flex items-center mb-2">
						<Cpu className="w-10 h-10 text-[#006D77] mr-2" />
						<H3 className="text-[#006D77] mb-0">Core Functionality</H3>
					</div>
					<Paragraph className="text-gray-900 text-xl leading-relaxed">Lumina is an innovative AI-driven platform designed specifically for academics at all career stages. Our advanced natural language processing and machine learning algorithms analyze your academic background, research accomplishments, and teaching experiences, transforming this information into compelling, tailored documents essential for successful academic job applications.</Paragraph>
				</div>
			</div>
		</div>
	</section>
);
