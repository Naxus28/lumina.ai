import React from 'react';
import { PortfolioItem } from './PortfolioItem';
import { FileText, HelpCircle, GraduationCap } from 'lucide-react';

export const PortfolioSection: React.FC = () => (
	<section
		id="portfolio"
		className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
	>
		<div className="max-w-7xl mx-auto">
			<h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Craft Your Complete Academic Portfolio</h2>
			<p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">Lumina helps you create a comprehensive portfolio tailored to your field and career stage, covering all essential documents for academic job applications.</p>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<PortfolioItem
					icon={FileText}
					title="CV"
					description="Craft a compelling CV that showcases your academic journey, research accomplishments, and teaching experiences."
				/>
				<PortfolioItem
					icon={FileText}
					title="Cover Letter"
					description="Compose impactful cover letters that highlight your unique qualifications and enthusiasm for each position."
				/>
				<PortfolioItem
					icon={HelpCircle}
					title="Research Statement"
					description="Develop a clear and persuasive research statement that outlines your past work, current projects, and future directions."
				/>
				<PortfolioItem
					icon={GraduationCap}
					title="Teaching Philosophy"
					description="Articulate your approach to education and student engagement, reflecting your pedagogical methods and experiences."
				/>
			</div>
		</div>
	</section>
);
