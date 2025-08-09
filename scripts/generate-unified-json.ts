/* eslint-disable no-console */
import { writeFileSync } from 'fs';
import { join } from 'path';
import {
  brands,
  timeSeriesByMetric,
  overviewMetricKeys,
  funnelMetricKeys,
  MetricKey,
} from '../src/data/unifiedBrandData';

type ShareOverTime = Record<string, number>;
type UnifiedMetric = {
  value: number;
  share: number;
  change: number;
  shareOverTime: ShareOverTime;
};

type UnifiedBrandJSON = Record<string, Record<MetricKey, UnifiedMetric>>;

const allMetricKeys: MetricKey[] = [...overviewMetricKeys, ...funnelMetricKeys];
const monthAbbrev = (name: string): string => String(name).split(' ')[0];
const includeMonths = new Set(['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);

function build(): UnifiedBrandJSON {
  const out: UnifiedBrandJSON = {} as any;

  for (const brand of brands) {
    const metricsForBrand: Record<MetricKey, UnifiedMetric> = {} as any;

    for (const metric of allMetricKeys) {
      const series = timeSeriesByMetric[metric] || [];
      const shares: number[] = [];
      const values: number[] = [];
      const shareOverTime: ShareOverTime = {};

      for (let i = 0; i < series.length; i++) {
        const row = series[i] as Record<string, number | string>;
        const monthKey = monthAbbrev(String(row.name));
        if (!includeMonths.has(monthKey)) continue;

        const total = brands.reduce((sum, b) => {
          const v = Number(row[b]);
          return sum + (isNaN(v) ? 0 : v);
        }, 0);
        const val = Number(row[brand]) || 0;
        const share = total > 0 ? val / total : 0;

        shareOverTime[monthKey] = share;
        shares.push(share);
        values.push(val);
      }

      const n = shares.length;
      const latestValue = n > 0 ? values[n - 1] : 0;
      const latestShare = n > 0 ? shares[n - 1] : 0;
      const prevShare = n > 1 ? shares[n - 2] : latestShare;

      metricsForBrand[metric] = {
        value: latestValue,
        share: latestShare,
        change: latestShare - prevShare,
        shareOverTime,
      };
    }

    out[brand] = metricsForBrand;
  }

  return out;
}

const result = build();
const target = join(__dirname, '..', 'src', 'data', 'unifiedBrands.json');
writeFileSync(target, JSON.stringify(result, null, 2));
console.log(`Wrote ${target}`);


