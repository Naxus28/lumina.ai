import { FileText, LibraryBig, GraduationCap, Network } from 'lucide-react';
import { DocumentStyle } from './models';

export const documentStyleList: DocumentStyle[] = [
	{
		name: 'Traditional Academic',
		description: 'A formal structure emphasizing academic achievements and research experience.',
		pdfUrl: '/cover-letter-full.png',
		color: '#4A90E2',
		icon: FileText,
	},
	{
		name: 'Research Emphasis',
		description: 'Highlights your research contributions and potential for future projects.',
		pdfUrl: '/cover-letter-full.png',
		color: '#50C878',
		icon: LibraryBig,
	},
	{
		name: 'Teaching Focus',
		description: 'Showcases your teaching philosophy and classroom experiences.',
		pdfUrl: '/cover-letter-full.png',
		color: '#F55555',
		icon: GraduationCap,
	},
	{
		name: 'Interdisciplinary Approach',
		description: 'Demonstrates your ability to work across multiple academic disciplines.',
		pdfUrl: '/cover-letter-full.png',
		color: '#F7C137',
		icon: Network,
	},
];
