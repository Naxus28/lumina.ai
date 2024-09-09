import React from 'react';
import { Card, CardContent } from '@/app/layout/ui/Card';
import { FileText, FileSpreadsheet, LibraryBig, GraduationCap } from 'lucide-react';

interface DocumentStyleCardProps {
	icon: 'cv' | 'cover-letter' | 'research' | 'teaching';
	title: string;
	description: string;
	examples: string[];
}

const iconMap = {
	cv: FileText,
	'cover-letter': FileSpreadsheet,
	research: LibraryBig,
	teaching: GraduationCap,
};

export const DocumentStyleCard: React.FC<DocumentStyleCardProps> = ({ icon, title, description, examples }) => {
	const Icon = iconMap[icon];

	return (
		<Card className="border border-gray-200">
			<CardContent className="p-6">
				<div className="flex items-center mb-3">
					{Icon && <Icon className="h-6 w-6 text-[#006D77] mr-2" />}
					<h3 className="text-lg font-semibold text-[#006D77]">{title}</h3>
				</div>
				<p className="text-gray-600 text-sm mb-4">{description}</p>
				<div className="flex flex-wrap gap-2">
					{examples.map((example, index) => (
						<span
							key={index}
							className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700"
						>
							{example}
						</span>
					))}
				</div>
			</CardContent>
		</Card>
	);
};
