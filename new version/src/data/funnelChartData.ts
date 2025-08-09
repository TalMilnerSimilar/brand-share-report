import { generateTimeSeriesData } from './masterData';

export const funnelChartData = {
  brandedSearchVolume: generateTimeSeriesData('brandedSearchShare', 210500),
  searchVisibility: generateTimeSeriesData('searchVisibilityShare', 180700),
  shareOfPaidClicks: generateTimeSeriesData('paidClicksShare', 95200),
  shareOfTotalClicks: generateTimeSeriesData('totalClicksShare', 350100),
};
