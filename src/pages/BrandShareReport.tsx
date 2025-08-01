import React from 'react';
import HeroTile from '../components/HeroTile';
import KPICards from '../components/KPICards';
import { PromotionSection } from '../components/PromotionSection';
import AnalysisTabs from '../components/AnalysisTabs';
import DataTable from '../components/DataTable';

interface BrandShareReportProps {
  selectedDateRange: string;
}

const BrandShareReport: React.FC<BrandShareReportProps> = ({ selectedDateRange }) => {
  return (
    <div className="flex-1 bg-white p-6" style={{ paddingLeft: '64px', paddingRight: '64px' }}>
      {/* Main Content */}
      <div className="space-y-6">
        <HeroTile reportRange={selectedDateRange} />
        <AnalysisTabs />
        <KPICards />
        <DataTable />
        <PromotionSection />
      </div>
    </div>
  );
};

export default BrandShareReport;
