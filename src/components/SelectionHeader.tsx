import React, { useEffect, useRef, useState } from 'react';
import './BrandHeader.css';

const SelectionHeader: React.FC = () => {
  const [isDomainDropdownOpen, setIsDomainDropdownOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState('amazon.com');
  const domainDropdownRef = useRef<HTMLDivElement>(null);

  const domainOptions = [
    { label: 'amazon.com', flag: '/icons/us-flag.svg' }, // US
    { label: 'amazon.co.uk', flag: '/icons/us-flag.svg' }, // UK (placeholder flag)
    { label: 'amazon.de', flag: '/icons/us-flag.svg' }, // DE (placeholder flag)
    { label: 'amazon.fr', flag: '/icons/us-flag.svg' }, // FR (placeholder flag)
    { label: 'amazon.it', flag: '/icons/us-flag.svg' }, // IT (placeholder flag)
    { label: 'amazon.es', flag: '/icons/us-flag.svg' }, // ES (placeholder flag)
    { label: 'amazon.ca', flag: '/icons/us-flag.svg' }, // CA (placeholder flag)
    { label: 'amazon.com.mx', flag: '/icons/us-flag.svg' }, // MX (placeholder flag)
    { label: 'amazon.co.jp', flag: '/icons/us-flag.svg' }, // JP (placeholder flag)
    { label: 'amazon.com.au', flag: '/icons/us-flag.svg' }, // AU (placeholder flag)
    { label: 'amazon.in', flag: '/icons/us-flag.svg' }, // IN (placeholder flag)
  ];

  const handleDomainSelect = (value: string) => {
    setSelectedDomain(value);
    setIsDomainDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (domainDropdownRef.current && !domainDropdownRef.current.contains(event.target as Node)) {
        setIsDomainDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="shi-header">
      <div className="header-container">
        {/* Left side - Title only */}
        <div className="header-left" style={{ gap: 16, display: 'flex', alignItems: 'center' }}>
          <div className="brand-share-title">Brand Share Reports Overview</div>
        </div>

        {/* Right side - Domain dropdown positioned like other filters */}
        <div className="header-right">
          <div className="filters-container">
            <div className="filter-group">
              <span className="filter-label">Domain</span>
              <div className="dropdown-container" ref={domainDropdownRef}>
                <div className="dropdown-header" onClick={() => setIsDomainDropdownOpen(!isDomainDropdownOpen)}>
                  <span className="dropdown-text" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <img
                      src={(domainOptions.find(o => o.label === selectedDomain) || domainOptions[0]).flag}
                      alt="flag"
                      style={{ width: 16, height: 16 }}
                    />
                    {(domainOptions.find(o => o.label === selectedDomain) || domainOptions[0]).label}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionHeader;


