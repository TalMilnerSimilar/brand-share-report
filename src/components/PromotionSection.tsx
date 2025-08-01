import React from 'react';
import LinkTile from './LinkTile';

export const PromotionSection: React.FC = () => {
  const promotionLinks = [
    'Amazon Funnel',
    'Trend Analysis',
    'Brand Sales Performance',
    'Brand Search Optimization'
  ];

  return (
    <div className="bg-white border border-blue-600 rounded-lg p-6">
      <div className="flex items-center gap-6 mb-6">
        {/* Icon */}
        <div className="w-12 h-12 flex items-center justify-center">
            <img src="/icons/Group 131.svg" alt="Promotion Icon" className="w-full h-full" />
          </div>

        {/* Text Content */}
        <div className="flex-1">
          <h3 className="text-sm font-bold text-gray-900 mb-2">
            Dig deeper into what's moving your share
          </h3>
          <p className="text-sm text-gray-600">
            Jump into focused views to see how shoppers find, choose, and buy your products—and pinpoint the levers to pull next.
          </p>
        </div>
      </div>

      {/* Action Links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {promotionLinks.map((link, index) => (
          <LinkTile key={index} text={link} />
        ))}
      </div>
    </div>
  );
}; 