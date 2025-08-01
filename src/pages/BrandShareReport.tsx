import React, { useState, useEffect } from 'react';
import HeroTile from '../components/HeroTile';
import KPICards from '../components/KPICards';
import { PromotionSection } from '../components/PromotionSection';
import AnalysisTabs from '../components/AnalysisTabs';
import DataTable from '../components/DataTable';
import BrandTrendAnalysis from '../components/BrandTrendAnalysis';
import AnalyzeRootCauseLink from '../components/AnalyzeRootCauseLink';

interface BrandShareReportProps {
  selectedDateRange: string;
}

const BrandShareReport: React.FC<BrandShareReportProps> = ({ selectedDateRange }) => {
  const [activeAnalysisTab, setActiveAnalysisTab] = React.useState('Brand Share Overview');
  const [brandToAnalyze, setBrandToAnalyze] = useState<string | null>(null);
  const [metricsToAnalyze, setMetricsToAnalyze] = useState<string[]>([]);

  const handleAnalyzeBrand = (brandName: string, metrics: string[]) => {
    setBrandToAnalyze(brandName);
    setMetricsToAnalyze(metrics);
    setActiveAnalysisTab('Brand Trend Analysis');
  };

  const handleNavigateToFunnel = () => {
    setActiveAnalysisTab('Funnel Analysis');
  };

  useEffect(() => {
    if (activeAnalysisTab !== 'Brand Trend Analysis') {
      setBrandToAnalyze(null);
      setMetricsToAnalyze([]);
    }
  }, [activeAnalysisTab]);

  return (
    <div className="flex-1 bg-white p-6" style={{ paddingLeft: '64px', paddingRight: '64px' }}>
      {/* Main Content */}
      <div className="space-y-6">
        <HeroTile reportRange={selectedDateRange} />
        <AnalysisTabs activeTab={activeAnalysisTab} setActiveTab={setActiveAnalysisTab} />
        {activeAnalysisTab === 'Brand Share Overview' && (
          <>
            <KPICards activeAnalysisTab={activeAnalysisTab} />
            <AnalyzeRootCauseLink onNavigateToFunnel={handleNavigateToFunnel} activeAnalysisTab={activeAnalysisTab} />
            <DataTable activeAnalysisTab={activeAnalysisTab} onAnalyzeBrand={handleAnalyzeBrand} />
          </>
        )}
        {activeAnalysisTab === 'Funnel Analysis' && (
          <>
            <KPICards activeAnalysisTab={activeAnalysisTab} />
            <DataTable activeAnalysisTab={activeAnalysisTab} onAnalyzeBrand={handleAnalyzeBrand} />
          </>
        )}
        {activeAnalysisTab === 'Brand Trend Analysis' && (
          <BrandTrendAnalysis key={brandToAnalyze} selectedBrandProp={brandToAnalyze} selectedMetricsProp={metricsToAnalyze} />
        )}
        <PromotionSection activeAnalysisTab={activeAnalysisTab} onNavigateToTab={setActiveAnalysisTab} />
      </div>
    </div>
  );
};

export default BrandShareReport;
