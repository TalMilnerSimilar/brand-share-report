import React, { useState } from 'react';
import unifiedBrands from '../data/unifiedBrands';

const NewReport: React.FC = () => {
  const allBrands = Object.keys(unifiedBrands) as string[];
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Shoes');
  const [myBrand, setMyBrand] = useState(allBrands[0] || 'Nike');
  const [competitors, setCompetitors] = useState<string[]>([]);

  return (
    <div className="p-6" style={{ paddingLeft: '64px', paddingRight: '64px' }}>
      <h1 className="text-2xl font-semibold text-[#092540] mb-4">Create New Report</h1>
      <div className="bg-white border border-gray-200 rounded-md p-6 max-w-xl">
        <div className="mb-4">
          <label className="block text-sm text-[#6b7c8c] mb-1">Report Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-200 rounded px-3 py-2" placeholder="e.g., Nike • Shoes" />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-[#6b7c8c] mb-1">Category</label>
          <input value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-gray-200 rounded px-3 py-2" placeholder="e.g., Shoes" />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-[#6b7c8c] mb-1">My Brand</label>
          <select value={myBrand} onChange={(e) => setMyBrand(e.target.value)} className="w-full border border-gray-200 rounded px-3 py-2">
            {allBrands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-sm text-[#6b7c8c] mb-1">Competitors</label>
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-gray-200 rounded p-2">
            {allBrands.filter((b) => b !== myBrand).map((b) => {
              const checked = competitors.includes(b);
              return (
                <label key={b} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={checked} onChange={() => setCompetitors((prev) => checked ? prev.filter((x) => x !== b) : [...prev, b])} />
                  {b}
                </label>
              );
            })}
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-xs font-medium rounded-[18px] transition-all duration-150 text-primary-blue bg-white shadow-[0_0_0_1px_#E6E9EC_inset] hover:shadow-[0_0_0_1px_#195AFE_inset]"
            onClick={() => window.history.back()}
          >Cancel</button>
          <button className="px-4 py-2 text-xs font-medium rounded-[18px] transition-all duration-150 text-white bg-[#195afe] hover:opacity-90"
            onClick={() => alert('Persisting reports is not implemented in this mock.')}>
            Create Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewReport;


