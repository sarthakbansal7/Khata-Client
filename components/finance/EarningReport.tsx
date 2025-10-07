"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { earningData } from '../../lib/mockData';
import { ChevronDown } from 'lucide-react';

const EarningReport = () => {
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm text-gray-600">{`Month: ${label}`}</p>
          <p className="text-sm font-semibold text-gray-900">
            {`Earning: $${payload[0].value.toLocaleString()}`}
          </p>
        </div>
      );
    }
    return null;
  };

  // Get current month for highlighting
  const currentMonth = new Date().toLocaleString('default', { month: 'short' });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-md font-semibold text-gray-900">Earning Report</h3>
        <div className="flex items-center space-x-1 text-xs text-gray-500 cursor-pointer hover:text-gray-700 transition-colors">
          <span>Monthly</span>
          <ChevronDown className="w-3 h-3" />
        </div>
      </div>
      
      <div className="mb-3">
        <div className="text-2xl font-bold text-gray-900">$48,574</div>
        <div className="text-xs text-green-600 font-medium">+12.5% from last month</div>
      </div>

      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={earningData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barCategoryGap="20%"
          >
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="earning" 
              radius={[4, 4, 0, 0]}
              className="hover:opacity-80 transition-opacity"
            >
              {earningData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.month === currentMonth ? '#000000' : '#374151'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EarningReport;