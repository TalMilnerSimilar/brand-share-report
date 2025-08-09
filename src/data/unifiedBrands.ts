// Unified JSON-like data structure for all brands and 7 metrics
// Top-level keys are brand names. Each metric has
// { value, share, change, shareOverTime } where share is a decimal (0..1)

import {
  brands,
  months,
  timeSeriesByMetric,
  overviewMetricKeys,
  funnelMetricKeys,
  MetricKey,
} from './unifiedBrandData';

type ShareOverTime = Record<string, number>; // e.g., { Mar: 0.13, ... }

export interface UnifiedMetric {
  value: number; // latest numeric value
  share: number; // latest market share (0..1)
  change: number; // MoM delta in share (decimal)
  shareOverTime: ShareOverTime; // month abbrev → share (0..1)
}

export type UnifiedBrandJSON = Record<string, Record<MetricKey, UnifiedMetric>>;

const allMetricKeys: MetricKey[] = [...overviewMetricKeys, ...funnelMetricKeys];

const monthAbbrev = (name: string): string => String(name).split(' ')[0];

const buildUnified = (): UnifiedBrandJSON => {
  const out: UnifiedBrandJSON = {} as UnifiedBrandJSON;

  for (const brand of brands) {
    const metricsForBrand: Record<MetricKey, UnifiedMetric> = {} as any;

    for (const metric of allMetricKeys) {
      const series = timeSeriesByMetric[metric] || [];

      // Build shareOverTime map and find totals per month
      const shares: number[] = [];
      const values: number[] = [];
      const shareOverTime: ShareOverTime = {};

      for (let i = 0; i < series.length; i++) {
        const row = series[i] as Record<string, number | string>;
        const total = brands.reduce((sum, b) => {
          const v = Number(row[b]);
          return sum + (isNaN(v) ? 0 : v);
        }, 0);
        const val = Number(row[brand]) || 0;
        const share = total > 0 ? val / total : 0; // decimal 0..1
        const key = monthAbbrev(String(row.name));
        shareOverTime[key] = share;
        shares.push(share);
        values.push(val);
      }

      const n = series.length;
      const latestValue = n > 0 ? values[n - 1] : 0;
      const latestShare = n > 0 ? shares[n - 1] : 0;
      const prevShare = n > 1 ? shares[n - 2] : latestShare;

      metricsForBrand[metric] = {
        value: latestValue,
        share: latestShare,
        change: latestShare - prevShare, // MoM delta in share
        shareOverTime,
      } as UnifiedMetric;
    }

    out[brand] = metricsForBrand;
  }

  return out;
};

export const unifiedBrands: UnifiedBrandJSON = buildUnified();
export default unifiedBrands;


