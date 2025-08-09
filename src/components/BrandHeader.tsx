import React, { useState, useRef, useEffect } from 'react';
import './BrandHeader.css';

interface BrandHeaderProps {
  selectedDateRange: string;
  setSelectedDateRange: (range: string) => void;
}

const BrandHeader: React.FC<BrandHeaderProps> = ({ selectedDateRange, setSelectedDateRange }) => {
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [isCompareDropdownOpen, setIsCompareDropdownOpen] = useState(false);
  const [selectedCompareTo, setSelectedCompareTo] = useState('Year over Year');
  const [isDomainDropdownOpen, setIsDomainDropdownOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<'amazon.com' | 'walmart.com' | 'bestbuy.com'>('amazon.com');
  const dateDropdownRef = useRef<HTMLDivElement>(null);
  const compareDropdownRef = useRef<HTMLDivElement>(null);
  const domainDropdownRef = useRef<HTMLDivElement>(null);

  const dateRangeOptions = [
    'Dec 2024 - Dec 2024',
    'Nov 2024 - Dec 2024',
    'Oct 2024 - Dec 2024',
    'Last 30 Days',
    'Last 90 Days',
    'Last 6 Months'
  ];

  const compareToOptions = [
    'Year over Year',
    'Previous Period',
    'Same Period Last Year',
    'Custom Range'
  ];

  const domainOptions: Array<{ label: 'amazon.com' | 'walmart.com' | 'bestbuy.com'; flag: string }>
    = [
      { label: 'amazon.com', flag: '/icons/us-flag.svg' },
      { label: 'walmart.com', flag: '/icons/us-flag.svg' },
      { label: 'bestbuy.com', flag: '/icons/us-flag.svg' },
    ];

  const handleDateRangeSelect = (option: string) => {
    setSelectedDateRange(option);
    setIsDateDropdownOpen(false);
  };

  const handleCompareToSelect = (option: string) => {
    setSelectedCompareTo(option);
    setIsCompareDropdownOpen(false);
  };

  const handleDomainSelect = (option: 'amazon.com' | 'walmart.com' | 'bestbuy.com') => {
    setSelectedDomain(option);
    setIsDomainDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dateDropdownRef.current && !dateDropdownRef.current.contains(event.target as Node)) {
        setIsDateDropdownOpen(false);
      }
      if (compareDropdownRef.current && !compareDropdownRef.current.contains(event.target as Node)) {
        setIsCompareDropdownOpen(false);
      }
      if (domainDropdownRef.current && !domainDropdownRef.current.contains(event.target as Node)) {
        setIsDomainDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="shi-header">
      <div className="header-container">
        {/* Left side - Brand share title + domain dropdown per Figma */}
        <div className="header-left" style={{ gap: 16, display: 'flex', alignItems: 'center' }}>
          <div className="brand-share-title">My Brand Share</div>
          <div className="dropdown-container" ref={domainDropdownRef} onClick={() => setIsDomainDropdownOpen(!isDomainDropdownOpen)}>
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

        {/* Right side - Filters */}
        <div className="header-right">
          <div className="filters-container">
            <div className="filter-group">
              <span className="filter-label">For</span>
              <div className="dropdown-container" ref={dateDropdownRef}>
                <div 
                  className="dropdown-header"
                  onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                >
                  <span className="dropdown-text">{selectedDateRange}</span>
                  <div className={`dropdown-icon ${isDateDropdownOpen ? 'rotated' : ''}`}>
                    <img src="/icons/chevron-down.svg" alt="Expand" />
                  </div>
                </div>
                {isDateDropdownOpen && (
                  <div className="dropdown-menu">
                    {dateRangeOptions.map((option) => (
                      <div
                        key={option}
                        className={`dropdown-item ${option === selectedDateRange ? 'selected' : ''}`}
                        onClick={() => handleDateRangeSelect(option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="filter-group">
              <span className="filter-label">Compared to</span>
              <div className="dropdown-container" ref={compareDropdownRef}>
                <div 
                  className="dropdown-header"
                  onClick={() => setIsCompareDropdownOpen(!isCompareDropdownOpen)}
                >
                  <span className="dropdown-text">{selectedCompareTo}</span>
                  <div className={`dropdown-icon ${isCompareDropdownOpen ? 'rotated' : ''}`}>
                    <img src="/icons/chevron-down.svg" alt="Expand" />
                  </div>
                </div>
                {isCompareDropdownOpen && (
                  <div className="dropdown-menu">
                    {compareToOptions.map((option) => (
                      <div
                        key={option}
                        className={`dropdown-item ${option === selectedCompareTo ? 'selected' : ''}`}
                        onClick={() => handleCompareToSelect(option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandHeader; 