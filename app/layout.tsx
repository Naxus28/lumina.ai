import { ThemeProvider } from '@/components/theming/theme-provider';
import './globals.css';
import type { Metadata } from 'next';
// import { Footer } from '../app/layout-components/components/Footer';
export const metadata: Metadata = {
	title: 'Lumina - Bright Careers, Brilliantly Presented',
	description: 'AI-powered academic job application assistant',
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<div className="flex flex-col min-h-screen">
						<main className="flex-grow">{children}</main>
						{/* <Footer /> */}
					</div>
				</ThemeProvider>
				{/* content */}
			</body>
		</html>
	);
}
