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
import CustomTooltip from './CustomTooltip';

interface InteractiveLineChartProps {
  selectedBrands: Set<string>;
  brandColorMap: Record<string, string>;
  metricIdx: number;
  chartData: any;
  metricKeys: readonly string[];
}

const InteractiveLineChart: React.FC<InteractiveLineChartProps> = ({
  selectedBrands,
  brandColorMap,
  metricIdx,
  chartData,
  metricKeys,
}) => {
  const data = chartData[metricKeys[metricIdx]];

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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip brandColorMap={brandColorMap} />} />
          {Array.from(selectedBrands).map((brand) => (
            <Line
              key={brand}
              type="monotone"
              dataKey={brand}
              stroke={brandColorMap[brand]}
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InteractiveLineChart;
