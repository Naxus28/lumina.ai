import React from 'react';
import { Clock, Sparkles, BrainCircuit } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

export const FeaturesSection: React.FC = () => (
	<section
		id="features"
		className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
	>
		<div className="max-w-7xl mx-auto">
			<h2 className="text-4xl font-bold text-center mb-4 text-gray-700">Why Choose Lumina?</h2>
			<p className="text-center text-gray-900 mb-12 max-w-3xl mx-auto text-xl">Lumina's AI-powered platform streamlines the process of creating compelling academic job applications, saving you time and enhancing your chances of success.</p>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				<FeatureCard
					icon={Clock}
					title="Save Time"
					description="Automate the creation of application documents, freeing you to focus on your academic pursuits."
				/>
				<FeatureCard
					icon={BrainCircuit}
					title="AI-Powered Assistance"
					description="Our advanced AI helps you create tailored, professional documents without starting from scratch."
				/>
				<FeatureCard
					icon={Sparkles}
					title="Stand Out"
					description="Ensure polished, impactful presentations of your academic achievements that catch employers' attention."
				/>
			</div>
		</div>
	</section>
);
