import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface HighlightInputProps {
	highlights: string[];
	setHighlights: React.Dispatch<React.SetStateAction<string[]>>;
}

export const HighlightInput: React.FC<HighlightInputProps> = ({ highlights, setHighlights }) => {
	const [inputValue, setInputValue] = useState('');

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && inputValue.trim()) {
			e.preventDefault();
			const newHighlight = inputValue.trim();
			if (!highlights.includes(newHighlight)) {
				setHighlights([...highlights, newHighlight]);
				setInputValue('');
			}
		}
	};

	const removeHighlight = (highlight: string) => {
		setHighlights(highlights.filter((h) => h !== highlight));
	};

	return (
		<div className="space-y-2">
			<Input
				value={inputValue}
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
				placeholder="Enter a key point to highlight and press Enter"
				className="w-full"
			/>
			<div className="flex flex-wrap gap-2">
				{highlights.map((highlight, index) => (
					<Badge
						key={index}
						variant="outline"
						className="px-3 py-1 text-sm flex items-center group border border-purple-500"
					>
						{highlight}
						<button
							onClick={() => removeHighlight(highlight)}
							className="ml-2 text-gray-500 hover:text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
						>
							<X size={14} />
						</button>
					</Badge>
				))}
			</div>
		</div>
	);
};
