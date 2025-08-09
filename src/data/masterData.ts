// Master data source that ensures consistency across all views
// All percentages are designed to sum to 100% for realistic market shares

export interface BrandMetrics {
  brand: string;
  // Market share percentages (these should sum to 100% across all brands)
  productViewsShare: number;
  unitsSoldShare: number;
  revenueShare: number;
  brandedSearchShare: number;
  searchVisibilityShare: number;
  paidClicksShare: number;
  organicClicksShare: number;
  totalClicksShare: number;
  // Default change indicators (can be overridden by metric-specific changes)
  change: string;
  isPositive: boolean;
  isHighlighted: boolean;
  // Metric-specific YoY changes for Nike's strategic narrative
  metricChanges?: {
    productViews?: { change: string; isPositive: boolean };
    unitsSold?: { change: string; isPositive: boolean };
    revenue?: { change: string; isPositive: boolean };
    brandedSearchVolume?: { change: string; isPositive: boolean };
    searchVisibility?: { change: string; isPositive: boolean };
    shareOfPaidClicks?: { change: string; isPositive: boolean };
    shareOfTotalClicks?: { change: string; isPositive: boolean };
  };
}

// Master brand configuration with realistic market shares that sum to 100%
export const masterBrandData: BrandMetrics[] = [
  {
    brand: 'Nike',
    productViewsShare: 30.4,
    unitsSoldShare: 32.1,
    revenueShare: 32.1,
    brandedSearchShare: 27.8,
    searchVisibilityShare: 31.2,
    paidClicksShare: 24.6,
    organicClicksShare: 25.8,
    totalClicksShare: 28.4,
    // Default change (used when no metric-specific change available)
    change: '-8.2%',
    isPositive: false,
    isHighlighted: false,
    // Nike's Strategic Performance Narrative YoY:
    // Story: Nike is losing organic visibility but gaining through paid strategy,
    // which is driving revenue growth despite lower product view shares
    metricChanges: {
      productViews: { change: '-8.2% YoY', isPositive: false },        // Losing organic discovery
      unitsSold: { change: '+12.5% YoY', isPositive: true },           // Strong conversion from paid traffic
      revenue: { change: '+15.8% YoY', isPositive: true },             // Higher revenue per sale + more units
      brandedSearchVolume: { change: '-3.4% YoY', isPositive: false }, // Slight decline in brand awareness
      searchVisibility: { change: '-12.6% YoY', isPositive: false },   // Losing organic search visibility
      shareOfPaidClicks: { change: '+28.7% YoY', isPositive: true },   // Heavy investment in paid search
      shareOfTotalClicks: { change: '+6.9% YoY', isPositive: true },   // Net positive click share
    },
  },
  {
    brand: 'Adidas',
    productViewsShare: 20.2,
    unitsSoldShare: 20.8,
    revenueShare: 22.2,
    brandedSearchShare: 18.4,
    searchVisibilityShare: 20.0,
    paidClicksShare: 16.9,
    organicClicksShare: 17.8,
    totalClicksShare: 18.2,
    change: '+4.3% YoY',
    isPositive: true,
    isHighlighted: false,
  },
  {
    brand: 'New Balance',
    productViewsShare: 13.2,
    unitsSoldShare: 14.1,
    revenueShare: 12.0,
    brandedSearchShare: 12.5,
    searchVisibilityShare: 11.2,
    paidClicksShare: 13.4,
    organicClicksShare: 12.8,
    totalClicksShare: 12.2,
    change: '+19.2% YoY',
    isPositive: true,
    isHighlighted: false,
  },
  {
    brand: 'Hoka',
    productViewsShare: 9.9,
    unitsSoldShare: 9.6,
    revenueShare: 8.1,
    brandedSearchShare: 10.0,
    searchVisibilityShare: 9.4,
    paidClicksShare: 10.3,
    organicClicksShare: 10.6,
    totalClicksShare: 9.5,
    change: '+35.7% YoY',
    isPositive: true,
    isHighlighted: false,
  },
  {
    brand: 'Asics',
    productViewsShare: 7.1,
    unitsSoldShare: 7.4,
    revenueShare: 6.2,
    brandedSearchShare: 6.6,
    searchVisibilityShare: 5.9,
    paidClicksShare: 6.8,
    organicClicksShare: 6.9,
    totalClicksShare: 6.2,
    change: '-14.2% YoY',
    isPositive: false,
    isHighlighted: false,
  },
  {
    brand: 'Brooks',
    productViewsShare: 4.6,
    unitsSoldShare: 4.6,
    revenueShare: 3.9,
    brandedSearchShare: 3.2,
    searchVisibilityShare: 3.5,
    paidClicksShare: 4.0,
    organicClicksShare: 4.1,
    totalClicksShare: 3.9,
    change: '-5.2%',
    isPositive: false,
    isHighlighted: false,
  },
  {
    brand: 'Saucony',
    productViewsShare: 3.1,
    unitsSoldShare: 3.1,
    revenueShare: 2.6,
    brandedSearchShare: 2.2,
    searchVisibilityShare: 2.3,
    paidClicksShare: 2.7,
    organicClicksShare: 2.8,
    totalClicksShare: 2.8,
    change: '+8.3%',
    isPositive: true,
    isHighlighted: false,
  },
  {
    brand: 'Under Armour',
    productViewsShare: 2.5,
    unitsSoldShare: 2.7,
    revenueShare: 2.1,
    brandedSearchShare: 0.5,
    searchVisibilityShare: 0.5,
    paidClicksShare: 0.7,
    organicClicksShare: 0.7,
    totalClicksShare: 0.8,
    change: '-22.1%',
    isPositive: false,
    isHighlighted: false,
  },
  {
    brand: 'Puma',
    productViewsShare: 2.0,
    unitsSoldShare: 2.3,
    revenueShare: 1.7,
    brandedSearchShare: 2.0,
    searchVisibilityShare: 1.8,
    paidClicksShare: 2.2,
    organicClicksShare: 2.2,
    totalClicksShare: 2.3,
    change: '-15.8%',
    isPositive: false,
    isHighlighted: false,
  },
  {
    brand: 'Reebok',
    productViewsShare: 1.5,
    unitsSoldShare: 1.7,
    revenueShare: 1.3,
    brandedSearchShare: 1.1,
    searchVisibilityShare: 1.3,
    paidClicksShare: 1.5,
    organicClicksShare: 1.5,
    totalClicksShare: 1.6,
    change: '+12.7%',
    isPositive: true,
    isHighlighted: false,
  },
  {
    brand: 'Fila',
    productViewsShare: 1.0,
    unitsSoldShare: 1.2,
    revenueShare: 0.9,
    brandedSearchShare: 0.9,
    searchVisibilityShare: 1.1,
    paidClicksShare: 1.2,
    organicClicksShare: 1.3,
    totalClicksShare: 1.3,
    change: '+28.9%',
    isPositive: true,
    isHighlighted: false,
  },
  {
    brand: 'Mizuno',
    productViewsShare: 0.9,
    unitsSoldShare: 0.9,
    revenueShare: 0.8,
    brandedSearchShare: 0.6,
    searchVisibilityShare: 0.6,
    paidClicksShare: 0.7,
    organicClicksShare: 0.8,
    totalClicksShare: 0.8,
    change: '-7.4%',
    isPositive: false,
    isHighlighted: false,
  },
  {
    brand: 'Skechers',
    productViewsShare: 0.8,
    unitsSoldShare: 0.8,
    revenueShare: 0.6,
    brandedSearchShare: 0.5,
    searchVisibilityShare: 0.7,
    paidClicksShare: 0.8,
    organicClicksShare: 0.9,
    totalClicksShare: 1.0,
    change: '+45.2%',
    isPositive: true,
    isHighlighted: false,
  },
  {
    brand: 'Converse',
    productViewsShare: 0.6,
    unitsSoldShare: 0.6,
    revenueShare: 0.5,
    brandedSearchShare: 1.3,
    searchVisibilityShare: 1.4,
    paidClicksShare: 1.6,
    organicClicksShare: 1.7,
    totalClicksShare: 1.8,
    change: '+18.6%',
    isPositive: true,
    isHighlighted: false,
  },
  {
    brand: 'Jordan',
    productViewsShare: 0.5,
    unitsSoldShare: 0.5,
    revenueShare: 0.4,
    brandedSearchShare: 0.2,
    searchVisibilityShare: 0.2,
    paidClicksShare: 0.2,
    organicClicksShare: 0.3,
    totalClicksShare: 0.3,
    change: '-11.2%',
    isPositive: false,
    isHighlighted: false,
  },
  {
    brand: 'Vans',
    productViewsShare: 0.4,
    unitsSoldShare: 0.4,
    revenueShare: 0.3,
    brandedSearchShare: 1.5,
    searchVisibilityShare: 1.6,
    paidClicksShare: 1.9,
    organicClicksShare: 1.9,
    totalClicksShare: 2.0,
    change: '+33.1%',
    isPositive: true,
    isHighlighted: false,
  },
  {
    brand: 'DC Shoes',
    productViewsShare: 0.3,
    unitsSoldShare: 0.3,
    revenueShare: 0.3,
    brandedSearchShare: 0.2,
    searchVisibilityShare: 0.3,
    paidClicksShare: 0.3,
    organicClicksShare: 0.4,
    totalClicksShare: 0.3,
    change: '+8.9%',
    isPositive: true,
    isHighlighted: false,
  },
  {
    brand: 'Columbia',
    productViewsShare: 0.3,
    unitsSoldShare: 0.3,
    revenueShare: 0.2,
    brandedSearchShare: 0.3,
    searchVisibilityShare: 0.4,
    paidClicksShare: 0.5,
    organicClicksShare: 0.6,
    totalClicksShare: 0.6,
    change: '-2.1%',
    isPositive: false,
    isHighlighted: false,
  },
  {
    brand: 'Salomon',
    productViewsShare: 0.2,
    unitsSoldShare: 0.2,
    revenueShare: 0.2,
    brandedSearchShare: 0.9,
    searchVisibilityShare: 0.6,
    paidClicksShare: 0.7,
    organicClicksShare: 0.8,
    totalClicksShare: 0.8,
    change: '+52.3%',
    isPositive: true,
    isHighlighted: false,
  },
  {
    brand: 'Merrell',
    productViewsShare: 0.2,
    unitsSoldShare: 0.2,
    revenueShare: 0.2,
    brandedSearchShare: 0.2,
    searchVisibilityShare: 0.2,
    paidClicksShare: 0.3,
    organicClicksShare: 0.4,
    totalClicksShare: 0.4,
    change: '+15.7%',
    isPositive: true,
    isHighlighted: false,
  },
  {
    brand: 'Timberland',
    productViewsShare: 0.2,
    unitsSoldShare: 0.2,
    revenueShare: 0.1,
    brandedSearchShare: 0.4,
    searchVisibilityShare: 0.5,
    paidClicksShare: 0.5,
    organicClicksShare: 0.6,
    totalClicksShare: 0.6,
    change: '-9.8%',
    isPositive: false,
    isHighlighted: false,
  },
  {
    brand: 'La Sportiva',
    productViewsShare: 0.1,
    unitsSoldShare: 0.1,
    revenueShare: 0.1,
    brandedSearchShare: 0.2,
    searchVisibilityShare: 0.2,
    paidClicksShare: 0.3,
    organicClicksShare: 0.3,
    totalClicksShare: 0.3,
    change: '+67.8%',
    isPositive: true,
    isHighlighted: false,
  },
  {
    brand: 'The North Face',
    productViewsShare: 0.1,
    unitsSoldShare: 0.1,
    revenueShare: 0.1,
    brandedSearchShare: 0.8,
    searchVisibilityShare: 0.9,
    paidClicksShare: 1.0,
    organicClicksShare: 1.1,
    totalClicksShare: 1.0,
    change: '+41.2%',
    isPositive: true,
    isHighlighted: false,
  },
  {
    brand: 'Anta',
    productViewsShare: 0.1,
    unitsSoldShare: 0.1,
    revenueShare: 0.1,
    brandedSearchShare: 0.3,
    searchVisibilityShare: 0.3,
    paidClicksShare: 0.4,
    organicClicksShare: 0.4,
    totalClicksShare: 0.4,
    change: '+29.6%',
    isPositive: true,
    isHighlighted: false,
  }
];

// Generate consistent time series data based on master shares
export const generateTimeSeriesData = (
  metricKey: keyof Pick<BrandMetrics, 'productViewsShare' | 'unitsSoldShare' | 'revenueShare' | 'brandedSearchShare' | 'searchVisibilityShare' | 'paidClicksShare' | 'organicClicksShare' | 'totalClicksShare'>,
  baseVolume: number = 1000000
) => {
  const months = [
    'Jan 20', 'Feb 20', 'Mar 20', 'Apr 20', 'May 20', 'Jun 20', 
    'Jul 20', 'Aug 20', 'Sep 20', 'Oct 20', 'Nov 20', 'Dec 20'
  ];

  const result = months.map((month, index) => {
    const monthData: any = { name: month };
    
    // Create brand-specific variations that maintain share constraints
    const brandVariations: { [brand: string]: number } = {};
    let adjustedShares: { [brand: string]: number } = {};
    
    // Step 1: Generate individual brand variations with competitive dynamics
    masterBrandData.forEach(brand => {
      const baseShare = brand[metricKey];
      
      // Create brand-specific variation patterns with higher volatility and competitive shifts
      let variation = 1.0;
      
      // Add competitive momentum factors
      const monthProgress = index / (months.length - 1); // 0 to 1
      const competitivePhase = (index * 1.5) % (2 * Math.PI); // Faster cycling for more competition
      
      // Different brands have different seasonal patterns with increased volatility
      switch (brand.brand) {
        case 'Nike':
          // Nike starts strong but faces challenges mid-year, recovers at end
          // Create more dramatic swings where Nike sometimes loses leadership
          const nikeBase = 0.88 + (0.22 * Math.sin(competitivePhase - 0.8)); // Much higher volatility
          const nikeSeasonality = 0.05 * Math.cos((index / months.length) * 4 * Math.PI);
          const nikeMidYearDip = index >= 3 && index <= 6 ? -0.15 * Math.sin((index - 3) * Math.PI / 3) : 0;
          variation = nikeBase + nikeSeasonality + nikeMidYearDip;
          break;
          
        case 'Adidas':
          // Adidas becomes more aggressive mid-year, challenging Nike directly
          const adidasBase = 0.85 + (0.25 * Math.sin(competitivePhase + 1.2)); // High volatility, phase-shifted
          const adidasSurge = index >= 3 && index <= 7 ? 0.18 * Math.sin((index - 3) * Math.PI / 4) : 0;
          const adidasSeasonality = 0.08 * Math.cos((index / months.length) * 3 * Math.PI + 0.5);
          variation = adidasBase + adidasSurge + adidasSeasonality;
          break;
          
        case 'New Balance':
          // New Balance has explosive growth spurts, occasionally surging ahead
          const nbBase = 1.0 + (0.35 * monthProgress); // Strong overall growth
          const nbVolatility = 0.2 * Math.sin((index / months.length) * 5 * Math.PI + 2);
          const nbSurge = (index === 2 || index === 6 || index === 8) ? 0.25 : 0; // Specific surge months
          variation = nbBase + nbVolatility + nbSurge;
          break;
          
        case 'Hoka':
          // Hoka meteoric rise with some setbacks, very volatile emerging brand
          const hokaBase = 0.9 + (0.4 * monthProgress) + (0.15 * Math.sin(competitivePhase * 1.5));
          const hokaVolatility = 0.18 * Math.sin((index / months.length) * 6 * Math.PI + 3.5);
          const hokaSetback = index === 4 ? -0.2 : 0; // One major setback month
          variation = hokaBase + hokaVolatility + hokaSetback;
          break;
          
        case 'Asics':
          // Asics declining but fights back occasionally
          const asicsBase = 0.85 - (0.12 * monthProgress);
          const asicsFightback = (index === 1 || index === 5 || index === 9) ? 0.15 : 0;
          const asicsVolatility = 0.12 * Math.cos((index / months.length) * 3 * Math.PI);
          variation = asicsBase + asicsFightback + asicsVolatility;
          break;
          
        case 'Brooks':
          // Brooks has surprise momentum bursts
          const brooksBase = 0.9 + (0.15 * Math.sin(competitivePhase + 4));
          const brooksBurst = (index === 3 || index === 7) ? 0.3 : 0;
          variation = brooksBase + brooksBurst;
          break;
          
        case 'Saucony':
          // Saucony volatile but trending up
          const sauconyBase = 0.95 + (0.2 * monthProgress);
          const sauconyVolatility = 0.25 * Math.sin((index / months.length) * 7 * Math.PI + 1.5);
          variation = sauconyBase + sauconyVolatility;
          break;
          
        default:
          // Smaller brands with very high volatility and occasional surprise surges
          const brandSeed = brand.brand.length + brand.brand.charCodeAt(0); // Deterministic randomness
          const smallBrandBase = 0.7 + (0.4 * Math.sin(competitivePhase + brandSeed));
          const surpriseSurge = (index + brandSeed) % 7 === 0 ? 0.5 : 0; // Occasional huge spikes
          const volatility = 0.3 * Math.sin((index / months.length) * 8 * Math.PI + brandSeed);
          
          if (baseShare > 2) {
            // Medium brands - high variation with competitive moments
            variation = smallBrandBase + (0.5 * surpriseSurge) + volatility;
          } else {
            // Small brands - extreme volatility with potential breakthrough moments
            variation = smallBrandBase + surpriseSurge + volatility;
          }
      }
      
      // Ensure variation doesn't go too extreme
      variation = Math.max(0.3, Math.min(1.8, variation));
      
      // Apply the variation to get preliminary adjusted shares
      adjustedShares[brand.brand] = baseShare * variation;
      brandVariations[brand.brand] = variation;
    });
    
    // Step 2: Normalize to ensure shares sum to 100%
    const totalAdjustedShare = Object.values(adjustedShares).reduce((sum, share) => sum + share, 0);
    const normalizationFactor = 100 / totalAdjustedShare;
    
    // Step 3: Apply normalization and convert to volumes
    masterBrandData.forEach(brand => {
      const normalizedShare = adjustedShares[brand.brand] * normalizationFactor;
      const volumeForBrand = Math.round((normalizedShare / 100) * baseVolume);
      monthData[brand.brand] = Math.max(1, volumeForBrand); // Ensure minimum value of 1
    });
    
    return monthData;
  });

  // Log validation and competitive narrative for the first time this is called
  if (typeof window !== 'undefined' && baseVolume === 394900) {
    console.log(`📊 Time series validation for ${metricKey}:`);
    
    // Track competitive dynamics
    let nikeData: { month: string, share: number, rank: number }[] = [];
    let adidasData: { month: string, share: number, rank: number }[] = [];
    let newBalanceData: { month: string, share: number, rank: number }[] = [];
    
    result.forEach(month => {
      const total = Object.entries(month)
        .filter(([key]) => key !== 'name')
        .reduce((sum, [_, value]) => sum + Number(value), 0);
      const percentageOfBase = ((total / baseVolume) * 100).toFixed(1);
      
      // Calculate brand rankings for this month
      const brandShares = Object.entries(month)
        .filter(([key]) => key !== 'name')
        .map(([brand, value]) => ({ brand, value: Number(value), share: (Number(value) / total) * 100 }))
        .sort((a, b) => b.value - a.value);
      
      // Track key brands
      const nike = brandShares.find(b => b.brand === 'Nike');
      const adidas = brandShares.find(b => b.brand === 'Adidas');
      const newBalance = brandShares.find(b => b.brand === 'New Balance');
      
      if (nike) nikeData.push({ month: month.name, share: nike.share, rank: brandShares.findIndex(b => b.brand === 'Nike') + 1 });
      if (adidas) adidasData.push({ month: month.name, share: adidas.share, rank: brandShares.findIndex(b => b.brand === 'Adidas') + 1 });
      if (newBalance) newBalanceData.push({ month: month.name, share: newBalance.share, rank: brandShares.findIndex(b => b.brand === 'New Balance') + 1 });
      
      console.log(`${month.name}: ${total.toLocaleString()} (${percentageOfBase}% of base) | Leader: ${brandShares[0].brand} (${brandShares[0].share.toFixed(1)}%)`);
    });
    
    console.log('\n🏆 Competitive Narrative:');
    console.log('Nike journey:', nikeData.map(d => `${d.month}: #${d.rank} (${d.share.toFixed(1)}%)`).join(' → '));
    console.log('Adidas journey:', adidasData.map(d => `${d.month}: #${d.rank} (${d.share.toFixed(1)}%)`).join(' → '));
    console.log('New Balance journey:', newBalanceData.map(d => `${d.month}: #${d.rank} (${d.share.toFixed(1)}%)`).join(' → '));
  }

  return result;
};

// Validation function to ensure shares sum to 100%
export const validateShares = (metricKey: keyof Pick<BrandMetrics, 'productViewsShare' | 'unitsSoldShare' | 'revenueShare' | 'brandedSearchShare' | 'searchVisibilityShare' | 'paidClicksShare' | 'organicClicksShare' | 'totalClicksShare'>) => {
  const total = masterBrandData.reduce((sum, brand) => sum + brand[metricKey], 0);
  console.log(`${metricKey} total: ${total.toFixed(1)}%`);
  return Math.abs(total - 100) < 0.1; // Allow 0.1% tolerance
};

// Validation function for time series data to ensure shares sum to 100% at each time point
export const validateTimeSeriesShares = (
  metricKey: keyof Pick<BrandMetrics, 'productViewsShare' | 'unitsSoldShare' | 'revenueShare' | 'brandedSearchShare' | 'searchVisibilityShare' | 'paidClicksShare' | 'organicClicksShare' | 'totalClicksShare'>,
  baseVolume: number = 1000000
) => {
  const timeSeriesData = generateTimeSeriesData(metricKey, baseVolume);
  
  console.log(`\nValidating time series for ${metricKey}:`);
  
  timeSeriesData.forEach((monthData, index) => {
    const totalVolume = Object.entries(monthData)
      .filter(([key]) => key !== 'name')
      .reduce((sum, [_, value]) => sum + Number(value || 0), 0);
    
    const percentageOfBase = ((totalVolume / baseVolume) * 100).toFixed(1);
    console.log(`${monthData.name}: Total volume = ${totalVolume.toLocaleString()} (${percentageOfBase}% of base volume)`);
    
    // Each month should sum to approximately the base volume (representing 100% market share)
    if (Math.abs(totalVolume - baseVolume) > baseVolume * 0.01) { // 1% tolerance
      console.warn(`⚠️  ${monthData.name}: Volume total ${totalVolume} deviates from expected ${baseVolume}`);
    }
  });
  
  return timeSeriesData;
};

// Export totals for KPI cards
export const categoryTotals = {
  productViews: 394900, // 394.9K
  unitsSold: 77800,     // 77.8K  
  revenue: 23400,       // $23.4K
  brandedSearch: 210500, // 210.5K
  searchVisibility: 180700, // 180.7K
  paidClicks: 95200,    // 95.2K
  organicClicks: 155300, // 155.3K
  totalClicks: 350100   // 350.1K
};


