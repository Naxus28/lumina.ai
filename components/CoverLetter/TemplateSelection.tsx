// src/components/CoverLetter/TemplateSelection.tsx
import React from 'react';

const templates = [
	{ id: 'modern', name: 'Modern' },
	{ id: 'classic', name: 'Classic' },
	{ id: 'creative', name: 'Creative' },
];

interface TemplateSelectionProps {
	onSelect: (templateId: string) => void;
}

const TemplateSelection: React.FC<TemplateSelectionProps> = ({ onSelect }) => {
	return (
		<div className="mb-6">
			<h2 className="text-2xl font-semibold text-indigo-900 mb-4">Choose a Template</h2>
			<div className="flex space-x-4">
				{templates.map((template) => (
					<button
						key={template.id}
						className="px-4 py-2 border border-indigo-300 rounded-full text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						onClick={() => onSelect(template.id)}
					>
						{template.name}
					</button>
				))}
			</div>
		</div>
	);
};

export default TemplateSelection;
