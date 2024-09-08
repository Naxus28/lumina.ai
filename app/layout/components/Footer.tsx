// import React from 'react';
// import { Button } from '../ui/Button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/app/layout/ui/Card';
// import { CheckCircle, Star } from 'lucide-react';

// interface PricingPlan {
// 	title: string;
// 	price: string;
// 	period?: string;
// 	features: (string | React.ReactNode)[];
// 	buttonText: string;
// 	highlighted?: boolean;
// }

// const PricingCard: React.FC<PricingPlan> = ({ title, price, period, features, buttonText, highlighted = false }) => (
// 	<Card className={`flex flex-col ${highlighted ? 'border-indigo-500 border-2' : ''}`}>
// 		<CardHeader>
// 			<CardTitle className="text-2xl font-bold">{title}</CardTitle>
// 			<div className="mt-4">
// 				<span className="text-4xl font-bold">{price}</span>
// 				{period && <span className="text-gray-500">{period}</span>}
// 			</div>
// 		</CardHeader>
// 		<CardContent className="flex-grow">
// 			<ul className="space-y-2">
// 				{features.map((feature, index) => (
// 					<li
// 						key={index}
// 						className="flex items-center"
// 					>
// 						<CheckCircle className="h-5 w-5 text-green-500 mr-2" />
// 						{feature}
// 					</li>
// 				))}
// 			</ul>
// 		</CardContent>
// 		<div className="p-6 bg-gray-50 mt-auto">
// 			<Button className={`w-full ${highlighted ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : ''}`}>{buttonText}</Button>
// 		</div>
// 	</Card>
// );

// export default function Pricing() {
// 	const pricingPlans: PricingPlan[] = [
// 		{
// 			title: 'Free Tier',
// 			price: '$0',
// 			features: ['1 basic CV template improvement', '2 refinements', 'No time limit', 'Choose template for CV structure', 'Basic AI assistance for CV'],
// 			buttonText: 'Get Started',
// 		},
// 		{
// 			title: 'Monthly Plan',
// 			price: '$19.99',
// 			period: '/month',
// 			features: ['Unlimited document creations', '10 refinements per document', 'Access to all templates and features', 'Priority support'],
// 			buttonText: 'Choose Monthly',
// 			highlighted: true,
// 		},
// 		{
// 			title: 'Annual Plan',
// 			price: '$14.99',
// 			period: '/month',
// 			features: [
// 				'All benefits of monthly plan',
// 				'Exclusive webinars',
// 				'Early access to new features',
// 				<span
// 					key="best-value"
// 					className="flex items-center"
// 				>
// 					<Star className="h-5 w-5 text-yellow-500 mr-2" />
// 					Best value
// 				</span>,
// 			],
// 			buttonText: 'Choose Annual',
// 		},
// 		{
// 			title: 'Pay-per-document',
// 			price: '$4.99',
// 			period: '/document',
// 			features: ['10 refinements included', 'Access to all templates', 'Valid for 30 days from purchase'],
// 			buttonText: 'Buy Now',
// 		},
// 	];

// 	return (
// 		<section
// 			id="pricing"
// 			className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
// 		>
// 			<div className="max-w-7xl mx-auto">
// 				<h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
// 				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
// 					{pricingPlans.map((plan, index) => (
// 						<PricingCard
// 							key={index}
// 							{...plan}
// 						/>
// 					))}
// 				</div>
// 			</div>
// 		</section>
// 	);
// }
