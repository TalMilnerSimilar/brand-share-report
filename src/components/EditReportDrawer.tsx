import React, { useEffect, useRef, useState } from 'react';

interface EditReportDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialReport: { title: string; category: string; brand: string; competitors: string[] } | null;
  onSave?: (report: { title: string; category: string; brand: string; competitors: string[] }) => void;
}

// NOTE: This component intentionally mirrors CreateReportDrawer UX but starts pre-populated
// with the provided report and shows title "Edit Report". Logic is duplicated on purpose
// to avoid changing creation behavior.

// Category/brand sources (duplicated from CreateReportDrawer to keep components independent)
const LEVEL1: string[] = [
  'Electronics','Home & Kitchen','Beauty & Personal Care','Sports & Outdoors','Toys & Games','Automotive','Clothing, Shoes & Jewelry','Health & Household','Grocery & Gourmet Food','Pet Supplies','Tools & Home Improvement','Office Products','Baby','Industrial & Scientific','Books','Music','Movies & TV'
];
const LEVEL2_BY_L1: Record<string, string[]> = {
  Electronics: ['Accessories & Supplies','Audio & Video','Camera & Photo','Smart Home','Wearables','Components','Computers & Tablets'],
  'Home & Kitchen': ['Appliances','Furniture','Décor','Storage & Organization','Cleaning & Care','Bedding','Kitchen & Dining'],
  'Beauty & Personal Care': ['Makeup','Skin Care','Hair Care','Tools & Accessories','Fragrance'],
  'Sports & Outdoors': ['Exercise & Fitness','Camping & Hiking','Cycling','Water Sports','Team Sports'],
  'Toys & Games': ['STEM Toys','Puzzles','Board Games','Dolls & Accessories','Action Figures'],
  Automotive: ['Car Electronics','Exterior Accessories','Interior Accessories','Car Care','Motorcycle & Powersports'],
  'Clothing, Shoes & Jewelry': ['Men','Women','Kids','Shoes','Jewelry'],
  'Health & Household': ['Vitamins','Wellness','Medical Supplies','Household Supplies','Baby & Child Care'],
  'Grocery & Gourmet Food': ['Snacks','Beverages','Pantry Staples','Breakfast Foods','Sauces & Condiments'],
  'Pet Supplies': ['Dog','Cat','Fish & Aquatic','Small Animals','Birds'],
  'Tools & Home Improvement': ['Hand Tools','Power Tools','Lighting','Electrical','Hardware'],
  'Office Products': ['Desk Accessories','Paper','Writing & Correction','Organization','Office Electronics'],
  Baby: ['Nursery','Feeding','Diapering','Bathing','Gear'],
  'Industrial & Scientific': ['Lab & Test','Measurement','Packaging','Material Handling','Safety'],
  Books: ["Literature & Fiction","Children's Books","Education & Teaching","Business & Money","Mystery & Thriller"],
  Music: ['CDs & Vinyl','Digital Music','Instruments','Accessories'],
  'Movies & TV': ['Blu-ray','DVD','Streaming','TV Series','Documentary']
};
const LEVEL3_BY_L1L2: Record<string, string[]> = {
  'Electronics|Accessories & Supplies': ['Cables & Adapters','Batteries & Chargers','Mounts & Stands','Cases & Covers','Screen Protectors'],
  'Electronics|Audio & Video': ['Headphones','Speakers','Soundbars','Microphones','AV Receivers'],
  'Electronics|Camera & Photo': ['Lenses','Tripods','Camera Bags','Lighting','Memory Cards'],
  'Electronics|Smart Home': ['Smart Switches','Smart Bulbs','Thermostats','Cameras','Hubs'],
  'Electronics|Wearables': ['Smartwatches','Fitness Trackers','VR Headsets','Wearable Accessories'],
  'Electronics|Components': ['CPUs','Motherboards','Memory','SSDs','GPUs'],
  'Electronics|Computers & Tablets': ['Laptops','Desktops','Tablets','Monitors','Keyboards']
};
const LEVEL4_BY_L1L2L3: Record<string, string[]> = {
  'Electronics|Accessories & Supplies|Cables & Adapters': ['HDMI','USB-C','DisplayPort','Audio']
};
function buildCategoryList(maxCount: number): string[] {
  const list: string[] = [];
  const seen = new Set<string>();
  const add = (s: string) => { if (!seen.has(s)) { list.push(s); seen.add(s); return list.length >= maxCount; } return false; };
  for (const l1 of LEVEL1) {
    if (add(l1)) return list.slice(0, maxCount);
    const l2s = LEVEL2_BY_L1[l1] || [];
    for (const l2 of l2s) {
      if (add(`${l1} > ${l2}`)) return list.slice(0, maxCount);
      const key2 = `${l1}|${l2}`;
      const l3s = LEVEL3_BY_L1L2[key2] || [];
      for (const l3 of l3s) {
        if (add(`${l1} > ${l2} > ${l3}`)) return list.slice(0, maxCount);
        const key3 = `${key2}|${l3}`;
        const l4s = LEVEL4_BY_L1L2L3[key3] || [];
        for (const l4 of l4s) {
          if (add(`${l1} > ${l2} > ${l3} > ${l4}`)) return list.slice(0, maxCount);
        }
      }
    }
  }
  return list.slice(0, maxCount);
}
const allCategories: string[] = buildCategoryList(200);

// Minimal brands set to avoid importing from create component; for editing we only need search/filter UX
// For full parity, this could be refactored into a shared module later.
const brandsMock: string[] = [
  'Nike','Adidas','Puma','Under Armour','New Balance','Apple','Samsung','Sony','LG','Microsoft','Google','Amazon','Dell','HP','Lenovo','ASUS','Acer'
];

const getSuggestedCompetitors = (brand: string): string[] => {
  const competitorMap: Record<string, string[]> = {
    Nike: ['Adidas','Puma','Under Armour','New Balance'],
    Adidas: ['Nike','Puma','Under Armour','Reebok'],
    Apple: ['Samsung','Google','Microsoft','Sony'],
    Samsung: ['Apple','LG','Sony','Xiaomi'],
    Google: ['Apple','Microsoft','Amazon','Samsung'],
  };
  const shuffled = [...brandsMock].filter(b => b !== brand).sort(() => 0.5 - Math.random());
  return competitorMap[brand] || shuffled.slice(0,4);
};

const EditReportDrawer: React.FC<EditReportDrawerProps> = ({ isOpen, onClose, initialReport, onSave }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(3);
  const [search, setSearch] = useState('');
  const [brandSearch, setBrandSearch] = useState('');
  const [competitorSearch, setCompetitorSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([]);
  const [isManualSelection, setIsManualSelection] = useState(false);
  const [initialSuggestedCompetitors, setInitialSuggestedCompetitors] = useState<string[]>([]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Hydrate from the provided report each time the drawer opens
  useEffect(() => {
    if (isOpen && initialReport) {
      setCurrentStep(3);
      setSearch('');
      setBrandSearch('');
      setCompetitorSearch('');
      setSelectedCategory(initialReport.category || '');
      setSelectedBrand(initialReport.brand || '');
      setSelectedCompetitors(initialReport.competitors || []);
      const sugg = getSuggestedCompetitors(initialReport.brand || '');
      setInitialSuggestedCompetitors(sugg);
      setIsManualSelection(false);
    }
  }, [isOpen, initialReport]);

  const filteredCategories = allCategories.filter(c => c.toLowerCase().includes(search.trim().toLowerCase()));
  const filteredBrands = brandsMock.filter(b => b.toLowerCase().includes(brandSearch.trim().toLowerCase()));
  const filteredCompetitors = brandsMock
    .filter(b => b !== selectedBrand)
    .filter(b => b.toLowerCase().includes(competitorSearch.trim().toLowerCase()));

  const canSave = Boolean(selectedCategory && selectedBrand && selectedCompetitors.length > 0 && selectedCompetitors.length <= 4);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => { if (e.target === overlayRef.current) onClose(); };

  const getDerivedTitle = () => {
    const leaf = selectedCategory.includes(' > ') ? (selectedCategory.split(' > ').pop() || selectedCategory) : selectedCategory;
    return `${selectedBrand} — ${leaf}`;
  };

  return (
    <div
      className={`fixed inset-0 z-[10000] ${isOpen ? 'visible' : 'invisible'}`}
      aria-hidden={!isOpen}
    >
      <div className={`fixed inset-0 bg-black/30 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`} onMouseDown={handleOverlayClick} ref={overlayRef} />
      <aside className={`fixed right-0 top-0 h-full w-[700px] bg-white shadow-xl transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#e6e9ec] flex items-center justify-between">
          <div>
            <div className="text-[12px] leading-4 text-[#6b7c8c] font-dm-sans">Report</div>
            <div className="text-[20px] leading-[28px] text-[#092540] font-dm-sans font-bold">Edit Report</div>
          </div>
          <button className="px-4 py-2 rounded-[18px] text-[14px] leading-[20px] font-medium text-[#195afe] font-dm-sans hover:bg-gray-50" onClick={onClose}>Close</button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto h-[calc(100%-120px)]">
          {/* Step 1 - Category */}
          {currentStep >= 1 ? (
            <div className="bg-white rounded-lg p-6 mb-4 flex items-center justify-between hover:shadow-[0px_1px_8px_0px_rgba(9,37,64,0.03),0px_5px_24px_0px_rgba(9,37,64,0.06)] transition-shadow group">
              <div className="flex items-center gap-6">
                <div className="w-6 h-6 relative">
                  <img className="group-hover:opacity-0 transition-opacity w-6 h-6" src="/finished step icon.svg" alt="Completed step" />
                  <img className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6" src="/edit step icon.svg" alt="Edit step" />
                </div>
                <div className="text-[20px] leading-[28px] text-[#092540] font-dm-sans">Select your Category</div>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 bg-white border border-[#195afe] text-[#195afe] text-[14px] leading-[20px] font-medium font-dm-sans rounded-[18px] hover:bg-[#f3f7ff]"
                onClick={() => { setCurrentStep(1); setSelectedCategory(''); }}>Open Step</button>
            </div>
          ) : null}

          {currentStep === 1 && (
            <div className="bg-white rounded-lg shadow-[0px_1px_8px_0px_rgba(9,37,64,0.08),0px_5px_24px_0px_rgba(9,37,64,0.08)] p-6 mb-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-6 h-6 rounded-full bg-[#3E74FE] text-white text-[14px] leading-[20px] flex items-center justify-center">1</div>
                <div className="text-[20px] leading-[28px] text-[#092540] font-dm-sans">Select your Category</div>
              </div>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search categories" className="w-full mb-4 px-3 py-2 border border-[#e6e9ec] rounded" />
              <div className="max-h-56 overflow-y-auto border border-[#e6e9ec] rounded">
                {filteredCategories.map((c) => (
                  <button key={c} className={`w-full text-left px-3 py-2 hover:bg-gray-50 ${selectedCategory===c?'bg-[#f3f7ff]':''}`} onClick={() => { setSelectedCategory(c); setCurrentStep(2); }}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 - Brand */}
          {currentStep >= 2 ? (
            <div className="bg-white rounded-lg p-6 mb-4 flex items-center justify-between hover:shadow-[0px_1px_8px_0px_rgba(9,37,64,0.03),0px_5px_24px_0px_rgba(9,37,64,0.06)] transition-shadow group">
              <div className="flex items-center gap-6">
                <div className="w-6 h-6 relative">
                  <img className="group-hover:opacity-0 transition-opacity w-6 h-6" src="/finished step icon.svg" alt="Completed step" />
                  <img className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6" src="/edit step icon.svg" alt="Edit step" />
                </div>
                <div className="text-[20px] leading-[28px] text-[#092540] font-dm-sans">Select your Brand</div>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 bg-white border border-[#195afe] text-[#195afe] text-[14px] leading-[20px] font-medium font-dm-sans rounded-[18px] hover:bg-[#f3f7ff]"
                onClick={() => { setCurrentStep(2); setSelectedBrand(''); }}>Open Step</button>
            </div>
          ) : null}

          {currentStep === 2 && (
            <div className="bg-white rounded-lg shadow-[0px_1px_8px_0px_rgba(9,37,64,0.08),0px_5px_24px_0px_rgba(9,37,64,0.08)] p-6 mb-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-6 h-6 rounded-full bg-[#3E74FE] text-white text-[14px] leading-[20px] flex items-center justify-center">2</div>
                <div className="text-[20px] leading-[28px] text-[#092540] font-dm-sans">Select your Brand</div>
              </div>
              <input value={brandSearch} onChange={(e) => setBrandSearch(e.target.value)} placeholder="Search brands" className="w-full mb-4 px-3 py-2 border border-[#e6e9ec] rounded" />
              <div className="max-h-56 overflow-y-auto border border-[#e6e9ec] rounded">
                {filteredBrands.map((b) => (
                  <button key={b} className={`w-full text-left px-3 py-2 hover:bg-gray-50 ${selectedBrand===b?'bg-[#f3f7ff]':''}`} onClick={() => { setSelectedBrand(b); setCurrentStep(3); const sugg=getSuggestedCompetitors(b); setInitialSuggestedCompetitors(sugg);} }>
                    {b}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3 - Competitors */}
          {currentStep >= 3 && (
            <div className="bg-white rounded-lg shadow-[0px_1px_8px_0px_rgba(9,37,64,0.08),0px_5px_24px_0px_rgba(9,37,64,0.08)] p-6 mb-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-6 h-6 rounded-full bg-[#3E74FE] text-white text-[14px] leading-[20px] flex items-center justify-center">3</div>
                <div className="text-[20px] leading-[28px] text-[#092540] font-dm-sans">Select Competitors</div>
              </div>
              <div className="text-[14px] leading-[20px] text-[#092540] mb-4 font-dm-sans">We’ve selected category leaders based on your brand. You can edit them to select any competitors you want manually</div>

              {!isManualSelection ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="text-[16px] leading-[22px] text-[#092540] font-bold font-dm-sans">Category Leaders</div>
                    <button className="flex items-center gap-1 px-1 py-1 text-[14px] leading-[20px] text-[#195afe] hover:text-[#1448cc] font-dm-sans"
                      onClick={() => { setSelectedCompetitors([]); setIsManualSelection(true); }}>
                      Edit
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                  <div className="bg-[#f7f7f8] border border-[#e6e9ec] rounded p-4 min-h-[100px] flex flex-wrap items-center gap-2 content-center">
                    {selectedCompetitors.map((competitor) => (
                      <div key={competitor} style={{ height: '32px' }} className="inline-flex items-center justify-start gap-2 px-3 py-1 bg-white rounded-[40px] shadow-[0px_3px_5px_rgba(42,62,82,0.12)]">
                        <span className="text-[12px] leading-[16px] text-[#092540] font-dm-sans whitespace-nowrap">{competitor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="text-[16px] leading-[22px] text-[#092540] font-bold font-dm-sans">Select competitors manually</div>
                    <button className="text-[14px] leading-[20px] text-[#195afe] hover:text-[#1448cc] font-dm-sans"
                      onClick={() => { setSelectedCompetitors(initialSuggestedCompetitors); setIsManualSelection(false); }}>← Back to suggestions</button>
                  </div>
                  <input value={competitorSearch} onChange={(e) => setCompetitorSearch(e.target.value)} placeholder="Search competitors" className="w-full px-3 py-2 border border-[#e6e9ec] rounded" />
                  <div className="max-h-56 overflow-y-auto border border-[#e6e9ec] rounded">
                    {filteredCompetitors.map((b) => {
                      const checked = selectedCompetitors.includes(b);
                      const disabled = !checked && selectedCompetitors.length >= 4;
                      return (
                        <label key={b} className={`flex items-center justify-between px-3 py-2 hover:bg-gray-50 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                          <span>{b}</span>
                          <input type="checkbox" checked={checked} disabled={disabled} onChange={(e) => {
                            if (e.target.checked) setSelectedCompetitors((prev) => [...prev, b]); else setSelectedCompetitors((prev) => prev.filter((x) => x !== b));
                          }} />
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#e6e9ec] px-6 py-4 flex items-center justify-between">
          <button className="px-4 py-2 rounded-[18px] text-[14px] leading-[20px] font-medium text-[#195afe] font-dm-sans hover:bg-gray-50" onClick={onClose}>Close</button>
          <button className={`px-4 py-2 rounded-[18px] text-[14px] leading-[20px] font-medium text-white font-dm-sans ${canSave ? 'bg-[#195afe] hover:bg-[#1448cc]' : 'bg-[#cbd1d7] cursor-not-allowed'}`}
            onClick={() => { if (!canSave) return; const derived = getDerivedTitle(); onSave?.({ title: derived, category: selectedCategory, brand: selectedBrand, competitors: selectedCompetitors }); onClose(); }} disabled={!canSave}>
            Save Changes
          </button>
        </div>
      </aside>
    </div>
  );
};

export default EditReportDrawer;


