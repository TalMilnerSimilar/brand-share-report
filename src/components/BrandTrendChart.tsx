import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Customized,
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
          yAxisId={0 as any}
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
            yAxisId={0 as any}
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
    // Keep a dedicated visible axis for grid ticks, but make labels white (invisible)
    const gridTickStyle = { fill: '#FFFFFF', fontSize: 11 as const, cursor: 'default' as const };
    const gridTicks = [0, 20, 40, 60, 80, 100];
    return (
      <>
        <YAxis
          yAxisId={0 as any}
          orientation="left"
          axisLine={false}
          tick={gridTickStyle}
          tickMargin={14}
          tickLine={false}
          domain={[0, 100]}
          ticks={gridTicks}
          allowDecimals={false}
        />
        {/* Hidden per-metric axes for independent scales */}
        {metricsArray.map((m) => (
          <YAxis key={m} yAxisId={m} hide axisLine={false} />
        ))}
      </>
    );
  };

  const getAxisIdForMetric = (metric: string, index: number) => {
    const count = metricsArray.length;
    if (count === 1) return 0 as any; // default axis id
    if (count === 2) return index === 0 ? (0 as any) : 'right';
    return metric; // bind to hidden per-metric axis; grid uses visible axis id=0
  };

  // Overlay drawer: create exactly five horizontal lines across plot area
  const renderCustomHorizontalLines = (props: any) => {
    const { offset } = props || {};
    if (!offset) return null;
    const { left, top, width, height } = offset;
    const lineCount = 5;
    const ys = Array.from({ length: lineCount }, (_, i) => top + (height * i) / (lineCount - 1));
    const x1 = left;
    const x2 = left + width;
    return (
      <g className="recharts-cartesian-grid-horizontal" pointerEvents="none">
        {ys.map((yVal) => (
          <line
            key={yVal}
            stroke="#ccc"
            fill="none"
            x={left}
            y={top}
            width={width}
            height={height}
            x1={x1}
            y1={yVal}
            x2={x2}
            y2={yVal}
          />
        ))}
      </g>
    );
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
          {/* Disable built-in horizontal grid and draw our own fixed 5 lines */}
          <CartesianGrid vertical={false} horizontal={false} />
          <Customized>{(p: any) => renderCustomHorizontalLines(p)}</Customized>
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