import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Star } from 'lucide-react';

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
	<svg
		width="20"
		height="20"
		viewBox="0 0 20 20"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={className}
	>
		<circle
			cx="10"
			cy="10"
			r="10"
			fill="#006D77"
		/>
		<path
			d="M14.6668 6.5L8.25016 12.9167L5.3335 10"
			stroke="white"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

interface PricingCardProps {
	title: string;
	price: string;
	period: string;
	description?: React.ReactNode;
	features: string[];
	buttonText: string;
	isHighlighted?: boolean;
	isBestValue?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({ title, price, period, description, features, buttonText, isHighlighted = false, isBestValue = false }) => (
	<Card className={`flex flex-col h-full ${isHighlighted ? 'border-2 border-[#006D77]' : 'border border-gray-200'}`}>
		<CardHeader className="space-y-1 pb-2">
			<CardTitle className="text-xl font-bold text-gray-700">{title}</CardTitle>
			<div className="mt-1 flex items-baseline text-gray-700">
				<span className="text-xl font-extrabold tracking-tight">${price}</span>
				<span className="ml-1 text-xl font-normal text-gray-500">/{period}</span>
			</div>
			{description && <div className="mt-2">{description}</div>}
		</CardHeader>
		<CardContent className="flex-grow">
			<ul className="mt-4 space-y-3">
				{features.map((feature, index) => (
					<li
						key={index}
						className="flex items-start"
					>
						<CheckIcon className="flex-shrink-0 mr-2 mt-1" />
						<span className="text-sm text-gray-900">{feature}</span>
					</li>
				))}
			</ul>
			{isBestValue && (
				<div className="mt-4 flex items-center">
					<Star
						fill="#FFD700"
						className="h-5 w-5 text-[#FFD700] mr-2"
					/>
					<span className="text-sm font-semibold text-[#006D77]">Best value</span>
				</div>
			)}
		</CardContent>
		<CardFooter className="pt-4">
			<Button className={`w-full ${isHighlighted ? 'bg-[#006D77] hover:bg-[#005a63] text-white' : 'bg-[#006D77] hover:bg-[#005a63] text-white'}`}>{buttonText}</Button>
		</CardFooter>
	</Card>
);
