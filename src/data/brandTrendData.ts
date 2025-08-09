import { rawData } from './brandData';
import {
  timeSeriesByMetric,
  metricLabelMap,
  brands as allBrands,
} from './unifiedBrandData';

const metricLabels = {
  productViews: metricLabelMap.productViews,
  unitsSold: metricLabelMap.unitsSold,
  revenue: metricLabelMap.revenue,
  brandedSearchVolume: metricLabelMap.brandedSearchVolume,
  searchVisibility: metricLabelMap.searchVisibility,
  shareOfPaidClicks: metricLabelMap.shareOfPaidClicks,
  shareOfTotalClicks: metricLabelMap.shareOfTotalClicks,
};

const transformDataForBrand = (brandName: string) => {
  // Get the actual month names from the unified module (use product views as canonical)
  const firstMetricData = timeSeriesByMetric.productViews;
  const monthNames = firstMetricData.map((item: any) => item.name);
  
  return monthNames.map((monthName, index) => {
    const dataPoint: { [key: string]: any } = { name: monthName };
    for (const metricKey in timeSeriesByMetric) {
      const metricData = timeSeriesByMetric[metricKey as keyof typeof timeSeriesByMetric];
      if (metricData && metricData[index]) {
        const brandValue = metricData[index][brandName as keyof typeof metricData[0]];
        dataPoint[metricLabels[metricKey as keyof typeof metricLabels]] = brandValue;
      }
    }
    return dataPoint;
  });
};

export const brandTrendData: Record<string, any[]> = allBrands.reduce((acc, brandName) => {
  acc[brandName] = transformDataForBrand(brandName);
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