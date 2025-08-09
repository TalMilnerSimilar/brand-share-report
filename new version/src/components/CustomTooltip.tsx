import React from 'react';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  brandColorMap: Record<string, string>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, brandColorMap }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }
  
  // For overtime charts, we want to show share percentages, not raw values
  // Calculate total market volume from the complete data point (includes all brands, not just visible ones)
  // The payload only contains selected brands, but we need the total market to calculate true market shares
  const firstItem = payload[0];
  const completeDataPoint = firstItem?.payload; // This contains data for all brands
  const totalMarketValue = completeDataPoint ? 
    Object.entries(completeDataPoint)
      .filter(([key]) => key !== 'name')
      .reduce((sum, [_, value]) => sum + Number(value || 0), 0) : 1;

  // Categorize brands
  const myBrand = payload.find(item => item.dataKey === 'Nike');
  const competitors = payload.filter(item => 
    ['Adidas', 'New Balance', 'Hoka', 'Asics'].includes(item.dataKey)
  );
  const otherBrands = payload.filter(item => 
    item.dataKey !== 'Nike' && 
    !['Adidas', 'New Balance', 'Hoka', 'Asics'].includes(item.dataKey)
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-[250px] max-w-[400px]">
      {/* Date */}
      <div className="mb-4">
        <span className="text-xs font-medium text-[#092540]">{label}</span>
      </div>

      {/* My Brand */}
      {myBrand && (
        <div className="mb-4">
          <div className="flex items-center justify-between py-0.5">
            <div className="flex items-center gap-2 flex-1">
              <div 
                className="w-2.5 h-2.5 rounded-full" 
                style={{ backgroundColor: brandColorMap[myBrand.dataKey] }}
              />
              <span className="text-xs text-[#3a5166]">
                <span className="font-bold">My Brand</span>
                <span> - {myBrand.dataKey}</span>
              </span>
            </div>
                                        <span className="text-xs font-bold text-[#092540] text-right tracking-[0.36px] w-[41px]">
              {totalMarketValue > 0 ? `${((myBrand.value / totalMarketValue) * 100).toFixed(1)}%` : '0.0%'}
            </span>
          </div>
        </div>
      )}

      {/* Competitors */}
      {competitors.length > 0 && (
        <div className="mb-4">
          <div className="text-xs font-bold text-[#092540] mb-2">Competitors:</div>
          <div className="space-y-2">
            {competitors.map((item) => (
              <div key={item.dataKey} className="flex items-center justify-between py-0.5">
                <div className="flex items-center gap-2 flex-1">
                  <div 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: brandColorMap[item.dataKey] }}
                  />
                  <span className="text-xs text-[#3a5166]">{item.dataKey}</span>
                </div>
                <span className="text-xs font-bold text-[#092540] text-right tracking-[0.36px] w-[41px]">
                  {totalMarketValue > 0 ? `${((item.value / totalMarketValue) * 100).toFixed(1)}%` : '0.0%'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Other Brands */}
      {otherBrands.length > 0 && (
        <div>
          <div className="text-xs font-bold text-[#092540] mb-2">Other Brands:</div>
          <div className="space-y-2">
            {otherBrands.map((item) => (
              <div key={item.dataKey} className="flex items-center justify-between py-0.5">
                <div className="flex items-center gap-2 flex-1">
                  <div 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: brandColorMap[item.dataKey] }}
                  />
                  <span className="text-xs text-[#3a5166]">{item.dataKey}</span>
                </div>
                <span className="text-xs font-bold text-[#092540] text-right tracking-[0.36px] w-[41px]">
                  {totalMarketValue > 0 ? `${((item.value / totalMarketValue) * 100).toFixed(1)}%` : '0.0%'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomTooltip; 