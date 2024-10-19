export const promptsCatalog = {
	coverLetter: ({
		jobDescription,
		cv,
		recipient,
		sender,
		template,
		customFields,
	}: {
		jobDescription: string;
		cv: string;
		recipient: any;
		sender: any;
		template: string;
		customFields: string;
	}) => {
		const senderInfo = JSON.stringify(sender);
		const recipientInfo = JSON.stringify(recipient);
		return `
  SENDER_INFO:
  ${senderInfo}

  RECIPIENT_INFO:
  ${recipientInfo}

  CV_INFO:
  ${cv}
  
  JOB_DESCRIPTION:
  ${jobDescription}
  
  CUSTOM_FIELDS:
  ${customFields}

INSTRUCTIONS:
1. Format the letter in this order:
   a. Use [Month DD, YYYY] as a placeholder at the top
   b. Sender's information (extract from CV if not provided)
   c. Recipient's information (use placeholders if not available)

2. Sender Information: Use ${senderInfo} if not empty, otherwise extract from CV including name, address, email, and phone.

3. Recipient Information: 
   a. ALWAYS use ${recipientInfo} if it is not empty. Do not use any placeholders if ${recipientInfo} contains information.
   b. Only if ${recipientInfo} is completely empty:
      i. Use recipient details from the job description if available.
      ii. If job description lacks complete details, use these placeholders for missing information:
         - [Search Committee Chair's Title and Name]
         - [Department Name]
         - [Institution Name]
         - [Institution Address]
   c. Never mix placeholders with provided information from ${recipientInfo}.

Example of correct usage:
If ${recipientInfo} contains: 
Dr. Jane Smith
Department of Computer Science

Then use exactly that, do not add any placeholders.

If ${recipientInfo} is empty, and job description only provides the institution, use:
[Search Committee Chair's Title and Name]
[Department Name]
University of Example
[Institution Address]

Example of a complete recipient block using only placeholders:
[Search Committee Chair's Title and Name]
[Department Name]
[Institution Name]
[Institution Address]

4. Begin with "Dear [Search Committee Chair's Title and Name]," if available, or "Dear Search Committee," if not.

5. IMPORTANT: Recognize the applicant's highest degree. Always use "Dr." for PhD holders in the letter, regardless of how they refer to themselves in the CV.

6. Content Guidelines:
   - Mention the position and qualifications
   - Highlight relevant experiences, aligning with job requirements
   - Emphasize experience in areas mentioned in the job description
   - Demonstrate alignment of research/teaching interests with department focus
   - Include teaching experience, course development, and mentorship information
   - Highlight professional service, committee work, or leadership roles
   - Address unique requirements from the job description
   - Integrate organically topics from published articles or conferences where appropriate to highlight the qualifications of the candidate for the current job description

7. Use only information from the CV, job description, sender info, and recipient info. Do not invent details.

8. For numerical data:
   - DO NOT use specific numbers for grants, mentees, or students advised.
   - Instead, use descriptive terms (e.g., "secured multiple grants", "mentored numerous students", "advised several graduate students")
   - For financial information, use general terms (e.g., "secured substantial funding", "awarded significant grants") without specifying exact amounts or currencies

9. If CUSTOM_FIELDS ${customFields} are provided, integrate them organically in the letter, maintaining original intent and conditionality. 

10. Before concluding, add a paragraph offering additional information using this exact structure:

"If you require any additional information or have any questions, please don't hesitate to contact me at [EMAIL] or [PHONE NUMBER]. I look forward to the opportunity to further discuss how I can contribute to [INSTITUTION NAME]."

Replace [EMAIL], [PHONE NUMBER], and [INSTITUTION NAME] with the applicant's actual email, phone number, and the name of the institution they're applying to. If the phone number is not provided in the CV, omit that part of the sentence.

Example:
"If you require any additional information or have any questions, please don't hesitate to contact me at jsmith@email.com or 555-123-4567. I look forward to the opportunity to further discuss how I can contribute to University of Example."

Or if no phone number is provided:
"If you require any additional information or have any questions, please don't hesitate to contact me at jsmith@email.com. I look forward to the opportunity to further discuss how I can contribute to University of Example."

Ensure this paragraph is included in every letter, with the appropriate contact information and institution name.

11. Conclude with interest in the position and thanks. Avoid repeating information already stated in the letter.

12. End with "Sincerely," followed by EXACTLY two line breaks.

13. Signature block:
    a. Create a signature line with underscores matching the sender's name length (excluding periods) plus two
    b. Add EXACTLY one line break after the signature line
    c. Add sender's name with appropriate title (e.g., "Dr." for PhD holders)
    d. On the next line, add the sender's current academic position and academic area taken from Ph.D degree (if applicable)
    e. On the following line, add the sender's current institution (if applicable)
    f. After the complete signature block, add EXACTLY four line breaks

Example:
______________________

Dr. Jane Doe
Assistant Professor of Biology
University of Example




14. Do not add any introductory or explanatory text before or after the letter.

15. FINAL CHECK: Ensure that "Dr." is used consistently throughout the letter for PhD holders.

Generate a ${template}-style cover letter based on these guidelines, ensuring accuracy and adherence to the provided information. Use the jargon from the academic area of the applicant where appropriate and without exaggeration. Finally, avoid repetition, especially in the closing paragraph.
`;
	},

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
