import { FileText, LibraryBig, GraduationCap, Network } from 'lucide-react';
import { CoverLetterTemplate } from './models';

export const coverLetterTemplates: CoverLetterTemplate[] = [
	{
		name: 'Traditional',
		description: 'A classic, formal structure suitable for most academic positions.',
		pdfUrl: '/cover-letter-full.png',
		color: '#4A90E2',
		icon: FileText,
	},
	{
		name: 'Research Focused',
		description: 'Emphasizes research accomplishments and future research plans.',
		pdfUrl: '/cover-letter-full.png',
		color: '#50C878',
		icon: LibraryBig,
	},
	{
		name: 'Teaching Focused',
		description: 'Highlights teaching experience and pedagogical approach.',
		pdfUrl: '/cover-letter-full.png',
		color: '#F55555',
		icon: GraduationCap,
	},
	{
		name: 'Interdisciplinary',
		description: 'Showcases cross-disciplinary expertise and collaborative potential.',
		pdfUrl: '/cover-letter-full.png',
		color: '#F7C137',
		icon: Network,
	},
];
