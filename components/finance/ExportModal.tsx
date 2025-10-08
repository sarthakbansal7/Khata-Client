"use client";

import React, { useState } from 'react';
import { X, Download, FileText, FileSpreadsheet } from 'lucide-react';
import { Transaction } from '@/app/authContext/transactionApi';
import { exportToCSV, exportToPDF, calculateSummary } from '@/lib/exportService';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[];
  filterInfo: string; // Description of current filter state
}

const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  transactions,
  filterInfo
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'csv' | 'pdf'>('csv');
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleExport = async () => {
    try {
      setIsExporting(true);
      
      // Calculate summary data
      const summary = calculateSummary(transactions);
      const exportData = { transactions, summary };

      if (selectedFormat === 'csv') {
        exportToCSV(exportData);
      } else {
        exportToPDF(exportData);
      }

      // Close modal after a short delay
      setTimeout(() => {
        onClose();
        setIsExporting(false);
      }, 1000);

    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
      setIsExporting(false);
    }
  };

  const summary = calculateSummary(transactions);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Export Transactions</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            disabled={isExporting}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Export Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Export Summary</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>Transactions:</span>
              <span className="font-medium">{transactions.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Income:</span>
              <span className="font-medium text-green-600">${summary.totalIncome.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Expenses:</span>
              <span className="font-medium text-red-600">${summary.totalExpenses.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t pt-1 mt-2">
              <span>Net Balance:</span>
              <span className={`font-medium ${summary.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${summary.balance.toFixed(2)}
              </span>
            </div>
          </div>
          {filterInfo && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <span className="text-xs text-gray-500">Filter: {filterInfo}</span>
            </div>
          )}
        </div>

        {/* Format Selection */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Choose Export Format</h4>
          <div className="space-y-3">
            <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="format"
                value="csv"
                checked={selectedFormat === 'csv'}
                onChange={(e) => setSelectedFormat(e.target.value as 'csv')}
                className="mr-3"
                disabled={isExporting}
              />
              <FileSpreadsheet className="w-5 h-5 text-green-500 mr-3" />
              <div>
                <div className="text-sm font-medium text-gray-900">CSV File</div>
                <div className="text-xs text-gray-500">
                  Spreadsheet format with summary and transaction details
                </div>
              </div>
            </label>

            <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="format"
                value="pdf"
                checked={selectedFormat === 'pdf'}
                onChange={(e) => setSelectedFormat(e.target.value as 'pdf')}
                className="mr-3"
                disabled={isExporting}
              />
              <FileText className="w-5 h-5 text-red-500 mr-3" />
              <div>
                <div className="text-sm font-medium text-gray-900">PDF Report</div>
                <div className="text-xs text-gray-500">
                  Formatted report with analytics and transaction table
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={isExporting}
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 flex items-center space-x-2"
          >
            {isExporting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Export {selectedFormat.toUpperCase()}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;