// src/components/PricingSection/PricingSection.tsx
import React from 'react';
import PricingCard from '../ui/PricingCard/PricingCard';

const PricingSection = () => {
	return (
		<section className="py-16 bg-gradient-to-b from-indigo-100 to-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h2 className="text-4xl font-bold text-center text-indigo-900 mb-4">Choose your right plan!</h2>
				<p className="text-xl text-center text-indigo-700 mb-8">
					Select from best plans, ensuring a perfect match. Need more or less?
					<br />
					Customize your subscription for a seamless fit!
				</p>

				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
					<PricingCard
						title="Free Tier"
						price="0"
						period="month"
						features={['1 basic CV template improvement', '2 refinements', 'No time limit', 'Option to choose template for CV structure', 'Basic AI assistance for CV creation']}
						buttonText="Get Started"
					/>
					<PricingCard
						title="Monthly Plan"
						price="19.99"
						period="month"
						features={['Unlimited document creations', '10 refinements per document', 'Access to all templates and features', 'Priority support']}
						buttonText="Get Started"
					/>
					<PricingCard
						title="Annual Plan"
						price="14.99"
						period="month, billed annually"
						features={['All benefits of the monthly plan', 'Exclusive webinars', 'Early access to new features', '25% savings compared to monthly']}
						buttonText="Get Started"
					/>
					<PricingCard
						title="Pay-per-document"
						price="4.99"
						period="document"
						features={['10 refinements included', 'Access to all templates for that document', 'Valid for 30 days from purchase']}
						buttonText="Get Started"
					/>
				</div>
			</div>
		</section>
	);
};

export default PricingSection;
