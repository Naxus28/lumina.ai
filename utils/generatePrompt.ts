// src/utils/generatePrompt.ts

import { promptsCatalog, PromptType } from './promptsCatalog';

type CommonArgs = {
	template: string;
};

type PromptFunction<T extends PromptType> = (typeof promptsCatalog)[T];

export function createPromptGenerator<T extends PromptType>(promptType: T, commonArgs: CommonArgs) {
	return (specificArgs: any): string => {
		const promptFunction = promptsCatalog[promptType] as PromptFunction<T>;

		if (!(promptType in promptsCatalog)) {
			throw new Error(`Unsupported document type: ${promptType}`);
		}

		return promptFunction({ ...commonArgs, ...specificArgs });
	};
}
