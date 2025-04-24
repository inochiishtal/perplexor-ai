import { PuzzleDomain } from '../types/types';
import { generatePrompt } from './generatePrompt';

export const fetchDomainsFromAI = async (
  domainCount = 4,
  maxItems = 7
): Promise<PuzzleDomain[] | null> => {
  const prompt = generatePrompt(domainCount, maxItems);

  const response = await fetch('/api/generatePuzzle', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  const data = await response.json();
  const rawText = data.choices?.[0]?.message?.content;

  if (!rawText) throw new Error('No content returned by AI');

  const parsed = JSON.parse(rawText);

  if (!parsed.domains || !Array.isArray(parsed.domains)) {
    throw new Error('Malformed response: domains missing or not an array');
  }

  return parsed.domains;
};
