import React from 'react';
import { Button } from '@/components/ui/button';

export default function Benefits() {
	return (
		<section
			id="benefits"
			className="py-20 px-4 sm:px-6 lg:px-8 bg-[#9D8CB0] bg-opacity-30"
		>
			<div className="max-w-3xl mx-auto text-center">
				<h2 className="text-3xl font-bold mb-8 text-[#005F73] font-['Playfair_Display',serif]">Your Brilliance, Our Assistance</h2>
				<p className="text-xl text-[#2B2B2B] mb-8">As an academic, your brilliance should shine through your research and teaching, not your ability to craft application materials. You've invested years contributing to your field, and your focus should remain there.</p>
				<p className="text-xl text-[#2B2B2B] mb-8">Lumina is your AI assistant in the academic job search process. We understand the balancing act of research projects, teaching responsibilities, and applying to multiple positions. Our solution transforms your accomplishments into compelling application materials, so you can concentrate on what truly matters.</p>
				<Button
					size="lg"
					className="bg-[#7B5EA7] hover:bg-[#9D8CB0] text-white transition-colors"
				>
					Start Your Journey
				</Button>
			</div>
		</section>
	);
}

// <section
// 	id="benefits"
// 	className="py-20 px-4 sm:px-6 lg:px-8 bg-indigo-50"
// >
// 	<div className="max-w-3xl mx-auto text-center">
// 		<h2 className="text-3xl font-bold mb-8">Your Brilliance, Our Assistance</h2>
// 		<p className="text-xl text-gray-600 mb-8">As an academic, your brilliance should shine through your research and teaching, not your ability to craft application materials. You've invested years contributing to your field, and your focus should remain there.</p>
// 		<p className="text-xl text-gray-600 mb-8">Lumina is your AI assistant in the academic job search process. We understand the balancing act of research projects, teaching responsibilities, and applying to multiple positions. Our solution transforms your accomplishments into compelling application materials, so you can concentrate on what truly matters.</p>
// 		<p className="text-xl text-gray-600 mb-8">
// 			Elevate your academic career with AI-crafted, impeccably polished job applications. Our cutting-edge technology creates professional-grade CVs, cover letters, and research statements that significantly boost your chances of landing your dream position. Let Lumina handle the intricacies of application materials, allowing you to focus on what truly matters: advancing your groundbreaking research and inspiring the next generation through your teaching. Transform your academic achievements
// 			into compelling narratives that capture the attention of hiring committees and set you apart in a competitive field
// 		</p>
// 		<Button
// 			size="lg"
// 			className="bg-indigo-600 hover:bg-indigo-700 text-white"
// 		>
// 			Start Your Journey
// 		</Button>
// 	</div>
// </section>
