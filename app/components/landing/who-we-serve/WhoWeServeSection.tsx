import React from 'react';
import { H2, H3, Paragraph } from '@/app/components/typography';
import { Users } from 'lucide-react';

export const WhoWeServeSection: React.FC = () => (
	<section
		id="who-we-serve"
		className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
	>
		<div className="max-w-7xl mx-auto">
			<H2>Who Lumina Serves?</H2>
			<div className="mt-8 space-y-12">
				<div>
					<div className="flex items-center mb-2">
						<Users className="w-10 h-10 text-[#006D77] mr-2" />
						<H3 className="text-[#006D77] mb-0">Our Audience</H3>
					</div>
					<Paragraph className="text-gray-900 text-xl leading-relaxed">Lumina adapts its output to best represent your qualifications and career stage, whether you're:</Paragraph>
					<ul className="list-disc list-inside text-gray-900 text-xl leading-relaxed ml-6 mt-4">
						<li>A recent PhD or Master's graduate entering the job market</li>
						<li>A postdoctoral researcher seeking a faculty position</li>
						<li>An experienced professor looking for a new opportunity</li>
					</ul>
					<Paragraph className="text-gray-900 text-xl leading-relaxed mt-4">Our AI understands the nuances of academic writing and the specific requirements of different disciplines and institutions.</Paragraph>
				</div>
			</div>
		</div>
	</section>
);
