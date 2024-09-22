'use client';

import React from 'react';
import { Header } from './header/Header';
import { HeroSection } from './hero/HeroSection';
import { AdvantagesSection } from './advantages/AdvantagesSection';
import { HowItWorksSection } from './how-it-works/HowItWorksSection';
import { PortfolioSection } from './portfolio/PortfolioSection';
import { PricingSection } from './pricing/PricingSection';
import { DocumentManagementSection } from './document-management/DocumentManagementSection';
import { IntroductionSection } from './introduction/IntroductionSection';
import { MaximizeImpactSection } from './maximize-impact/MaximizeImpactSection';
import AnimatedSection from './AnimatedSection';

export default function LandingPageContent() {
	return (
		<div
			className="flex flex-col min-h-screen bg-white font-sans"
			style={{
				fontFamily:
					'Lato, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
				fontWeight: 300,
			}}
		>
			<Header />
			<main className="flex-grow">
				<AnimatedSection>
					<HeroSection />
				</AnimatedSection>
				<AnimatedSection>
					<IntroductionSection />
				</AnimatedSection>
				<AnimatedSection>
					<PortfolioSection />
				</AnimatedSection>
				<AnimatedSection>
					<MaximizeImpactSection />
				</AnimatedSection>
				<AnimatedSection>
					<AdvantagesSection />
				</AnimatedSection>
				<AnimatedSection>
					<HowItWorksSection />
				</AnimatedSection>
				<AnimatedSection>
					<DocumentManagementSection />
				</AnimatedSection>
				<AnimatedSection>
					<PricingSection />
				</AnimatedSection>
			</main>
			{/* <Footer /> */}
		</div>
	);
}
