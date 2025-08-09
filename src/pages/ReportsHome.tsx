import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import unifiedBrands from '../data/unifiedBrands';
import { metricLabelMap } from '../data/unifiedBrandData';

type SavedReport = {
  id: string;
  brand: string;
  category: string;
  priceRange?: string;
  competitors: string[];
};

const mockReports: SavedReport[] = [
  {
    id: 'nike-shoes',
    brand: 'Nike',
    category: 'Premium Running Shoes (Price > $75)',
    competitors: ['Adidas', 'New Balance', 'Hoka', 'Asics'],
  },
  {
    id: 'adidas-apparel',
    brand: 'Adidas',
    category: 'All Athletic Apparel',
    competitors: ['Nike', 'Under Armour', 'Puma', 'Hanes'],
  },
];

const ReportsHome: React.FC = () => {
  const navigate = useNavigate();

  const getReportMetrics = (report: SavedReport) => {
    const brandData = (unifiedBrands as any)[report.brand];
    if (!brandData) return null;

    const metrics = ['brandedClicks', 'productViews', 'paidClicks', 'revenue'] as const;
    return metrics.map((metricKey) => {
      const metric = brandData[metricKey];
      if (!metric) return null;

      const share = (metric.share * 100).toFixed(1);
      const change = metric.change * 100;
      const changeFormatted = `${change >= 0 ? '+' : ''}${change.toFixed(1)}pp`;

      return {
        key: metricKey,
        value: share,
        change: changeFormatted,
        isPositive: change >= 0,
      };
    }).filter(Boolean);
  };

  return (
    <div className="p-6" style={{ paddingLeft: '64px', paddingRight: '64px' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#6B39F4]">Brand Share Reports Overview</h1>
          <p className="text-sm text-[#6b7c8c] mt-1">Select a report to analyze or create a new one.</p>
        </div>
        <button
          className="px-4 py-2 text-sm font-medium rounded-[18px] transition-all duration-150 text-white bg-[#6B39F4] hover:bg-[#5A2FE3] flex items-center gap-2"
          onClick={() => navigate('/reports/new')}
        >
          <span className="text-lg">+</span>
          New Report
        </button>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left p-4 font-medium text-[#6b7c8c] text-sm">
                  REPORT NAME
                </th>
                <th className="text-center p-4 font-medium text-[#6b7c8c] text-sm">
                  <div>SHARE OF BRANDED</div>
                  <div>CLICKS</div>
                  <div className="flex justify-center gap-4 text-xs mt-1">
                    <span>Value</span>
                    <span>WoW Change</span>
                  </div>
                </th>
                <th className="text-center p-4 font-medium text-[#6b7c8c] text-sm">
                  <div>SHARE OF PRODUCT</div>
                  <div>VIEWS</div>
                  <div className="flex justify-center gap-4 text-xs mt-1">
                    <span>Value</span>
                    <span>WoW Change</span>
                  </div>
                </th>
                <th className="text-center p-4 font-medium text-[#6b7c8c] text-sm">
                  <div>SHARE OF PAID</div>
                  <div>CLICKS</div>
                  <div className="flex justify-center gap-4 text-xs mt-1">
                    <span>Value</span>
                    <span>WoW Change</span>
                  </div>
                </th>
                <th className="text-center p-4 font-medium text-[#6b7c8c] text-sm">
                  <div>SHARE OF</div>
                  <div>REVENUE</div>
                  <div className="flex justify-center gap-4 text-xs mt-1">
                    <span>Value</span>
                    <span>WoW Change</span>
                  </div>
                </th>
                <th className="text-center p-4 font-medium text-[#6b7c8c] text-sm">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {mockReports.map((report) => {
                const metrics = getReportMetrics(report);
                return (
                  <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium text-[#092540]">{report.brand}</div>
                      <div className="text-sm text-[#6b7c8c]">{report.category}</div>
                      <div className="flex items-center gap-1 mt-1 text-sm text-[#6b7c8c]">
                        <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                        <span>vs.</span>
                        <span>{report.competitors.join('   ')}</span>
                      </div>
                    </td>
                    {metrics?.map((metric, index) => (
                      <td key={metric?.key || index} className="p-4 text-center">
                        {metric ? (
                          <div className="flex justify-center gap-4">
                            <span className="font-medium text-[#092540]">{metric.value}%</span>
                            <span className={`flex items-center gap-1 ${metric.isPositive ? 'text-[#009688]' : 'text-[#bb3f3f]'}`}>
                              <span className="text-lg">{metric.isPositive ? '↑' : '↓'}</span>
                              <span>{metric.change}</span>
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    ))}
                    <td className="p-4 text-center">
                      <button
                        className="px-4 py-2 text-sm font-medium rounded-[18px] transition-all duration-150 text-[#6B39F4] bg-white border border-[#6B39F4] hover:bg-[#6B39F4] hover:text-white"
                        onClick={() => navigate(`/reports/${report.id}`)}
                      >
                        Analyze Report
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsHome;


