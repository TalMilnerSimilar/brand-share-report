import React from 'react';
import BrandLegendListbox from './BrandLegendListbox';
import InteractiveLineChart from './InteractiveLineChart';
import { chartData } from '../data/chartData';

interface ChartViewProps {
  brands: string[];
  selectedBrands: Set<string>;
  onBrandSelectionChange: (selected: Set<string>) => void;
  brandColorMap: Record<string, string>;
  metricIdx: number;
}

const ChartView: React.FC<ChartViewProps> = ({
  brands,
  selectedBrands,
  onBrandSelectionChange,
  brandColorMap,
  metricIdx,
}) => {
  return (
    <div className="flex gap-4 p-6">
      <InteractiveLineChart
        selectedBrands={selectedBrands}
        brandColorMap={brandColorMap}
        metricIdx={metricIdx}
      />
      <BrandLegendListbox
        brands={brands}
        selectedBrands={selectedBrands}
        onBrandSelectionChange={onBrandSelectionChange}
        brandColorMap={brandColorMap}
      />
    </div>
  );
};

export default ChartView;
