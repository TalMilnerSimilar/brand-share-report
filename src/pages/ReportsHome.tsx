import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import unifiedBrands from '../data/unifiedBrands';
import { metricLabelMap } from '../data/unifiedBrandData';
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
      {/* Enhanced Hero Section */}
      <div className="mb-8">
        {/* Hero Container */}
        <div 
          className="relative overflow-hidden rounded-lg border border-gray-200"
          style={{ 
            background: 'linear-gradient(250deg, rgba(165, 31, 227, 0.08) 9.5%, rgba(25, 90, 254, 0.08) 26%, rgba(255, 255, 255, 0.08) 52%), #ffffff',
            minHeight: '200px'
          }}
        >
          <div className="flex items-center justify-between p-8">
            {/* Left Content */}
            <div className="flex-1">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-[#092540] mb-2">
                  Brand Share Reports Overview
                </h1>
                <p className="text-lg text-[#6b7c8c]">
                  Monitor your brand performance across categories and competitors
                </p>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center gap-6">
                <div className="bg-white bg-opacity-50 rounded-lg p-4 border border-white border-opacity-30">
                  <div className="text-sm text-[#6b7c8c] mb-1">Active Reports</div>
                  <div className="text-2xl font-bold text-[#092540]">{mockReports.length}</div>
                </div>
                <div className="bg-white bg-opacity-50 rounded-lg p-4 border border-white border-opacity-30">
                  <div className="text-sm text-[#6b7c8c] mb-1">Brands Tracked</div>
                  <div className="text-2xl font-bold text-[#092540]">{new Set(mockReports.map(r => r.brand)).size}</div>
                </div>
                <div className="bg-white bg-opacity-50 rounded-lg p-4 border border-white border-opacity-30">
                  <div className="text-sm text-[#6b7c8c] mb-1">Categories</div>
                  <div className="text-2xl font-bold text-[#092540]">{new Set(mockReports.map(r => r.category.split(' ')[0])).size}</div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="flex flex-col items-end gap-4">
              <Button variant="primary" className="px-6 py-3 text-sm" onClick={() => navigate('/reports/new')}>
                New Report
              </Button>
            </div>
          </div>

          {/* Bottom gradient line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6B39F4] via-[#195AFE] to-[#6B39F4]"></div>
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
              <tr className="border-b border-gray-200 text-xs font-medium text-gray-600">
                <th className="text-left p-4 cursor-pointer text-[#3A5166] border-r border-gray-200">
                  <div className="flex items-center gap-1">
                    <span>Report Name</span>
                  </div>
                </th>
                <th className="text-left p-4 cursor-pointer text-[#3A5166] border-r border-gray-200">
                  <div className="flex items-center gap-1">
                    <span>Branded Clicks</span>
                  </div>
                </th>
                <th className="text-left p-4 cursor-pointer text-[#3A5166]">
                  <div className="flex items-center gap-1">
                    <span>Share</span>
                  </div>
                </th>
                <th className="text-left p-4 cursor-pointer text-[#3A5166]">
                  <div className="flex items-center gap-1">
                    <span>Change</span>
                  </div>
                </th>
                <th className="text-left p-4 border-r border-gray-200">Product Views</th>
                <th className="text-left p-4 cursor-pointer text-[#3A5166]">
                  <div className="flex items-center gap-1">
                    <span>Share</span>
                  </div>
                </th>
                <th className="text-left p-4 cursor-pointer text-[#3A5166]">
                  <div className="flex items-center gap-1">
                    <span>Change</span>
                  </div>
                </th>
                <th className="text-left p-4 border-r border-gray-200">Revenue</th>
                <th className="text-left p-4 cursor-pointer text-[#3A5166]">
                  <div className="flex items-center gap-1">
                    <span>Share</span>
                  </div>
                </th>
                <th className="text-left p-4 cursor-pointer text-[#3A5166]">
                  <div className="flex items-center gap-1">
                    <span>Change</span>
                  </div>
                </th>
                <th className="text-left p-4 w-0">Actions</th>
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
                    
                    {/* Branded Clicks */}
                    <td className="p-4 text-sm text-gray-600 border-r border-gray-200">
                      {brandedClicks ? `${(brandedClicks.value / 1000).toFixed(1)}K` : '-'}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 w-40">
                        <span className="text-sm text-gray-600 min-w-[40px]">
                          {brandedClicks ? `${(brandedClicks.share * 100).toFixed(1)}%` : '-'}
                        </span>
                        <div className="flex-1 h-2 bg-gray-200 rounded">
                          <div
                            className="h-full bg-blue-600 rounded"
                            style={{ width: brandedClicks ? `${brandedClicks.share * 100}%` : '0%' }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      {brandedClicks && (
                        <div
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[26px] text-[10px] font-bold tracking-[0.3px] leading-[12px] ${
                            brandedClicks.change >= 0 ? 'bg-[#e6faf5] text-[#009688]' : 'bg-[#ffe6e6] text-[#bb3f3f]'
                          }`}
                        >
                          {brandedClicks.change >= 0 ? '+' : ''}{(brandedClicks.change * 100).toFixed(1)} PP
                        </div>
                      )}
                    </td>

                    {/* Product Views */}
                    <td className="p-4 text-sm text-gray-600 border-r border-gray-200">
                      {productViews ? `${(productViews.value / 1000).toFixed(1)}K` : '-'}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 w-40">
                        <span className="text-sm text-gray-600 min-w-[40px]">
                          {productViews ? `${(productViews.share * 100).toFixed(1)}%` : '-'}
                        </span>
                        <div className="flex-1 h-2 bg-gray-200 rounded">
                          <div
                            className="h-full bg-blue-600 rounded"
                            style={{ width: productViews ? `${productViews.share * 100}%` : '0%' }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      {productViews && (
                        <div
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[26px] text-[10px] font-bold tracking-[0.3px] leading-[12px] ${
                            productViews.change >= 0 ? 'bg-[#e6faf5] text-[#009688]' : 'bg-[#ffe6e6] text-[#bb3f3f]'
                          }`}
                        >
                          {productViews.change >= 0 ? '+' : ''}{(productViews.change * 100).toFixed(1)} PP
                        </div>
                      )}
                    </td>

                    {/* Revenue */}
                    <td className="p-4 text-sm text-gray-600 border-r border-gray-200">
                      {revenue ? `$${(revenue.value / 1000000).toFixed(1)}M` : '-'}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 w-40">
                        <span className="text-sm text-gray-600 min-w-[40px]">
                          {revenue ? `${(revenue.share * 100).toFixed(1)}%` : '-'}
                        </span>
                        <div className="flex-1 h-2 bg-gray-200 rounded">
                          <div
                            className="h-full bg-blue-600 rounded"
                            style={{ width: revenue ? `${revenue.share * 100}%` : '0%' }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      {revenue && (
                        <div
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[26px] text-[10px] font-bold tracking-[0.3px] leading-[12px] ${
                            revenue.change >= 0 ? 'bg-[#e6faf5] text-[#009688]' : 'bg-[#ffe6e6] text-[#bb3f3f]'
                          }`}
                        >
                          {revenue.change >= 0 ? '+' : ''}{(revenue.change * 100).toFixed(1)} PP
                        </div>
                      )}
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


