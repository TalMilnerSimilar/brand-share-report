import React, { useState, useEffect } from 'react';
import HeroTile from '../components/HeroTile';
import EditReportDrawer from '../components/EditReportDrawer';
import { useReportContext } from '../context/ReportContext';
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
  const { config } = useReportContext();
  const [activeAnalysisTab, setActiveAnalysisTab] = React.useState('Brand Share Overview');
  const [brandToAnalyze, setBrandToAnalyze] = useState<string | null>(null);
  const [metricsToAnalyze, setMetricsToAnalyze] = useState<string[]>([]);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);

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
        <HeroTile reportRange={selectedDateRange} onEditList={() => setEditDrawerOpen(true)} />
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
      {/* Edit Report Drawer from hero tile */}
      <EditReportDrawer
        isOpen={editDrawerOpen}
        onClose={() => setEditDrawerOpen(false)}
        initialReport={{
          title: `${config.myBrand} — ${config.category}`,
          category: config.category,
          brand: config.myBrand,
          competitors: config.competitors,
        }}
        onSave={({ title, category, brand, competitors }) => {
          // For now, update via context is not wired; we can later lift state to context.
          setEditDrawerOpen(false);
        }}
      />
    </div>
  );
};

export default BrandShareReport;
