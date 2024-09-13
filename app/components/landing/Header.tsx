'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';

const scrollToSection = (id: string) => {
	const element = document.getElementById(id);
	if (element) {
		const headerOffset = 80; // Adjust this value based on your header height
		const elementPosition = element.getBoundingClientRect().top;
		const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth',
		});
	}
};

export const Header: React.FC = () => {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50); // Adjust this value as needed
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-in-out
                ${isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-4'}`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
				<div className="flex items-center">
					<BookOpen className="h-8 w-8 text-[#006D77]" />
					<span className="ml-2 text-2xl font-bold text-[#006D77]">Lumina.ai</span>
				</div>
				<nav>
					<ul className="flex space-x-4">
						{['features', 'how-it-works', 'portfolio', 'styles', 'document-management', 'pricing'].map((item) => (
							<li key={item}>
								<a
									onClick={() => scrollToSection(item)}
									className="text-gray-900 hover:text-[#006D77] cursor-pointer"
								>
									{item
										.split('-')
										.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
										.join(' ')}
								</a>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
};
