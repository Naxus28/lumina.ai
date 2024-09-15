import React from 'react';
import { Button } from '@/components/ui/button';
import { H1, H2 } from '@/app/components/typography';
import { ReactTyped } from 'react-typed';

export const HeroSection = () => {
	return (
		<section className="py-[6rem] mt-10 px-4 sm:px-6 lg:px-8 bg-gray-900 text-center py-16 px-4">
			<H2 className="text-gray-300 text-2xl mb-4 font-bold">Introducing AI-powered academic portfolio generation</H2>
			<H1 className="text-4xl md:text-6xl font-bold mb-10 tracking-normal">
				<span className="text-white">Bright careers, </span>
				<ReactTyped
					strings={['strategically crafted', 'tailored to perfection', 'brilliantly presented']}
					typeSpeed={60}
					backSpeed={60}
					backDelay={700}
					startDelay={700}
					smartBackspace
					showCursor={false}
					className="text-teal-500"
				/>
			</H1>

			<H2 className="text-2xl max-w-4xl mx-auto text-gray-300 mb-24">Lumina revolutionizes academic job applications with AI-powered precision, transforming your achievements into compelling narratives that capture hiring committees' attention and distinguish you in a competitive field.</H2>

			<Button
				size="lg"
				className="bg-teal-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-teal-600 transition-colors"
			>
				Get Started for Free
			</Button>
		</section>
	);
};
