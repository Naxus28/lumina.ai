import React from 'react';

export const Footer: React.FC = () => (
	<footer className="bg-gray-50 text-gray-900 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
		<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
			<div className="mb-4 md:mb-0">
				<span className="text-2xl font-bold text-[#006D77]">Lumina</span>
				<p className="mt-2">Bright Careers, Brilliantly Presented</p>
			</div>
			<div className="flex space-x-6">
				<a
					href="#"
					className="hover:text-[#006D77]"
				>
					Terms
				</a>
				<a
					href="#"
					className="hover:text-[#006D77]"
				>
					Privacy
				</a>
				<a
					href="#"
					className="hover:text-[#006D77]"
				>
					Contact
				</a>
			</div>
		</div>
	</footer>
);
