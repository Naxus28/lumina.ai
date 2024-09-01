// src/components/ui/Header/Header.js
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '../Navigation/Navigation';

const Header = () => {
	return (
		<header className="flex justify-between items-center py-6 px-8 mb-10">
			<Link
				href="/"
				className="flex items-center"
			>
				<div className="relative w-10 h-10 mr-2 ">
					<Image
						src="/lumina.png"
						alt="Lumina.ai Logo"
						fill
						className="object-contain"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				</div>
				<span className="text-2xl font-bold text-indigo-900">Lumina.ai</span>
			</Link>
			<Navigation />
		</header>
	);
};

export default Header;
