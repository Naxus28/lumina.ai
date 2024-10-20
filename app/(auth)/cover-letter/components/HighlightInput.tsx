import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';

interface HighlightInputProps {
	highlights: string[];
	setHighlights: React.Dispatch<React.SetStateAction<string[]>>;
}

export const HighlightInput: React.FC<HighlightInputProps> = ({ highlights, setHighlights }) => {
	const [inputValue, setInputValue] = useState('');

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const addHighlight = () => {
		if (inputValue.trim()) {
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
			<div className="flex gap-2">
				<Input
					value={inputValue}
					onChange={handleInputChange}
					placeholder="Enter a key point to highlight"
					className="flex-grow"
				/>
				<Button
					onClick={addHighlight}
					className="flex-shrink-0 bg-purple-700 hover:bg-purple-800"
				>
					Add
				</Button>
			</div>
			<div className="flex flex-wrap gap-2">
				{highlights.map((highlight, index) => (
					<Badge
						key={index}
						variant="outline"
						className="px-3 py-1 text-sm flex items-center group border border-purple-500 text-gray-500"
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
