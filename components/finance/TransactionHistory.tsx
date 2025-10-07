"use client";

import React from 'react';
import { transactionData } from '../../lib/mockData';
import { RotateCcw, ArrowUpDown } from 'lucide-react';

const TransactionHistory = () => {
  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status.toLowerCase()) {
      case 'success':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'failed':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Transaction History</h2>
        <button className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg">
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                <button className="flex items-center hover:text-gray-700">
                  TxnID
                  <ArrowUpDown className="ml-1 w-3 h-3" />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                <button className="flex items-center hover:text-gray-700">
                  Date
                  <ArrowUpDown className="ml-1 w-3 h-3" />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                <button className="flex items-center hover:text-gray-700">
                  Category
                  <ArrowUpDown className="ml-1 w-3 h-3" />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                <button className="flex items-center hover:text-gray-700">
                  Status
                  <ArrowUpDown className="ml-1 w-3 h-3" />
                </button>
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-500 text-sm">
                <button className="flex items-center hover:text-gray-700 ml-auto">
                  Amount
                  <ArrowUpDown className="ml-1 w-3 h-3" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {transactionData.map((transaction, index) => (
              <tr key={index} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4 text-sm text-gray-900 font-medium">
                  {transaction.id}
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">
                  {transaction.date}
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">
                  {transaction.category}
                </td>
                <td className="py-4 px-4">
                  <span className={getStatusBadge(transaction.status)}>
                    {transaction.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-gray-900 font-medium text-right">
                  ${transaction.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;