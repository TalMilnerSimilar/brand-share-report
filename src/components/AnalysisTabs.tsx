import React, { useState } from 'react';
import './AnalysisTabs.css';

const TAB_LABELS = [
  'Brand Share Overview',
  'Funnel Analysis',
  'Brand Trend Analysis',
];

const AnalysisTabs: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="tabs-wrapper">
      <span className="tabs-label">Analysis View:</span>
      {TAB_LABELS.map((label, idx) => {
        const isActive = idx === activeIdx;
        const baseClass = isActive ? 'tab-chip tab-on' : 'tab-chip tab-off';
        return (
          <div
            key={label}
            className={baseClass}
            onClick={() => setActiveIdx(idx)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setActiveIdx(idx);
            }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};

export default AnalysisTabs; 