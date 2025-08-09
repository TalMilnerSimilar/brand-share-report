import React from 'react';
import { useNavigate } from 'react-router-dom';
import unifiedBrands from '../data/unifiedBrands';
import { brands, metricLabelMap } from '../data/unifiedBrandData';

const formatCurrency = (n: number) => `$${n.toLocaleString()}`;
const formatPct = (v: number) => `${(v * 100).toFixed(1)}%`;
const formatChangePct = (v: number) => `${v >= 0 ? '+' : ''}${(v * 100).toFixed(1)}%`;

const ReportsHome: React.FC = () => {
  const navigate = useNavigate();

  const handleOpenReport = (brandName: string) => {
    // Navigate to inner report. Optionally carry brand as a query param for future use.
    navigate(`/brand-share?brand=${encodeURIComponent(brandName)}`);
  };

  const cards = (brands as string[]).map((brandName) => {
    const b = (unifiedBrands as any)[brandName];
    const revenue = b?.revenue?.value ?? 0;
    const clicksShare = b?.shareOfTotalClicks?.share ?? 0;
    const clicksChange = b?.shareOfTotalClicks?.change ?? 0;
    const searchVis = b?.searchVisibility?.share ?? 0;

    return {
      brand: brandName,
      metrics: [
        { label: metricLabelMap.revenue, value: formatCurrency(revenue) },
        { label: metricLabelMap.shareOfTotalClicks, value: formatPct(clicksShare), change: formatChangePct(clicksChange) },
        { label: metricLabelMap.searchVisibility, value: formatPct(searchVis) },
      ],
    };
  });

  return (
    <div className="flex-1 p-6" style={{ paddingLeft: '64px', paddingRight: '64px' }}>
      <div className="mb-6">
        <h1 className="text-2xl font-medium text-gray-900">Select a Report</h1>
        <p className="text-sm text-gray-600">Browse available Brand Share Reports and open one to dive into KPIs, Funnel Analysis, and Trends.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c) => (
          <div key={c.brand} className="bg-white border border-gray-200 rounded-md p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">{c.brand}</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#e8eeff] text-[#6b7c8c]">Brand Share Report</span>
            </div>

            <div className="divide-y divide-gray-100">
              {c.metrics.map((m) => (
                <div key={m.label} className="py-2 flex items-center justify-between">
                  <span className="text-sm text-[#3A5166]">{m.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-900">{m.value}</span>
                    {m.change && (
                      <span className={`text-xs font-semibold ${m.change.startsWith('+') ? 'text-[#009688]' : 'text-[#D14343]'}`}>
                        {m.change}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleOpenReport(c.brand)}
                className="px-3 py-2 text-sm font-medium rounded-[18px] transition-all duration-150 text-primary-blue bg-white shadow-[0_0_0_1px_#E6E9EC_inset] hover:shadow-[0_0_0_1px_#195AFE_inset] hover:bg-primary-blue-light-hover"
              >
                Open Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsHome;


