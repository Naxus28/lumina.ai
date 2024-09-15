'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Menu, X } from 'lucide-react';

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
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 80); // Adjust this value as needed
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const menuItems = ['features', 'how-it-works', 'portfolio', 'document-styles', 'document-management', 'pricing'];

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-in-out
                ${isScrolled ? 'bg-white shadow-md py-4' : 'bg-gray-900 py-4'}`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
				<div className="flex items-center">
					<BookOpen className="h-8 w-8 text-teal-500" />
					<span className="ml-2 text-2xl font-bold text-teal-500">Lumina.ai</span>
				</div>
				<nav className="hidden lg:block">
					<ul className="flex space-x-4">
						{menuItems.map((item) => (
							<li key={item}>
								<a
									onClick={() => scrollToSection(item)}
									className={`${isScrolled ? 'text-gray-900' : 'text-white'} hover:text-[#006D77] cursor-pointer`}
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
				<div className="lg:hidden">
					<button
						onClick={toggleMenu}
						className={`${isScrolled ? 'text-gray-900' : 'text-white'} focus:outline-none`}
					>
						{isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
					</button>
				</div>
			</div>
			{isMenuOpen && (
				<div className="lg:hidden">
					<ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
						{menuItems.map((item) => (
							<li key={item}>
								<a
									onClick={() => {
										scrollToSection(item);
										setIsMenuOpen(false);
									}}
									className={`block px-3 py-2 rounded-md text-base font-medium ${isScrolled ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-gray-700'} cursor-pointer`}
								>
									{item
										.split('-')
										.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
										.join(' ')}
								</a>
							</li>
						))}
					</ul>
				</div>
			)}
		</header>
	);
};
