export const funnelChartData = {
  brandedSearchVolume: [
    { name: 'Jan 20', Nike: 4000, Adidas: 2400, "New Balance": 2000, Hoka: 2780, Asics: 1890, Brooks: 1200, Saucony: 800, Puma: 2390, Reebok: 3490, Vans: 2000, Converse: 2100, Skechers: 2200, Fila: 2300, "Under Armour": 2400, "The North Face": 2500, Columbia: 2600, Mizuno: 2700, Merrell: 2800, Timberland: 2900, "La Sportiva": 3000, Anta: 3100, "DC Shoes": 3200, Jordan: 3300 },
    // ... more data for other months
  ],
  searchVisibility: [
    { name: 'Jan 20', Nike: 2400, Adidas: 1398, "New Balance": 9800, Hoka: 3908, Asics: 4800, Brooks: 2400, Saucony: 1600, Puma: 3800, Reebok: 4300, Vans: 2000, Converse: 2100, Skechers: 2200, Fila: 2300, "Under Armour": 2400, "The North Face": 2500, Columbia: 2600, Mizuno: 2700, Merrell: 2800, Timberland: 2900, "La Sportiva": 3000, Anta: 3100, "DC Shoes": 3200, Jordan: 3300 },
    // ... more data for other months
  ],
  shareOfPaidClicks: [
    { name: 'Jan 20', Nike: 1400, Adidas: 4398, "New Balance": 2800, Hoka: 1908, Asics: 2800, Brooks: 1400, Saucony: 900, Puma: 1800, Reebok: 2300, Vans: 3000, Converse: 3100, Skechers: 3200, Fila: 3300, "Under Armour": 3400, "The North Face": 3500, Columbia: 3600, Mizuno: 3700, Merrell: 3800, Timberland: 3900, "La Sportiva": 4000, Anta: 4100, "DC Shoes": 4200, Jordan: 4300 },
    // ... more data for other months
  ],
  shareOfOrganicClicks: [
    { name: 'Jan 20', Nike: 1800, Adidas: 3200, "New Balance": 1500, Hoka: 2200, Asics: 1900, Brooks: 1800, Saucony: 1200, Puma: 1600, Reebok: 2000, Vans: 2500, Converse: 2600, Skechers: 2700, Fila: 2800, "Under Armour": 2900, "The North Face": 3000, Columbia: 3100, Mizuno: 3200, Merrell: 3300, Timberland: 3400, "La Sportiva": 3500, Anta: 3600, "DC Shoes": 3700, Jordan: 3800 },
    // ... more data for other months
  ],
  shareOfTotalClicks: [
    { name: 'Jan 20', Nike: 3400, Adidas: 2398, "New Balance": 5800, Hoka: 2908, Asics: 3800, Brooks: 3200, Saucony: 2100, Puma: 2800, Reebok: 3300, Vans: 4000, Converse: 4100, Skechers: 4200, Fila: 4300, "Under Armour": 4400, "The North Face": 4500, Columbia: 4600, Mizuno: 4700, Merrell: 4800, Timberland: 4900, "La Sportiva": 5000, Anta: 5100, "DC Shoes": 5200, Jordan: 5300 },
    // ... more data for other months
  ]
};

// a function to generate more volatile data for the rest of the months
const generateNextMonthData = (previousData: any) => {
  const newData = { ...previousData };
  Object.keys(newData).forEach(key => {
    if (key !== 'name') {
      const value = newData[key];
      // Much more volatile changes - between -50% and +100% of current value
      const volatilityFactor = (Math.random() * 1.5) - 0.5;
      const change = value * volatilityFactor;
      newData[key] = Math.max(0, Math.round(value + change));
    }
  });
  return newData;
}

const months = ['Feb 20', 'Mar 20', 'Apr 20', 'May 20', 'Jun 20', 'Jul 20', 'Aug 20', 'Sep 20', 'Oct 20', 'Nov 20', 'Dec 20'];

for (const metric in funnelChartData) {
  let lastMonthData = funnelChartData[metric as keyof typeof funnelChartData][0];
  for (const month of months) {
    const nextMonthData = generateNextMonthData(lastMonthData);
    nextMonthData.name = month;
    funnelChartData[metric as keyof typeof funnelChartData].push(nextMonthData);
    lastMonthData = nextMonthData;
  }
}
