import React from 'react';
import { Button } from '@/components/ui/button';
import { generatePDF } from '@/app/utils/pdfUtils';
import { Download } from 'lucide-react'; // Import the Download icon

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
			className={`w-full mt-4 bg-purple-700 hover:bg-purple-800 text-white ${className || ''}`}
		>
			<Download className="mr-2 h-4 w-4" /> {/* Add the Download icon */}
			Download as PDF
		</Button>
	);
};
