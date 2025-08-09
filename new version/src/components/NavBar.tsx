import React, { useState, useEffect } from 'react';
import './NavBar.css';

const navItemsData = [
  { id: 'home', icon: '/icons/home-icon.svg', text: 'Home' },
  { id: 'my-assets', icon: '/icons/my-assets-icon.svg', text: 'My Assets', badge: 'New' },
  { 
    id: 'my-analytics', 
    icon: '/icons/analytics-icon.svg', 
    text: 'My Analytics', 
    hasChevron: true,
    isExpanded: true,
    subItems: [
      { id: 'account-analytics', text: 'Account Analytics' },
      { id: 'product-trackers', text: 'Product Trackers' },
      { id: 'brand-share-reports', text: 'Brand Share Reports', isActive: true }
    ]
  },
  { id: 'sales', icon: '/icons/sales-icon.svg', text: 'Sales Performance', hasChevron: true },
  { id: 'search', icon: '/icons/search-icon.svg', text: 'Search Optimization', hasChevron: true },
  { id: 'traffic', icon: '/icons/traffic-icon.svg', text: 'Traffic Sources', hasChevron: true },
  { id: 'consumer', icon: '/icons/consumer-icon.svg', text: 'Consumer Behavior', hasChevron: true },
  { id: 'cross-retail', icon: '/icons/cross-retail-icon.svg', text: 'Cross Retail IQ', badge: 'Beta' },
  { id: 'data-export', icon: '/icons/data-export-icon.svg', text: 'Data Exporter' },
  { id: 'custom-category', icon: '/icons/custom-category-icon.svg', text: 'Custom Category' },
  { id: 'data-iq', icon: '/icons/data-iq-icon.svg', text: 'Data IQ', hasChevron: true },
];

const NavBar: React.FC = () => {
  const [isPinned, setIsPinned] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const storedPinStatus = localStorage.getItem('navbarPinned');
    if (storedPinStatus !== null) {
      setIsPinned(storedPinStatus === 'true');
    }
  }, []);

  const handlePinToggle = () => {
    const newPinState = !isPinned;
    setIsPinned(newPinState);
    localStorage.setItem('navbarPinned', String(newPinState));
  };

  const navBarClass = `nav-bar ${!isPinned ? 'unpinned' : ''} ${!isPinned && isHovered ? 'hover-show' : ''}`;

  return (
    <div
      className={navBarClass}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="nav-logos">
        <div className="header-nav-bar">
          <div className="logo-container">
            <div className="similarweb-logo full-logo">
              <img src="/icons/similarweb logo.svg" alt="Shopper Intelligence by Similarweb" />
            </div>
            <div className="similarweb-logo icon-only">
              <div className="main-icon">
                <img src="/icons/shopper-logo.svg" alt="Shopper Intelligence" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="menu-items">
        <div className="nav-upper">
          {navItemsData.map((item) => (
            <div key={item.id}>
              <div
                className={`nav-item ${item.id === 'my-analytics' ? 'active' : ''}`}
                role="button"
                tabIndex={0}
                aria-label={item.text}
              >
                <div className="nav-content">
                  <div className={`nav-icon ${item.id === 'home' ? 'home-icon' : ''}`}>
                    <img src={item.icon} alt={`${item.text} icon`} />
                  </div>
                  <span className="nav-text">{item.text}</span>
                </div>
                {item.badge && (
                  <div className={`${item.badge === 'New' ? 'new-badge' : 'beta-badge'}`}>
                    {item.badge}
                  </div>
                )}
                {item.hasChevron && (
                  <div className="chevron-icon">
                    <img src="/icons/chevron-down.svg" alt="Expand menu" />
                  </div>
                )}
              </div>
              
              {/* Sub-menu items for My Analytics */}
              {item.id === 'my-analytics' && item.isExpanded && item.subItems && (
                <div className="sub-menu">
                  {item.subItems.map((subItem) => (
                    <div
                      key={subItem.id}
                      className={`sub-menu-item ${subItem.isActive ? 'active' : ''}`}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="sub-menu-content">
                        {subItem.isActive && (
                          <div className="active-indicator"></div>
                        )}
                        <span className="sub-menu-text">{subItem.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="nav-bottom">
          <div
            id="pinButton"
            className={`pin-button ${!isPinned ? 'unpinned' : ''}`}
            onClick={handlePinToggle}
            role="button"
            aria-label={isPinned ? 'Unpin navigation' : 'Pin navigation'}
          >
            <img src="/icons/pin icon.svg" alt="Pin icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar; 