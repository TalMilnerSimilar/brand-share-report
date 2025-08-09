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

    // Compose shareOverTime per brand with realistic wiggles but preserving constraints
    const M = monthsOrder.length;
    const firstShareByBrand: Record<string, number> = {};
    const baseSeries: Record<string, number[]> = {};
    for (const b of brands) {
      const lastShare = lastShareByBrand[b];
      const change = changes[b];
      const firstShare = clamp(lastShare - change, 0 + EPS, 1 - EPS);
      firstShareByBrand[b] = firstShare;
      baseSeries[b] = [];
      for (let t = 0; t < M; t++) {
        const frac = M === 1 ? 1 : t / (M - 1);
        baseSeries[b][t] = firstShare + change * frac;
      }
    }

    // Generate wiggles per brand/time (zero at endpoints), then enforce per-month zero-sum and bounds
    const sharesByMonth: Array<Record<string, number>> = Array.from({ length: M }, () => ({}));
    // Deterministic-ish randomness per metric index for variety
    const rng = (seed: number) => () => {
      // simple LCG
      seed = (seed * 1664525 + 1013904223) % 0xffffffff;
      return (seed >>> 0) / 0xffffffff;
    };
    const rand = rng(mIdx + 1337);

    // Precompute multi-frequency wiggle parameters per brand
    const ampByBrand: Record<string, number> = {};
    const freqListByBrand: Record<string, number[]> = {};
    const phaseListByBrand: Record<string, number[]> = {};
    const weightListByBrand: Record<string, number[]> = {};
    for (let i = 0; i < brands.length; i++) {
      const b = brands[i];
      const changeAbs = Math.abs(changes[b]);
      // Overall amplitude cap per brand
      ampByBrand[b] = clamp(0.25 * changeAbs + 0.02 * rand(), 0, 0.08 + 0.4 * changeAbs);
      // Random number of components (2..5)
      const K = 2 + Math.floor(rand() * 4);
      const freqs: number[] = [];
      const phases: number[] = [];
      const weightsRaw: number[] = [];
      for (let k = 0; k < K; k++) {
        const f = 1 + Math.floor(rand() * 4); // 1..4 cycles across period
        freqs.push(f);
        phases.push(rand() * Math.PI * 2);
        // Random positive weight
        weightsRaw.push(0.2 + rand());
      }
      const sumW = weightsRaw.reduce((s, x) => s + x, 0) || 1;
      const weights = weightsRaw.map((x) => x / sumW);
      freqListByBrand[b] = freqs;
      phaseListByBrand[b] = phases;
      weightListByBrand[b] = weights;
    }

    // Build shares for t=0 and t=M-1 exactly equal to base (first/last)
    for (const b of brands) {
      sharesByMonth[0][b] = baseSeries[b][0];
      sharesByMonth[M - 1][b] = baseSeries[b][M - 1];
    }

    // Internal months: add wiggles, keep monthly sum at 1, respect bounds
    for (let t = 1; t < M - 1; t++) {
      const frac = t / (M - 1);
      const envelope = Math.pow(Math.sin(Math.PI * frac), 1); // 0 at ends, 1 mid
      const proposed: Record<string, number> = {};
      const wigg: Record<string, number> = {};
      let wiggleSum = 0;
      for (const b of brands) {
        const base = baseSeries[b][t];
        const A = ampByBrand[b] * envelope;
        const freqs = freqListByBrand[b];
        const phases = phaseListByBrand[b];
        const weights = weightListByBrand[b];
        let w = 0;
        for (let k = 0; k < freqs.length; k++) {
          w += weights[k] * Math.sin(2 * Math.PI * freqs[k] * frac + phases[k]);
        }
        w = A * w; // scale combined wave to brand amplitude
        wigg[b] = w;
        wiggleSum += w;
      }
      // zero-mean the wiggles so monthly sum remains 1 after adding to base
      const meanWiggle = wiggleSum / brands.length;
      for (const b of brands) {
        proposed[b] = baseSeries[b][t] + (wigg[b] - meanWiggle);
      }

      // Clamp to bounds and compute residual to bring sum back to 1
      const lower = EPS, upper = 1 - EPS;
      let sumS = 0;
      const sNow: Record<string, number> = {};
      const capGrow: Record<string, number> = {};
      const capShrink: Record<string, number> = {};
      for (const b of brands) {
        const s = clamp(proposed[b], lower, upper);
        sNow[b] = s;
        capGrow[b] = upper - s;   // how much we can add
        capShrink[b] = s - lower; // how much we can subtract
        sumS += s;
      }
      let residual = 1 - sumS;
      let guard = 0;
      while (Math.abs(residual) > 1e-9 && guard++ < 5) {
        if (residual > 0) {
          // distribute to growth capacities
          let totalCap = 0;
          for (const b of brands) totalCap += capGrow[b];
          if (totalCap <= 0) break;
          for (const b of brands) {
            if (capGrow[b] <= 0) continue;
            const add = residual * (capGrow[b] / totalCap);
            const actual = Math.min(add, capGrow[b]);
            sNow[b] += actual;
            capGrow[b] -= actual;
            capShrink[b] += actual;
            residual -= actual;
          }
        } else {
          // remove using shrink capacities
          let totalCap = 0;
          for (const b of brands) totalCap += capShrink[b];
          if (totalCap <= 0) break;
          for (const b of brands) {
            if (capShrink[b] <= 0) continue;
            const rem = (-residual) * (capShrink[b] / totalCap);
            const actual = Math.min(rem, capShrink[b]);
            sNow[b] -= actual;
            capShrink[b] -= actual;
            capGrow[b] += actual;
            residual += actual;
          }
        }
      }
      for (const b of brands) sharesByMonth[t][b] = sNow[b];
    }

    // Persist to out
    for (const b of brands) {
      const shareOverTime: ShareOverTime = {};
      for (let t = 0; t < M; t++) {
        shareOverTime[monthsOrder[t]] = sharesByMonth[t][b];
      }
      (out[b] as any)[metric] = {
        value: latestValueByBrand[b] || 0,
        share: lastShareByBrand[b],
        change: changes[b],
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


