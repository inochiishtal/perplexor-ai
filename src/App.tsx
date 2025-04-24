import React, { useState } from 'react';
import PuzzleBoard from './components/PuzzleBoard';

const gridOptions = [
  { label: '3x4', domainCount: 3, maxItems: 4 },
  { label: '3x5', domainCount: 3, maxItems: 5 },
  { label: '4x4', domainCount: 4, maxItems: 4 },
  { label: '4x5', domainCount: 4, maxItems: 5 },
  { label: '4x6', domainCount: 4, maxItems: 6 },
  { label: '4x7', domainCount: 4, maxItems: 7 },
];

const difficultyOptions: ('Easy' | 'Medium' | 'Hard')[] = ['Easy', 'Medium', 'Hard'];

const App: React.FC = () => {
  const [showPuzzle, setShowPuzzle] = useState(false);

  const [selectedGrid, setSelectedGrid] = useState(gridOptions[5]); // default 4x7
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');

  const handleCreatePuzzle = () => {
    setShowPuzzle(true);
  };

  const handleReturnToSettings = () => {
    setShowPuzzle(false);
  };

  return (
    <div className="app-container">
      <h1>🧠 Perplexor AI Puzzle Generator</h1>

      {!showPuzzle ? (
        <div className="settings-panel">
          <label>Grid Size: </label>
          <select
            value={selectedGrid.label}
            onChange={(e) =>
              setSelectedGrid(gridOptions.find(g => g.label === e.target.value)!)
            }
          >
            {gridOptions.map((opt) => (
              <option key={opt.label} value={opt.label}>
                {opt.label}
              </option>
            ))}
          </select>

          <label style={{ marginLeft: '20px' }}>Difficulty: </label>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value as 'Easy' | 'Medium' | 'Hard')}
          >
            {difficultyOptions.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>

          <button className="button" onClick={handleCreatePuzzle}>Create Puzzle</button>
        </div>
      ) : (
        <>
          <PuzzleBoard
            domainCount={selectedGrid.domainCount}
            maxItems={selectedGrid.maxItems}
            difficulty={selectedDifficulty}
          />
            <button className="button" onClick={handleReturnToSettings}>Restart</button>
        </>
      )}
    </div>
  );
};

export default App;