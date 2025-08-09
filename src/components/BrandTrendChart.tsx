import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
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

  const renderHorizontalRefs = () => [0, 20, 40, 60, 80, 100].map((v) => (
    <ReferenceLine key={`h-${v}`} yAxisId="grid" y={v} stroke="#E6E9EC" strokeWidth={1} />
  ));

  const renderYAxes = () => {
    if (selectedList.length <= 1) {
      return (
        <YAxis
          yAxisId="left"
          axisLine={false}
          tick={{ fill: '#B6BEC6', fontSize: 11, cursor: 'default' }}
          tickMargin={14}
          domain={[0, 100]}
          ticks={[0, 20, 40, 60, 80, 100]}
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
            domain={[0, 100]}
            ticks={[0, 20, 40, 60, 80, 100]}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            axisLine={false}
            tick={{ fill: '#B6BEC6', fontSize: 11, cursor: 'default' }}
            tickMargin={14}
            domain={[0, 100]}
            ticks={[0, 20, 40, 60, 80, 100]}
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
          {/* Always-on baseline axis to anchor horizontals */}
          <YAxis
            yAxisId="grid"
            hide
            domain={[0, 100]}
            ticks={[0, 20, 40, 60, 80, 100]}
          />
          <CartesianGrid vertical={false} horizontal={true} stroke="#E6E9EC" />
          {renderHorizontalRefs()}
          <XAxis dataKey="name" tick={{ fill: '#B6BEC6', fontSize: 11, cursor: 'default' }} tickMargin={14} />
          {renderYAxes()}
          <Tooltip content={<MetricTooltip metricColorMap={metricColorMap} />} />
          {selectedList.map((metric, idx) => {
            const axisId: string | number =
              selectedList.length === 2
                ? (idx === 0 ? 'left' : 'right')
                : (selectedList.length > 2 ? metric : 'left');
            const strokeOpacity = selectedList.length > 2 ? 0.9 : 1;
            return (
              <Line
                key={metric}
                type="linear"
                dataKey={metric}
                stroke={metricColorMap[metric]}
                strokeWidth={2}
                strokeOpacity={strokeOpacity}
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