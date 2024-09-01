// src/hooks/useTypingEffect.ts
import { useState, useEffect, useCallback } from 'react';

const useTypingEffect = (text: string, speed: number = 20) => {
	const [displayedText, setDisplayedText] = useState('');
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isComplete, setIsComplete] = useState(false);

	const typeNextCharacter = useCallback(() => {
		if (currentIndex < text.length) {
			setDisplayedText((prev) => prev + text[currentIndex]);
			setCurrentIndex((prev) => prev + 1);
		} else {
			setIsComplete(true);
		}
	}, [currentIndex, text]);

	useEffect(() => {
		setDisplayedText('');
		setCurrentIndex(0);
		setIsComplete(false);
	}, [text]);

	useEffect(() => {
		if (!isComplete) {
			const timerId = setTimeout(typeNextCharacter, speed);
			return () => clearTimeout(timerId);
		}
	}, [isComplete, typeNextCharacter, speed]);

	return { displayedText, isComplete };
};

export default useTypingEffect;
