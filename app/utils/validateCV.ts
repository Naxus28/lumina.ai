// TODO: revise these rules
export default function isValidCV(text: string): { isValid: boolean; reason?: string } {
	// Trim the text to remove leading/trailing whitespace
	const trimmedText = text.trim();

	// Check if the CV is completely empty
	if (trimmedText.length === 0) {
		return { isValid: false, reason: 'The CV appears to be empty.' };
	}

	// Check for an unreasonably high proportion of special characters
	const specialCharRatio = (trimmedText.match(/[^a-zA-Z0-9\s]/g) || []).length / trimmedText.length;
	if (specialCharRatio > 0.3) {
		return { isValid: false, reason: 'The CV contains an unusually high number of special characters, suggesting possible corruption.' };
	}

	// Check for repeated patterns that might indicate corruption
	const repeatedPatternRegex = /(.{10,})\1{10,}/;
	if (repeatedPatternRegex.test(trimmedText)) {
		return { isValid: false, reason: 'The CV contains excessive repeated patterns, suggesting possible corruption.' };
	}

	// Check for the presence of common CV sections or keywords
	const commonCVKeywords = ['education', 'experience', 'skills', 'publications', 'references', 'work', 'job', 'university', 'college', 'degree', 'project', 'achievement', 'volunteer', 'certification', 'language'];

	const keywordRegex = new RegExp(commonCVKeywords.join('|'), 'i');
	if (!keywordRegex.test(trimmedText)) {
		return { isValid: false, reason: "The CV doesn't appear to contain common sections or keywords typically found in a CV." };
	}

	// If all checks pass, consider the CV valid
	return { isValid: true };
}
