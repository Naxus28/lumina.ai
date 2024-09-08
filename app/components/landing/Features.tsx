import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/layout/ui/Card';
import { Clock, Target, CheckCircle } from 'lucide-react';

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
	<Card className="bg-[#F8F4F9] border-[#9D8CB0]">
		<CardHeader>
			<CardTitle className="flex items-center font-['Playfair_Display',serif] text-[#005F73]">
				{icon}
				<span className="ml-2">{title}</span>
			</CardTitle>
		</CardHeader>
		<CardContent>
			<p>{description}</p>
		</CardContent>
	</Card>
);

export default function Features() {
	return (
		<section
			id="features"
			className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
		>
			<div className="max-w-7xl mx-auto">
				<h2 className="text-3xl font-bold text-center mb-12 text-[#005F73] font-['Playfair_Display',serif]">Why Choose Lumina?</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<FeatureCard
						icon={<Clock className="h-8 w-8 text-[#7B5EA7]" />}
						title="Save Time"
						description="Automate the creation of application documents, freeing you to focus on your academic pursuits."
					/>
					<FeatureCard
						icon={<Target className="h-8 w-8 text-[#7B5EA7]" />}
						title="Tailored Content"
						description="Generate materials customized for specific academic positions and fields."
					/>
					<FeatureCard
						icon={<CheckCircle className="h-8 w-8 text-[#7B5EA7]" />}
						title="Professional Quality"
						description="Ensure polished, impactful presentations of your academic achievements."
					/>
				</div>
			</div>
		</section>
	);
}
