"use client";

import React from 'react';
import { TrendingDown, TrendingUp, Calendar } from 'lucide-react';

const LastMonthTransactions = () => {
  // Mock data for last month transactions
  const lastMonthTransactions = [
    { id: 1, description: 'Amazon Purchase', date: 'Sep 28', amount: 156.90, type: 'expense' },
    { id: 2, description: 'Salary Deposit', date: 'Sep 30', amount: 3200.00, type: 'income' },
    { id: 3, description: 'Grocery Store', date: 'Sep 25', amount: 89.45, type: 'expense' },
    { id: 4, description: 'Gas Station', date: 'Sep 22', amount: 52.30, type: 'expense' },
    { id: 5, description: 'Netflix Subscription', date: 'Sep 15', amount: 15.99, type: 'expense' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-md font-semibold text-gray-900">Last Month Transactions</h3>
        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="w-3 h-3 mr-1" />
          <span>September 2025</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {lastMonthTransactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between group hover:bg-gray-50 p-2 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors ${
                transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {transaction.type === 'income' ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                <div className="text-xs text-gray-500">{transaction.date}</div>
              </div>
            </div>
            <div className={`text-sm font-semibold ${
              transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
            }`}>
              {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-100">
        <button className="w-full text-xs text-blue-600 hover:text-blue-700 font-medium">
          View All Transactions
        </button>
      </div>
    </div>
  );
};

export default LastMonthTransactions;