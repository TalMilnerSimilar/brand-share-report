import { masterBrandData, categoryTotals } from './masterData';

export interface RowData {
  brand: string;
  totalRevenue: string;
  unitsSold: string;
  productViews: string;
  share: string;
  change: string;
  isPositive: boolean;
  isHighlighted: boolean;
  // Funnel analysis fields
  brandedSearchVolume?: string;
  searchVisibility?: string;
  shareOfPaidClicks?: string;
  shareOfTotalClicks?: string;
}

export const competitorBrands = ['Adidas', 'New Balance', 'Hoka', 'Asics'];

// Convert master data to the format expected by the UI
export const rawData: RowData[] = masterBrandData.map(brand => ({
  brand: brand.brand,
  totalRevenue: formatCurrency(brand.revenueShare, categoryTotals.revenue),
  unitsSold: formatNumber(brand.unitsSoldShare, categoryTotals.unitsSold),
  productViews: formatNumber(brand.productViewsShare, categoryTotals.productViews),
  share: `${brand.productViewsShare.toFixed(1)}%`, // Default to product views share
  change: brand.change,
  isPositive: brand.isPositive,
  isHighlighted: brand.isHighlighted,
}));

// Helper functions to format values
function formatCurrency(sharePercent: number, total: number): string {
  const value = (sharePercent / 100) * total;
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}K`;
  }
  return `$${Math.round(value)}`;
}

function formatNumber(sharePercent: number, total: number): string {
  const value = (sharePercent / 100) * total;
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return `${Math.round(value)}`;
}
