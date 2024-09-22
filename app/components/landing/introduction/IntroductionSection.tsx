import React from 'react';
import { H2 } from '@/app/components/typography';
import { CoreFunctionality } from './CoreFunctionality';
import { WhoLuminaServes } from './WhoLuminaServes';
import { Section } from '@/app/layout-components/components/Section';

export const IntroductionSection: React.FC = () => (
	<Section id="introduction" paddingY="6xl" bgColor="bg-[#2C7A7B]" className="text-white">
		<H2 className="font-bold mb-8 text-white text-left">What is Lumina?</H2>
		<div className="grid md:grid-cols-2 gap-12 items-center">
			<CoreFunctionality />
			<WhoLuminaServes />
		</div>
	</Section>
);
