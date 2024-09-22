import React from 'react';
import { H3, Paragraph } from '@/app/components/typography';
import { Users, Check } from 'lucide-react';

const listItems = [
	"Recent PhD or Master's graduates",
	'Postdoctoral researchers',
	'Early career Professors',
	'Experienced Professors',
];

export const WhoLuminaServes: React.FC = () => (
	<div className="relative">
		{/* <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#83C5BE] rounded-full opacity-20"></div> */}
		<div className="relative z-10 bg-white text-[#006D77] p-8 rounded-lg shadow-xl">
			<H3 className="text-2xl font-semibold mb-4 flex items-center text-[#006D77]">
				{/* <Users className="w-6 h-6 mr-2" /> */}
				Who Lumina Serves
			</H3>
			<ul className="space-y-3">
				{listItems.map((item, index) => (
					<li key={index} className="flex items-center text-lg">
						<Check className="w-5 h-5 mr-2 text-[#006D77] stroke-2" />
						{item}
					</li>
				))}
			</ul>
		</div>
	</div>
);
