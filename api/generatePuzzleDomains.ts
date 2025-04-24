import { PuzzleDomain } from '../src/types/types';
import { generatePrompt } from './generatePrompt';

export const generatePuzzleDomains = async (
  domainCount = 4,
  maxItems = 7
): Promise<{ domains: PuzzleDomain[] } | null> => {
  //const apiKey = import.meta.env.VITE_OPENAI_API_KEY; // Commented out for Vercel
  const prompt = generatePrompt(domainCount, maxItems);

  try {
    /*
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });
    */
    // Commenting above to use Vercel deployment
    const response = await fetch('/api/generatePuzzle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    const rawText = data.choices?.[0]?.message?.content;
    console.log('AI Raw Text:', rawText);

    if (!rawText) throw new Error('No content returned by AI');

    const parsed = JSON.parse(rawText);

    if (!parsed.domains || !Array.isArray(parsed.domains)) {
      throw new Error('Malformed response: domains missing or not an array');
    }
    return { domains: parsed.domains as PuzzleDomain[] };
    
  } catch (error) {
    console.error('❌ Error parsing or fetching AI data:', error);
    return null;
  }
};
