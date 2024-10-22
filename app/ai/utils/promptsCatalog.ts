import { formatLetterDate } from '@/app/utils/dateUtils';
import { coverLetterExamples } from '../../(auth)/cover-letter/components/document-templates/CoverLetterExample';

export const promptsCatalog = {
	coverLetter: ({
		jobDescription,
		cv,
		recipient,
		template,
		customFields,
		highlights,
	}: {
		jobDescription: string;
		cv: string;
		recipient: any;
		template: string;
		customFields: string;
		highlights: string[];
	}) => {
		// console.log('template', template);
		const coverLetterExample = coverLetterExamples.find((example) => example.type === template);
		// console.log('coverLetterExample: ', coverLetterExample);
		const todayDate = formatLetterDate(new Date());
		const recipientInfo = JSON.stringify(recipient);
		const customFieldsBlock =
			customFields?.length > 0
				? `IMPORTANT: Incorporate the following custom information provided by the applicant:
         
          ${customFields}

          For each custom field:
          1. Integrate it naturally into the letter without attributing it to the CV or any specific document.
          2. Present it as part of the applicant's interests, goals, or additional qualifications.
          3. Connect it to the job requirements or the role where relevant.
          4. Ensure it complements the overall narrative of the letter without disrupting the flow.

          Do not present custom fields as if they were sections or highlights from the CV.`
				: '';
		const highlightsBlock =
			highlights?.length > 0
				? `CRITICAL INSTRUCTION: Seamlessly integrate the following key elements from the CV into the cover letter:
    
    ${highlights.map((highlight, index) => `${index + 1}. ${highlight}`).join('\n')}
    
    For each item:
    1. Incorporate it naturally into the letter's narrative without explicitly labeling it.
    2. Provide specific, relevant details from the CV related to this item,.
    3. Demonstrate clear connections between the applicant's experience in this area and the job requirements.
    4. Illustrate how this aspect of the applicant's background contributes to their suitability for the position.
    5. Provide concrete and relevant examples taken from the applicant's CV for each item provided.
    
    Ensure all items are addressed thoroughly, maintaining a smooth and professional tone throughout the letter. The integration should feel organic and aligned with the overall flow of the letter.`
				: '';

		return `
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
   a. Use ${todayDate} as a placeholder at the top
   b. Sender Information: Extract from CV using appropriate capitalization (first letter of each word).

    - If affiliated with a University:
      - [Applicant's Title (use "Dr." if Ph.D.) and Name] 
      - [Department Name and Office/Building]
      - [Institution Name, City, State]
      - [Applicant's Email]
      - [Applicant's Phone Number]
     
      Example: 
      Dr. John Doe
      Music Building, Office 12
      University of Florida, Gainesville, FL
      john.doe@ufl.edu
      +1 352 234 5678

    - If not affiliated with a University:
      - [Applicant's Title (use "Dr." if Ph.D.) and Name] 
      - [Street Address]
      - [City, State ZIP]
      - [Applicant's Email]
      - [Applicant's Phone Number]
    
      Example: 
      Dr. John Doe
      75 Elm St.
      Winter Park, FL 32792
      john.doe@ufl.edu
      +1 352 234 5678
   
   c. Recipient's information (use placeholders if not available)
    - ALWAYS use RECIPIENT_INFO if it is not empty.
    - If RECIPIENT_INFO is an empty string:
        i. Use recipient details from the job description if available.
        ii. If job description lacks complete details, use these placeholders for missing information:
          - [Search Committee Chair's Title and Name]
          - [Department Name]
          - [Institution Name]
          - [Institution Address]
    - Never mix placeholders with provided information from RECIPIENT_INFO.
      e.g. 
      Dr. John Doe, Chair
      Music Building, office 12
      University of Georgia, Athens, GA
      john.doe@uga.edu
      +1 919 234 567

1. Begin with "Dear [Search Committee Chair's Title and Name]," if name and title available in RECIPIENT_INFO or JOB_DESCRIPTION, otherwise use "Dear Search Committee,".

2. IMPORTANT: Recognize the applicant's highest degree. Always use "Dr." for PhD holders in the letter, regardless of how they refer to themselves in the CV.

3. Content Guidelines:
   - Use only information from the CV, job description, sender info, and recipient info. Do not invent details.
   - Ensure that "Dr." is used consistently throughout the letter for PhD holders.
   - IMPORTANT: Always use the name and department of the University in the Job Description when addressing the place the applicant is applying for; NEVER use placeholders when this information is available.
   - Mention the position and qualifications
   - Highlight relevant experiences, aligning with job requirements
   - Emphasize experience in areas mentioned in the job description
   - Demonstrate alignment of research/teaching interests with department focus
   - Include teaching experience, course development, and mentorship information
   - Highlight professional service, committee work, or leadership roles
   - Address unique requirements from the job description
   - Integrate organically topics from published articles or conferences where appropriate to highlight the qualifications of the candidate for the current job description
   - Prioritize addressing job requirements over strict length adherence. Emphasize service activities that align with the institution's values and the specific position requirements.
   - Do not add any introductory or explanatory text before or after the letter.
   - When referring to the number of mentees, students, or grants, do not add up or provide specific total numbers. Instead, use descriptive words that highlight the extent of experience, such as "numerous grants," "extensive teaching experience," "significant mentorship roles," etc. Only use specific numbers if they are explicitly stated as totals in the CV.
   ${highlightsBlock}
   ${customFieldsBlock}

4. For numerical data:
   - DO NOT use specific numbers for grants, mentees, or students advised.
   - Instead, use descriptive terms (e.g., "secured multiple grants", "mentored numerous students", "advised several graduate students")
   - For financial information, use general terms (e.g., "secured substantial funding", "awarded significant grants") without specifying exact amounts or currencies

5. Before concluding, reiterate interest in the position. Avoid repeating information already stated in the letter.

6. Conclude by adding a paragraph offering additional information using this exact structure:

"If you require any additional information or have any questions, please don't hesitate to contact me at [EMAIL] or [PHONE NUMBER]. I look forward to the opportunity to further discuss how I can contribute to [INSTITUTION NAME]."

Replace [EMAIL], [PHONE NUMBER], and [INSTITUTION NAME] with the applicant's actual email, phone number, and the name of the institution they're applying to. If the phone number is not provided in the CV, omit that part of the sentence.

Example:
"If you require any additional information or have any questions, please don't hesitate to contact me at jsmith@email.com or 555-123-4567. I look forward to the opportunity to further discuss how I can contribute to University of Example."

Or if no phone number is provided in CV:
"If you require any additional information or have any questions, please don't hesitate to contact me at jsmith@email.com. I look forward to the opportunity to further discuss how I can contribute to University of Example."

Ensure this paragraph is included in every letter, with the appropriate contact information and institution name.

7. End with "Sincerely," followed by EXACTLY six line breaks, then the signature block.

8. Signature block:
    a. Create a signature line with underscores matching the sender's name length (excluding periods) plus two
    b. Add EXACTLY one line break after the signature line
    c. Add sender's name with appropriate title (e.g., "Dr." for PhD holders)
    d. On the next line, add the sender's current academic position and academic area taken from Ph.D degree (if applicable)
    e. On the following line, add the sender's current institution (if applicable)
    f. After the complete signature block, add EXACTLY six line breaks of \n\n\n\n\n\n

Example:
Sincerely,
[add six line breaks]

___________________
Dr. Jane Doe
Assistant Professor of Biology
University of Example


Generate a ${template}-style cover letter based on the above information, ensuring absolute fidelity to the provided CV and following all the guidelines above. Structure the letter similarly to the way it is structured in this ${template} example ${coverLetterExample}
Pay special attention to accuracy, especially with numerical data and the applicant's title, use descriptive terms for mentees, students, and grants as instructed, and emphasize the highlighted aspects of the CV. The AI has the freedom to choose different phrases for offering contact information, as long as it conveys the same message and uses only the information provided or appropriate placeholders where information is missing.
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
