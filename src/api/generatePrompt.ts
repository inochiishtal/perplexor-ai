export const generatePrompt = (domainCount = 3, maxItems = 7): string => `
Generate a logic puzzle structure. Return exactly ${domainCount} unrelated categories. Each should contain exactly ${maxItems} unique, themed items.

Return ONLY valid JSON using this format:

{
  "domains": [
    {
      "name": "DomainName",
      "items": ["Item1", "Item2", ..., "ItemN"]
    },
    ...
  ]
}

Constraints:
- The domain names should be plural nouns (e.g., "Ships", "Pirates", "Years").
- Each domain should contain themed items.
- Do NOT return anything except the JSON.
`;
