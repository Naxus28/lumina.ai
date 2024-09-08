import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

const CheckIcon = ({ className = '' }) => (
	<svg
		width="15"
		height="15"
		viewBox="0 0 15 15"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={`h-4 w-4 rounded-full text-white bg-[#006D77] ${className}`}
	>
		<path
			d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
			fill="currentColor"
			fillRule="evenodd"
			clipRule="evenodd"
		/>
	</svg>
);

interface PricingCardProps {
	title: string;
	price: string;
	period?: string;
	description?: string;
	features: string[];
	buttonText: string;
	isHighlighted?: boolean;
	isBestValue?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ title, price, period, description, features, buttonText, isHighlighted = false, isBestValue = false }) => (
	<Card className={`flex flex-col ${isHighlighted ? 'border-2 border-[#006D77]' : 'border border-gray-200'}`}>
		<CardHeader>
			<CardTitle className="text-2xl font-bold text-[#006D77]">{title}</CardTitle>
			{description && <p className="text-sm text-gray-500 mt-2">{description}</p>}
			<div className="mt-4 flex items-baseline text-[#7B5EA7]">
				<span className="text-5xl font-extrabold tracking-tight">${price}</span>
				{period && <span className="ml-1 text-xl font-normal text-gray-500">/{period}</span>}
			</div>
		</CardHeader>
		<CardContent className="flex-grow">
			<ul className="mt-6 space-y-4">
				{features.map((feature, index) => (
					<li
						key={index}
						className="flex items-start"
					>
						<CheckIcon className="flex-shrink-0 mr-3" />
						<span className="text-base text-gray-700">{feature}</span>
					</li>
				))}
				{isBestValue && (
					<li className="flex items-start">
						<Star className="h-5 w-5 flex-shrink-0 text-[#7B5EA7] mr-3" />
						<span className="text-base text-[#7B5EA7] font-semibold">Best value</span>
					</li>
				)}
			</ul>
		</CardContent>
		<CardFooter>
			<Button className={`w-full ${isHighlighted ? 'bg-[#006D77] hover:bg-[#005a63] text-white' : 'bg-[#7B5EA7] hover:bg-[#6a4f91] text-white'}`}>{buttonText}</Button>
		</CardFooter>
	</Card>
);

const Pricing: React.FC = () => {
	return (
		<section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
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
						price="19.99"
						period="month"
						features={['Unlimited document creations', '10 refinements per document', 'Access to all templates and features', 'Priority support']}
						buttonText="Choose Monthly"
						isHighlighted={true}
					/>
					<PricingCard
						title="Annual Plan"
						price="14.99"
						period="month"
						description="Billed annually at $179.99 (Save 25%)"
						features={['All benefits of monthly plan', 'Exclusive webinars', 'Early access to new features']}
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

export default Pricing;
