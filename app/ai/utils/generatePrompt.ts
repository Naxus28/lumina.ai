import { promptsCatalog, PromptType } from './promptsCatalog';

export function generatePrompt<T extends PromptType>(
  type: T,
  inputs: Parameters<typeof promptsCatalog[T]>[0]
): string {
  const promptTemplate = promptsCatalog[type];
  if (typeof promptTemplate !== 'function') {
    throw new Error(`No prompt template found for type: ${type}`);
  }
  return promptTemplate(inputs as any);
}
