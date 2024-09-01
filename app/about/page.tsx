// src/app/about/page.js
import React from 'react';
import Image from 'next/image';
import Header from '../../components/ui/Header/Header';

export default function AboutPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
			<Header />

			<main className="max-w-4xl mx-auto">
				<h1 className="text-4xl font-bold text-center text-indigo-900 mb-12">About Lumina.ai</h1>

				<div className="bg-white rounded-lg shadow-xl p-8 mb-12">
					<div className="relative w-full h-64 mb-8">
						<Image
							src="/image1.png"
							alt="Lumina.ai Team"
							fill
							className="object-cover rounded-lg"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
					</div>

					<h2 className="text-2xl font-bold text-indigo-800 mb-4">Our Mission</h2>
					<p className="text-lg text-indigo-700 mb-6">Lumina.ai is an AI-powered SaaS application designed to assist academics in creating high-quality job application documents. Our mission is to empower academic job seekers by streamlining the process of crafting compelling CVs, cover letters, research statements, and teaching philosophies tailored to academic positions.</p>

					<h2 className="text-2xl font-bold text-indigo-800 mb-4">Who We Serve</h2>
					<p className="text-lg text-indigo-700 mb-6">Our platform is specifically designed for graduate students, postdocs, and early-career researchers navigating the competitive academic job market. We understand the unique challenges faced by scholars who have invested years in their academic pursuits and aim to help them showcase their achievements effectively.</p>

					<h2 className="text-2xl font-bold text-indigo-800 mb-4">Our Unique Approach</h2>
					<p className="text-lg text-indigo-700 mb-6">Lumina.ai stands out with its AI-assisted, field-specific document creation for academic jobs. We combine advanced language models with deep understanding of academic requirements to generate, refine, and optimize application materials that truly reflect each individual's unique qualifications and potential.</p>

					<h2 className="text-2xl font-bold text-indigo-800 mb-4">Key Benefits</h2>
					<ul className="list-disc list-inside text-lg text-indigo-700 mb-6">
						<li>Time-saving automation of application document creation</li>
						<li>Customization for specific academic positions and fields</li>
						<li>Professional and polished presentation of academic achievements</li>
						<li>Ability to focus on research and teaching while easily creating impactful materials</li>
						<li>Efficiency in applying to multiple positions simultaneously</li>
					</ul>

					<h2 className="text-2xl font-bold text-indigo-800 mb-4">Our Technology</h2>
					<p className="text-lg text-indigo-700 mb-6">Built on a robust tech stack including Next.js, GPT-4/Claude AI, and PostgreSQL, and deployed on Vercel, Lumina.ai offers a seamless, responsive, and intelligent platform for academic career management.</p>

					<p className="text-lg text-indigo-700">At Lumina.ai, we believe that your brilliance should shine through your research and teaching, not your ability to craft application materials. Let us handle the intricacies of job applications, illuminating your path to the next stage of your academic career.</p>
				</div>
			</main>
		</div>
	);
}
