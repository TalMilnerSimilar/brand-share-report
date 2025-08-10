import React, { useEffect, useRef, useState } from 'react';

interface CreateReportDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (report: { title: string; category: string }) => void;
}

const categoriesMock: string[] = [
  'Electronics > Accessories & Supplies',
  'Electronics > Accessories & Supplies > Audio & Video Accessories',
  'Electronics > Accessories & Supplies > Batteries, Chargers & Accessories',
  'Electronics > Audio & Video Accessories > TV Accessories & Parts',
  'Electronics > Audio & Video Accessories > Remote Controls & Accessories',
];

const CreateReportDrawer: React.FC<CreateReportDrawerProps> = ({ isOpen, onClose, onSave }) => {
  // removed title input – header is static now
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setSearch('');
      setSelectedCategory('');
    }
  }, [isOpen]);

  const filtered = categoriesMock.filter((c) =>
    c.toLowerCase().includes(search.trim().toLowerCase())
  );

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  // Save enabled when a category is selected
  const canSave = Boolean(selectedCategory);

  const getDerivedTitle = (): string => {
    if (selectedCategory) {
      const parts = selectedCategory.split('>');
      const last = parts[parts.length - 1]?.trim();
      if (last) return last;
    }
    return 'New Report';
  };

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-[10020] transition ${isOpen ? 'pointer-events-auto bg-black/30' : 'pointer-events-none bg-transparent'}`}
      onClick={handleOverlayClick}
      aria-hidden={!isOpen}
    >
      <aside
        className={`fixed right-0 top-0 h-full w-[700px] bg-white border-l border-[#e6e9ec] shadow-[0px_1px_8px_0px_rgba(9,37,64,0.08),0px_5px_24px_0px_rgba(9,37,64,0.08)] transform transition-transform duration-200 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-4">
          <h2 className="text-[24px] leading-6 font-normal font-dm-sans text-[#092540] mr-4">Create New Report</h2>
          <button
            aria-label="Close"
            className="w-10 h-10 rounded-full hover:bg-[#f3f7ff] active:bg-[#e8eeff] flex items-center justify-center"
            onClick={onClose}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 5l10 10M15 5L5 15" stroke="#3A5166" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="bg-[#f7f7f8] h-[calc(100%-160px)] overflow-auto px-8 py-4">
          {/* Step 1 */}
          <div className="bg-white rounded-lg shadow-[0px_1px_8px_0px_rgba(9,37,64,0.08),0px_5px_24px_0px_rgba(9,37,64,0.08)] p-6 mb-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-6 h-6 rounded-full bg-[#3E74FE] text-white text-[14px] leading-[20px] flex items-center justify-center">1</div>
              <div className="text-[20px] leading-[28px] text-[#092540] font-dm-sans">Select your Category</div>
            </div>
            <div className="text-[14px] leading-[20px] text-[#092540] mb-3 font-dm-sans">Search or browse to set the base category for this report.</div>

            <div className="relative border border-[#cbd1d7] rounded-[3px] shadow-[0px_3px_5px_0px_rgba(42,62,82,0.12)]">
              <div className="flex items-center h-10 px-4 gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.25 12.5a5.25 5.25 0 1 0 0-10.5 5.25 5.25 0 0 0 0 10.5Zm6 2-3.2-3.2" stroke="#B6BEC6" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <input
                  className="flex-1 outline-none text-[14px] leading-[20px] placeholder-[#b6bec6] text-[#3a5166]"
                  placeholder="Search or select your category"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="h-px bg-[#3E74FE]" />

              <div className="max-h-60 overflow-auto py-1">
                {filtered.length === 0 && (
                  <div className="px-4 py-2 text-[14px] text-[#6b7c8c]">No results</div>
                )}
                {filtered.map((c) => (
                  <button
                    key={c}
                    className={`w-full text-left h-11 px-4 hover:bg-[#f7f7f8] ${
                      selectedCategory === c ? 'bg-[#eef2ff]' : ''
                    }`}
                    onClick={() => setSelectedCategory(c)}
                  >
                    <span className="text-[14px] leading-[20px] text-[#092540]">{c}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2 (disabled placeholder) */}
          <div className="bg-white rounded-lg p-6 mb-4 flex items-center gap-4">
            <div className="w-6 h-6 rounded-full bg-[#cbd1d7] text-white text-[14px] leading-[20px] flex items-center justify-center">2</div>
            <div className="text-[20px] leading-[28px] text-[#b6bec6] font-dm-sans">Select your Brand</div>
          </div>

          {/* Step 3 (disabled placeholder) */}
          <div className="bg-white rounded-lg p-6 mb-4 flex items-center gap-4">
            <div className="w-6 h-6 rounded-full bg-[#cbd1d7] text-white text-[14px] leading-[20px] flex items-center justify-center">3</div>
            <div className="text-[20px] leading-[28px] text-[#b6bec6] font-dm-sans">Select Competitors</div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#e6e9ec] px-6 py-4 flex items-center justify-between">
          <button
            className="px-4 py-2 rounded-[18px] text-[14px] leading-[20px] font-medium text-[#195afe] font-dm-sans hover:bg-gray-50"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className={`px-4 py-2 rounded-[18px] text-[14px] leading-[20px] font-medium text-white font-dm-sans ${
              canSave ? 'bg-[#195afe] hover:bg-[#1448cc]' : 'bg-[#cbd1d7] cursor-not-allowed'
            }`}
            onClick={() => {
              if (!canSave) return;
              const derived = getDerivedTitle();
              onSave?.({ title: derived, category: selectedCategory });
              onClose();
            }}
            disabled={!canSave}
          >
            Save and Analyze
          </button>
        </div>
      </aside>
    </div>
  );
};

export default CreateReportDrawer;
