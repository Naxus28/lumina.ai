// src/utils/promptsCatalog.ts

export const promptsCatalog = {
	// Update this in your promptsCatalog.ts file

	coverLetter: ({ template, jobDescription, cv }: { template: string; jobDescription: string; cv: string }) => `
        Your task is to generate a ${template}-style academic cover letter based EXCLUSIVELY on the provided CV and job description. This is a two-step process to ensure accuracy.

        Job Description:
        ${jobDescription}

        Applicant's CV:
        ${cv}

        Step 1: CV Analysis
        Before writing the letter, extract and list the following information EXACTLY as it appears in the CV. Do not paraphrase or alter any information:

        1. Full name and contact information
        2. Educational background (degrees, institutions, years, dissertation title if applicable)
        3. List of publications with EXACT titles and years
        4. List of awards/honors with EXACT names and years
        5. Research experience with EXACT project names and years
        6. Teaching experience (if any) with EXACT institutionname, course names, and years
        7. Skills or technical proficiencies EXACTLY as listed
        8. Any other significant achievements or experiences EXACTLY as stated

        Step 2: Cover Letter Generation
        Now, using ONLY the information you extracted in Step 1, generate a cover letter following these strict guidelines:

        1. Begin with "Dear Search Committee,"
        2. Structure the letter in 3-4 paragraphs:
          - Opening: Express enthusiasm and state qualifications using ONLY information from Step 1.
          - Body (1-2 paragraphs): Highlight relevant experiences from Step 1 that match the job description.
          - Closing: Reiterate interest and thank the committee.
        3. When mentioning any achievement, publication, or experience:
          - Use the EXACT titles, names, and years as listed in Step 1.
          - Do not create or infer any information not explicitly listed.
        4. If there's no information in the CV that matches a job requirement, simply omit mentioning that requirement. Do not invent experience to fill gaps.
        5. Incorporate appropriate academic jargon and field-specific terminology, especially related to the applicant's area of expertise.
        6. Use a professional yet engaging tone throughout the letter.
        7. Keep the letter between 500-750 words.
        8. Demonstrate a clear understanding of the institution's values and how the applicant in the CV aligns with them.
        9. Do not include any text before or after the actual letter content.

        CRITICAL: Any information not explicitly listed in Step 1 MUST NOT appear in the cover letter. Accuracy is paramount.

        Please proceed with Step 1 and Step 2 as instructed, ensuring absolute fidelity to the provided CV.
        `,

	// coverLetter: ({ template, jobDescription, cv }: { template: string; jobDescription: string; cv: string }) => `
	// Generate a ${template}-style academic cover letter for the following job description, using ONLY the information provided in the applicant's CV. Do not invent or assume any information not explicitly stated in the CV.

	// Job Description:
	// ${jobDescription}

	// Applicant's CV:
	// ${cv}

	// Instructions:
	// 1. Begin the letter with "Dear Search Committee,"
	// 2. The cover letter should be approximately 500-750 words long.
	// 3. Structure the letter in 3-4 paragraphs:
	//    - Opening: Express enthusiasm for the position and briefly state your qualifications based on the CV.
	//    - Body (1-2 paragraphs): Highlight relevant experience, research, and skills from the CV that directly relate to the job description.
	//    - Closing: Reiterate interest, thank the committee, and express eagerness for further discussion.
	// 4. IMPORTANT: Use ONLY information provided in the CV. Do not invent or assume any details not explicitly stated.
	// 5. When mentioning publications, dissertation, prizes, or any other achievements:
	//    - Use the exact titles and descriptions as they appear in the CV.
	//    - Do not paraphrase or alter these titles/names in any way.
	//    - If specific details (e.g., publication dates, prize years) are provided in the CV, include them.
	//    - Highlight any notable publications, grants, or awards mentioned in the CV that are relevant to the position.
	// 6. Focus on how the applicant's actual experience and achievements, as listed in the CV, and align with the job requirements.
	// 7. If the CV doesn't mention teaching experience, do not invent any. Instead, focus on other relevant skills or experiences that are mentioned.
	// 8. Incorporate appropriate academic jargon and field-specific terminology, especially related to the applicant's area of expertise.
	// 9. If certain information requested in the job description is not available in the CV, it's okay to omit it. Do not fabricate information to fill gaps.
	// 10. Use a professional yet engaging tone throughout the letter.
	// 11. Demonstrate a clear understanding of the institution's values and how the applicant in the CV aligns with them.
	// 12. Ensure the letter is tailored to the specific institution and department mentioned in the job description, but only use factual information from the CV to demonstrate this fit.
	// 13. Do not include any text before or after the actual letter content.

	// Please generate the cover letter now, starting directly with "Dear Search Committee," and adhering strictly to the information provided in the CV while addressing the job description requirements.`,

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
