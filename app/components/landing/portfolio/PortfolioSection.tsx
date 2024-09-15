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
			<Paragraph className="text-center text-gray-900 mb-12 max-w-3xl mx-auto">Lumina crafts tailored academic portfolios with AI-generated content, adapting to your field and career stage. Our diverse document styles highlight your unique qualifications and potential contributions, ensuring your application stands out and captures the attention of hiring committees.</Paragraph>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<PortfolioItem
					icon={FileText}
					title="CV"
					description="Craft a compelling CV that showcases your academic journey, research accomplishments, and teaching experiences."
					examples={['Comprehensive Academic', 'Research Emphasis', 'Teaching-Focused', 'Interdisciplinary', 'Publication-Focused', 'Grants and Funding']}
				/>
				<PortfolioItem
					icon={FileText}
					title="Cover Letter"
					description="Compose impactful cover letters that highlight your unique qualifications and enthusiasm for each position."
					examples={['Traditional Academic', 'Research Emphasis', 'Teaching-Focused', 'Interdisciplinary Approach', 'Postdoctoral Application']}
				/>
				<PortfolioItem
					icon={LibraryBig}
					title="Research Statement"
					description="Develop a clear and persuasive research statement that outlines your past work, current projects, and future directions."
					examples={['Comprehensive Overview', 'Future-Oriented Plan', 'Impact-Focused Summary', 'Interdisciplinary Approach', 'Methodological Innovation', 'Theoretical Contribution', 'Applied Research']}
				/>
				<PortfolioItem
					icon={GraduationCap}
					title="Teaching Philosophy"
					description="Articulate your approach to education and student engagement, reflecting your pedagogical methods and experiences."
					examples={['Comprehensive Traditional', 'Student-Centered Learning', 'Inclusive Pedagogy', 'Technology-Enhanced Teaching', 'Interdisciplinary Integration', 'Culturally Responsive Teaching']}
				/>
			</div>
		</div>
	</section>
);
