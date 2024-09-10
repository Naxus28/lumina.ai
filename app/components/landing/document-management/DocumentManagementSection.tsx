import React from 'react';
import { FolderOpen, Save, FileSearch } from 'lucide-react';
import { FeatureCard } from './DocumentManagementCard';

export const DocumentManagementSection = () => {
	return (
		<section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" id="document-management">
			<div className="max-w-7xl mx-auto">
				<div className="flex items-center justify-center mb-4">
					<h2 className="text-3xl font-bold text-center text-gray-900">Document Management Solution</h2>
				</div>
				<p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">Lumina offers a straightforward solution to manage and organize all your academic application materials in one place, making your job search more efficient and stress-free.</p>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
					<FeatureCard
						icon={Save}
						title="Easy Document Saving"
						description="Save all your generated documents directly within the platform for quick access anytime, anywhere."
					/>
					<FeatureCard
						icon={FolderOpen}
						title="Organized Folders"
						description="Create custom folders to organize your application materials by institution, position, or any category that suits your needs."
					/>
					<FeatureCard
						icon={FileSearch}
						title="Quick Retrieval"
						description="Easily search and find the documents you need, when you need them, saving you time and reducing stress during your job search."
					/>
				</div>
			</div>
		</section>
	);
};
