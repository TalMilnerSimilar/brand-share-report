import React from 'react';
import Tooltip from './Tooltip';

interface AnalyzeRootCauseLinkProps {
  onNavigateToFunnel: () => void;
  activeAnalysisTab: string;
}

const AnalyzeRootCauseLink: React.FC<AnalyzeRootCauseLinkProps> = ({ onNavigateToFunnel, activeAnalysisTab }) => {
  return (
    <div className="flex items-center justify-center py-4" style={{ marginTop: activeAnalysisTab === 'Brand Share Overview' ? '0px' : undefined }}>
      <div className="flex items-center w-full">
        {/* Left line */}
        <div className="flex-1 h-px bg-[#e6e9ec]"></div>
        
        {/* Button */}
        <div className="flex items-center gap-1 px-1 py-1 mx-2">
          <div className="flex items-center gap-1">
                      <div className="w-[18px] h-[18px] flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Top wide opening */}
              <ellipse cx="12" cy="6" rx="10" ry="2" stroke="#195afe" strokeWidth="2" fill="none"/>
              {/* Funnel sides */}
              <path d="M2 6 L8 16" stroke="#195afe" strokeWidth="2" strokeLinecap="round"/>
              <path d="M22 6 L16 16" stroke="#195afe" strokeWidth="2" strokeLinecap="round"/>
              {/* Bottom narrow opening */}
              <ellipse cx="12" cy="16" rx="4" ry="1" stroke="#195afe" strokeWidth="2" fill="none"/>
              {/* Bottom collection area */}
              <ellipse cx="12" cy="20" rx="3" ry="1.5" stroke="#195afe" strokeWidth="2" fill="#195afe" fillOpacity="0.1"/>
            </svg>
          </div>
          </div>
          <Tooltip content="Analyze your user funnel to identify conversion opportunities and optimize customer journey performance">
            <button
              onClick={onNavigateToFunnel}
              className="font-bold text-[#195afe] text-[14px] leading-[20px] hover:opacity-80 transition-opacity flex items-center gap-1"
            >
              Analyze User Funnel
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14m-7-7l7 7-7 7" stroke="#195afe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </Tooltip>
        </div>
        
        {/* Right line */}
        <div className="flex-1 h-px bg-[#e6e9ec]"></div>
      </div>
    </div>
  );
};

export default AnalyzeRootCauseLink; 