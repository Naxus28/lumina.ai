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
					<Paragraph className="text-gray-900 text-xl leading-relaxed">
						Lumina is an AI-driven platform tailored for academics at all career stages. Our advanced algorithms analyze your academic background, research accomplishments, and teaching experiences, transforming your academic journey into compelling, tailored application documents. Recognizing the myriad demands on an academic's time, such as conducting research, writing papers, teaching classes, mentoring students, and attending conferences, we eliminate the added burden of crafting application
						materials. Our solution creates powerful applications, allowing you to focus on your core academic pursuits. Your brilliance should shine through your research, teaching, and field contributions, not your ability to write applications. You've invested years perfecting your craft; we believe your focus should remain there.
					</Paragraph>
				</div>
			</div>
		</div>
	</section>
);
