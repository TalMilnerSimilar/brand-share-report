import React, { useEffect, useRef, useState } from 'react';
import './BrandHeader.css';

type Props = {
  onCreateNew?: () => void;
};

const ReportsSelectionHeader: React.FC<Props> = ({ onCreateNew }) => {
  const [isDomainDropdownOpen, setIsDomainDropdownOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState('amazon.com');
  const domainDropdownRef = useRef<HTMLDivElement>(null);

  const domainOptions = [
    { label: 'amazon.com', flag: '/icons/us-flag.svg' },
    { label: 'walmart.com', flag: '/icons/us-flag.svg' },
    { label: 'bestbuy.com', flag: '/icons/us-flag.svg' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (domainDropdownRef.current && !domainDropdownRef.current.contains(event.target as Node)) {
        setIsDomainDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDomainSelect = (option: string) => {
    setSelectedDomain(option);
    setIsDomainDropdownOpen(false);
  };

  return (
    <div className="shi-header">
      <div className="header-container">
        {/* Left side - Title + domain dropdown */}
        <div className="header-left" style={{ gap: 16, display: 'flex', alignItems: 'center' }}>
          <div className="brand-share-title">Brand Share Reports Overview</div>
          <div
            className="dropdown-container"
            ref={domainDropdownRef}
            onClick={() => setIsDomainDropdownOpen(!isDomainDropdownOpen)}
          >
            <div className="dropdown-header">
              <span className="dropdown-text" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <img src="/icons/us-flag.svg" alt="US" style={{ width: 16, height: 16 }} />
                {selectedDomain}
              </span>
              <div className={`dropdown-icon ${isDomainDropdownOpen ? 'rotated' : ''}`}>
                <img src="/icons/chevron-down.svg" alt="Expand" />
              </div>
            </div>
            {isDomainDropdownOpen && (
              <div className="dropdown-menu">
                {domainOptions.map((opt) => (
                  <div
                    key={opt.label}
                    className={`dropdown-item ${opt.label === selectedDomain ? 'selected' : ''}`}
                    onClick={() => handleDomainSelect(opt.label)}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <img src={opt.flag} alt="flag" style={{ width: 16, height: 16 }} />
                      {opt.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right side - Create button */}
        <div className="header-right">
          <button
            className="px-4 py-2 text-sm flex items-center gap-2 rounded-[18px] text-white bg-[#195afe] hover:bg-[#195afe]"
            onClick={onCreateNew}
          >
            <img src="/figma-assets/469213f20b34f60691ed81fa0082aa5c4fa6599b.svg" alt="" className="w-4 h-4" />
            Create a New Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsSelectionHeader;


