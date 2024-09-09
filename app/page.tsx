import React from 'react';
import { Header } from './components/landing/Header';
import { HeroSection } from './components/landing/HeroSection';
import { FeaturesSection } from './components/landing/FeaturesSection';
import { HowItWorksSection } from './components/landing/HowItWorksSection';
import { PortfolioSection } from './components/landing/PortfolioSection';
import { DocumentStylesSection } from './components/landing/DocumentStylesSection';
import { PricingSection } from './components/landing/PricingSection';
import { DocumentManagementSection } from './components/landing/DocumentManagementSection';
// import { Footer } from './components/landing/Footer';

export default function LandingPage() {
	return (
		<div
			className="flex flex-col min-h-screen bg-white font-sans"
			style={{ fontFamily: 'var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"' }}
		>
			<Header />
			<main className="flex-grow">
				<HeroSection />
				<FeaturesSection />
				<HowItWorksSection />
				<PortfolioSection />
				<DocumentStylesSection />
				<DocumentManagementSection />
				<PricingSection />
			</main>
			{/* <Footer /> */}
		</div>
	);
}
