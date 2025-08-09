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
  const selectedList = Array.from(selectedMetrics);

  const renderYAxes = () => {
    if (selectedList.length <= 1) {
      return (
        <YAxis
          yAxisId="left"
          axisLine={false}
          tick={{ fill: '#B6BEC6', fontSize: 11, cursor: 'default' }}
          tickMargin={14}
        />
      );
    }
    if (selectedList.length === 2) {
      return (
        <>
          <YAxis
            yAxisId="left"
            axisLine={false}
            tick={{ fill: '#B6BEC6', fontSize: 11, cursor: 'default' }}
            tickMargin={14}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            axisLine={false}
            tick={{ fill: '#B6BEC6', fontSize: 11, cursor: 'default' }}
            tickMargin={14}
          />
        </>
      );
    }
    // > 2 metrics: give each series its own hidden axis
    return (
      <>
        {selectedList.map((metric) => (
          <YAxis key={metric} yAxisId={metric} hide />
        ))}
      </>
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
          <CartesianGrid vertical={false} />
          <XAxis dataKey="name" tick={{ fill: '#B6BEC6', fontSize: 11, cursor: 'default' }} tickMargin={14} />
          {renderYAxes()}
          <Tooltip content={<MetricTooltip metricColorMap={metricColorMap} />} />
          {selectedList.map((metric, idx) => {
            const axisId: string | number =
              selectedList.length === 2 ? (idx === 0 ? 'left' : 'right') : (selectedList.length > 2 ? metric : 'left');
            return (
              <Line
                key={metric}
                type="linear"
                dataKey={metric}
                stroke={metricColorMap[metric]}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 8 }}
                yAxisId={axisId}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BrandTrendChart;