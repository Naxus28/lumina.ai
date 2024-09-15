import React from 'react';
import { CoverLetterTemplate } from './models';

const CoverLetterExample = ({ templateType }: { templateType: CoverLetterTemplate['name'] | null | '' }) => {
	const templates = {
		'Traditional Academic': [
			{ content: "I am writing to apply for the position of Assistant Professor of English at the University of California, Berkeley. As a recent Ph.D. graduate from Stanford University with a specialization in 20th Century American Literature, I am excited about the opportunity to contribute to your department's renowned program.", label: 'Introduction' },
			{ content: "My doctoral research, 'The Evolution of Narrative Techniques in Post-War American Fiction,' explores the stylistic innovations in works by authors such as Toni Morrison, Don DeLillo, and Thomas Pynchon. This work has been well-received at conferences and has led to two forthcoming publications in the Journal of American Literature and Modern Fiction Studies.", label: 'Research' },
			{ content: "During my graduate studies, I had the privilege of teaching a variety of undergraduate courses, including 'Introduction to Literary Analysis' and 'Survey of American Literature.' I have consistently received positive student evaluations, with particular praise for my engaging lecture style and innovative use of digital humanities tools in the classroom.", label: 'Teaching' },
			{ content: "I have been an active member of the Modern Language Association and have served on the graduate student committee, organizing our annual symposium on 'The Future of Literary Studies in the Digital Age.' I am eager to bring this collaborative spirit to UC Berkeley and contribute to departmental initiatives.", label: 'Service' },
			{ content: "I am excited about the possibility of joining the English department at UC Berkeley and contributing to its tradition of excellence in research and teaching. Thank you for your consideration. I look forward to discussing how my background and approach align with your department's goals.", label: 'Conclusion' },
		],
		'Research Emphasis': [
			{ content: "I am writing to express my strong interest in the Assistant Professor of Biology position at MIT. With my Ph.D. in Molecular Biology from Harvard University and postdoctoral research at the Broad Institute, I am well-positioned to contribute to MIT's cutting-edge research initiatives in genomics and synthetic biology.", label: 'Introduction' },
			{ content: "My doctoral research on CRISPR-Cas9 gene editing techniques in human stem cells has resulted in three first-author publications in Nature and Cell. This work has opened new avenues for potential therapeutic applications in genetic disorders. During my postdoc, I've expanded on this research, developing novel methods for targeted epigenetic modifications, which has led to a patent application and a publication currently under review in Science.", label: 'Primary Research' },
			{ content: 'I am currently leading a collaborative project with computer scientists to develop machine learning algorithms for predicting off-target effects in gene editing. This interdisciplinary work has been recognized with a NIH New Innovator Award and has potential implications for improving the safety and efficacy of gene therapy treatments.', label: 'Ongoing Research' },
			{ content: 'While my primary focus is research, I have enjoyed mentoring graduate students and teaching advanced courses in molecular biology and bioinformatics. I am particularly interested in involving students in cutting-edge research projects, fostering the next generation of innovative biologists.', label: 'Teaching' },
			{ content: "I am excited about the prospect of establishing my research program at MIT and contributing to its world-class biology department. I look forward to discussing how my research agenda aligns with MIT's mission of advancing knowledge and educating students in science and technology. Thank you for your consideration.", label: 'Conclusion' },
		],
		'Teaching Emphasis': [
			{ content: 'I am writing to apply for the position of Assistant Professor of History at Williams College. As a Ph.D. graduate from Yale University with five years of diverse teaching experience, I am passionate about fostering critical thinking and a love for historical inquiry in undergraduate students.', label: 'Introduction' },
			{ content: "My teaching philosophy centers on active learning and student engagement. In my survey courses on World History, I have developed a 'History Lab' model where students work with primary sources to construct historical narratives. For upper-level seminars, I employ a mix of debates, role-playing exercises, and digital history projects to deepen student understanding of historical processes and historiography.", label: 'Teaching Philosophy' },
			{ content: "I have experience teaching a wide range of courses, from 'Introduction to Historical Methods' to specialized seminars on 'Global Environmental History' and 'Comparative Revolutions.' My student evaluations consistently praise my accessibility, enthusiasm, and ability to make complex historical concepts relatable. I have also mentored several undergraduate students in their honors thesis projects, two of which have won departmental awards.", label: 'Teaching Experience' },
			{ content: 'To enhance my teaching, I have completed a certificate in Digital Pedagogy and regularly participate in teaching workshops. I am excited about the possibility of contributing to curriculum development at Williams, particularly in integrating digital humanities tools into the history curriculum.', label: 'Professional Development' },
			{ content: 'While teaching is my primary passion, I maintain an active research agenda focused on environmental history and historical pedagogy. My recent article in The History Teacher explores innovative approaches to teaching climate history to non-majors.', label: 'Research' },
			{ content: "I am thrilled at the prospect of joining Williams College's history department and contributing to its tradition of teaching excellence. Thank you for considering my application. I look forward to the opportunity to further discuss my teaching approach and how it aligns with Williams' commitment to liberal arts education.", label: 'Conclusion' },
		],
		'Interdisciplinary Focus': [
			{ content: "I am writing to apply for the Assistant Professor position in the Interdisciplinary Environmental Studies Program at the University of Michigan. My background, combining a Ph.D. in Environmental Science from UC Berkeley with a Master's in Public Policy from Harvard Kennedy School, uniquely positions me to contribute to your program's commitment to addressing complex environmental challenges through interdisciplinary research and teaching.", label: 'Introduction' },
			{
				content: "My research lies at the intersection of climate science, environmental policy, and social justice. My dissertation, 'Climate Adaptation Strategies in Coastal Communities: Integrating Science, Policy, and Equity,' combines climate modeling with policy analysis and community-based participatory research. This work has been published in Nature Climate Change and the Journal of Environmental Policy & Planning, demonstrating its relevance across disciplines.",
				label: 'Interdisciplinary Research',
			},
			{ content: "I have designed and taught innovative courses that bridge multiple disciplines, such as 'Environmental Justice: Science, Policy, and Advocacy' and 'Sustainable Urban Planning in the Age of Climate Change.' These courses have attracted students from Environmental Science, Public Policy, Sociology, and Urban Planning, fostering rich interdisciplinary dialogues and collaborative projects.", label: 'Interdisciplinary Teaching' },
			{ content: 'My interdisciplinary approach extends to my service activities. I have been an active member of the American Association for the Advancement of Science and the International Association for Society and Natural Resources, organizing joint panels to promote dialogue between natural scientists, social scientists, and policymakers on pressing environmental issues.', label: 'Service and Collaboration' },
			{ content: "I am excited about the opportunity to contribute to the University of Michigan's interdisciplinary initiatives, particularly the Graham Sustainability Institute. I believe my background and approach align well with your institution's mission to develop knowledge and solutions to sustainability challenges.", label: 'Alignment with University' },
			{ content: "Thank you for considering my application. I look forward to the possibility of discussing how my interdisciplinary expertise can enrich your program and contribute to the University of Michigan's leadership in environmental studies and sustainability research.", label: 'Conclusion' },
		],
	};

	const templateSections = templateType && templateType !== '' ? templates[templateType as keyof typeof templates] : [];

	const commonStyles: React.CSSProperties = {
		fontFamily: 'Times New Roman',
		fontSize: '12pt',
		lineHeight: '1.15',
		width: '100%',
		height: '100%',
		boxSizing: 'border-box',
		margin: 0,
		border: 'none',
		overflowY: 'auto',
		whiteSpace: 'pre-wrap',
		wordWrap: 'break-word',
	};

	return (
		<div
			className="w-full max-w-[8.5in] mx-auto bg-white shadow-none"
			style={{ height: '11in' }}
		>
			<div className="h-full overflow-hidden">
				<h2 className="text-2xl font-bold text-center mb-6">{templateType} Cover Letter Example</h2>
				<div className="pr-4 h-[calc(100%-4rem)] overflow-y-auto">
					{templateSections.map((section, index) => (
						<div
							key={index}
							className="flex items-center gap-8 mb-4"
						>
							<div className="w-1/6 text-right">
								<span className="text-xs font-semibold text-gray-500">{section.label}</span>
							</div>
							<div className="w-5/6">
								<div
									className="border-2 border-gray-400"
									style={{ ...commonStyles, paddingLeft: '.5rem' }}
								>
									<p className="text-sm">{section.content}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CoverLetterExample;
