import React, { useState, useEffect } from 'react';
import './LogicGrid.scss';

interface LogicGridProps {
  rowCount: number;
  colCount: number;
  rowLabels?: string[];
  colLabels?: string[];
}

type CellValue = '' | '✔️' | '❌';

const LogicGrid: React.FC<LogicGridProps> = ({
  rowCount,
  colCount,
  rowLabels = [],
  colLabels = [],
}) => {
  const [grid, setGrid] = useState<CellValue[][]>([]);

  useEffect(() => {
    const newGrid: CellValue[][] = Array.from({ length: rowCount }, () =>
      Array.from({ length: colCount }, () => '')
    );
    setGrid(newGrid);
  }, [rowCount, colCount]);

  const toggleCell = (row: number, col: number) => {
    setGrid(prev => {
      const updated = prev.map(row => [...row]);
      const current = updated[row][col];
      updated[row][col] = current === '' ? '✔️' : current === '✔️' ? '❌' : '';
      return updated;
    });
  };

  return (
    <div className="logic-grid">
      {/* Column Labels */}
      <div className="grid-header">
        <div className="empty-cell" />
        {Array.from({ length: colCount }).map((_, i) => (
          <div key={i} className="label-cell">{colLabels[i] || `C${i + 1}`}</div>
        ))}
      </div>
  
      {/* Rows */}
      {grid.map((row, rowIndex) => (
        <div className="grid-row" key={rowIndex}>
          <div className="label-cell">{rowLabels[rowIndex] || `R${rowIndex + 1}`}</div>
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className="logic-cell"
              onClick={() => toggleCell(rowIndex, colIndex)}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
  
};

export default LogicGrid;
