import React from 'react';
import { Button } from '@/app/layout/ui/Button';

export const HeroSection: React.FC = () => (
	<section className="py-20 mt-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
		<div className="max-w-4xl mx-auto text-center">
			<h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Bright Careers, Brilliantly Presented</h1>
			<p className="text-xl text-gray-600 mb-8">Transform your academic achievements into compelling narratives that capture the attention of hiring committees and set you apart in a competitive field. Let our AI-powered platform help you craft polished, professional academic job applications, boosting your career prospects and saving you precious time so you can keep focusing on your groundbreaking research and inspiring teaching.</p>
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
