// src/components/ui/NavLink/NavLink.js
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLink = ({ href, children }) => {
	const pathname = usePathname();
	const isActive = pathname === href;

	return (
		<Link
			href={href}
			className={`text-indigo-600 hover:text-indigo-800 ${isActive ? 'font-bold' : ''}`}
		>
			{children}
		</Link>
	);
};

export default NavLink;
