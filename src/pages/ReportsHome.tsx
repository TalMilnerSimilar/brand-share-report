import React from 'react';
import { useNavigate } from 'react-router-dom';
import unifiedBrands from '../data/unifiedBrands';
import Button from '../components/Button';

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

  return (
    <div className="p-6" style={{ paddingLeft: '64px', paddingRight: '64px' }}>
      {/* Hero Section (Figma-spec) */}
      <div className="mb-6">
        {/* Top header row with domain dropdown (selection screen only) */}
        <div
          className="border border-gray-200 rounded-t-[6px] px-6 py-2"
          style={{
            background:
              'linear-gradient(250deg, rgba(165, 31, 227, 0.15) 9.5%, rgba(25, 90, 254, 0.15) 26%, rgba(255, 255, 255, 0.15) 52%), #ffffff',
          }}
        >
          <div className="flex items-center justify-between overflow-clip w-full">
            <div className="py-4">
              <div className="mb-2">
                <h1 className="text-[20px] leading-[28px] font-bold text-[#092540]">
                  Select a report to analyze or create a new one
                </h1>
              </div>
              <p className="text-[14px] leading-4 text-[#6b7c8c]">
                Choose an existing report from the list below or click “Create a New Report” to set up brand, category, and competitors
              </p>
            </div>
            <div>
              <Button
                variant="primary"
                className="px-4 py-2 text-[14px] leading-5 flex items-center gap-2"
                onClick={() => navigate('/reports/new')}
              >
                <img
                  src="/figma-assets/469213f20b34f60691ed81fa0082aa5c4fa6599b.svg"
                  alt=""
                  className="w-4 h-4"
                />
                Create a New Report
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom KPI row */}
        <div className="bg-white border border-gray-200 border-t-0 rounded-b-[8px] px-6 py-2">
          <div className="flex items-center justify-between">
            <div className="flex-1 flex items-center justify-center gap-2">
              <img src="/icons/reports icon.svg" alt="Reports Icon" className="w-4 h-4" />
              <span className="text-[14px] leading-5 text-[#092540]">Total Reports:</span>
              <span className="text-[14px] leading-5 text-[#6b7c8c]">{mockReports.length}</span>
            </div>
            <div className="w-5 self-stretch flex items-center justify-center">
              <div className="w-[1px] h-full bg-[#e6e9ec]" />
            </div>
            <div className="flex-1 flex items-center justify-center gap-2">
              <img src="/icons/brands icon.svg" alt="Brands Icon" className="w-4 h-4" />
              <span className="text-[14px] leading-5 text-[#092540]">Brands Tracked:</span>
              <span className="text-[14px] leading-5 text-[#6b7c8c]">{new Set(mockReports.map(r => r.brand)).size}</span>
            </div>
            <div className="w-5 self-stretch flex items-center justify-center">
              <div className="w-[1px] h-full bg-[#e6e9ec]" />
            </div>
            <div className="flex-1 flex items-center justify-center gap-2">
              <img src="/icons/categories icon.svg" alt="Categories Icon" className="w-4 h-4" />
              <span className="text-[14px] leading-5 text-[#092540]">Categories:</span>
              <span className="text-[14px] leading-5 text-[#6b7c8c]">{new Set(mockReports.map(r => r.category.split(' ')[0])).size}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white border border-gray-200 rounded-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-medium text-gray-900">All Reports</h2>
            <img src="/icons/info-icon.svg" alt="Info" className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 text-xs font-medium text-[#3A5166]">
                    <th rowSpan={2} className="text-left p-4 border-r border-gray-200 align-middle">Report Name</th>
                    <th colSpan={2} className="text-center p-4 border-r border-gray-200">Share of Branded Clicks</th>
                    <th colSpan={2} className="text-center p-4 border-r border-gray-200">Share of Product Views</th>
                    <th colSpan={2} className="text-center p-4 border-r border-gray-200">Share of Revenue</th>
                    <th rowSpan={2} className="text-right p-4 align-middle">Actions</th>
                  </tr>
                  <tr className="border-b border-gray-200 text-xs font-medium text-[#3A5166]">
                    <th className="text-right p-4">Value</th>
                    <th className="text-left p-4 border-r border-gray-200">Wow Change</th>
                    <th className="text-right p-4">Value</th>
                    <th className="text-left p-4 border-r border-gray-200">Wow Change</th>
                    <th className="text-right p-4">Value</th>
                    <th className="text-left p-4 border-r border-gray-200">Wow Change</th>
                  </tr>
                </thead>
            <tbody>
              {mockReports.map((report) => {
                const brandData = (unifiedBrands as any)[report.brand];
                const brandedClicks = brandData?.brandedClicks;
                const productViews = brandData?.productViews;
                const revenue = brandData?.revenue;
                
                return (
                  <tr key={report.id} className="border-b border-gray-200 transition-colors duration-150">
                    <td className="p-4 border-r border-gray-200">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-[#195afe] cursor-pointer">
                          {report.brand}
                          {report.brand === 'Nike' && (
                            <span className="ml-2 px-2 py-0.5 bg-[#b6bec6] text-[#ffffff] text-[10px] font-bold tracking-[0.3px] rounded-[26px]">My Brand</span>
                          )}
                        </span>
                      </div>
                      <div className="text-xs text-[#6b7c8c] mt-1">{report.category}</div>
                      <div className="flex items-center gap-1 mt-1 text-xs text-[#6b7c8c]">
                        <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                        <span>vs.</span>
                        <span>{report.competitors.join('   ')}</span>
                      </div>
                    </td>
                    
                            {/* Branded Clicks - Value (share) */}
                            <td className="p-4 text-sm text-gray-600 text-right">
                              {brandedClicks ? `${(brandedClicks.share * 100).toFixed(1)}%` : '-'}
                            </td>
                            {/* Branded Clicks - Wow Change */}
                            <td className="p-4 border-r border-gray-200">
                      <div className="flex items-center gap-2 w-40">
                                {brandedClicks && (
                                  <div
                                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[26px] text-[10px] font-bold tracking-[0.3px] leading-[12px] ${
                                      brandedClicks.change >= 0 ? 'bg-[#e6faf5] text-[#009688]' : 'bg-[#ffe6e6] text-[#bb3f3f]'
                                    }`}
                                  >
                                    {brandedClicks.change >= 0 ? '+' : ''}{(brandedClicks.change * 100).toFixed(1)} PP
                                  </div>
                                )}
                      </div>
                    </td>

                            {/* Product Views - Value (share) */}
                            <td className="p-4 text-sm text-gray-600 text-right">
                              {productViews ? `${(productViews.share * 100).toFixed(1)}%` : '-'}
                            </td>
                            {/* Product Views - Wow Change */}
                            <td className="p-4 border-r border-gray-200">
                      <div className="flex items-center gap-2 w-40">
                                {productViews && (
                                  <div
                                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[26px] text-[10px] font-bold tracking-[0.3px] leading-[12px] ${
                                      productViews.change >= 0 ? 'bg-[#e6faf5] text-[#009688]' : 'bg-[#ffe6e6] text-[#bb3f3f]'
                                    }`}
                                  >
                                    {productViews.change >= 0 ? '+' : ''}{(productViews.change * 100).toFixed(1)} PP
                                  </div>
                                )}
                      </div>
                    </td>

                            {/* Revenue - Value (share) */}
                            <td className="p-4 text-sm text-gray-600 text-right">
                              {revenue ? `${(revenue.share * 100).toFixed(1)}%` : '-'}
                            </td>
                            {/* Revenue - Wow Change */}
                            <td className="p-4 border-r border-gray-200">
                      <div className="flex items-center gap-2 w-40">
                                {revenue && (
                                  <div
                                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[26px] text-[10px] font-bold tracking-[0.3px] leading-[12px] ${
                                      revenue.change >= 0 ? 'bg-[#e6faf5] text-[#009688]' : 'bg-[#ffe6e6] text-[#bb3f3f]'
                                    }`}
                                  >
                                    {revenue.change >= 0 ? '+' : ''}{(revenue.change * 100).toFixed(1)} PP
                                  </div>
                                )}
                      </div>
                    </td>

                    <td className="p-4 w-0">
                      <div className="flex items-center gap-2">
                        <button
                          className="px-4 py-2 text-xs font-medium font-dm-sans leading-4 rounded-[18px] transition-all duration-150 text-primary-blue bg-white shadow-[0_0_0_1px_#E6E9EC_inset] hover:shadow-[0_0_0_1px_#195AFE_inset] hover:bg-primary-blue-light-hover active:shadow-[0_0_0_1px_#195AFE_inset] active:bg-primary-blue-light-active"
                          onClick={() => navigate(`/reports/${report.id}`)}
                        >
                          Analyze
                        </button>
                      </div>
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


