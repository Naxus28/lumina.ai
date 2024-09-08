import React from 'react';
import Header from './components/landing/Header';
import Hero from './components/landing/Hero';
import Features from './components/landing/Features';
import Benefits from './components/landing/Benefits';
import Pricing from './components/landing/Pricing';
import { DocumentTypes, TemplateShowcase } from './components/landing/DocumentSections';

export default function Home() {
	return (
		<div className="bg-gradient-to-b from-blue-50 to-indigo-100">
			<Header />
			<Hero />
			<Features />
			<DocumentTypes />
			<TemplateShowcase />
			<Benefits />
			<Pricing />
		</div>
	);
}
