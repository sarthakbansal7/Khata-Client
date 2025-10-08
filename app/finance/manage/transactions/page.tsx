"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from '../../../../components/finance/Sidebar';
import Navbar from '../../../../components/finance/Navbar';
import TransactionList from '../../../../components/finance/TransactionList';
import AddTransactionModal from '../../../../components/finance/AddTransactionModal';
import UploadModal from '../../../../components/finance/UploadModal';
import transactionApi, { Transaction } from '../../../../app/authContext/transactionApi';
import { useAuth } from '../../../../app/authContext/routesProtector';
import { Plus, Upload, Calendar, ChevronDown } from 'lucide-react';

export default function TransactionListPage() {
  const { user, isAuthenticated } = useAuth();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalTransactions: 0,
    limit: 10
  });
  const [dateFilter, setDateFilter] = useState({
    type: 'all' as 'all' | 'month' | 'year' | 'range',
    value: '',
    startDate: '',
    endDate: ''
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Load transactions from backend with pagination
  const loadTransactions = async (page: number = 1, resetData: boolean = true) => {
    try {
      setIsLoading(true);
      setError('');
      
      // Check if user is authenticated
      if (!isAuthenticated) {
        console.log('User not authenticated, skipping transaction load');
        setTransactions([]);
        setPagination({ currentPage: 1, totalPages: 1, totalTransactions: 0, limit: 10 });
        return;
      }

      // Build filter parameters - fetch ALL transactions, no server-side pagination
      const filters: any = {
        limit: 1000 // Get a large number to fetch all transactions
      };

      // Add date filters if any
      if (dateFilter.type === 'month' && dateFilter.value) {
        const [year, month] = dateFilter.value.split('-');
        filters.year = year;
        filters.month = month;
      } else if (dateFilter.type === 'year' && dateFilter.value) {
        filters.year = dateFilter.value;
      } else if (dateFilter.type === 'range' && dateFilter.startDate && dateFilter.endDate) {
        filters.startDate = dateFilter.startDate;
        filters.endDate = dateFilter.endDate;
      }

      console.log('Loading transactions for user:', user, 'Page:', page, 'Filters:', filters);
      const response = await transactionApi.getTransactions(filters);
      console.log('API Response:', response);
      
      if (response.success && response.data) {
        // Handle the paginated structure from backend
        const transactionsData = response.data.transactions || [];
        const paginationData = response.data.pagination || { currentPage: 1, totalPages: 1, totalTransactions: 0, limit: 10 };
        
        console.log('Setting transactions:', transactionsData);
        console.log('Pagination info:', paginationData);
        
        // Always reset data since we're fetching all transactions
        setTransactions(transactionsData);
        // Set pagination to show we have all data loaded
        setPagination({
          currentPage: 1,
          totalPages: Math.ceil(transactionsData.length / 10),
          totalTransactions: transactionsData.length,
          limit: 10
        });
      } else {
        console.log('No data in response or unsuccessful');
        if (resetData) {
          setTransactions([]);
          setPagination({ currentPage: 1, totalPages: 1, totalTransactions: 0, limit: 10 });
        }
        if (!response.success) {
          setError(response.message || 'Failed to load transactions');
        }
      }
    } catch (error: any) {
      console.error('Failed to load transactions:', error);
      setError(error.message || 'Failed to load transactions');
      if (resetData) {
        setTransactions([]);
        setPagination({ currentPage: 1, totalPages: 1, totalTransactions: 0, limit: 10 });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Load transactions on component mount and when authentication changes
  useEffect(() => {
    if (isAuthenticated && user) {
      loadTransactions(1, true);
    }
  }, [isAuthenticated, user]);

  // Reload when date filter changes
  useEffect(() => {
    if (isAuthenticated && user) {
      loadTransactions(1, true);
    }
  }, [dateFilter]);

  // Test backend connectivity
  useEffect(() => {
    const testBackend = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/health');
        const result = await response.json();
        console.log('Backend health check:', result);
      } catch (error) {
        console.error('Backend not reachable:', error);
      }
    };
    testBackend();
  }, []);

  const handleAddTransaction = () => {
    // Refresh transaction list after adding
    loadTransactions(1, true);
  };

  const handleFileUpload = () => {
    // Refresh transaction list after successful upload
    loadTransactions(1, true);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      loadTransactions(newPage, true);
    }
  };

  const handleDateFilterChange = (type: string, value: string, startDate?: string, endDate?: string) => {
    setDateFilter({
      type: type as 'all' | 'month' | 'year' | 'range',
      value,
      startDate: startDate || '',
      endDate: endDate || ''
    });
    setShowDatePicker(false);
  };

  const getCurrentDateFilterLabel = () => {
    if (dateFilter.type === 'all') return 'All Time';
    if (dateFilter.type === 'month') {
      const [year, month] = dateFilter.value.split('-');
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${monthNames[parseInt(month) - 1]} ${year}`;
    }
    if (dateFilter.type === 'year') return dateFilter.value;
    if (dateFilter.type === 'range') return `${dateFilter.startDate} to ${dateFilter.endDate}`;
    return 'Filter by Date';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-16">
        <Navbar />
        <div className="flex-1 p-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
                <p className="text-gray-600">
                  {user ? `Welcome ${user.name} - Manage your financial transactions` : 'Manage all your financial transactions'}
                </p>
                {!isAuthenticated && (
                  <p className="text-red-600 text-sm">Please log in to view your transactions</p>
                )}
              </div>
              <div className="flex items-center space-x-3">
                {/* Date Filter Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{getCurrentDateFilterLabel()}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  
                  {showDatePicker && (
                    <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <div className="p-4">
                        <div className="space-y-4">
                          {/* Quick Filters */}
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Filters</h4>
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                onClick={() => handleDateFilterChange('all', '')}
                                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                                  dateFilter.type === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                              >
                                All Time
                              </button>
                              <button
                                onClick={() => handleDateFilterChange('month', new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0'))}
                                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                                  dateFilter.type === 'month' && dateFilter.value === new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                              >
                                This Month
                              </button>
                              <button
                                onClick={() => handleDateFilterChange('year', new Date().getFullYear().toString())}
                                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                                  dateFilter.type === 'year' && dateFilter.value === new Date().getFullYear().toString() ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                              >
                                This Year
                              </button>
                              <button
                                onClick={() => handleDateFilterChange('year', (new Date().getFullYear() - 1).toString())}
                                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                                  dateFilter.type === 'year' && dateFilter.value === (new Date().getFullYear() - 1).toString() ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                              >
                                Last Year
                              </button>
                            </div>
                          </div>
                          
                          {/* Month/Year Picker */}
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Select Month/Year</h4>
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="month"
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                onChange={(e) => handleDateFilterChange('month', e.target.value)}
                              />
                              <input
                                type="number"
                                placeholder="Year"
                                min="2020"
                                max="2030"
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                onChange={(e) => handleDateFilterChange('year', e.target.value)}
                              />
                            </div>
                          </div>
                          
                          {/* Custom Date Range */}
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Custom Date Range</h4>
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="date"
                                placeholder="Start Date"
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                onChange={(e) => setDateFilter(prev => ({ ...prev, startDate: e.target.value }))}
                              />
                              <input
                                type="date"
                                placeholder="End Date"
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                onChange={(e) => setDateFilter(prev => ({ ...prev, endDate: e.target.value }))}
                              />
                            </div>
                            <button
                              onClick={() => handleDateFilterChange('range', '', dateFilter.startDate, dateFilter.endDate)}
                              className="w-full mt-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                              disabled={!dateFilter.startDate || !dateFilter.endDate}
                            >
                              Apply Range
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span>Import</span>
                </button>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Transaction</span>
                </button>
              </div>
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}
            
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading transactions...</span>
              </div>
            ) : (
              <div>
                <TransactionList 
                  transactions={transactions} 
                  dateFilter={dateFilter.type !== 'all' ? {
                    type: dateFilter.type as 'month' | 'year' | 'range',
                    value: dateFilter.value,
                    startDate: dateFilter.startDate,
                    endDate: dateFilter.endDate
                  } : undefined}
                  onTransactionUpdate={() => loadTransactions(1, true)}
                  serverSidePagination={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddTransaction}
      />
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleFileUpload}
      />
    </div>
  );
}