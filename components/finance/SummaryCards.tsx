"use client";

import React from 'react';
import { summaryData } from '../../lib/mockData';
import { DollarSign, FileText, CreditCard, MoreHorizontal } from 'lucide-react';

const SummaryCards = () => {
  const cards = [
    {
      title: 'Recent account balance',
      value: summaryData.recentBalance,
      icon: DollarSign,
      format: 'currency',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Number of your transaction',
      value: summaryData.transactionCount,
      icon: FileText,
      format: 'number',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'Your total spending',
      value: summaryData.totalSpending,
      icon: CreditCard,
      format: 'currency',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ];

  const formatValue = (value: number, format: string) => {
    if (format === 'currency') {
      return `$${(value / 1000).toFixed(0)},000`;
    }
    return value.toString();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 ${card.bgColor} rounded-lg flex items-center justify-center`}>
              <card.icon className={`w-5 h-5 ${card.iconColor}`} />
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-gray-900">
              {formatValue(card.value, card.format)}
            </h3>
            <p className="text-xs text-gray-500">{card.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;