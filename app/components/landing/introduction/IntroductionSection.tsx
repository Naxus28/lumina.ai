import React from 'react';
import { H2 } from '@/app/components/typography';
import { CoreFunctionality } from './CoreFunctionality';
import { WhoLuminaServes } from './WhoLuminaServes';

export const IntroductionSection: React.FC = () => (
	<section
		id="introduction"
		className="py-20 bg-[#2C7A7B] text-white"
	>
		<div className="container mx-auto px-4 relative">
			<H2 className="font-bold mb-8 text-white text-left">What is Lumina?</H2>
			<div className="grid md:grid-cols-2 gap-12 items-center">
				<CoreFunctionality />
				<WhoLuminaServes />
			</div>
		</div>
	</section>
);
