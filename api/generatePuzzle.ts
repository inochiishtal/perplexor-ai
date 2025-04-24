import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Missing prompt' });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    const text = await response.text(); // Read raw first
    //.console.log('Raw OpenAI response:', text);

    try {
      const data = JSON.parse(text); // Then parse
      return res.status(200).json(data);
    } catch (jsonErr) {
      console.error('Failed to parse OpenAI response:', jsonErr);
      return res.status(500).json({ error: 'Invalid JSON response from OpenAI', raw: text });
    }

  } catch (err) {
    console.error('OpenAI API Error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}

  