import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import unifiedBrands from '../data/unifiedBrands';
import Button from '../components/Button';
import Tooltip from '../components/Tooltip';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import Toast from '../components/Toast';

type SavedReport = {
  id: string;
  brand: string;
  category: string;
  priceRange?: string;
  competitors: string[];
};

const mockReports: SavedReport[] = [
  {
    id: 'nike-shoes',
    brand: 'Nike',
    category: 'Premium Running Shoes (Price > $75)',
    competitors: ['Adidas', 'New Balance', 'Hoka', 'Asics'],
  },
  {
    id: 'adidas-apparel',
    brand: 'Adidas',
    category: 'All Athletic Apparel',
    competitors: ['Nike', 'Under Armour', 'Puma', 'Hanes'],
  },
];

// Map each report id to the top hero image used on its report page
const heroTopImageByReportId: Record<string, string> = {
  'nike-shoes': '/icons/images/shoe-3.png',
  'adidas-apparel': '/icons/images/shoe-2.png',
};

const getHeroTopImageForReport = (reportId: string): string => {
  return heroTopImageByReportId[reportId] ?? '/icons/images/shoe-3.png';
};

type SortKey = 'reportName' | 'brandedClicksValue' | 'brandedClicksChange' | 'productViewsValue' | 'productViewsChange' | 'paidClicksValue' | 'paidClicksChange' | 'revenueValue' | 'revenueChange';

const parseNumber = (val: string | number): number => {
  if (typeof val === 'number') return val;
  if (typeof val !== 'string') return 0;
  const cleanVal = val.replace(/[$%+\s]/g, '');
  if (cleanVal.includes('M')) return parseFloat(cleanVal) * 1000000;
  if (cleanVal.includes('K')) return parseFloat(cleanVal) * 1000;
  if (cleanVal.includes('PP')) return parseFloat(cleanVal);
  return parseFloat(cleanVal) || 0;
};

const ReportsHome: React.FC = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<SavedReport[]>(mockReports);
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [openMenuRow, setOpenMenuRow] = useState<number | null>(null);
  const [menuPosition, setMenuPosition] = useState<{top: number, left: number} | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [deletedReport, setDeletedReport] = useState<SavedReport | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Enhanced data with sortable values
  const enhancedReports = useMemo(() => {
    return reports.map(report => {
      const brandData = (unifiedBrands as any)[report.brand];
      
      const brandedClicks = brandData?.shareOfTotalClicks; // "Share of Branded Clicks" maps to shareOfTotalClicks
      const productViews = brandData?.productViews;
      const paidClicks = brandData?.shareOfPaidClicks; // "Share of Paid Clicks" maps to shareOfPaidClicks
      const revenue = brandData?.revenue;
      
      return {
        ...report,
        brandedClicksValue: brandedClicks?.share * 100 || 0,
        brandedClicksChange: brandedClicks?.change * 100 || 0,
        productViewsValue: productViews?.share * 100 || 0,
        productViewsChange: productViews?.change * 100 || 0,
        paidClicksValue: paidClicks?.share * 100 || 0,
        paidClicksChange: paidClicks?.change * 100 || 0,
        revenueValue: revenue?.share * 100 || 0,
        revenueChange: revenue?.change * 100 || 0,
        brandedClicks,
        productViews,
        paidClicks,
        revenue
      };
    });
  }, [reports]);

  // Sorted data
  const sortedReports = useMemo(() => {
    if (!sortKey) return enhancedReports;
    
    return [...enhancedReports].sort((a, b) => {
      let aVal: any;
      let bVal: any;
      
      if (sortKey === 'reportName') {
        aVal = a.brand;
        bVal = b.brand;
        const result = aVal.localeCompare(bVal);
        return sortAsc ? result : -result;
      } else {
        aVal = (a as any)[sortKey];
        bVal = (b as any)[sortKey];
        const result = aVal - bVal;
        return sortAsc ? result : -result;
      }
    });
  }, [enhancedReports, sortKey, sortAsc]);



  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click target is within the dropdown menu
      const target = event.target as Node;
      const dropdownElement = document.querySelector(`[data-dropdown-menu="${openMenuRow}"]`);
      
      if (dropdownElement && dropdownElement.contains(target)) {
        return; // Don't close if clicking inside the dropdown
      }
      
      if (menuRef.current && !menuRef.current.contains(target)) {
        setOpenMenuRow(null);
        setMenuPosition(null);
      }
    };

    if (openMenuRow !== null) {
      // Use a slight delay to avoid conflicts with button clicks
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 10);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuRow]);



  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };



  const toggleMenu = (rowIndex: number, buttonElement?: HTMLButtonElement) => {
    if (openMenuRow === rowIndex) {
      setOpenMenuRow(null);
      setMenuPosition(null);
    } else {
      setOpenMenuRow(rowIndex);
      
      // Calculate position immediately using the button element
      if (buttonElement) {
        const rect = buttonElement.getBoundingClientRect();
        setMenuPosition({
          top: rect.bottom + 4,
          left: rect.right - 128
        });
      }
    }
  };

  const handleEdit = (reportId: string) => {
    console.log('Edit report:', reportId);
    setOpenMenuRow(null);
    setMenuPosition(null);
    // TODO: Navigate to edit page or open edit modal
  };

  const handleDelete = (reportId: string) => {
    console.log('handleDelete called with reportId:', reportId);
    setReportToDelete(reportId);
    setDeleteModalOpen(true);
    setOpenMenuRow(null);
    setMenuPosition(null);
  };

  const confirmDelete = () => {
    if (reportToDelete) {
      console.log('Confirmed delete report:', reportToDelete);
      
      // Find the report to delete for undo functionality
      const reportToDeleteObj = reports.find(report => report.id === reportToDelete);
      if (reportToDeleteObj) {
        setDeletedReport(reportToDeleteObj);
      }
      
      // Remove the report from the reports array
      setReports(prevReports => prevReports.filter(report => report.id !== reportToDelete));
      setDeleteModalOpen(false);
      setReportToDelete(null);
      
      // Show toast
      setToastVisible(true);
    }
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setReportToDelete(null);
  };

  const handleUndo = () => {
    if (deletedReport) {
      // Add the report back to the reports array
      setReports(prevReports => [...prevReports, deletedReport]);
      setToastVisible(false);
      setDeletedReport(null);
    }
  };

  const handleToastClose = () => {
    setToastVisible(false);
    setDeletedReport(null);
  };

  return (
    <div className="p-6" style={{ paddingLeft: '64px', paddingRight: '64px' }}>
      {/* Hero Section (Figma-spec) */}
      <div className="mb-6">
        {/* Top header row with domain dropdown (selection screen only) */}
        <div
          className="border border-gray-200 rounded-t-[6px] px-6 py-2"
          style={{
            background:
              'linear-gradient(250deg, rgba(165, 31, 227, 0.15) 9.5%, rgba(25, 90, 254, 0.15) 26%, rgba(255, 255, 255, 0.15) 52%), #ffffff',
          }}
        >
          <div className="flex items-center justify-between overflow-clip w-full">
            <div className="py-4">
              <div className="mb-2">
                <h1 className="text-[20px] leading-[28px] font-bold text-[#092540]">
                  Select a report to analyze or create a new one
                </h1>
              </div>
              <p className="text-[14px] leading-4 text-[#6b7c8c]">
                Choose an existing report from the list below or click “Create a New Report” to set up brand, category, and competitors
              </p>
            </div>
            <div>
              <Button
                variant="primary"
                className="px-4 py-2 text-[14px] leading-5 flex items-center gap-2"
                onClick={() => navigate('/reports/new')}
              >
                <img
                  src="/figma-assets/469213f20b34f60691ed81fa0082aa5c4fa6599b.svg"
                  alt=""
                  className="w-4 h-4"
                />
                Create a New Report
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom KPI row */}
        <div className="bg-white border border-gray-200 border-t-0 rounded-b-[8px] px-6 py-2">
          <div className="flex items-center justify-between">
            <div className="flex-1 flex items-center justify-center gap-2">
              <img src="/icons/reports icon.svg" alt="Reports Icon" className="w-4 h-4" />
              <span className="text-[14px] leading-5 text-[#092540]">Total Reports:</span>
              <span className="text-[14px] leading-5 text-[#6b7c8c]">{reports.length}</span>
            </div>
            <div className="w-5 self-stretch flex items-center justify-center">
              <div className="w-[1px] h-full bg-[#e6e9ec]" />
            </div>
            <div className="flex-1 flex items-center justify-center gap-2">
              <img src="/icons/brands icon.svg" alt="Brands Icon" className="w-4 h-4" />
              <span className="text-[14px] leading-5 text-[#092540]">Brands Tracked:</span>
              <span className="text-[14px] leading-5 text-[#6b7c8c]">{new Set(reports.map(r => r.brand)).size}</span>
            </div>
            <div className="w-5 self-stretch flex items-center justify-center">
              <div className="w-[1px] h-full bg-[#e6e9ec]" />
            </div>
            <div className="flex-1 flex items-center justify-center gap-2">
              <img src="/icons/categories icon.svg" alt="Categories Icon" className="w-4 h-4" />
              <span className="text-[14px] leading-5 text-[#092540]">Categories:</span>
              <span className="text-[14px] leading-5 text-[#6b7c8c]">{new Set(reports.map(r => r.category.split(' ')[0])).size}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white border border-gray-200 rounded-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-medium text-gray-900">All Reports</h2>
            <img src="/icons/info-icon.svg" alt="Info" className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="overflow-x-auto relative">
          <table className="w-full">
                         <thead>
               <tr className="border-b border-[#e6e9ec] font-medium text-[#3a5166] h-8">
                 <th rowSpan={2} className="text-left px-4 py-0 border-r border-[#e6e9ec] align-middle cursor-pointer" onClick={() => handleSort('reportName')}>
                   <div className="flex items-center gap-1">
                     <span className="text-[12px] leading-[16px]">Report Name</span>
                     {sortKey === 'reportName' && (
                       <img
                         src={sortAsc ? '/icons/chevron-up.svg' : '/icons/chevron-down.svg'}
                         className="w-3 h-3 text-[#4D87F7]"
                         alt="sort"
                       />
                     )}
                   </div>
                 </th>
                 <th colSpan={2} className="text-center px-4 py-0 border-r border-[#e6e9ec] h-8">
                   <span className="text-[12px] leading-[16px]">Share of Branded Clicks</span>
                 </th>
                 <th colSpan={2} className="text-center px-4 py-0 border-r border-[#e6e9ec] h-8">
                   <span className="text-[12px] leading-[16px]">Share of Product Views</span>
                 </th>
                 <th colSpan={2} className="text-center px-4 py-0 border-r border-[#e6e9ec] h-8">
                   <span className="text-[12px] leading-[16px]">Share of Paid Clicks</span>
                 </th>
                 <th colSpan={2} className="text-center px-4 py-0 border-r border-[#e6e9ec] h-8">
                   <span className="text-[12px] leading-[16px]">Share of Revenue</span>
                 </th>
                 <th rowSpan={2} className="text-left px-4 py-0 align-middle">
                   <span className="text-[12px] leading-[16px]">Actions</span>
                 </th>
               </tr>
               <tr className="border-b border-[#e6e9ec] font-medium text-[#3a5166] h-8">
                 <th className="text-right px-4 py-0 cursor-pointer" onClick={() => handleSort('brandedClicksValue')}>
                   <div className="flex items-center justify-end gap-1">
                     <span className="text-[12px] leading-[16px]">Value</span>
                     {sortKey === 'brandedClicksValue' && (
                       <img src={sortAsc ? '/icons/chevron-up.svg' : '/icons/chevron-down.svg'} className="w-3 h-3" alt="sort" />
                     )}
                   </div>
                 </th>
                 <th className="text-left px-4 py-0 border-r border-[#e6e9ec] cursor-pointer" onClick={() => handleSort('brandedClicksChange')}>
                   <div className="flex items-center gap-1">
                     <span className="text-[12px] leading-[16px]">Wow Change</span>
                     {sortKey === 'brandedClicksChange' && (
                       <img src={sortAsc ? '/icons/chevron-up.svg' : '/icons/chevron-down.svg'} className="w-3 h-3" alt="sort" />
                     )}
                   </div>
                 </th>
                 <th className="text-right px-4 py-0 cursor-pointer" onClick={() => handleSort('productViewsValue')}>
                   <div className="flex items-center justify-end gap-1">
                     <span className="text-[12px] leading-[16px]">Value</span>
                     {sortKey === 'productViewsValue' && (
                       <img src={sortAsc ? '/icons/chevron-up.svg' : '/icons/chevron-down.svg'} className="w-3 h-3" alt="sort" />
                     )}
                   </div>
                 </th>
                 <th className="text-left px-4 py-0 border-r border-[#e6e9ec] cursor-pointer" onClick={() => handleSort('productViewsChange')}>
                   <div className="flex items-center gap-1">
                     <span className="text-[12px] leading-[16px]">Wow Change</span>
                     {sortKey === 'productViewsChange' && (
                       <img src={sortAsc ? '/icons/chevron-up.svg' : '/icons/chevron-down.svg'} className="w-3 h-3" alt="sort" />
                     )}
                   </div>
                 </th>
                 <th className="text-right px-4 py-0 cursor-pointer" onClick={() => handleSort('paidClicksValue')}>
                   <div className="flex items-center justify-end gap-1">
                     <span className="text-[12px] leading-[16px]">Value</span>
                     {sortKey === 'paidClicksValue' && (
                       <img src={sortAsc ? '/icons/chevron-up.svg' : '/icons/chevron-down.svg'} className="w-3 h-3" alt="sort" />
                     )}
                   </div>
                 </th>
                 <th className="text-left px-4 py-0 border-r border-[#e6e9ec] cursor-pointer" onClick={() => handleSort('paidClicksChange')}>
                   <div className="flex items-center gap-1">
                     <span className="text-[12px] leading-[16px]">Wow Change</span>
                     {sortKey === 'paidClicksChange' && (
                       <img src={sortAsc ? '/icons/chevron-up.svg' : '/icons/chevron-down.svg'} className="w-3 h-3" alt="sort" />
                     )}
                   </div>
                 </th>
                 <th className="text-right px-4 py-0 cursor-pointer" onClick={() => handleSort('revenueValue')}>
                   <div className="flex items-center justify-end gap-1">
                     <span className="text-[12px] leading-[16px]">Value</span>
                     {sortKey === 'revenueValue' && (
                       <img src={sortAsc ? '/icons/chevron-up.svg' : '/icons/chevron-down.svg'} className="w-3 h-3" alt="sort" />
                     )}
                   </div>
                 </th>
                 <th className="text-left px-4 py-0 border-r border-[#e6e9ec] cursor-pointer" onClick={() => handleSort('revenueChange')}>
                   <div className="flex items-center gap-1">
                     <span className="text-[12px] leading-[16px]">Wow Change</span>
                     {sortKey === 'revenueChange' && (
                       <img src={sortAsc ? '/icons/chevron-up.svg' : '/icons/chevron-down.svg'} className="w-3 h-3" alt="sort" />
                     )}
                   </div>
                 </th>
               </tr>
             </thead>
            <tbody>
              {sortedReports.map((report, idx) => {
                return (
                  <tr 
                    key={report.id} 
                    className={`border-b border-gray-200 transition-colors duration-150 ${hoveredRow === idx ? 'bg-blue-50' : ''}`}
                    onMouseEnter={() => setHoveredRow(idx)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="px-4 py-3 border-r border-[#e6e9ec]">
                      <div className="flex items-center gap-4">
                        {/* Product image (uses the top hero image for this report) */}
                        <div className="w-12 h-12 bg-white rounded-md border border-[#e6e9ec] flex items-center justify-center shrink-0">
                          <img
                            src={getHeroTopImageForReport(report.id)}
                            alt={`${report.brand} product`}
                            className="w-10 h-10 object-contain"
                          />
                        </div>
                        
                        {/* Text content */}
                        <div className="flex flex-col gap-0.5">
                          {/* Brand name row */}
                          <div className="flex items-start gap-0.5">
                            <span className="font-bold text-[14px] leading-[20px] text-[#092540] font-dm-sans">
                              {report.brand}
                              {/* No need for a 'My Brand' pill: in each report the header brand is the user's brand */}
                            </span>
                          </div>
                          
                          {/* Category row */}
                          <div className="flex items-start gap-0.5 text-[14px] leading-[20px] text-[#092540] font-dm-sans">
                            <span className="font-normal">{report.category}</span>
                          </div>
                          
                          {/* Competitors count */}
                          <Tooltip content={`Competitors: ${report.competitors.join(', ')}`}>
                            <div className="text-[12px] leading-[16px] text-[#b6bec6] font-dm-sans cursor-pointer">
                              {report.competitors.length} competitors
                            </div>
                          </Tooltip>
                        </div>
                      </div>
                    </td>
                    
                                        {/* Branded Clicks - Value & Wow Change */}
                     <td className="p-4 text-sm text-gray-600 text-right">
                       {report.brandedClicks ? `${(report.brandedClicks.share * 100).toFixed(1)}%` : '-'}
                     </td>
                     <td className="p-4 border-r border-[#e6e9ec]">
                       {report.brandedClicks && (
                         <div
                           className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[26px] text-[10px] font-bold tracking-[0.3px] leading-[12px] ${
                             report.brandedClicks.change >= 0 ? 'bg-[#e6faf5] text-[#009688]' : 'bg-[#ffe6e6] text-[#bb3f3f]'
                           }`}
                         >
                           {report.brandedClicks.change >= 0 ? '+' : ''}{(report.brandedClicks.change * 100).toFixed(1)} PP
                         </div>
                       )}
                     </td>

                     {/* Product Views - Value & Wow Change */}
                     <td className="p-4 text-sm text-gray-600 text-right">
                       {report.productViews ? `${(report.productViews.share * 100).toFixed(1)}%` : '-'}
                     </td>
                     <td className="p-4 border-r border-[#e6e9ec]">
                       {report.productViews && (
                         <div
                           className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[26px] text-[10px] font-bold tracking-[0.3px] leading-[12px] ${
                             report.productViews.change >= 0 ? 'bg-[#e6faf5] text-[#009688]' : 'bg-[#ffe6e6] text-[#bb3f3f]'
                           }`}
                         >
                           {report.productViews.change >= 0 ? '+' : ''}{(report.productViews.change * 100).toFixed(1)} PP
                         </div>
                       )}
                     </td>

                     {/* Paid Clicks - Value & Wow Change */}
                     <td className="p-4 text-sm text-gray-600 text-right">
                       {report.paidClicks ? `${(report.paidClicks.share * 100).toFixed(1)}%` : '-'}
                     </td>
                     <td className="p-4 border-r border-[#e6e9ec]">
                       {report.paidClicks && (
                         <div
                           className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[26px] text-[10px] font-bold tracking-[0.3px] leading-[12px] ${
                             report.paidClicks.change >= 0 ? 'bg-[#e6faf5] text-[#009688]' : 'bg-[#ffe6e6] text-[#bb3f3f]'
                           }`}
                         >
                           {report.paidClicks.change >= 0 ? '+' : ''}{(report.paidClicks.change * 100).toFixed(1)} PP
                         </div>
                       )}
                     </td>

                     {/* Revenue - Value & Wow Change */}
                     <td className="p-4 text-sm text-gray-600 text-right">
                       {report.revenue ? `${(report.revenue.share * 100).toFixed(1)}%` : '-'}
                     </td>
                     <td className="p-4 border-r border-[#e6e9ec]">
                       {report.revenue && (
                         <div
                           className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[26px] text-[10px] font-bold tracking-[0.3px] leading-[12px] ${
                             report.revenue.change >= 0 ? 'bg-[#e6faf5] text-[#009688]' : 'bg-[#ffe6e6] text-[#bb3f3f]'
                           }`}
                         >
                           {report.revenue.change >= 0 ? '+' : ''}{(report.revenue.change * 100).toFixed(1)} PP
                         </div>
                       )}
                     </td>

                    <td className="p-4 w-0">
                      <div className="flex items-center gap-2">
                        <Button
                          variant={hoveredRow === idx ? 'primary' : 'ghost'}
                          onClick={() => navigate(`/reports/${report.id}`)}
                        >
                          Analyze
                        </Button>
                        
                        {/* Three-dot menu button */}
                        <div className="relative" ref={openMenuRow === idx ? menuRef : null}>
                          <button
                            className="w-8 h-8 text-xs font-medium font-dm-sans leading-4 rounded-[18px] transition-all duration-150 text-primary-blue bg-white shadow-[0_0_0_1px_#E6E9EC_inset] hover:shadow-[0_0_0_1px_#195AFE_inset] hover:bg-primary-blue-light-hover active:shadow-[0_0_0_1px_#195AFE_inset] active:bg-primary-blue-light-active flex items-center justify-center"
                            onClick={(e) => toggleMenu(idx, e.currentTarget)}
                          >
                            <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="2" cy="2" r="2" fill="currentColor"/>
                              <circle cx="2" cy="8" r="2" fill="currentColor"/>
                              <circle cx="2" cy="14" r="2" fill="currentColor"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Dropdown menu - positioned outside table */}
        {openMenuRow !== null && menuPosition && (
          <div 
            className="fixed bg-white border border-gray-200 rounded-md shadow-lg z-[9999] w-32"
            data-dropdown-menu={openMenuRow}
            style={{
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`
            }}
          >
            <div className="py-1">
              <button
                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                onClick={() => handleEdit(sortedReports[openMenuRow].id)}
              >
                Edit
              </button>
              <button
                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                onClick={() => {
                  console.log('Delete button clicked, openMenuRow:', openMenuRow);
                  if (openMenuRow !== null && sortedReports[openMenuRow]) {
                    handleDelete(sortedReports[openMenuRow].id);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={deleteModalOpen}
          onClose={cancelDelete}
          onConfirm={confirmDelete}
          reportName={reportToDelete ? sortedReports.find(r => r.id === reportToDelete)?.brand : undefined}
        />

        {/* Toast */}
        <Toast
          isVisible={toastVisible}
          message="Report deleted successfully"
          onUndo={handleUndo}
          onClose={handleToastClose}
        />

      </div>
    </div>
  );
};

export default ReportsHome;


