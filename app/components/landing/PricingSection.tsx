import React from 'react';
import { PricingCard } from './PricingCard';
import { Badge } from '@/app/layout/ui/Badge';

export const PricingSection: React.FC = () => {
	const monthlyPrice = 19.99;
	const annualDiscount = 0.15; // 15% discount
	const annualPrice = monthlyPrice * (1 - annualDiscount);
	const roundedAnnualPrice = Math.round(annualPrice * 100) / 100; // Round to 2 decimal places
	const annualTotal = Math.round(roundedAnnualPrice * 12);

	return (
		<section
			id="pricing"
			className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
		>
			<div className="max-w-7xl mx-auto">
				<h2 className="text-3xl font-bold text-center mb-12 text-[#006D77]">Choose Your Plan</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					<PricingCard
						title="Free Tier"
						price="0"
						period="month"
						features={['1 basic CV template improvement', '2 refinements', 'No time limit', 'Choose template for CV structure', 'Basic AI assistance for CV']}
						buttonText="Get Started"
					/>
					<PricingCard
						title="Monthly Plan"
						price={monthlyPrice.toFixed(2)}
						period="month"
						features={['Unlimited document creations', '10 refinements per document', 'Access to all templates and features', 'Priority support']}
						buttonText="Choose Monthly"
						isHighlighted={true}
					/>
					<PricingCard
						title="Annual Plan"
						price={roundedAnnualPrice.toFixed(2)}
						period="month"
						description={
							<>
								<Badge className="bg-[#006D77] text-white">Save 15%</Badge>
								<p className="mt-1 text-sm text-gray-500">Billed annually at ${annualTotal}</p>
							</>
						}
						features={['All benefits of monthly plan', 'Exclusive webinars', 'Early access to new features', 'Full portfolio management']}
						buttonText="Choose Annual"
						isBestValue={true}
					/>
					<PricingCard
						title="Pay-per-document"
						price="4.99"
						period="document"
						features={['10 refinements included', 'Access to all templates', 'Valid for 30 days from purchase']}
						buttonText="Buy Now"
					/>
				</div>
			</div>
		</section>
	);
};
