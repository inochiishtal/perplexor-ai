import React, { useEffect, useState } from 'react';
import MultiGridPanel from './MultiGridPanel';
import { generatePuzzleDomains } from '../api/generatePuzzleDomains';
import { PuzzleData } from '../types/types';
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
  const [puzzleData, setPuzzleData] = useState<PuzzleData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadPuzzle = async () => {
      setLoading(true);
      const result = await generatePuzzleDomains(domainCount, maxItems);
      if (result?.domains && Array.isArray(result.domains)) {
        setPuzzleData(result);
      } else {
        setPuzzleData(null);
      }
      setLoading(false);
    };

    loadPuzzle();
  }, [domainCount, maxItems]);

  if (loading) return <p>Loading AI-generated puzzle...</p>;

  if (!puzzleData) {
    return <p>⚠️ Failed to load puzzle. Please try again.</p>;
  }

  console.log('Puzzle data:', puzzleData);

  return (
    <div>
      <h2>🧠 Puzzle (Difficulty: {difficulty})</h2>
      <GroupedLogicMatrix
        columnDomains={puzzleData.domains.slice(1)}
        rowDomains={puzzleData.domains.slice(0, -1)}/>
    </div>
  );
};

export default PuzzleBoard;
