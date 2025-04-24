import React, { useEffect, useState } from 'react';
import { fetchDomainsFromAI } from '../utils/openai';
import { PuzzleDomain } from '../types/types';
import GroupedLogicMatrix from './GroupedLogicMatrix';

interface PuzzleBoardProps {
  domainCount: number;
  maxItems: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const PuzzleBoard: React.FC<PuzzleBoardProps> = ({
  domainCount,
  maxItems,
  difficulty,
}) => {
  const [domains, setDomains] = useState<PuzzleDomain[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPuzzle = async () => {
      try {
        setLoading(true);
        const data = await fetchDomainsFromAI(domainCount, maxItems);
        if (!data || data.length < 2) {
          throw new Error('Not enough domains returned.');
        }
        setDomains(data);
      } catch (err) {
        console.error('❌ Puzzle fetch error:', err);
        setError('Failed to load puzzle. Please try again.');
        setDomains(null);
      } finally {
        setLoading(false);
      }
    };

    loadPuzzle();
  }, [domainCount, maxItems]);

  if (loading) return <p>Loading AI-generated puzzle...</p>;
  if (error) return <p>⚠️ {error}</p>;
  if (!domains) return <p>No puzzle data available.</p>;

  return (
    <div>
      <h2>🧠 Puzzle (Difficulty: {difficulty})</h2>
      <GroupedLogicMatrix
        columnDomains={domains.slice(1)}
        rowDomains={domains.slice(0, -1)}
      />
    </div>
  );
};

export default PuzzleBoard;
