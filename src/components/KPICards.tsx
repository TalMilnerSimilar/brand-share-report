import React from 'react';

const IconInfo16Px: React.FC = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

const KPICards: React.FC = () => {
  return (
    <div className="flex gap-4">
      {/* Product Views Card */}
      <div className="flex-1 bg-white border border-gray-200 rounded-md">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-base font-medium text-gray-900">Product Views</h3>
          <p className="text-sm text-gray-600">Searches mentioning your brand</p>
        </div>
        <div className="p-4">
          <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
            <div className="flex items-center justify-center gap-1 mb-2">
              <span className="text-sm text-gray-900">My Brand Share</span>
              <IconInfo16Px />
            </div>
            <div className="text-center mb-2">
              <span className="text-2xl font-medium text-gray-900">29.2%</span>
            </div>
            <div className="bg-red-100 rounded text-center">
              <span className="text-xs font-bold text-red-800">-0.1PP YoY</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-900">Category Total</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-900">155.9K</span>
                <span className="text-[10px] font-bold tracking-[0.3px] leading-[12px] bg-[#ffe6e6] text-[#bb3f3f] px-2 py-0.5 rounded-[26px]">-1.2%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-900">Comp' AVG</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-900">27.5%</span>
                <span className="text-[10px] font-bold tracking-[0.3px] leading-[12px] bg-[#ffe6e6] text-[#bb3f3f] px-2 py-0.5 rounded-[26px]">-1.2PP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Units Sold Card */}
      <div className="flex-1 bg-white border border-gray-200 rounded-md">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-base font-medium text-gray-900">Units Sold</h3>
          <p className="text-sm text-gray-600">Total units sold across retailers</p>
        </div>
        <div className="p-4">
          <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
            <div className="flex items-center justify-center gap-1 mb-2">
              <span className="text-sm text-gray-900">My Brand Share</span>
              <IconInfo16Px />
            </div>
            <div className="text-center mb-2">
              <span className="text-2xl font-medium text-gray-900">29.5%</span>
            </div>
            <div className="bg-red-100 rounded text-center">
              <span className="text-xs font-bold text-red-800">-0.2PP YoY</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-900">Category Total</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-900">160.2K</span>
                <span className="text-[10px] font-bold tracking-[0.3px] leading-[12px] bg-[#e6faf5] text-[#009688] px-2 py-0.5 rounded-[26px]">+1.4%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-900">Comp' AVG</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-900">30.1%</span>
                <span className="text-[10px] font-bold tracking-[0.3px] leading-[12px] bg-[#ffe6e6] text-[#bb3f3f] px-2 py-0.5 rounded-[26px]">-1.6PP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenues Card */}
      <div className="flex-1 bg-white border border-gray-200 rounded-md">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-base font-medium text-gray-900">Revenues</h3>
          <p className="text-sm text-gray-600">Revenue generated from sales</p>
        </div>
        <div className="p-4">
          <div className="bg-green-50 border border-green-200 rounded p-4 mb-4">
            <div className="flex items-center justify-center gap-1 mb-2">
              <span className="text-sm text-gray-900">My Brand Share</span>
              <IconInfo16Px />
            </div>
            <div className="text-center mb-2">
              <span className="text-2xl font-medium text-gray-900">30.1%</span>
            </div>
            <div className="bg-green-100 rounded text-center">
              <span className="text-xs font-bold text-green-800">-0.2PP YoY</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-900">Category Total</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-900">160.3K</span>
                <span className="text-[10px] font-bold tracking-[0.3px] leading-[12px] bg-[#ffe6e6] text-[#bb3f3f] px-2 py-0.5 rounded-[26px]">-1.2%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-900">Comp' AVG</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-900">29.5%</span>
                <span className="text-[10px] font-bold tracking-[0.3px] leading-[12px] bg-[#e6faf5] text-[#009688] px-2 py-0.5 rounded-[26px]">+1.8PP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPICards; 