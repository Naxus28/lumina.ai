// src/components/CoverLetter/ResultDisplay.tsx
import React, { useRef, useEffect, memo } from 'react';
import useTypingEffect from '../../hooks/useTypingEffects';

interface ResultDisplayProps {
	content: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = memo(({ content }) => {
	console.log(content);
	const { displayedText, isComplete } = useTypingEffect(content, 5);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	}, [displayedText]);

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
