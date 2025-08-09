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
            <img src="/compare.svg" alt="Compare" className="w-[18px] h-[18px]" />
          </div>
          </div>
          <Tooltip content="Identify the underlying factors affecting your performance and discover actionable insights to improve your market position">
            <button
              onClick={onNavigateToFunnel}
              className="font-bold text-[#195afe] text-[14px] leading-[20px] hover:opacity-80 transition-opacity"
            >
              Analyze Root Cause
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