import React from 'react';
import { DocumentStyleCard } from './DocumentStyleCard';

export const StylesSection: React.FC = () => (
  <section id="styles" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Tailored Styles for Every Academic Need</h2>
      <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        Choose from a variety of document styles, and let our AI generate tailored content. Lumina's AI adapts to your selected style, ensuring your application stands out across diverse academic fields and career stages.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <DocumentStyleCard
          icon="cv"
          title="CV Styles"
          description="Choose from a variety of CV styles designed for different academic fields and career stages."
          examples={["Classic Academic", "Modern Research-Focused", "Creative Academic", "Compact One-Page"]}
        />
        <DocumentStyleCard
          icon="cover-letter"
          title="Cover Letter Styles"
          description="Our cover letter styles help you make a strong first impression, tailored to your field and the position."
          examples={["Traditional Academic", "Research Emphasis", "Teaching Focus", "Interdisciplinary Approach"]}
        />
        <DocumentStyleCard
          icon="research"
          title="Research Statement Styles"
          description="Effectively communicate your research journey with our specialized styles."
          examples={["Comprehensive Overview", "Future-Oriented Plan", "Impact-Focused Summary"]}
        />
        <DocumentStyleCard
          icon="teaching"
          title="Teaching Philosophy Styles"
          description="Express your educational approach with clarity and conviction, suited to your discipline and teaching context."
          examples={["Student-Centered Approach", "Innovative Methods", "Discipline-Specific Pedagogy"]}
        />
      </div>
    </div>
  </section>
);