import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface HighlightInputProps {
  highlights: string[];
  setHighlights: React.Dispatch<React.SetStateAction<string[]>>;
}

export const HighlightInput: React.FC<HighlightInputProps> = ({ highlights, setHighlights }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.endsWith(',')) {
      const newHighlight = value.slice(0, -1).trim();
      if (newHighlight && !highlights.includes(newHighlight)) {
        setHighlights([...highlights, newHighlight]);
        setInputValue('');
      }
    }
  };

  const removeHighlight = (highlight: string) => {
    setHighlights(highlights.filter(h => h !== highlight));
  };

  return (
    <div className="space-y-2">
      <Input
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter highlights, separated by commas"
        className="w-full"
      />
      <div className="flex flex-wrap gap-2">
        {highlights.map((highlight, index) => (
          <div
            key={index}
            className="bg-gray-200 rounded-full px-3 py-1 text-sm flex items-center group"
          >
            {highlight}
            <button
              onClick={() => removeHighlight(highlight)}
              className="ml-2 text-gray-500 hover:text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
