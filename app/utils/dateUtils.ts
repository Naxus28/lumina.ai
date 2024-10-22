export function formatLetterDate(date: Date): string {
	// Format: "May 15, 2024"
	return date.toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});
}
