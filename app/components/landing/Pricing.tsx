import React from 'react';
import { Button } from '@/app/layout/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/layout/ui/Card';
import { CheckCircle, Star } from 'lucide-react';

interface PricingPlanProps {
	title: string;
	price: string;
	period?: string;
	features: string[];
	buttonText: string;
	highlighted?: boolean;
	bestValue?: boolean;
}

const PricingPlan: React.FC<PricingPlanProps> = ({ title, price, period, features, buttonText, highlighted = false, bestValue = false }) => (
	<Card className={`flex flex-col bg-[#F8F4F9] ${highlighted ? 'border-[#005F73] border-2' : 'border-[#9D8CB0]'}`}>
		<CardHeader>
			<CardTitle className="text-2xl font-bold text-[#005F73] font-['Playfair_Display',serif]">{title}</CardTitle>
			<div className="mt-4">
				<span className="text-4xl font-bold text-[#7B5EA7]">{price}</span>
				{period && <span className="text-[#2B2B2B]">{period}</span>}
			</div>
			{title === 'Annual Plan' && <p className="text-sm text-[#2B2B2B] mt-2">Billed annually at $179.99 (Save 25%)</p>}
		</CardHeader>
		<CardContent className="flex-grow">
			<ul className="space-y-2">
				{features.map((feature, index) => (
					<li
						key={index}
						className="flex items-center"
					>
						{bestValue && index === features.length - 1 ? <Star className="h-5 w-5 text-[#7B5EA7] mr-2" /> : <CheckCircle className="h-5 w-5 text-[#005F73] mr-2" />}
						{feature}
					</li>
				))}
			</ul>
		</CardContent>
		<div className="p-6 bg-white mt-auto">
			<Button className={`w-full ${highlighted ? 'bg-[#005F73] hover:bg-[#7B5EA7]' : 'bg-[#7B5EA7] hover:bg-[#9D8CB0]'} text-white transition-colors`}>{buttonText}</Button>
		</div>
	</Card>
);

export default function Pricing() {
	const pricingPlans: PricingPlanProps[] = [
		{
			title: 'Free Tier',
			price: '$0',
			features: ['1 basic CV template improvement', '2 refinements', 'No time limit', 'Choose template for CV structure', 'Basic AI assistance for CV'],
			buttonText: 'Get Started',
		},
		{
			title: 'Monthly Plan',
			price: '$19.99',
			period: '/month',
			features: ['Unlimited document creations', '10 refinements per document', 'Access to all templates and features', 'Priority support'],
			buttonText: 'Choose Monthly',
			highlighted: true,
		},
		{
			title: 'Annual Plan',
			price: '$14.99',
			period: '/month',
			features: ['All benefits of monthly plan', 'Exclusive webinars', 'Early access to new features', 'Best value'],
			buttonText: 'Choose Annual',
			bestValue: true,
		},
		{
			title: 'Pay-per-document',
			price: '$4.99',
			period: '/document',
			features: ['10 refinements included', 'Access to all templates', 'Valid for 30 days from purchase'],
			buttonText: 'Buy Now',
		},
	];

	return (
		<section
			id="pricing"
			className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
		>
			<div className="max-w-7xl mx-auto">
				<h2 className="text-3xl font-bold text-center mb-12 text-[#005F73] font-['Playfair_Display',serif]">Choose Your Plan</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{pricingPlans.map((plan, index) => (
						<PricingPlan
							key={index}
							{...plan}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
