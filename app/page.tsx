import React from 'react';
import { Header } from './components/landing/Header';
import { HeroSection } from './components/landing/hero/HeroSection';
import { FeaturesSection } from './components/landing/features/FeaturesSection';
import { HowItWorksSection } from './components/landing/how-it-works/HowItWorksSection';
import { PortfolioSection } from './components/landing/portfolio/PortfolioSection';
import { DocumentStylesSection } from './components/landing/document-styles/DocumentStylesSection';
import { PricingSection } from './components/landing/pricing/PricingSection';
import { DocumentManagementSection } from './components/landing/document-management/DocumentManagementSection';

export default function LandingPage() {
	return (
		<div
			className="flex flex-col min-h-screen bg-white font-sans"
			style={{ fontFamily: 'Lato, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight: 300 }}
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
