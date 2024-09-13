import React from 'react';
import { Button } from '@/components/ui/button';

export const HeroSection: React.FC = () => (
	<section className="py-20 mt-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#dae1e8]">
		<div className="max-w-4xl mx-auto text-center">
			<h1 className="text-3xl sm:text-3xl font-bold text-gray-700 mb-6 uppercase">Bright Careers, Brilliantly Presented</h1>
			<p className="text-xl text-gray-900 mb-8">
				Lumina revolutionizes academic job applications with AI-powered precision. From recent PhD graduates to postdoctoral researchers and experienced professors, we transform your achievements into compelling narratives. Our platform crafts application materials that capture hiring committees' attention and distinguish you in a competitive field. By streamlining the application process, Lumina saves you valuable time, allowing you to fully dedicate yourself to your groundbreaking research and
				inspiring teaching.
			</p>
			<Button
				size="lg"
				className="bg-[#006D77] hover:bg-[#005a63] text-white transition-colors"
			>
				Get Started for Free
			</Button>
		</div>
	</section>
);
