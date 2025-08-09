import { masterBrandData, categoryTotals } from './masterData';

// Get Nike's data for consistency
const nikeData = masterBrandData.find(brand => brand.brand === 'Nike')!;

// Helper function to get metric-specific change for Nike
const getNikeChange = (metricKey: string) => {
  if (nikeData.metricChanges) {
    const metricChange = nikeData.metricChanges[metricKey as keyof typeof nikeData.metricChanges];
    if (metricChange) {
      return { change: metricChange.change, isPositive: metricChange.isPositive };
    }
  }
  return { change: nikeData.change, isPositive: nikeData.isPositive };
};

// Helper function to format values
const formatValue = (value: number, isRevenue: boolean = false): string => {
  const prefix = isRevenue ? '$' : '';
  if (value >= 1000000) {
    return `${prefix}${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${prefix}${(value / 1000).toFixed(1)}K`;
  } else {
    return `${prefix}${Math.round(value)}`;
  }
};

export const kpiCardData = {
  brandShare: [
    {
      title: 'Product Views',
      subtitle: 'Customers discovering your products',
      myBrandShare: `${nikeData.productViewsShare.toFixed(1)}%`,
      myBrandShareChange: getNikeChange('productViews').change,
      isPositive: getNikeChange('productViews').isPositive,
      categoryTotal: formatValue(categoryTotals.productViews),
      categoryTotalChange: '+1.2%',
      categoryIsPositive: true,
      compAvg: '13.4%',
      compAvgChange: '+0.2% YoY',
      compAvgIsPositive: true,
    },
    {
      title: 'Units Sold',
      subtitle: 'Total units sold across retailers',
      myBrandShare: `${nikeData.unitsSoldShare.toFixed(1)}%`,
      myBrandShareChange: getNikeChange('unitsSold').change,
      isPositive: getNikeChange('unitsSold').isPositive,
      categoryTotal: formatValue(categoryTotals.unitsSold),
      categoryTotalChange: '+1.2%',
      categoryIsPositive: true,
      compAvg: '13.4%',
      compAvgChange: '+0.2% YoY',
      compAvgIsPositive: true,
    },
    {
      title: 'Revenue',
      subtitle: 'Revenue generated from sales',
      myBrandShare: `${nikeData.revenueShare.toFixed(1)}%`,
      myBrandShareChange: getNikeChange('revenue').change,
      isPositive: getNikeChange('revenue').isPositive,
      categoryTotal: formatValue(categoryTotals.revenue, true),
      categoryTotalChange: '+1.2%',
      categoryIsPositive: true,
      compAvg: '13.4%',
      compAvgChange: '+0.2% YoY',
      compAvgIsPositive: true,
    },
  ],
  funnelAnalysis: [
    {
      title: 'Branded Search Volume',
      subtitle: 'Searches mentioning your brand',
      myBrandShare: `${nikeData.brandedSearchShare.toFixed(1)}%`,
      myBrandShareChange: getNikeChange('brandedSearchVolume').change,
      isPositive: getNikeChange('brandedSearchVolume').isPositive,
      categoryTotal: formatValue(categoryTotals.brandedSearch),
      categoryTotalChange: '+2.1%',
      categoryIsPositive: true,
      compAvg: '16.2%',
      compAvgChange: '+0.8% YoY',
      compAvgIsPositive: true,
    },
    {
      title: 'Search Visibility',
      subtitle: 'Appearances in first two SERPs',
      myBrandShare: `${nikeData.searchVisibilityShare.toFixed(1)}%`,
      myBrandShareChange: getNikeChange('searchVisibility').change,
      isPositive: getNikeChange('searchVisibility').isPositive,
      categoryTotal: formatValue(categoryTotals.searchVisibility),
      categoryTotalChange: '-0.5%',
      categoryIsPositive: false,
      compAvg: '14.4%',
      compAvgChange: '-0.2% YoY',
      compAvgIsPositive: false,
    },
    {
      title: 'Share of Paid Clicks',
      subtitle: 'Your share of sponsored clicks',
      myBrandShare: `${nikeData.paidClicksShare.toFixed(1)}%`,
      myBrandShareChange: getNikeChange('shareOfPaidClicks').change,
      isPositive: getNikeChange('shareOfPaidClicks').isPositive,
      categoryTotal: formatValue(categoryTotals.paidClicks),
      categoryTotalChange: '+3.2%',
      categoryIsPositive: true,
      compAvg: '12.6%',
      compAvgChange: '+1.1% YoY',
      compAvgIsPositive: true,
    },
    {
      title: 'Share of Total Clicks',
      subtitle: 'Your share of all search clicks',
      myBrandShare: `${nikeData.totalClicksShare.toFixed(1)}%`,
      myBrandShareChange: getNikeChange('shareOfTotalClicks').change,
      isPositive: getNikeChange('shareOfTotalClicks').isPositive,
      categoryTotal: formatValue(categoryTotals.totalClicks),
      categoryTotalChange: '+5.5%',
      categoryIsPositive: true,
      compAvg: '15.4%',
      compAvgChange: '+2.2% YoY',
      compAvgIsPositive: true,
    },
  ],
};