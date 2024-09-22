import React from 'react';
import { Button } from '@/components/ui/button';
import { H1, H2, Paragraph } from '@/app/components/typography';
import { TypeAnimation } from 'react-type-animation';

export const HeroSection: React.FC = () => {
	return (
		<section className="pt-[288px] pb-52 px-4 sm:px-6 lg:px-8 bg-gray-900 text-center">
			<H1 className="text-gray-300 text-2xl mb-4 tracking-wide">
				Introducing AI-powered academic portfolio generation
			</H1>
			<H2 className="text-4xl md:text-6xl font-bold mb-10 tracking-normal">
				<span className="text-white">Bright careers, </span>
				<TypeAnimation
					sequence={[
						1000,
						'strategically crafted',
						1200,
						'tailored to perfection',
						1200,
						'brilliantly presented',
						1200,
					]}
					wrapper="span"
					speed={40}
					style={{ color: '#4FD1C5', display: 'inline-block' }}
					cursor={false}
				/>
			</H2>

			<Paragraph className="text-2xl max-w-4xl mx-auto text-gray-300 mb-24 font-light tracking-wide">
				Lumina revolutionizes academic job applications with AI-powered precision, transforming your achievements into
				compelling narratives that capture the attention of hiring committees and distinguish you in a competitive
				field.
			</Paragraph>

			<Button
				size="lg"
				className="bg-teal-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-teal-600 transition-colors"
			>
				Get Started for Free
			</Button>
		</section>
	);
};
