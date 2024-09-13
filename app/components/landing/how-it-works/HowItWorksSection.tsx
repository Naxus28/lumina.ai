import React from 'react';
import { FileText, PenTool, MonitorCog } from 'lucide-react';
import { IconWrapper } from '@/components/ui/iconWrapper';

const StepItem: React.FC<{ icon: React.ElementType; title: string; description: string }> = ({ icon: Icon, title, description }) => (
	<div className="flex flex-col items-center text-center">
		<IconWrapper
			Icon={Icon}
			size={50}
		/>
		<h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
		<p className="text-gray-600">{description}</p>
	</div>
);

export const HowItWorksSection: React.FC = () => (
	<section
		id="how-it-works"
		className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f8fafc]"
	>
		<div className="max-w-7xl mx-auto">
			<h2 className="text-3xl font-bold text-center mb-4 text-gray-700">How It Works</h2>
			<p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">Lumina provides a clear and easy, step-by-step approach to creating your application materials, making the academic job application process fast, smooth, and efficient.</p>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				<StepItem
					icon={FileText}
					title="1. Input Your Information"
					description="Provide your academic background, research, and teaching experiences through our user-friendly interface."
				/>
				<StepItem
					icon={MonitorCog}
					title="2. AI Generates Documents"
					description="Our AI crafts tailored CVs, cover letters, research statements, and teaching philosophies based on your input."
				/>
				<StepItem
					icon={PenTool}
					title="3. Review and Refine"
					description="Easily review, edit, and perfect your documents with our intuitive editing tools and AI suggestions."
				/>
			</div>
		</div>
	</section>
);
