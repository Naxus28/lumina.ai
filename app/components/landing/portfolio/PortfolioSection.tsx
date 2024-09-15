import React from 'react';
import { PortfolioItem } from './PortfolioItem';
import { FileText, LibraryBig, GraduationCap } from 'lucide-react';
import { H2, Paragraph } from '@/app/components/typography';

export const PortfolioSection: React.FC = () => (
	<section
		id="portfolio"
		className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
	>
		<div className="max-w-7xl mx-auto">
			<H2>Craft a Complete Academic Portfolio</H2>
			<Paragraph className="text-center text-gray-900 mb-12 max-w-3xl mx-auto">Lumina helps you create a comprehensive portfolio tailored to your field and career stage, covering all essential documents for academic job applications.</Paragraph>
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
					icon={LibraryBig}
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
