import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import unifiedBrands from '../data/unifiedBrands';
import { metricLabelMap } from '../data/unifiedBrandData';

type SavedReport = {
  id: string;
  name: string; // e.g., "Nike • Shoes"
  category: string; // e.g., "Shoes"
  myBrand: string; // e.g., "Nike"
  competitors: string[];
};

const mockReports: SavedReport[] = [
  {
    id: 'default-nike-shoes',
    name: 'Nike • Shoes',
    category: 'Shoes',
    myBrand: 'Nike',
    competitors: ['Adidas', 'New Balance', 'Hoka', 'Asics'],
  },
];

const ReportsHome: React.FC = () => {
  const navigate = useNavigate();
  const brands = Object.keys(unifiedBrands) as string[];

  const kpis = useMemo(() => {
    const my = mockReports[0].myBrand;
    const keys = ['productViews', 'unitsSold', 'revenue'] as const;
    return keys.map((k) => {
      const share = (unifiedBrands as any)[my]?.[k]?.share ?? 0;
      const change = (unifiedBrands as any)[my]?.[k]?.change ?? 0;
      return {
        key: k,
        title: metricLabelMap[k],
        share: `${(share * 100).toFixed(1)}%`,
        change: `${change * 100 >= 0 ? '+' : ''}${(change * 100).toFixed(1)}%`,
      };
    });
  }, []);

  return (
    <div className="p-6" style={{ paddingLeft: '64px', paddingRight: '64px' }}>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#092540]">Reports</h1>
        <p className="text-sm text-[#6b7c8c]">Browse your saved brand reports or create a new one.</p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-8">
          {kpis.map((k) => (
            <div key={k.key} className="bg-white border border-gray-200 rounded-md p-4 min-w-[200px]">
              <div className="text-sm text-[#6b7c8c]">{k.title}</div>
              <div className="text-xl font-medium text-[#092540]">{k.share}</div>
              <div className={`text-[10px] font-bold tracking-[0.3px] leading-[12px] inline-block px-2 py-0.5 rounded-[26px] ${k.change.startsWith('+') ? 'bg-[#e6faf5] text-[#009688]' : 'bg-[#ffe6e6] text-[#bb3f3f]'}`}>{k.change}</div>
            </div>
          ))}
        </div>

        <button
          className="px-4 py-2 text-xs font-medium rounded-[18px] transition-all duration-150 text-primary-blue bg-white shadow-[0_0_0_1px_#E6E9EC_inset] hover:shadow-[0_0_0_1px_#195AFE_inset]"
          onClick={() => navigate('/reports/new')}
        >
          New Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {mockReports.map((r) => (
          <div key={r.id} className="bg-white border border-gray-200 rounded-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-base font-medium text-[#092540]">{r.name}</div>
                <div className="text-xs text-[#6b7c8c]">Category: {r.category}</div>
                <div className="text-xs text-[#6b7c8c]">Competitors: {r.competitors.join(', ')}</div>
              </div>
              <button
                className="px-3 py-1.5 text-xs font-medium rounded-[18px] transition-all duration-150 text-primary-blue bg-white shadow-[0_0_0_1px_#E6E9EC_inset] hover:shadow-[0_0_0_1px_#195AFE_inset]"
                onClick={() => navigate(`/reports/${r.id}`)}
              >
                Open
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsHome;


