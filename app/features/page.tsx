// src/pages/features.js
import React from 'react';
import Image from 'next/image';
import FeatureCard from '../../components/ui/FeatureCard/FeatureCard';
import Header from '../../components/ui/Header/Header';

export default function FeaturesPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
			<Header />

			<main>
				<h1 className="text-4xl font-bold text-center text-indigo-900 mb-12">Our Features</h1>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
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

				<section className="bg-white rounded-lg shadow-xl p-8 mb-12">
					<h2 className="text-3xl font-bold text-indigo-900 mb-4">AI-Powered Assistance</h2>
					<p className="text-lg text-indigo-700 mb-4">Our advanced AI algorithms analyze successful academic applications and provide personalized suggestions to enhance your documents.</p>
					<Image
						src="/banner.png"
						alt="AI Assistant"
						width={600}
						height={400}
						className="rounded-lg"
					/>
				</section>
			</main>
		</div>
	);
}
