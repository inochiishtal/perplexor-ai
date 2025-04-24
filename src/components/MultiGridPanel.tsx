import React from 'react';
import LogicGrid from './LogicGrid';
import { PuzzleDomain } from '../types/types';
import './MultiGridPanel.scss';

interface MultiGridPanelProps {
  domains: PuzzleDomain[];
}

const MultiGridPanel: React.FC<MultiGridPanelProps> = ({ domains }) => {

  return (
    <div className="logic-matrix">
      <div /> {/* Top-left empty cell */}
      {domains.slice(1).map(domain => (
        <div key={`header-${domain.name}`} className="header-cell">
          {domain.name}
        </div>
      ))}

      {domains.slice(0, -1).map((rowDomain, rowIdx) => (
        <React.Fragment key={`row-${rowIdx}`}>
          <div className="row-label">{rowDomain.name}</div>
          {domains.slice(1).map((colDomain, offset) => {
            const colIdx = offset + 1;
            if (rowIdx < colIdx) {
              return (
                <LogicGrid
                  key={`${rowDomain.name}-${colDomain.name}`}
                  rowCount={rowDomain.items.length}
                  colCount={colDomain.items.length}
                  rowLabels={rowDomain.items}
                  colLabels={colDomain.items}
                />
              );
            }
            return <div key={`empty-${rowIdx}-${colIdx}`} />;
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default MultiGridPanel;
