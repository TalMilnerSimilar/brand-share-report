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
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<MetricTooltip metricColorMap={metricColorMap} />} />
          {Array.from(selectedMetrics).map((metric) => (
            <Line
              key={metric}
              type="linear"
              dataKey={metric}
              stroke={metricColorMap[metric]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8 }}
              yAxisId={0}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BrandTrendChart;