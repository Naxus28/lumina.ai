// src/components/ui/Navigation/Navigation.js
import React from 'react';
import NavLink from '../NavLink/NavLink';

const Navigation = () => {
	return (
		<nav>
			<ul className="flex space-x-6">
				<li>
					<NavLink href="/features">Features</NavLink>
				</li>
				<li>
					<NavLink href="/cover-letter-generator">Create Cover Letter</NavLink>
				</li>
				<li>
					<NavLink href="/about">About</NavLink>
				</li>
				<li>
					<NavLink href="/contact">Contact</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
