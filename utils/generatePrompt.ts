// src/utils/generatePrompt.ts

import { promptsCatalog, PromptType } from './promptsCatalog';

type CommonArgs = {
	template: string;
};

type PromptFunction<T extends PromptType> = (typeof promptsCatalog)[T];

export function createPromptGenerator<T extends PromptType>(promptType: T, commonArgs: CommonArgs) {
	return (specificArgs: any): string => {
		if (!(promptType in promptsCatalog)) {
			throw new Error(`Unsupported document type: ${promptType}`);
		}

		const promptFunction = promptsCatalog[promptType] as PromptFunction<T>;

		return promptFunction({ ...commonArgs, ...specificArgs });
	};
}
