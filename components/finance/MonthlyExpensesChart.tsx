"use client";

import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Transaction } from '@/app/authContext/transactionApi';

interface MonthlyExpensesChartProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

const MonthlyExpensesChart: React.FC<MonthlyExpensesChartProps> = ({ transactions, isLoading = false }) => {
  const monthlyExpensesData = useMemo(() => {
    // Filter only expenses
    const expenses = transactions.filter(t => t.type === 'expense');
    
    // Group by month (last 12 months)
    const monthlyTotals: { [key: string]: number } = {};
    
    // Generate last 12 months
    const months = [];
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      months.push({ key: monthKey, name: monthName });
      monthlyTotals[monthKey] = 0;
    }

    // Calculate expenses for each month
    expenses.forEach(transaction => {
      if (transaction.date) {
        const date = new Date(transaction.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        if (monthlyTotals.hasOwnProperty(monthKey)) {
          monthlyTotals[monthKey] += transaction.amount || 0;
        }
      }
    });

    // Convert to chart data format
    return months.map(month => ({
      month: month.name,
      expenses: parseFloat(monthlyTotals[month.key].toFixed(2))
    }));
  }, [transactions]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-sm text-red-600">
            Expenses: <span className="font-medium">₹{payload[0].value.toLocaleString('en-IN')}</span>
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
          <h3 className="text-lg font-semibold text-gray-900">Monthly Expenses</h3>
        </div>
        <div className="h-80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  const totalExpenses = monthlyExpensesData.reduce((sum, item) => sum + item.expenses, 0);
  const avgMonthlyExpenses = monthlyExpensesData.length > 0 ? totalExpenses / monthlyExpensesData.length : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Monthly Expenses</h3>
        <div className="text-right">
          <div className="text-sm text-gray-500">Avg/Month</div>
          <div className="text-lg font-semibold text-red-600">
            ₹{avgMonthlyExpenses.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={monthlyExpensesData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
              tickFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="expenses" 
              fill="#EF4444"
              radius={[4, 4, 0, 0]}
              name="Expenses"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {monthlyExpensesData.every(item => item.expenses === 0) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-4xl mb-2">📊</div>
            <p>No expense data available</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyExpensesChart;