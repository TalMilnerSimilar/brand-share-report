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
const monthsOrder = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const includeMonths = new Set(monthsOrder);

// Change bounds (fractions of 1.0 share): 0.01% to 30%
const MIN_CHANGE = 0.0001;
const MAX_CHANGE = 0.30;

// Slight epsilon to avoid 0/1 boundaries for shares
const EPS = 1e-6;

function pickMagnitude(): number {
  // Bias for spread: 40% small, 40% mid, 20% large
  const r = Math.random();
  if (r < 0.4) return MIN_CHANGE + Math.random() * (0.03 - MIN_CHANGE);
  if (r < 0.8) return 0.03 + Math.random() * (0.15 - 0.03);
  return 0.15 + Math.random() * (MAX_CHANGE - 0.15);
}

function clamp(value: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, value));
}

function build(): UnifiedBrandJSON {
  const out: UnifiedBrandJSON = {} as any;
  // Initialize brand containers
  for (const brand of brands) out[brand] = {} as any;

  for (let mIdx = 0; mIdx < allMetricKeys.length; mIdx++) {
    const metric = allMetricKeys[mIdx];
    const series = timeSeriesByMetric[metric] || [];

    // Map month -> row for quick lookup, keep only included months
    const monthToRow: Record<string, Record<string, number | string>> = {};
    for (let i = 0; i < series.length; i++) {
      const row = series[i] as Record<string, number | string>;
      const mk = monthAbbrev(String(row.name));
      if (includeMonths.has(mk)) monthToRow[mk] = row;
    }

    // Find last month present in order
    const lastMonthKey = [...monthsOrder].reverse().find((mo) => monthToRow[mo]) || monthsOrder[monthsOrder.length - 1];
    const lastRow = monthToRow[lastMonthKey] || ({} as Record<string, number | string>);

    // Compute latest absolute values and shares for last month
    const totalLast = brands.reduce((sum, b) => sum + (Number(lastRow[b]) || 0), 0);
    const lastShareByBrand: Record<string, number> = {};
    const latestValueByBrand: Record<string, number> = {};
    for (const b of brands) {
      const v = Number(lastRow[b]) || 0;
      latestValueByBrand[b] = v;
      lastShareByBrand[b] = totalLast > 0 ? v / totalLast : 0;
    }
    // Normalize shares to sum exactly to 1.0 and fix residual on last brand
    let sumShares = brands.reduce((s, b) => s + lastShareByBrand[b], 0);
    if (sumShares > 0) {
      for (const b of brands) lastShareByBrand[b] = lastShareByBrand[b] / sumShares;
      sumShares = brands.reduce((s, b) => s + lastShareByBrand[b], 0);
      const residual = 1 - sumShares;
      lastShareByBrand[brands[brands.length - 1]] += residual;
    }

    // Build changes per brand with spread and zero-sum constraint
    const changes: Record<string, number> = {};
    const maxPos: Record<string, number> = {};
    const maxNeg: Record<string, number> = {};
    for (const b of brands) {
      const ls = lastShareByBrand[b];
      maxPos[b] = clamp(ls - EPS, 0, MAX_CHANGE); // cannot go below 0 for first share
      maxNeg[b] = clamp(1 - ls - EPS, 0, MAX_CHANGE); // cannot exceed 1 for first share
      changes[b] = 0;
    }

    // Choose an anchor brand that has the largest capacity in either direction
    const desiredSignForResidual = 1; // placeholder, we'll decide after sampling
    let anchorIdx = 0;
    let anchorCap = -Infinity;
    for (let i = 0; i < brands.length; i++) {
      const b = brands[i];
      const cap = Math.max(maxPos[b], maxNeg[b]);
      if (cap > anchorCap) {
        anchorCap = cap;
        anchorIdx = i;
      }
    }
    const anchorBrand = brands[anchorIdx];

    // Assign changes to all brands except anchor, alternating signs for spread
    for (let i = 0; i < brands.length; i++) {
      if (i === anchorIdx) continue;
      const b = brands[i];
      // alternate sign across metric+brand index to diversify
      let sign = ((mIdx + i) % 2 === 0) ? 1 : -1;
      // If chosen sign not feasible, flip
      if (sign > 0 && maxPos[b] < MIN_CHANGE) sign = -1;
      if (sign < 0 && maxNeg[b] < MIN_CHANGE) sign = 1;
      // If still infeasible, leave 0
      if ((sign > 0 && maxPos[b] < MIN_CHANGE) || (sign < 0 && maxNeg[b] < MIN_CHANGE)) {
        changes[b] = 0;
        continue;
      }
      const mag = clamp(pickMagnitude(), MIN_CHANGE, sign > 0 ? maxPos[b] : maxNeg[b]);
      changes[b] = sign * mag;
    }

    // Make sum zero by assigning anchor
    let sumNonAnchor = brands.reduce((s, b, i) => (i === anchorIdx ? s : s + changes[b]), 0);
    let desiredAnchor = -sumNonAnchor;
    const capAnchor = desiredAnchor >= 0 ? maxPos[anchorBrand] : maxNeg[anchorBrand];
    if (Math.abs(desiredAnchor) > capAnchor) {
      const scale = capAnchor / Math.max(Math.abs(desiredAnchor), EPS);
      // Scale down non-anchor changes to fit anchor capacity
      for (let i = 0; i < brands.length; i++) {
        if (i === anchorIdx) continue;
        changes[brands[i]] *= scale;
        // keep above MIN_CHANGE when possible
        if (Math.abs(changes[brands[i]]) < MIN_CHANGE) {
          const sgn = Math.sign(changes[brands[i]]) || 1;
          const feasible = sgn > 0 ? maxPos[brands[i]] : maxNeg[brands[i]];
          changes[brands[i]] = sgn * Math.min(MIN_CHANGE, feasible);
        }
      }
      sumNonAnchor = brands.reduce((s, b, i) => (i === anchorIdx ? s : s + changes[b]), 0);
      desiredAnchor = -sumNonAnchor;
    }
    // Finally set anchor within its cap
    changes[anchorBrand] = clamp(desiredAnchor, -maxNeg[anchorBrand], maxPos[anchorBrand]);

    // Compose shareOverTime per brand (linear ramp from first to last)
    for (const b of brands) {
      const lastShare = lastShareByBrand[b];
      const change = changes[b];
      const firstShare = clamp(lastShare - change, 0 + EPS, 1 - EPS);

      const shareOverTime: ShareOverTime = {};
      const M = monthsOrder.length;
      for (let t = 0; t < M; t++) {
        const frac = M === 1 ? 1 : t / (M - 1);
        const s = firstShare + change * frac;
        shareOverTime[monthsOrder[t]] = s;
      }
      // Force last month to equal current share exactly
      shareOverTime[monthsOrder[M - 1]] = lastShare;

      // Write into brand bucket
      (out[b] as any)[metric] = {
        value: latestValueByBrand[b] || 0,
        share: lastShare,
        change: change,
        shareOverTime,
      };
    }
  }

  // Final exact normalization on current shares per metric so they sum to 1.0
  for (const metric of allMetricKeys) {
    let sum = 0;
    for (const b of brands) sum += (out[b][metric]?.share || 0);
    if (sum > 0) {
      for (let i = 0; i < brands.length; i++) {
        const b = brands[i];
        if (!out[b][metric]) continue;
        out[b][metric].share = out[b][metric].share / sum;
        // sync last month shareOverTime too
        out[b][metric].shareOverTime[monthsOrder[monthsOrder.length - 1]] = out[b][metric].share;
      }
      // Correct residual to ensure exact 1.0
      let newSum = 0;
      for (const b of brands) newSum += (out[b][metric]?.share || 0);
      const residual = 1 - newSum;
      const lastBrand = brands[brands.length - 1];
      if (out[lastBrand][metric]) {
        out[lastBrand][metric].share += residual;
        out[lastBrand][metric].shareOverTime[monthsOrder[monthsOrder.length - 1]] = out[lastBrand][metric].share;
      }
    }
  }

  return out;
}

const result = build();
const target = join(__dirname, '..', 'src', 'data', 'unifiedBrands.json');
writeFileSync(target, JSON.stringify(result, null, 2));
console.log(`Wrote ${target}`);


