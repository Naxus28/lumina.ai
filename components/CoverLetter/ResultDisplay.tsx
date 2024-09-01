// src/components/CoverLetter/ResultDisplay.tsx
import React, { useRef, useEffect, memo } from 'react';
import useTypingEffect from '../../hooks/useTypingEffects';

interface ResultDisplayProps {
	content: string;
	isLoading: boolean;
	error: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = memo(({ content, isLoading, error }) => {
	console.log(content);
	const { displayedText, isComplete } = useTypingEffect(content, 50);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	}, [displayedText]);

	if (isLoading) {
		return (
			<div className="mt-8">
				<h2 className="text-xl font-semibold mb-2">Generating Cover Letter...</h2>
				<div className="bg-white p-4 border rounded flex items-center justify-center">
					<svg
						className="animate-spin h-5 w-5 text-indigo-600"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="mt-8">
				<h2 className="text-xl font-semibold mb-2 text-red-600">Error</h2>
				<div
					className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
					role="alert"
				>
					<span className="block sm:inline">{error}</span>
				</div>
			</div>
		);
	}

	if (!content) return null;

	return (
		<div className="mt-8">
			<h2 className="text-xl font-semibold mb-2 text-gray-600">Generated Cover Letter</h2>
			<div
				ref={containerRef}
				className="bg-white p-4 border rounded overflow-auto"
				style={{ maxHeight: '400px' }}
			>
				<pre className="whitespace-pre-wrap text-gray-600">
					{displayedText}
					{!isComplete && <span className="animate-pulse">|</span>}
				</pre>
			</div>
		</div>
	);
});

ResultDisplay.displayName = 'ResultDisplay';

export default ResultDisplay;
