export const promptsCatalog = {
	coverLetter: ({
		template,
		jobDescription,
		cv,
		sender,
		addressee,
	}: {
		template: string;
		jobDescription: string;
		cv: string;
		sender: any;
		addressee: any;
	}) => `
  SENDER_INFO:
  ${JSON.stringify(sender)}

  ADDRESSEE_INFO:
  ${JSON.stringify(addressee)}

  CV_INFO:
  ${cv}
  
  JOB_DESCRIPTION:
  ${jobDescription}
  
  INSTRUCTIONS:
  1. Format the letter in the following order:
     a. Current date (at the very top)
     b. Sender's information (name, address, etc.)
     c. Recipient's information (name, title, institution, address)
  2. If sender information is not provided, extract it from the CV. Include the applicant's name, address, and contact information (email and phone) as found in the CV.
  3. If addressee information is not provided and not found in the job description, use placeholders like [Search Committee Chair's Title and Name], [Institution Name], [Institution Address], etc.
  4. Begin the letter with "Dear [Search Committee Chair's Title and Name]," if available, or "Dear Search Committee," if not.
  5. Mention the position and qualifications
  6. Highlight relevant experiences
  7. Relate skills to job requirements
  8. Do NOT make up any additional information that is not in the CV or job description
  9. Conclude with interest in the position and thanks
  10. Before the closing, add a paragraph offering additional information. Use the applicant's actual contact information from the CV or sender info, not placeholders. For example:
      "If you require any additional information or have any questions, please don't hesitate to contact me at [email from CV] or [phone number from CV], or both if they are both present on the CV. I look forward to the opportunity to further discuss how I can contribute to [Institution Name]."
  11. End with "Sincerely," followed by two line breaks (\n\n).
  12. Add the sender's name (use the name from the CV if not provided in sender info).
  13. After the sender's name, add six line breaks (\n\n\n\n\n\n).
  14. Create a signature line using underscores (_). The number of underscores should EXACTLY match the number of characters in the sender's name, including spaces but EXCLUDING periods, PLUS TWO ADDITIONAL UNDERSCORES. For example, if the name is "John A. Doe", the signature line should be "_____________" (13 underscores: 11 for the name + 2 extra).
  15. Do NOT add any additional line breaks before or after the signature line.
  16. Do NOT add any introductory or explanatory text before or after the letter content.
  17. Use only the information provided in the CV, job description, sender info, and addressee info. Do not invent or assume any additional details.
  
  Generate a ${template}-style cover letter based on the above information, ensuring absolute fidelity to the provided CV and following all the guidelines above. The AI has the freedom to choose different phrases for offering contact information, as long as it conveys the same message and uses only the information provided or appropriate placeholders where information is missing.
  `,
	teachingPhilosophy: ({
		discipline,
		experience,
		disciplinesTaught,
		educationPurpose,
		teachingMotivation,
		studentLearning,
		teachingGoals,
		teachingStyles,
		effectiveMethods,
		teachingValues,
		assessmentMethods,
		inclusiveness,
		researchTeachingConnection,
		challengesInnovations,
		professionalDevelopment,
		anecdote,
		studentAccomplishment,
		teachingPhilosophyEvolution,
		customFields,
	}: {
		discipline: string;
		experience: string;
		disciplinesTaught: string;
		educationPurpose: string;
		teachingMotivation: string;
		studentLearning: string;
		teachingGoals: string;
		teachingStyles: string[];
		effectiveMethods: string;
		teachingValues: string[];
		assessmentMethods: string[];
		inclusiveness: string;
		researchTeachingConnection: string;
		challengesInnovations: string;
		professionalDevelopment: string;
		anecdote: string;
		studentAccomplishment: string;
		teachingPhilosophyEvolution: string;
		customFields: Record<string, string>;
	}) => `
INSTRUCTIONS:
Create a professional and coherent teaching philosophy statement based on the following information. The statement should be well-structured, engaging, and reflect the teacher's unique approach and values.

1. Begin with a strong opening that introduces the teacher's overall approach to education.
2. Early in the statement, mention the teacher's primary discipline and the range of disciplines they have taught. This provides context for their experience and expertise.
3. Organize the content into clear, logical sections that flow naturally from one to the next.
4. Use specific examples and anecdotes to illustrate key points and make the statement more personal and engaging.
5. Ensure that the statement reflects the teacher's passion for their discipline(s) and for education in general.
6. Conclude with a summary that ties together the main points and reiterates the teacher's commitment to education.
7. The statement should be approximately 1-2 pages long (500-1000 words).
8. Use professional language throughout, but maintain a personal and authentic voice.
9. IMPORTANT: Incorporate all provided information--do not ommit information provided by the user--but feel free to organize and present it in the most effective way.
10. Do not invent any information not provided in the input.
11. For lists of teaching styles, values, and assessment methods:
    a. Do not attempt to include all items in a single sentence or paragraph.
    b. Group related items thematically and discuss them in separate paragraphs or sections.
    c. Focus on 3-5 key items that best represent the teacher's core approach or values, and elaborate on these in depth.
    d. Integrate other items naturally throughout the statement where they fit logically and enhance the narrative.
    e. If certain items don't fit naturally into the flow of the statement, it's better to omit them than to force their inclusion.
    f. Use transition phrases to connect different ideas, rather than listing them.
    g. Ensure that each value or method mentioned is contextualized within the broader teaching philosophy.
12. Balance the content: While all provided information should be considered, prioritize depth and coherence over comprehensiveness.

TEACHER INFORMATION:
${Object.entries({
	Discipline: discipline,
	'Teaching Experience': experience,
	'Disciplines Taught': disciplinesTaught,
	'Purpose of Education': educationPurpose,
	'Teaching Motivation': teachingMotivation,
	'View on Student Learning': studentLearning,
	'Teaching Goals': teachingGoals,
	'Teaching Styles': teachingStyles.join(', '),
	'Effective Teaching Methods': effectiveMethods,
	'Teaching Values': teachingValues.join(', '),
	'Assessment Methods': assessmentMethods.join(', '),
	'Approach to Inclusiveness': inclusiveness,
	'Research-Teaching Connection': researchTeachingConnection,
	'Challenges and Innovations': challengesInnovations,
	'Professional Development': professionalDevelopment,
	'Illustrative Anecdote': anecdote,
	'Student Accomplishment': studentAccomplishment,
	'Teaching Philosophy Evolution': teachingPhilosophyEvolution,
})
	.map(([key, value]) => (value ? `${key}: ${value}` : null))
	.filter(Boolean)
	.join('\n')}

CUSTOM FIELDS:
${Object.entries(customFields)
	.map(([key, value]) => `${key}: ${value}`)
	.join('\n')}

FINAL INSTRUCTIONS:
1. Review all the information provided above, including the custom fields.
2. It is CRITICAL to incorporate ALL provided information into the teaching philosophy statement. Do not omit any details provided by the user.
3. Prioritize creating a coherent and engaging narrative while ensuring all information is included.
4. If certain information doesn't fit naturally into the flow of the statement, create a separate section or paragraph to address it.
5. Integrate custom fields naturally into the most relevant sections of the statement.
6. Remember to follow the guidelines for handling lists of teaching styles, values, and assessment methods as outlined in the initial instructions.
7. Avoid forced connections or unnatural groupings of ideas. If certain concepts don't fit well together, discuss them separately.
8. Make sure to incorporate the teacher's experience across different disciplines, as indicated in the "Disciplines Taught" field, to showcase their versatility and breadth of knowledge.
9. When referring to any potential future teaching engagements or roles at a specific institution, always frame these as hypothetical opportunities. Use phrases like "if given the opportunity," "if offered the position," or "in a potential role at [Institution]."
10. Double-check that ALL provided information, including disciplines taught, anecdotes, student accomplishments, and custom fields, has been incorporated into the statement before finalizing.

Based on this information, generate a comprehensive teaching philosophy statement that accurately represents the teacher's approach, values, and goals in education, ensuring ALL provided information is included in a meaningful and integrated manner.
`,

	// Add more prompt types as needed
};

export type PromptType = keyof typeof promptsCatalog;
