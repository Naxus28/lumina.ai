import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const steps = ['Select Cover Letter Style', 'Enter Job Description', 'Upload Your CV', 'Generate Cover Letter'];

export const AnimatedSteps: React.FC = () => {
	const [currentStep, setCurrentStep] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentStep((prevStep) => {
				if (prevStep < steps.length - 1) {
					return prevStep + 1;
				}
				clearInterval(timer);
				return prevStep;
			});
		}, 1000); // Change step every 1.5 seconds

		return () => clearInterval(timer);
	}, []);

	return (
		<div className="flex justify-between items-center relative">
			{steps.map((step, index) => (
				<motion.div
					key={step}
					className="flex flex-col items-center w-1/4"
					initial={{ opacity: 0 }}
					animate={{ opacity: currentStep >= index ? 1 : 0 }}
					transition={{ duration: 0.5, ease: 'easeInOut' }}
				>
					<div className="bg-[#006D77] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mb-2">{index + 1}</div>
					<p className="text-sm text-center text-gray-600">{step}</p>
				</motion.div>
			))}
			<div className="absolute top-5 left-0 w-full h-0.5 bg-[#006D77] -z-10"></div>
		</div>
	);
};
