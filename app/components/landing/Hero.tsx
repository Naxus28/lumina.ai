import React from 'react';
import { Button } from '@/app/layout/ui/Button';

export default function Hero() {
	return (
		<section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
			<h1 className="text-4xl sm:text-5xl font-extrabold text-[#005F73] mb-4 font-['Playfair_Display',serif]">Bright Careers, Brilliantly Presented</h1>
			<p className="text-xl text-[#2B2B2B] mb-8 max-w-3xl mx-auto">Transform your academic achievements into compelling narratives that capture the attention of hiring committees and set you apart in a competitive field. Let AI help you craft polished, professional academic job applications, boosting your career prospects while you focus on what truly matters: your groundbreaking research and inspiring teaching.</p>
			<Button
				size="lg"
				className="bg-[#7B5EA7] hover:bg-[#9D8CB0] text-white transition-colors"
			>
				Get Started for Free
			</Button>
		</section>
	);
}
