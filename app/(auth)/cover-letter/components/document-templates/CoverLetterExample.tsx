import { H2, Span } from '@/app/components/typography';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import React from 'react';

const examples = [
	{
		title: 'Traditional Academic Cover Letter Example',
		type: 'Traditional',
		sections: [
			{
				title: 'Sender and Recipient Information',
				content: `September 1, 2024

Jane Doe
123 Academic Lane
University Town, ST 12345
jane.doe@email.com
(123) 456-7890

Dr. John Smith
Chair, Search Committee
Department of English
University of California, Berkeley
Berkeley, CA 94720

Dear Dr. Smith and Members of the Search Committee,
`,
			},
			{
				title: 'Introduction',
				content:
					"I am writing to apply for the position of Assistant Professor of English at the University of California, Berkeley. As a recent Ph.D. graduate from Stanford University with a specialization in 20th Century American Literature, I am excited about the opportunity to contribute to your department's renowned program.",
			},
			{
				title: 'Research',
				content:
					"My doctoral research, 'The Evolution of Narrative Techniques in Post-War American Fiction,' explores the stylistic innovations in works by authors such as Toni Morrison, Don DeLillo, and Thomas Pynchon. This work has been well-received at conferences and has led to two forthcoming publications in the Journal of American Literature and Modern Fiction Studies.",
			},
			{
				title: 'Teaching',
				content:
					"During my graduate studies, I had the privilege of teaching a variety of undergraduate courses, including 'Introduction to Literary Analysis' and 'Survey of American Literature.' I have consistently received positive student evaluations, with particular praise for my engaging lecture style and innovative use of digital humanities tools in the classroom.",
			},
			{
				title: 'Service',
				content:
					"I have been an active member of the Modern Language Association and have served on the graduate student committee, organizing our annual symposium on 'The Future of Literary Studies in the Digital Age.' I am eager to bring this collaborative spirit to UC Berkeley and contribute to departmental initiatives.",
			},
			{
				title: 'Conclusion',
				content:
					"I am excited about the possibility of joining the English department at UC Berkeley and contributing to its tradition of excellence in research and teaching. Thank you for your consideration. I look forward to discussing how my background and approach align with your department's goals.",
			},
			{
				title: 'Signature',
				content: 'Sincerely,\n\n________\nJane Doe',
			},
		],
	},
	{
		title: 'Research-Focused Academic Cover Letter Example',
		type: 'Research Focused',
		sections: [
			{
				title: 'Sender and Recipient Information',
				content: `October 15, 2024
				
Dr. Alex Johnson
456 Research Avenue
Scientifica, ST 67890
alex.johnson@email.edu
(456) 789-0123

Dr. Sarah Lee
Chair, Search Committee
Department of Biology
Research University
Scientifica, ST 67890

Dear Dr. Lee and Members of the Search Committee,`,
			},
			{
				title: 'Introduction',
				content:
					"I am writing to apply for the position of Assistant Professor of Biology at Research University. As a recent Ph.D. graduate from Elite University with a specialization in Molecular Biology, I am excited about the opportunity to contribute to your department's cutting-edge research program.",
			},
			{
				title: 'Research Accomplishments',
				content:
					"My doctoral research, 'Novel Mechanisms of Gene Regulation in Stem Cells,' has resulted in three first-author publications in high-impact journals including Nature and Cell. This work has been cited over 100 times in the past year and has led to two patent applications. I have also been invited to present my findings at several international conferences, including the Annual Meeting of the American Society for Cell Biology.",
			},
			{
				title: 'Future Research Plans',
				content:
					"Building on my doctoral work, I plan to establish a research program focused on understanding the epigenetic control of stem cell differentiation. This research has potential applications in regenerative medicine and cancer therapy. I am particularly interested in collaborating with your department's strong bioinformatics group to develop new tools for analyzing large-scale epigenomic data.",
			},
			{
				title: 'Teaching and Mentorship',
				content:
					"While my focus has been on research, I have also gained valuable teaching experience as a graduate instructor for 'Introduction to Molecular Biology' and as a mentor to undergraduate researchers in my lab. I am committed to fostering the next generation of scientists through engaging, inquiry-based instruction and hands-on research experiences.",
			},
			{
				title: 'Conclusion',
				content:
					"I am excited about the possibility of joining the Biology department at Research University and contributing to its tradition of excellence in research. I believe my research expertise and mentorship experience make me an excellent fit for this position. Thank you for your consideration. I look forward to discussing how my research program can contribute to and benefit from your department's strengths.",
			},
			{
				title: 'Signature',
				content: 'Sincerely,\n\n______________\nDr. Alex Johnson',
			},
		],
	},
	{
		title: 'Teaching-Focused Academic Cover Letter Example',
		type: 'Teaching Focused',
		sections: [
			{
				title: 'Sender and Recipient Information',
				content: `November 1, 2024
				
Professor Emily Chen
789 Educator Lane
Teachville, ST 34567
emily.chen@email.edu
(789) 012-3456

Dr. Michael Brown
Chair, Search Committee
Department of History
Teaching College
Teachville, ST 34567

Dear Dr. Brown and Members of the Search Committee,`,
			},
			{
				title: 'Introduction',
				content:
					"I am writing to apply for the position of Assistant Professor of History at Teaching College. As an experienced educator with a Ph.D. from Prestigious University and five years of teaching experience at various institutions, I am excited about the opportunity to contribute to your department's commitment to excellence in undergraduate education.",
			},
			{
				title: 'Teaching Philosophy and Experience',
				content:
					"My teaching philosophy centers on active learning and critical engagement with historical sources. I have developed and taught a wide range of courses, from survey-level 'World History' to upper-division seminars on 'Gender in Modern Europe.' Student evaluations consistently praise my interactive teaching style and my ability to make complex historical concepts accessible and relevant to contemporary issues.",
			},
			{
				title: 'Innovative Pedagogy',
				content:
					"I am passionate about incorporating digital humanities tools into my teaching. For example, in my 'Introduction to Historical Methods' course, students use text mining software to analyze large corpora of primary sources, allowing them to identify patterns and trends that would be difficult to discern through traditional close reading alone. This approach not only enhances students' analytical skills but also prepares them for the increasingly digital nature of historical research.",
			},
			{
				title: 'Mentorship and Student Success',
				content:
					'Beyond the classroom, I have served as a faculty advisor for the History Club and have mentored numerous students through independent study projects and honors theses. Several of my students have gone on to present their work at undergraduate research conferences, and three have been accepted to top-tier graduate programs in history.',
			},
			{
				title: 'Research and Professional Development',
				content:
					'While my primary focus is on teaching, I maintain an active research agenda in 19th-century social history. I have published two articles in peer-reviewed journals and am currently working on a book manuscript. I believe this ongoing engagement with scholarship enhances my teaching and allows me to model the research process for my students.',
			},
			{
				title: 'Conclusion',
				content:
					"I am excited about the possibility of joining the History department at Teaching College and contributing to its tradition of excellence in undergraduate education. I believe my teaching experience, innovative pedagogical approaches, and commitment to student mentorship make me an excellent fit for this position. Thank you for your consideration. I look forward to discussing how I can contribute to your department's mission of providing a transformative educational experience for your students.",
			},
			{
				title: 'Signature',
				content: 'Sincerely,\n\n__________________\nProfessor Emily Chen',
			},
		],
	},
	{
		title: 'Interdisciplinary Academic Cover Letter Example',
		type: 'Interdisciplinary',
		sections: [
			{
				title: 'Sender and Recipient Information',
				content: `December 1, 2024
	
Dr. David Kim
101 Academia Boulevard
Interdisciplinary City, ST 56789
david.kim@email.edu
(012) 345-6789

Dr. Rachel Green
Chair, Search Committee
Department of Interdisciplinary Studies
Comprehensive University
Interdisciplinary City, ST 56789

Dear Dr. Green and Members of the Search Committee,`,
			},
			{
				title: 'Introduction',
				content:
					"I am writing to apply for the position of Assistant Professor of Interdisciplinary Studies at Comprehensive University. As a recent Ph.D. graduate from Top University with a specialization in Cognitive Science and three years of postdoctoral experience in Neuroscience and Artificial Intelligence, I am excited about the opportunity to contribute to your department's commitment to cross-disciplinary research and teaching.",
			},
			{
				title: 'Interdisciplinary Research',
				content:
					'My research lies at the intersection of cognitive science, neuroscience, and artificial intelligence. My doctoral work, which resulted in publications in Nature Neuroscience and Trends in Cognitive Sciences, developed a novel computational model of human decision-making that integrates insights from psychology and neurobiology. In my postdoctoral work, I have applied this model to improve AI systems for autonomous vehicles, resulting in a patent and a paper in the Proceedings of the National Academy of Sciences.',
			},
			{
				title: 'Collaborative Projects',
				content:
					"I have a strong track record of interdisciplinary collaboration. I've worked with computer scientists to develop brain-inspired AI algorithms, with philosophers on the ethical implications of AI decision-making, and with clinicians to apply my models to understanding decision-making deficits in neurological disorders. These collaborations have resulted in multiple co-authored papers and a successful NIH grant application.",
			},
			{
				title: 'Interdisciplinary Teaching',
				content:
					"My teaching experience spans multiple disciplines. I've taught courses in cognitive psychology, computational neuroscience, and the philosophy of AI. My interdisciplinary background allows me to create unique courses that bridge traditional disciplinary boundaries. For example, I developed a popular course called 'Minds, Brains, and Machines' that introduces students to key concepts in cognitive science, neuroscience, and AI, and explores how these fields inform each other.",
			},
			{
				title: 'Future Plans',
				content:
					"At Comprehensive University, I hope to establish a research lab that brings together students and researchers from diverse backgrounds to tackle complex problems in human and artificial cognition. I'm also excited about the possibility of developing new interdisciplinary courses and curricula that prepare students for the increasingly interconnected nature of modern scientific and technological challenges.",
			},
			{
				title: 'Conclusion',
				content:
					"I am enthusiastic about the possibility of joining the Department of Interdisciplinary Studies at Comprehensive University. I believe my cross-disciplinary expertise and collaborative approach make me an excellent fit for this position. Thank you for your consideration. I look forward to discussing how I can contribute to your department's mission of fostering innovative, boundary-crossing research and education.",
			},
			{
				title: 'Signature',
				content: 'Sincerely,\n\n___________\nDr. David Kim',
			},
		],
	},
];

const commonStyles: React.CSSProperties = {
	fontFamily: 'Times New Roman',
	fontSize: '12pt',
	lineHeight: '1.15',
	width: '100%',
	height: '100%',
	boxSizing: 'border-box',
	margin: 0,
	overflowY: 'auto',
	whiteSpace: 'pre-wrap',
	wordWrap: 'break-word',
};

export function CoverLetterExample({ templateType }: { templateType: string }) {
	const selectedExample = examples.find((template) => template.type === templateType) || examples[0];

	return (
		<div
			className="w-full  mx-auto bg-white shadow-none"
			style={{ height: '11in' }}
		>
			<div className="h-full">
				<H2 className="text-2xl font-bold text-center">{selectedExample.title}</H2>
				<Alert className="mb-4 w-4/5 m-auto mb-12">
					<AlertDescription>
						This AI-generated sample illustrates the general format of this cover letter style. Your actual cover letter will be uniquely crafted based on your specific inputs and may vary in structure from this example.
					</AlertDescription>
				</Alert>
				<div className="pr-4 h-[calc(100%-4rem)]">
					{selectedExample.sections.map((section, index) => (
						<div
							key={index}
							className="flex items-center gap-8 mb-4"
						>
							<div className="w-1/6 text-right">
								<span className="text-[16px] font-semibold text-gray-500">{section.title}</span>
							</div>
							<div className="w-5/6">
								<div
									className="border-s-4 border-gray-600 rounded-md"
									style={{ ...commonStyles, paddingLeft: '1rem' }}
								>
									<p className="text-[16px]">{section.content}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
