import React from 'react';
import { H2, H3, Paragraph } from '@/app/components/typography';
import { Zap, Users, CheckCircle } from 'lucide-react';

export const IntroductionSection: React.FC = () => (
	<section
		id="introduction"
		className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
	>
		<section className="py-20 bg-[#2C7A7B] text-white">
			<div className="container mx-auto px-4 relative">
				<H2 className="text-5xl font-bold mb-8 text-white text-left">What is Lumina?</H2>
				<div className="grid md:grid-cols-2 gap-12 items-center">
					<div className="space-y-6">
						<H3 className="text-3xl font-semibold flex items-center text-white">
							<Zap className="w-8 h-8 mr-3" />
							Core Functionality
						</H3>
						<Paragraph className="text-lg leading-relaxed text-white">
							Lumina is an AI-driven platform tailored for academics at all career stages, offering comprehensive support in creating CVs, cover letters, research statements, teaching philosophy statements, and other essential job application documents. We use advanced Large Language Models (LLMs) to analyze your academic background, research accomplishments, and teaching experiences, transforming your academic journey into compelling, tailored application documents.
						</Paragraph>
					</div>
					<div className="relative">
						<div className="absolute -top-20 -right-20 w-64 h-64 bg-[#83C5BE] rounded-full opacity-20"></div>
						<div className="relative z-10 bg-white text-[#006D77] p-8 rounded-lg shadow-xl">
							<H3 className="text-2xl font-semibold mb-4 flex items-center text-[#006D77]">
								<Users className="w-6 h-6 mr-2" />
								Who Lumina Serves
							</H3>
							<ul className="space-y-3">
								<li className="flex items-center">
									<CheckCircle className="w-5 h-5 mr-2 text-[#006D77]" />
									Recent PhD or Master's graduates
								</li>
								<li className="flex items-center">
									<CheckCircle className="w-5 h-5 mr-2 text-[#006D77]" />
									Postdoctoral researchers
								</li>
								<li className="flex items-center">
									<CheckCircle className="w-5 h-5 mr-2 text-[#006D77]" />
									Early career Professors
								</li>
								<li className="flex items-center">
									<CheckCircle className="w-5 h-5 mr-2 text-[#006D77]" />
									Experienced Professors
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
		{/* <div className="max-w-7xl mx-auto">
			<H2>Ready to transform your academic job applications?</H2>
			<div className="mt-8 space-y-12">
				<div>
					<div className="flex items-center mb-2">
						<Cpu className="w-10 h-10 text-[#006D77] mr-2" />
						<H3 className="text-[#006D77] mb-0">Core Functionality</H3>
					</div>
					<Paragraph className="text-gray-900 text-xl leading-relaxed">
						Lumina is an AI-driven platform tailored for academics at all career stages, offering comprehensive support in creating CVs, cover letters, research statements, teaching philosophy statements, and other essential job application documents. We use advanced Large Language Models (LLMs) to analyze your academic background, research accomplishments, and teaching experiences, transforming your academic journey into compelling, tailored application documents. 
            
            Recognizing the myriad demands
						on an academic's time, such as conducting research, writing papers, teaching classes, mentoring students, and attending conferences, we eliminate the added burden of crafting numerous, tailored job application materials. Whether you're applying to multiple positions or seeking that perfect role, Lumina ensures each application is customized to the specific requirements of the position and institution. Our solution creates powerful application materials, allowing you to focus on your
						core academic pursuits. Your brilliance should shine through your research, teaching, and field contributions, not your ability to write applications. You've invested years perfecting your craft; we believe your focus should remain there.
					</Paragraph>
				</div>
			</div>
		</div> */}
	</section>
);
