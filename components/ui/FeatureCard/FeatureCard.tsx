// src/components/ui/FeatureCard/FeatureCard.js
import React from 'react';
import Image from 'next/image';

const FeatureCard = ({ imageSrc, title, description }: { imageSrc: string; title: string; description: string }) => (
	<div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
		<div className="relative h-48">
			<Image
				src={imageSrc}
				alt={title}
				fill
				objectFit="cover"
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
			/>
		</div>
		<div className="p-4 flex flex-col flex-grow">
			<h3 className="text-xl font-semibold mb-2 text-center text-gray-600">{title}</h3>
			<p className="text-gray-600 text-left flex-grow flex items-center justify-center">{description}</p>
		</div>
	</div>
);
export default FeatureCard;
