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
          <CartesianGrid vertical={false} horizontal={true} stroke="#E6E9EC" />
          <XAxis dataKey="name" tick={{ fill: '#B6BEC6', fontSize: 11, cursor: 'default' }} tickMargin={14} />
          <YAxis axisLine={false} tick={{ fill: '#B6BEC6', fontSize: 11, cursor: 'default' }} tickMargin={14} tickCount={5} />
          <Tooltip content={<CustomTooltip brandColorMap={brandColorMap} />} />
          {Array.from(selectedBrands).map((brand) => (
            <Line
              key={brand}
              type="linear"
              dataKey={brand}
              stroke={brandColorMap[brand]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InteractiveLineChart;
