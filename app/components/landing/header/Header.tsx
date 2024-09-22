'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Menu, X } from 'lucide-react';
import { MenuItem } from './MenuItem';

const scrollToSection = (id: string) => {
	const element = document.getElementById(id);
	if (element) {
		const headerOffset = 80;
		const elementPosition = element.getBoundingClientRect().top;
		const offsetPosition = elementPosition + window.scrollY - headerOffset;

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
			setIsScrolled(window.scrollY > 120);
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const menuItems = [
		'introduction',
		'portfolio',
		'maximize-impact',
		'advantages',
		'how-it-works',
		'document-management',
		'pricing',
	];

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-in-out
        ${isScrolled ? 'bg-white shadow-md py-6' : 'bg-gray-900 py-6'}`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
				<div className="flex items-center">
					<BookOpen className="h-8 w-8 text-teal-500" />
					<span className="ml-2 text-2xl font-bold text-teal-500">Lumina.ai</span>
				</div>
				<nav className="hidden lg:block">
					<ul className="flex space-x-4">
						{menuItems.map((item) => (
							<MenuItem key={item} item={item} onClick={() => scrollToSection(item)} isScrolled={isScrolled} />
						))}
					</ul>
				</nav>
				<div className="lg:hidden">
					<button onClick={toggleMenu} className={`${isScrolled ? 'text-gray-900' : 'text-white'} focus:outline-none`}>
						{isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
					</button>
				</div>
			</div>
			{isMenuOpen && (
				<div className="lg:hidden">
					<ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
						{menuItems.map((item) => (
							<MenuItem
								key={item}
								item={item}
								onClick={() => {
									scrollToSection(item);
									setIsMenuOpen(false);
								}}
								isScrolled={isScrolled}
							/>
						))}
					</ul>
				</div>
			)}
		</nav>
	);
};
