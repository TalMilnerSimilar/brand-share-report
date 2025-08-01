import { rawData } from './brandData';
import { chartData } from './chartData';
import { funnelChartData } from './funnelChartData';

const allMetricsData = {
  ...chartData,
  ...funnelChartData,
};

const metricLabels = {
  productViews: 'Product Views',
  unitsSold: 'Units Sold',
  revenue: 'Revenue',
  brandedSearchVolume: 'Branded Search Volume',
  searchVisibility: 'Search Visibility',
  shareOfPaidClicks: 'Share of Paid Clicks',
  shareOfTotalClicks: 'Share of Total Clicks',
};

const transformDataForBrand = (brandName: string) => {
  // Get the actual month names from the first metric data
  const firstMetricData = Object.values(allMetricsData)[0];
  const monthNames = firstMetricData.map((item: any) => item.name);
  
  return monthNames.map((monthName, index) => {
    const dataPoint: { [key: string]: any } = { name: monthName };
    for (const metricKey in allMetricsData) {
      const metricData = allMetricsData[metricKey as keyof typeof allMetricsData];
      if (metricData && metricData[index]) {
        const brandValue = metricData[index][brandName as keyof typeof metricData[0]];
        dataPoint[metricLabels[metricKey as keyof typeof metricLabels]] = brandValue;
      }
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