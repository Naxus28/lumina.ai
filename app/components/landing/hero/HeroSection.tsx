import React from 'react';
import { Button } from '@/components/ui/button';

export const HeroSection: React.FC = () => (
	<section className="py-20 mt-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#dae1e8]">
		<div className="max-w-4xl mx-auto text-center">
			<h1 className="text-4xl sm:text-4xl font-bold text-gray-900 mb-6">Bright Careers, Brilliantly Presented</h1>
			<p className="text-xl text-gray-600 mb-8">
				Lumina revolutionizes academic job applications with AI-powered precision. From recent PhD graduates to postdoctoral researchers and experienced professors, we transform your achievements into compelling narratives. Our platform crafts application materials that capture hiring committees' attention and distinguish you in a competitive field. By streamlining the application process, Lumina saves you valuable time, allowing you to focus on your groundbreaking research and inspiring
				teaching.
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

// export default function Hero() {
// 	return (
// 		<section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
// 			<h1 className="text-4xl sm:text-5xl font-extrabold text-[#005F73] mb-4 font-['Playfair_Display',serif]">Bright Careers, Brilliantly Presented</h1>
// 			<p className="text-xl text-[#2B2B2B] mb-8 max-w-3xl mx-auto">Transform your academic achievements into compelling narratives that capture the attention of hiring committees and set you apart in a competitive field. Let AI help you craft polished, professional academic job applications, boosting your career prospects while you focus on what truly matters: your groundbreaking research and inspiring teaching.</p>
// 			<Button
// 				size="lg"
// 				className="bg-[#7B5EA7] hover:bg-[#9D8CB0] text-white transition-colors"
// 			>
// 				Get Started for Free
// 			</Button>
// 		</section>
// 	);
// }
