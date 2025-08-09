import { generateTimeSeriesData } from './masterData';

// Generate time series data from master dataset
export const productViewsData = generateTimeSeriesData('productViewsShare', 394900);
export const unitsSoldData = generateTimeSeriesData('unitsSoldShare', 77800);
export const revenueData = generateTimeSeriesData('revenueShare', 23400);

export const chartData = {
  productViews: productViewsData,
  unitsSold: unitsSoldData,
  revenue: revenueData,
};
