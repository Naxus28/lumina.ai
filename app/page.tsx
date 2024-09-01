import React from 'react';
import FeatureCard from '@/components/ui/FeatureCard/FeatureCard';
import Header from '@/components/ui/Header/Header';
import PricingSection from '@/components/PricingSection/PricingSection';

export default function HomePage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
			<Header />

			<main>
				<section className="text-center mb-16">
					<h1 className="text-5xl font-bold text-indigo-900 mb-4">Elevate Your Academic Career</h1>
					<p className="text-xl text-indigo-700 mb-8">Craft compelling academic applications with AI-powered assistance</p>
					<button className="bg-indigo-600 text-white text-xl px-8 py-4 rounded-full hover:bg-indigo-700 transition duration-300">Get Started</button>
				</section>

				<section
					id="features"
					className="mb-16"
				>
					<h2 className="text-3xl font-bold text-center text-indigo-900 mb-8">Our Services</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						<FeatureCard
							imageSrc="/image1.png"
							title="Personalized Documents"
							description="Create tailored CVs and cover letters that highlight your unique academic achievements."
						/>
						<FeatureCard
							imageSrc="/image2.png"
							title="Research Vision Builder"
							description="Articulate your research vision and potential impact with our AI-guided tool."
						/>
						<FeatureCard
							imageSrc="/image3.png"
							title="Collaborative Refinement"
							description="Refine your documents with input from peers and mentors through our platform."
						/>
						<FeatureCard
							imageSrc="/image4.png"
							title="Career Resources"
							description="Access a wealth of academic career resources and expert advice."
						/>
					</div>
				</section>

				<section
					id="about"
					className="bg-white rounded-lg shadow-xl p-8 mb-16"
				>
					<h2 className="text-3xl font-bold text-indigo-900 mb-4">About Lumina.ai</h2>
					<p className="text-lg text-indigo-700 mb-4">Lumina.ai is dedicated to empowering academics at all stages of their careers. Our AI-powered platform combines cutting-edge technology with deep understanding of the academic landscape to help you create compelling application materials and advance your career goals.</p>
				</section>

				<section
					id="contact"
					className="text-center"
				>
					<h2 className="text-3xl font-bold text-indigo-900 mb-4">Ready to shine?</h2>
					<p className="text-xl text-indigo-700 mb-8">Join Lumina.ai today and take the next step in your academic journey.</p>
					<button className="bg-indigo-600 text-white text-xl px-8 py-4 rounded-full hover:bg-indigo-700 transition duration-300">Sign Up Now</button>
				</section>
				<PricingSection />
			</main>
		</div>
	);
}
