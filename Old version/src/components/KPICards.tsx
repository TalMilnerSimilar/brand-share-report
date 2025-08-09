import React from 'react';
import { kpiCardData } from '../data/kpiCardData';
import Tooltip from './Tooltip';

const IconInfo16Px: React.FC = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

interface CardData {
  title: string;
  subtitle: string;
  myBrandShare: string;
  myBrandShareChange: string;
  isPositive: boolean;
  categoryTotal: string;
  categoryTotalChange: string;
  categoryIsPositive: boolean;
  compAvg: string;
  compAvgChange: string;
  compAvgIsPositive: boolean;
}

interface CardProps {
  card: CardData;
  className?: string;
}

const Card: React.FC<CardProps> = ({ card, className }) => {
  const getShareTooltip = (metricTitle: string) => {
    const tooltips: Record<string, string> = {
      'Product Views': 'Higher share means more customers are discovering your products, leading to increased sales opportunities',
      'Units Sold': 'Higher share means you\'re capturing more market demand and generating more revenue',
      'Revenue': 'Higher share means you\'re generating more sales revenue and have stronger market position',
      'Branded Search Volume': 'Higher share means more customers are searching for your brand specifically, indicating strong brand awareness',
      'Search Visibility': 'Higher share means your products appear more often in search results, increasing organic traffic',
      'Share of Paid Clicks': 'Higher share means your ads are more effective and you\'re capturing more paid traffic',
      'Share of Total Clicks': 'Higher share means you\'re dominating both organic and paid search, maximizing traffic capture'
    };
    return tooltips[metricTitle] || 'Your brand\'s share of the total market for this metric';
  };

  return (
  <div className={`bg-white border border-gray-200 rounded-md ${className}`}>
    <div className="pl-6 pr-0 py-4 border-b border-[#E6E9EC]">
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-medium text-[#092540] leading-[20px]">{card.title}</h3>
        <p className="text-sm text-[#6b7c8c] leading-[16px]">{card.subtitle}</p>
      </div>
    </div>
    <div className="p-4">
      <div className={`${card.isPositive ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border rounded p-4 mb-4`}>
        <div className="flex items-center justify-center gap-1 mb-2">
          <span className="text-sm text-gray-900">My Brand Share</span>
          <Tooltip content={getShareTooltip(card.title)}>
            <div className="cursor-default">
              <IconInfo16Px />
            </div>
          </Tooltip>
        </div>
        <div className="text-center mb-2">
          <span className="text-2xl font-medium text-gray-900">{card.myBrandShare}</span>
        </div>
        <div className={`${card.isPositive ? 'bg-green-100' : 'bg-red-100'} rounded text-center`}>
          <span className={`text-xs font-bold ${card.isPositive ? 'text-green-800' : 'text-red-800'}`}>{card.myBrandShareChange}</span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-900">Category Total</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-900">{card.categoryTotal}</span>
            <span className={`text-[10px] font-bold tracking-[0.3px] leading-[12px] ${card.categoryIsPositive ? 'bg-[#e6faf5] text-[#009688]' : 'bg-[#ffe6e6] text-[#bb3f3f]'} px-2 py-0.5 rounded-[26px]`}>{card.categoryTotalChange}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-900">Comp' AVG</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-900">{card.compAvg}</span>
            <span className={`text-[10px] font-bold tracking-[0.3px] leading-[12px] ${card.compAvgIsPositive ? 'bg-[#e6faf5] text-[#009688]' : 'bg-[#ffe6e6] text-[#bb3f3f]'} px-2 py-0.5 rounded-[12px]`}>{card.compAvgChange}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

interface KPICardsProps {
  activeAnalysisTab: string;
}

const KPICards: React.FC<KPICardsProps> = ({ activeAnalysisTab }) => {
  const isFunnelAnalysis = activeAnalysisTab === 'Funnel Analysis';
  const cards = isFunnelAnalysis ? kpiCardData.funnelAnalysis : kpiCardData.brandShare;

  return (
    <div className={isFunnelAnalysis ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" : "flex gap-4"}>
      {cards.map((card, index) => (
        <Card key={index} card={card} className={isFunnelAnalysis ? '' : 'flex-1'} />
      ))}
    </div>
  );
};

export default KPICards;