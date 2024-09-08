import React from 'react';
import { BookOpen } from 'lucide-react';

export default function Header() {
	return (
		<header className="py-6 px-4 sm:px-6 lg:px-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-[#005F73]" />
            <span className="ml-2 text-2xl font-bold font-['Playfair_Display',serif] text-[#005F73]">Lumina</span>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#features" className="text-[#2B2B2B] hover:text-[#005F73]">Features</a></li>
              <li><a href="#benefits" className="text-[#2B2B2B] hover:text-[#005F73]">Benefits</a></li>
              <li><a href="#pricing" className="text-[#2B2B2B] hover:text-[#005F73]">Pricing</a></li>
            </ul>
          </nav>
        </div>
      </header>
	);
}
