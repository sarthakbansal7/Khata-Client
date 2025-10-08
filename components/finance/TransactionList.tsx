"use client";

import React, { useState } from 'react';
import { Search, Filter, Download, ChevronLeft, ChevronRight, Edit2, Trash2, MoreVertical } from 'lucide-react';
import transactionApi, { Transaction } from '@/app/authContext/transactionApi';
import ExportModal from './ExportModal';

interface TransactionListProps {
  transactions?: Transaction[]; // Make optional
  dateFilter?: {
    type: 'month' | 'year' | 'range';
    value: string;
    startDate?: string;
    endDate?: string;
  };
  onTransactionUpdate?: () => void; // Callback to refresh transaction list
  onEditTransaction?: (transaction: Transaction) => void; // Callback to open edit modal
  serverSidePagination?: boolean; // Enable server-side pagination
  paginationInfo?: {
    currentPage: number;
    totalPages: number;
    totalTransactions: number;
    limit: number;
  };
  onPageChange?: (newPage: number) => void; // Callback for page changes
}

const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions = [], // Provide default empty array 
  dateFilter, 
  onTransactionUpdate,
  onEditTransaction,
  serverSidePagination = false,
  paginationInfo,
  onPageChange
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const itemsPerPage = 10;

  // Ensure transactions is always an array - robust type checking
  const safeTransactions = Array.isArray(transactions) ? transactions : [];

  // Filter transactions - always apply client-side search and type filtering
  const filteredTransactions = safeTransactions.filter(transaction => {
    const matchesSearch = (transaction.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.description?.toLowerCase().includes(searchTerm.toLowerCase())) ?? false;
    const matchesFilter = filterType === 'all' || transaction.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  // Handle delete transaction
  const handleDeleteTransaction = async (transactionId: string) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) {
      return;
    }

    setIsDeleting(transactionId);
    try {
      await transactionApi.deleteTransaction(transactionId);
      if (onTransactionUpdate) {
        onTransactionUpdate();
      }
    } catch (error: any) {
      console.error('Failed to delete transaction:', error);
      alert('Failed to delete transaction: ' + error.message);
    } finally {
      setIsDeleting(null);
    }
  };

  // Pagination logic - use server-side or client-side
  let totalPages: number;
  let currentTransactions: Transaction[];
  let displayPage: number;
  let totalCount: number;

  if (serverSidePagination && paginationInfo) {
    // Server-side pagination
    totalPages = paginationInfo.totalPages;
    displayPage = paginationInfo.currentPage;
    totalCount = paginationInfo.totalTransactions;
    // Use transactions as-is (already paginated by server)
    currentTransactions = filteredTransactions;
  } else {
    // Client-side pagination (original behavior)
    totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    displayPage = currentPage;
    totalCount = filteredTransactions.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    currentTransactions = filteredTransactions.slice(startIndex, endIndex);
  }

  // Generate filter description for export
  const getFilterDescription = (): string => {
    const filters: string[] = [];
    
    if (searchTerm) {
      filters.push(`Search: "${searchTerm}"`);
    }
    
    if (filterType !== 'all') {
      filters.push(`Type: ${filterType}`);
    }
    
    if (dateFilter) {
      if (dateFilter.type === 'month') {
        const [year, month] = dateFilter.value.split('-');
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        filters.push(`Month: ${monthNames[parseInt(month) - 1]} ${year}`);
      } else if (dateFilter.type === 'year') {
        filters.push(`Year: ${dateFilter.value}`);
      } else if (dateFilter.type === 'range') {
        filters.push(`Date Range: ${dateFilter.startDate} to ${dateFilter.endDate}`);
      }
    }
    
    return filters.length > 0 ? filters.join(', ') : 'No filters applied';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      {/* Header with filters */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            
            <button 
              onClick={() => setShowExportModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Transaction table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentTransactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="text-lg">No transactions found</div>
                    <div className="text-sm">
                      {filteredTransactions.length === 0 && transactions.length > 0
                        ? "Try adjusting your search or filter criteria"
                        : "Start by adding your first transaction"}
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              currentTransactions.map((transaction) => (
                <tr key={transaction._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>
                    <div className="font-medium">{transaction.title}</div>
                    {transaction.description && (
                      <div className="text-gray-500 text-xs">{transaction.description}</div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    transaction.type === 'income' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {transaction.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                    {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    {onEditTransaction && (
                      <button
                        onClick={() => onEditTransaction(transaction)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="Edit transaction"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => transaction._id && handleDeleteTransaction(transaction._id)}
                      disabled={isDeleting === transaction._id}
                      className="text-red-600 hover:text-red-800 transition-colors disabled:opacity-50"
                      title="Delete transaction"
                    >
                      {isDeleting === transaction._id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {serverSidePagination && paginationInfo ? (
            `Showing ${((paginationInfo.currentPage - 1) * paginationInfo.limit) + 1} to ${Math.min(paginationInfo.currentPage * paginationInfo.limit, paginationInfo.totalTransactions)} of ${paginationInfo.totalTransactions} results`
          ) : (
            `Showing ${((displayPage - 1) * itemsPerPage) + 1} to ${Math.min(displayPage * itemsPerPage, totalCount)} of ${totalCount} results`
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              if (serverSidePagination && onPageChange) {
                onPageChange(Math.max(1, displayPage - 1));
              } else {
                setCurrentPage(Math.max(1, currentPage - 1));
              }
            }}
            disabled={displayPage === 1}
            className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <span className="px-3 py-2 text-sm text-gray-700">
            Page {displayPage} of {totalPages}
          </span>
          
          <button
            onClick={() => {
              if (serverSidePagination && onPageChange) {
                onPageChange(Math.min(totalPages, displayPage + 1));
              } else {
                setCurrentPage(Math.min(totalPages, currentPage + 1));
              }
            }}
            disabled={displayPage === totalPages}
            className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        transactions={filteredTransactions} // Export filtered data
        filterInfo={getFilterDescription()}
      />
    </div>
  );
};

export default TransactionList;