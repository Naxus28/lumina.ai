import './globals.css';
import type { Metadata } from 'next';
import RootLayout from './layout/RootLayout';

export const metadata: Metadata = {
	title: 'Lumina - Bright Careers, Brilliantly Presented',
	description: 'AI-powered academic job application assistant',
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<RootLayout>{children}</RootLayout>
			</body>
		</html>
	);
}
