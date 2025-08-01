import React from 'react';

interface BrandLegendListboxProps {
  brands: string[];
  selectedBrands: Set<string>;
  onBrandSelectionChange: (selected: Set<string>) => void;
  brandColorMap: Record<string, string>;
}

const BrandLegendListbox: React.FC<BrandLegendListboxProps> = ({
  brands,
  selectedBrands,
  onBrandSelectionChange,
  brandColorMap,
}) => {
  const maxSelections = 6;

  const handleBrandToggle = (brandName: string) => {
    const newSelected = new Set(selectedBrands);
    if (newSelected.has(brandName)) {
      newSelected.delete(brandName);
    } else if (newSelected.size < maxSelections) {
      newSelected.add(brandName);
    }
    onBrandSelectionChange(newSelected);
  };

  const isDisabled = (brandName: string) => {
    return !selectedBrands.has(brandName) && selectedBrands.size >= maxSelections;
  };

  const handleSelectTopCompetitors = () => {
    const topCompetitors = ['Nike', 'Adidas', 'New Balance', 'Hoka', 'Asics'];
    onBrandSelectionChange(new Set(topCompetitors));
  };

  const legendItems = brands.map((brand) => ({
    name: brand,
    color: brandColorMap[brand] || '#000000', // Default to black if no color found
  }));

  // Separate brands into sections
  const myBrand = legendItems.slice(0, 1);
  const competitors = legendItems.slice(1, 5);
  const allBrands = legendItems.slice(5).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="flex flex-col bg-white p-4 rounded-lg border border-border-gray w-64 h-[400px]">
      <div className="flex-grow overflow-y-auto space-y-2">
        {/* My Brand */}
        {myBrand.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selectedBrands.has(item.name)}
              onChange={() => handleBrandToggle(item.name)}
              className="h-4 w-4"
              style={{ accentColor: item.color }}
            />
            <span className="text-text-dark">
              <span className="font-bold">My Brand</span>
              <span> - {item.name}</span>
            </span>
          </div>
        ))}

        {/* Competitors separator */}
        <div className="text-xs font-bold text-text-dark mt-2 mb-1">
          Competitors:
        </div>

        {/* Competitors */}
        {competitors.map((item, index) => (
          <div key={index + 1} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selectedBrands.has(item.name)}
              onChange={() => handleBrandToggle(item.name)}
              disabled={isDisabled(item.name)}
              className={`h-4 w-4 ${isDisabled(item.name) ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{ accentColor: item.color }}
            />
            <span className={`text-text-dark ${isDisabled(item.name) ? 'opacity-50' : ''}`}>{item.name}</span>
          </div>
        ))}

        {/* All Brands separator */}
        <div className="text-xs font-bold text-text-dark mt-2 mb-1">
          All Brands:
        </div>

        {/* All Brands (sorted alphabetically) */}
        {allBrands.map((item, index) => (
          <div key={index + 5} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selectedBrands.has(item.name)}
              onChange={() => handleBrandToggle(item.name)}
              disabled={isDisabled(item.name)}
              className={`h-4 w-4 ${isDisabled(item.name) ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{ accentColor: item.color }}
            />
            <span className={`text-text-dark ${isDisabled(item.name) ? 'opacity-50' : ''}`}>{item.name}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-2 border-t border-border-gray flex justify-between items-center text-xs">
        <button
          className="text-primary-blue font-bold"
          onClick={handleSelectTopCompetitors}
        >
          Select Top Competitors
        </button>
        <span className="text-text-secondary">{selectedBrands.size}/{maxSelections}</span>
      </div>
    </div>
  );
};

export default BrandLegendListbox;
