"use client";

import React, { useState } from 'react';
import { RotateCcw, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Transaction } from '../../app/authContext/transactionApi';

interface TransactionHistoryProps {
  transactions: Transaction[];
  isLoading: boolean;
}

const TransactionHistory = ({ transactions, isLoading }: TransactionHistoryProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 8; // Show 8 transactions per page for better balance
  
  // Calculate pagination
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);
  const startIndex = (currentPage - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;
  const currentTransactions = transactions.slice(startIndex, endIndex);
  
  const getStatusBadge = (type: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (type.toLowerCase()) {
      case 'income':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'expense':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 bg-gray-200 rounded w-40"></div>
          <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

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
                  Type
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
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  No transactions found
                </td>
              </tr>
            ) : (
              currentTransactions.map((transaction) => (
                <tr key={transaction._id || Math.random()} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 text-sm text-gray-900 font-medium">
                    {transaction._id ? transaction._id.slice(-6).toUpperCase() : 'N/A'}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {transaction.category}
                  </td>
                  <td className="py-4 px-4">
                    <span className={getStatusBadge(transaction.type)}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900 font-medium text-right">
                    ₹{transaction.amount.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {transactions.length > transactionsPerPage && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1}-{Math.min(endIndex, transactions.length)} of {transactions.length} transactions
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 text-sm font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;