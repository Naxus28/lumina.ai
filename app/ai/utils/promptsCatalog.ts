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
		educationPurpose,
		teachingMotivation,
		studentLearning,
		teachingGoals,
		effectiveMethods,
		teachingValues,
		assessmentMethods,
		inclusiveness,
		researchTeachingConnection,
		challengesInnovations,
		professionalDevelopment,
		teachingStyles,
		anecdote,
		...customFields
	}: {
		discipline: string;
		experience: string;
		educationPurpose: string;
		teachingMotivation: string;
		studentLearning: string;
		teachingGoals: string;
		effectiveMethods: string;
		teachingValues: string[];
		assessmentMethods: string[];
		inclusiveness: string;
		researchTeachingConnection: string;
		challengesInnovations: string;
		professionalDevelopment: string;
		teachingStyles: string[];
		anecdote: string;
		[key: string]: string | string[];
	}) => `
  INSTRUCTIONS:
  Create a professional and coherent teaching philosophy statement based on the following information. The statement should be well-structured, engaging, and reflect the teacher's unique approach and values.

  1. Begin with a strong opening that introduces the teacher's overall approach to education.
  2. Organize the content into clear, logical sections that flow naturally from one to the next.
  3. Use specific examples and anecdotes to illustrate key points and make the statement more personal and engaging.
  4. Ensure that the statement reflects the teacher's passion for their discipline and for education in general.
  5. Conclude with a summary that ties together the main points and reiterates the teacher's commitment to education.
  6. The statement should be approximately 1-2 pages long (500-1000 words).
  7. Use professional language throughout, but maintain a personal and authentic voice.
  8. Incorporate all provided information, but feel free to organize and present it in the most effective way.
  9. Do not invent any information not provided in the input.

  TEACHER INFORMATION:
  Discipline: ${discipline}
  Teaching Experience: ${experience}
  Purpose of Education: ${educationPurpose}
  Teaching Motivation: ${teachingMotivation}
  View on Student Learning: ${studentLearning}
  Teaching Goals: ${teachingGoals}
  Effective Teaching Methods: ${effectiveMethods}
  Teaching Values: ${teachingValues.join(', ')}
  Assessment Methods: ${assessmentMethods.join(', ')}
  Approach to Inclusiveness: ${inclusiveness}
  Research-Teaching Connection: ${researchTeachingConnection}
  Challenges and Innovations: ${challengesInnovations}
  Professional Development: ${professionalDevelopment}
  Teaching Styles: ${teachingStyles.join(', ')}
  Illustrative Anecdote: ${anecdote}

  ${Object.entries(customFields)
		.map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
		.join('\n')}

  Based on this information, generate a comprehensive teaching philosophy statement that accurately represents the teacher's approach, values, and goals in education.
  `,

	// Add more prompt types as needed
};

export type PromptType = keyof typeof promptsCatalog;
