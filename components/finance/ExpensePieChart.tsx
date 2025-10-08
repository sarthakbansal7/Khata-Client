"use client";

import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Transaction } from '@/app/authContext/transactionApi';

interface ExpensePieChartProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

const ExpensePieChart: React.FC<ExpensePieChartProps> = ({ transactions, isLoading = false }) => {
  const expenseData = useMemo(() => {
    // Filter only expenses
    const expenses = transactions.filter(t => t.type === 'expense');
    
    // Group by category
    const categoryTotals: { [key: string]: number } = {};
    expenses.forEach(transaction => {
      const category = transaction.category || 'Other';
      categoryTotals[category] = (categoryTotals[category] || 0) + (transaction.amount || 0);
    });

    // Convert to chart data format
    const data = Object.entries(categoryTotals)
      .map(([category, amount]) => ({
        name: category,
        value: parseFloat(amount.toFixed(2))
      }))
      .sort((a, b) => b.value - a.value) // Sort by value descending
      .slice(0, 8); // Top 8 categories

    return data;
  }, [transactions]);

  // Color palette for the pie chart
  const COLORS = [
    '#3B82F6', // Blue
    '#EF4444', // Red
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#8B5CF6', // Purple
    '#F97316', // Orange
    '#06B6D4', // Cyan
    '#84CC16', // Lime
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{payload[0].name}</p>
          <p className="text-sm text-blue-600">
            Amount: <span className="font-medium">₹{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Expense Categories</h3>
        </div>
        <div className="h-80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (expenseData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Expense Categories</h3>
        </div>
        <div className="h-80 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <div className="text-4xl mb-2">📊</div>
            <p>No expense data available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Expense Categories</h3>
        <div className="text-sm text-gray-500">
          Total: ₹{expenseData.reduce((sum, item) => sum + item.value, 0).toFixed(2)}
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={expenseData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {expenseData.map((entry, index) => (
                <Cell 
                  key={`cell-₹{index}`} 
                  fill={COLORS[index % COLORS.length]}
                  stroke="#fff"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value, entry) => (
                <span style={{ color: entry.color, fontSize: '12px' }}>
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpensePieChart;