import React, { useState } from 'react';
import './GroupedLogicMatrix.scss';

interface PuzzleDomain {
  name: string;
  items: string[];
}

interface GroupedLogicMatrixProps {
  columnDomains: PuzzleDomain[];
  rowDomains: PuzzleDomain[];
}

type CellState = '' | 'true' | 'false';

const GroupedLogicMatrix: React.FC<GroupedLogicMatrixProps> = ({
  columnDomains,
  rowDomains,
}) => {
  const colItems = columnDomains.flatMap((d) => d.items);
  const rowItems = rowDomains.flatMap((d) => d.items);

  const [grid, setGrid] = useState<CellState[][]>(
    Array.from({ length: rowItems.length }, () =>
      Array.from({ length: colItems.length }, () => '')
    )
  );

  const toggleCell = (rowIdx: number, colIdx: number) => {
    setGrid((prev) => {
      const current = prev[rowIdx][colIdx];
      const newValue: CellState =
        current === '' ? 'true' : current === 'true' ? 'false' : '';

      const next = prev.map((row, ri) =>
        row.map((val, ci) => {
          if (ri === rowIdx && ci === colIdx) return newValue;
          if (newValue === 'true' && (ri === rowIdx || ci === colIdx)) {
            return 'false';
          }
          return val;
        })
      );

      return next;
    });
  };

  return (
    <table className="grouped-logic-matrix">
      <thead>
        {/* First row: domain labels */}
        <tr>
          <th></th>
          <th></th>
          {columnDomains.map((domain, idx) => (
            <th key={`domain-${idx}`} colSpan={domain.items.length} className="domain-label">
              {domain.name}
            </th>
          ))}
        </tr>

        {/* Second row: item labels */}
        <tr>
          <th></th>
          <th></th>
          {columnDomains.flatMap((domain) =>
            domain.items.map((item, iIdx) => (
              <th key={`item-${domain.name}-${iIdx}`} className="item-label">
                {item}
              </th>
            ))
          )}
        </tr>
      </thead>

      <tbody>
        {rowDomains.map((domain, dIdx) =>
          domain.items.map((item, iIdx) => {
            const rowIdx =
              rowDomains.slice(0, dIdx).reduce((acc, d) => acc + d.items.length, 0) + iIdx;

            return (
              <tr key={`${domain.name}-${item}`}>
                {iIdx === 0 && (
                  <th rowSpan={domain.items.length} className="domain-label-vertical">
                    {domain.name}
                  </th>
                )}
                <th className="item-label">{item}</th>
                {colItems.map((_, colIdx) => (
                  <td
                    key={`${rowIdx}-${colIdx}`}
                    onClick={() => toggleCell(rowIdx, colIdx)}
                    className="logic-cell"
                  >
                    {grid[rowIdx][colIdx] === 'true'
                      ? '✔️'
                      : grid[rowIdx][colIdx] === 'false'
                      ? '❌'
                      : ''}
                  </td>
                ))}
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};

export default GroupedLogicMatrix;
