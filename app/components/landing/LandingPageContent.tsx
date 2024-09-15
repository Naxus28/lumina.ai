'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Header } from './Header';
import { HeroSection } from './hero/HeroSection';
import { FeaturesSection } from './features/FeaturesSection';
import { HowItWorksSection } from './how-it-works/HowItWorksSection';
import { PortfolioSection } from './portfolio/PortfolioSection';
import { DocumentStylesSection } from './document-styles/DocumentStylesSection';
import { PricingSection } from './pricing/PricingSection';
import { DocumentManagementSection } from './document-management/DocumentManagementSection';
import { IntroductionSection } from './introduction/IntroductionSection';
import { WhoWeServeSection } from './who-we-serve/WhoWeServeSection';

const AnimatedSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 50 }}
			animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
			transition={{ duration: 0.8, ease: 'easeOut' }}
		>
			{children}
		</motion.div>
	);
};

export default function LandingPageContent() {
	return (
		<div
			className="flex flex-col min-h-screen bg-white font-sans"
			style={{ fontFamily: 'Lato, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight: 300 }}
		>
			<Header />
			<main className="flex-grow">
				<HeroSection />
				<AnimatedSection>
					<IntroductionSection />
				</AnimatedSection>
				<AnimatedSection>
					<WhoWeServeSection />
				</AnimatedSection>
				<AnimatedSection>
					<FeaturesSection />
				</AnimatedSection>
				<AnimatedSection>
					<HowItWorksSection />
				</AnimatedSection>
				<AnimatedSection>
					<PortfolioSection />
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
