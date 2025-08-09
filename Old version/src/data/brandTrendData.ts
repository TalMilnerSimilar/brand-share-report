import { rawData } from './brandData';
import { masterBrandData } from './masterData';

const metricLabels = {
  productViews: 'Product Views',
  unitsSold: 'Units Sold',
  revenue: 'Revenue',
  brandedSearchVolume: 'Branded Search Volume',
  searchVisibility: 'Search Visibility',
  shareOfPaidClicks: 'Share of Paid Clicks',
  shareOfTotalClicks: 'Share of Total Clicks',
};

const generateBrandSpecificTrend = (brandName: string, metricKey: string, monthIndex: number, totalMonths: number, baseShare: number) => {
  const monthProgress = monthIndex / (totalMonths - 1);
  const brandData = masterBrandData.find(b => b.brand === brandName);
  if (!brandData) return baseShare;

  let trendValue = baseShare;
  switch (brandName) {
    case 'Nike':
      switch (metricKey) {
        case 'productViews':
          trendValue = baseShare * (1.1 - 0.25 * monthProgress + 0.08 * Math.sin(monthProgress * 3 * Math.PI));
          break;
        case 'unitsSold':
          trendValue = baseShare * (0.9 + 0.3 * monthProgress + 0.1 * Math.sin(monthProgress * 2 * Math.PI));
          break;
        case 'revenue':
          trendValue = baseShare * (0.85 + 0.4 * monthProgress + 0.12 * Math.sin(monthProgress * 2 * Math.PI + 0.5));
          break;
        case 'brandedSearchVolume':
          trendValue = baseShare * (1.05 - 0.15 * monthProgress + 0.06 * Math.cos(monthProgress * 4 * Math.PI));
          break;
        case 'searchVisibility':
          trendValue = baseShare * (1.2 - 0.4 * monthProgress + 0.05 * Math.sin(monthProgress * 3 * Math.PI));
          break;
        case 'shareOfPaidClicks':
          trendValue = baseShare * (0.6 + 0.8 * monthProgress + 0.15 * Math.sin(monthProgress * 2 * Math.PI + 1));
          break;
        case 'shareOfTotalClicks':
          trendValue = baseShare * (0.95 + 0.2 * monthProgress + 0.08 * Math.cos(monthProgress * 3 * Math.PI));
          break;
      }
      break;
    case 'Adidas':
      switch (metricKey) {
        case 'productViews':
          trendValue = baseShare * (0.95 + 0.15 * monthProgress + 0.05 * Math.sin(monthProgress * 4 * Math.PI));
          break;
        case 'unitsSold':
          trendValue = baseShare * (0.98 + 0.08 * monthProgress + 0.04 * Math.cos(monthProgress * 3 * Math.PI));
          break;
        case 'revenue':
          trendValue = baseShare * (0.92 + 0.18 * monthProgress + 0.06 * Math.sin(monthProgress * 2 * Math.PI));
          break;
        case 'shareOfPaidClicks':
          trendValue = baseShare * (0.9 + 0.25 * monthProgress + 0.08 * Math.sin(monthProgress * 3 * Math.PI));
          break;
        default:
          trendValue = baseShare * (0.95 + 0.1 * monthProgress + 0.05 * Math.sin(monthProgress * 4 * Math.PI));
      }
      break;
    case 'New Balance':
      switch (metricKey) {
        case 'productViews':
          trendValue = baseShare * (0.8 + 0.5 * monthProgress + 0.12 * Math.sin(monthProgress * 5 * Math.PI));
          break;
        case 'unitsSold':
          trendValue = baseShare * (0.75 + 0.6 * monthProgress + 0.15 * Math.sin(monthProgress * 4 * Math.PI + 1));
          break;
        case 'revenue':
          trendValue = baseShare * (0.7 + 0.7 * monthProgress + 0.18 * Math.sin(monthProgress * 3 * Math.PI));
          break;
        default:
          trendValue = baseShare * (0.8 + 0.45 * monthProgress + 0.1 * Math.sin(monthProgress * 6 * Math.PI));
      }
      break;
    case 'Hoka':
      switch (metricKey) {
      case 'productViews':
        trendValue = baseShare * (0.7 + 0.8 * monthProgress + 0.2 * Math.sin(monthProgress * 6 * Math.PI));
        break;
      case 'unitsSold':
        trendValue = baseShare * (0.6 + 0.9 * monthProgress + 0.25 * Math.sin(monthProgress * 5 * Math.PI + 2));
        break;
      case 'revenue':
        trendValue = baseShare * (0.65 + 0.85 * monthProgress + 0.22 * Math.sin(monthProgress * 4 * Math.PI));
        break;
      default:
        trendValue = baseShare * (0.7 + 0.75 * monthProgress + 0.18 * Math.sin(monthProgress * 7 * Math.PI));
      }
      break;
    default:
      const brandSeed = brandName.length + brandName.charCodeAt(0);
      const volatility = 0.15 + (brandSeed % 10) * 0.02;
      trendValue = baseShare * (0.85 + 0.3 * monthProgress + volatility * Math.sin(monthProgress * 8 * Math.PI + brandSeed));
  }

  return Math.max(0.1, Math.min(trendValue, baseShare * 2));
};

const transformDataForBrand = (brandName: string) => {
  const months = [
    'Jan 20', 'Feb 20', 'Mar 20', 'Apr 20', 'May 20', 'Jun 20',
    'Jul 20', 'Aug 20', 'Sep 20', 'Oct 20', 'Nov 20', 'Dec 20'
  ];

  const brandData = masterBrandData.find(b => b.brand === brandName);
  if (!brandData) return [];

  return months.map((monthName, index) => {
    const dataPoint: { [key: string]: any } = { name: monthName };
    const metricMapping = {
      'productViews': brandData.productViewsShare,
      'unitsSold': brandData.unitsSoldShare,
      'revenue': brandData.revenueShare,
      'brandedSearchVolume': brandData.brandedSearchShare,
      'searchVisibility': brandData.searchVisibilityShare,
      'shareOfPaidClicks': brandData.paidClicksShare,
      'shareOfTotalClicks': brandData.totalClicksShare,
    };

    for (const [metricKey, baseShare] of Object.entries(metricMapping)) {
      const trendValue = generateBrandSpecificTrend(brandName, metricKey, index, months.length, baseShare);
      dataPoint[metricLabels[metricKey as keyof typeof metricLabels]] = Number(trendValue.toFixed(2));
    }

    return dataPoint;
  });
};

export const brandTrendData: Record<string, any[]> = rawData.reduce((acc, brand) => {
  acc[brand.brand] = transformDataForBrand(brand.brand);
  return acc;
}, {} as Record<string, any[]>);


export const metrics = Object.values(metricLabels);

export const metricColors = [
  '#3E74FE',
  '#FF7A1A',
  '#00CA9A',
  '#FFB800',
  '#A020F0',
  '#FF69B4',
  '#008080',
];

export const metricColorMap = metrics.reduce((acc, metric, index) => {
  acc[metric] = metricColors[index % metricColors.length];
  return acc;
}, {} as Record<string, string>);