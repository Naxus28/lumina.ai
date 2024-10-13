import React from 'react';
import { Button } from '@/components/ui/button';
import { generatePDF } from '@/app/utils/pdfUtils';

interface DownloadPdfButtonProps {
	content: string;
	fileName: string;
	className?: string;
}

export const DownloadPdfButton: React.FC<DownloadPdfButtonProps> = ({ content, fileName, className }) => {
	const handleDownloadPDF = () => {
		generatePDF(content, fileName);
	};

	return (
		<Button
			onClick={handleDownloadPDF}
			className={`w-full mt-4 bg-purple-800 hover:bg-purple-900 text-white ${className || ''}`}
		>
			Download as PDF
		</Button>
	);
};
