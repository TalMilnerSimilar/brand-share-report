import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { brandTrendData, metricColorMap } from '../data/brandTrendData';
import MetricTooltip from './MetricTooltip';

interface BrandTrendChartProps {
    selectedBrand: string;
    selectedMetrics: Set<string>;
}

const BrandTrendChart: React.FC<BrandTrendChartProps> = ({
  selectedBrand,
  selectedMetrics,
}) => {
  const data = brandTrendData[selectedBrand] || [];
  const metricsArray = Array.from(selectedMetrics);

  const tickStyle = { fill: '#B6BEC6', fontSize: 11 as const, cursor: 'default' as const };

  const renderYAxes = () => {
    const count = metricsArray.length;
    if (count === 1) {
      return (
        <YAxis
          orientation="left"
          axisLine={false}
          tick={tickStyle}
          tickMargin={14}
        />
      );
    }
    if (count === 2) {
      return (
        <>
          <YAxis
            orientation="left"
            axisLine={false}
            tick={tickStyle}
            tickMargin={14}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            axisLine={false}
            tick={tickStyle}
            tickMargin={14}
          />
        </>
      );
    }
    // Visible axis bound to first metric to drive tick generation
    const primaryId = metricsArray[0];
    return (
      <>
        <YAxis
          yAxisId={primaryId}
          orientation="left"
          axisLine={false}
          tick={tickStyle}
          tickMargin={14}
        />
        {metricsArray.slice(1).map((m) => (
          <YAxis key={m} yAxisId={m} hide axisLine={false} />
        ))}
      </>
    );
  };

  const getAxisIdForMetric = (metric: string, index: number) => {
    const count = metricsArray.length;
    if (count === 1) return 0 as any; // default axis id
    if (count === 2) return index === 0 ? (0 as any) : 'right';
    return metric; // bind to hidden per-metric axis; grid uses visible 'grid' axis
  };

  return (
    <div className="flex-1 bg-white p-4 rounded-lg h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis dataKey="name" tick={{ fill: '#B6BEC6', fontSize: 11, cursor: 'default' }} tickMargin={14} />
          {renderYAxes()}
          <Tooltip content={<MetricTooltip metricColorMap={metricColorMap} />} />
          {metricsArray.map((metric, idx) => (
            <Line
              key={metric}
              type="linear"
              dataKey={metric}
              stroke={metricColorMap[metric]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8 }}
              yAxisId={getAxisIdForMetric(metric, idx)}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BrandTrendChart;