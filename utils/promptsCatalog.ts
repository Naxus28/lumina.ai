// src/utils/promptsCatalog.ts

export const promptsCatalog = {
	coverLetter: ({ template, jobDescription, cv, sender, addressee }: { template: string; jobDescription: string; cv: string; sender: any; addressee: any }) => `
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
     c. Addressee's information (name, title, institution, address)
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
  11. End with "Sincerely," followed by the sender's name (use the name from the CV if not provided in sender info) and add a line for the signature.
  12. Do NOT add any introductory or explanatory text before or after the letter content
  13. Use only the information provided in the CV, job description, sender info, and addressee info. Do not invent or assume any additional details.
  
  Generate a ${template}-style cover letter based on the above information, ensuring absolute fidelity to the provided CV and following all the guidelines above. The AI has the freedom to choose different phrases for offering contact information, as long as it conveys the same message and uses only the information provided or appropriate placeholders where information is missing.
  `,
	resume: ({ template, jobDescription, experience }: { template: string; jobDescription: string; experience: string }) => {
		return `
      Create a ${template} resume tailored for the following job description:

      Job Description:
      ${jobDescription}

      Using the following professional experience:
      ${experience}

      The resume should be concise, highlight relevant skills and experiences, and be formatted professionally.
      `;
	}

	// Add more prompt types as needed
};

export type PromptType = keyof typeof promptsCatalog;
