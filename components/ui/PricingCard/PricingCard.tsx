// src/components/ui/PricingCard/PricingCard.tsx
import React from 'react';

interface PricingCardProps {
	title: string;
	price: string;
	period: string;
	features: string[];
	buttonText: string;
	isCustom?: boolean;
}

const PricingCard = ({ title, price, period, features, buttonText, isCustom = false }: PricingCardProps) => (
	<div className="bg-white rounded-lg shadow-lg p-6 flex flex-col h-full">
		<div className="flex-grow">
			<h3 className="text-xl font-bold mb-2 text-gray-700">{title}</h3>
			{!isCustom && (
				<div className="text-3xl font-bold mb-4 text-indigo-600">
					${price}
					<span className="text-sm font-normal text-gray-600">/{period}</span>
				</div>
			)}
			<ul className="mb-6 text-gray-600">
				{features.map((feature, index) => (
					<li
						key={index}
						className="flex items-center mb-2"
					>
						<svg
							className="w-4 h-4 mr-2 text-green-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M5 13l4 4L19 7"
							></path>
						</svg>
						{feature}
					</li>
				))}
			</ul>
		</div>
		<button className="w-full py-2 px-4 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300">{buttonText}</button>
	</div>
);

export default PricingCard;
