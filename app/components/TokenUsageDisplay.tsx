import React from 'react';

interface ProgressProps {
	value: number;
	className?: string;
}

const Progress: React.FC<ProgressProps> = ({ value, className }) => (
	<div className={`w-full h-4 bg-gray-200 rounded-full ${className}`}>
		<div
			className="h-full bg-blue-500 rounded-full"
			style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
		/>
	</div>
);

interface TokenUsageDisplayProps {
	used: number;
	total: number;
}

const TokenUsageDisplay: React.FC<TokenUsageDisplayProps> = ({ used, total }) => {
	const percentage = (used / total) * 100;

	return (
		<div className="mt-4">
			<div className="flex justify-between mb-1">
				<span className="text-sm font-medium text-gray-700">Token Usage</span>
				<span className="text-sm font-medium text-gray-700">{`${used} / ${total}`}</span>
			</div>
			<Progress value={percentage} />
		</div>
	);
};

export default TokenUsageDisplay;
