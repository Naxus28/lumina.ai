// src/utils/promptsCatalog.ts

export const promptsCatalog = {
	coverLetter: ({ template, jobDescription, cv, sender, addressee }: { template: string; jobDescription: string; cv: string; sender: any; addressee: any }) =>{ 
		console.log("sender", JSON.stringify(sender));
		console.log("addressee", JSON.stringify(addressee));
	return `
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
     c. Addressee's information (name, title, company, address)
  2. If sender information is not provided, extract it from the CV.
  3. If addressee information is provided, use it for the salutation. Otherwise, use the contact information from the job description.
  4. Begin the letter with "Dear [Addressee's name/title]," if available, or "Dear Members of the Hiring Committee," if not.
  5. Mention the position and qualifications
  6. Highlight relevant experiences
  7. Relate skills to job requirements
  8. Do NOT make up any additional information that is not in the CV
  9. Conclude with interest in the position and thanks
  10. Before the closing, add a paragraph offering additional information. Use a phrase like:
      "If you require any additional information or have any questions, please don't hesitate to contact me at my email address (if provided on the CV; if not, just leave a placeholder like [email@example.com]). I look forward to the opportunity to further discuss how I can contribute to [Company/Institution Name]."
  11. End with "Sincerely," followed by the sender's name and add a line for the signature.
  12. Do NOT add a separate line with contact information at the end
  
  Generate a ${template}-style cover letter based on the above information, ensuring absolute fidelity to the provided CV and following all the guidelines above. The AI has the freedom to choose different phrases for offering contact information, as long as it conveys the same message.
  `},

	// `
	//   Your task is to generate a ${template}-style academic cover letter based EXCLUSIVELY on the provided CV and job description. Follow this two-step process, but ONLY RETURN THE FINAL COVER LETTER in your response.

	//   Job Description:
	//   ${jobDescription}

	//   Applicant's CV:
	//   ${cv}

	//   Step 1: CV Analysis (DO NOT INCLUDE THIS IN YOUR FINAL OUTPUT)
	//   Analyze the CV and extract the following information EXACTLY as it appears. Do not paraphrase or alter any information:

	//   1. Full name and contact information
	//   2. Educational background (degrees, institutions, years, dissertation title if applicable)
	//   3. List of publications with EXACT titles and years
	//   4. List of awards/honors with EXACT names and years
	//   5. Research experience with EXACT project names and years
	//   6. Teaching experience (if any) with EXACT institution name, course names, and years
	//   7. Skills or technical proficiencies EXACTLY as listed
	//   8. Any other significant achievements or experiences EXACTLY as stated

	//   Step 2: Cover Letter Generation (THIS IS THE ONLY PART YOU SHOULD RETURN)
	//   Using ONLY the information you extracted in Step 1, generate a cover letter following these strict guidelines:

	//   1. Begin with "Dear Search Committee,"
	//   2. Structure the letter in 3-4 paragraphs:
	//     - Opening: State the position you're applying for and briefly mention your qualifications using ONLY information from Step 1. Do not use phrases like "with great enthusiasm" or explicitly mention enthusiasm. Instead, convey interest through the content and tone of your writing.
	//     - Body (1-2 paragraphs): Highlight relevant experiences from Step 1 that match the job description. Focus on concrete achievements and how they align with the position requirements.
	//     - Closing: Reiterate your interest in the position by referring to specific aspects of the role or institution that align with your background. Thank the committee for their consideration.
	//   3. When mentioning any achievement, publication, or experience:
	//     - Use the EXACT titles, names, and years as listed in Step 1.
	//     - Do not create or infer any information not explicitly listed.
	//   4. If there's no information in the CV that matches a job requirement, simply omit mentioning that requirement. Do not invent experience to fill gaps.
	//   5. Incorporate appropriate academic jargon and field-specific terminology, especially related to the applicant's area of expertise.
	//   6. Use a professional, confident, and engaging tone throughout the letter. Avoid overly enthusiastic language or excessive use of adjectives.
	//   7. Keep the letter between 500-750 words.
	//   8. Demonstrate a clear understanding of the institution's values and how the applicant's background aligns with them, based solely on information from the CV and job description.
	//   9. Do not include any text before or after the actual letter content.

	//   CRITICAL:
	//   - Any information not explicitly listed in Step 1 MUST NOT appear in the cover letter.
	//   - DO NOT include the CV analysis or any other text in your response. ONLY return the final cover letter.
	//   - The cover letter should start with "Dear Search Committee," and end with a closing salutation like "Sincerely," followed by a placeholder for the applicant's name.
	//   - Avoid using phrases that explicitly state enthusiasm or excitement. Instead, let the applicant's qualifications and achievements speak for themselves.

	//   Generate the cover letter now, ensuring absolute fidelity to the provided CV and following all the guidelines above.
	// `,
	resume: ({ template, jobDescription, experience }: { template: string; jobDescription: string; experience: string }) => {
		return `
      Create a ${template} resume tailored for the following job description:

      Job Description:
      ${jobDescription}

      Using the following professional experience:
      ${experience}

      The resume should be concise, highlight relevant skills and experiences, and be formatted professionally.
      `;
	},

	// Add more prompt types as needed
};

export type PromptType = keyof typeof promptsCatalog;
