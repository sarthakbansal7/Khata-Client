"use client";

import React, { useState } from 'react';
import { X, Upload, Download, FileText, Image, AlertCircle } from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (transactions: any[]) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [activeTab, setActiveTab] = useState<'csv' | 'receipts'>('csv');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      setUploadedFiles(prev => [...prev, ...files]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...files]);
    }
  };

  const downloadTemplate = () => {
    const csvContent = "date,description,category,type,amount\n2024-01-15,Grocery Shopping,Food & Dining,expense,85.50\n2024-01-14,Salary,Income,income,3000.00\n2024-01-13,Gas Station,Transportation,expense,45.00";
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'transaction_template.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const processFiles = async () => {
    const csvFiles = uploadedFiles.filter(file => 
      file.type === 'text/csv' || file.name.endsWith('.csv')
    );
    
    if (csvFiles.length === 0) {
      alert('Please upload at least one CSV file to process transactions.');
      return;
    }

    try {
      const allTransactions: any[] = [];
      
      for (const file of csvFiles) {
        const text = await file.text();
        const lines = text.split('\n').filter(line => line.trim());
        
        // Skip header row
        const dataLines = lines.slice(1);
        
        for (const line of dataLines) {
          const [date, description, category, type, amount] = line.split(',').map(field => field.trim());
          
          if (date && description && category && type && amount) {
            allTransactions.push({
              id: Date.now() + Math.random(), // Unique ID
              date: date.replace(/"/g, ''), // Remove quotes if present
              description: description.replace(/"/g, ''),
              category: category.replace(/"/g, ''),
              type: type.replace(/"/g, ''),
              amount: parseFloat(amount.replace(/"/g, ''))
            });
          }
        }
      }
      
      if (allTransactions.length > 0) {
        onUpload(allTransactions);
        setUploadedFiles([]);
        onClose();
        alert(`Successfully imported ${allTransactions.length} transactions!`);
      } else {
        alert('No valid transactions found in the CSV file(s).');
      }
    } catch (error) {
      console.error('Error processing CSV files:', error);
      alert('Error processing CSV files. Please check the file format.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Upload & Import</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-4">
          <button
            onClick={() => setActiveTab('csv')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'csv'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Bulk Import CSV
          </button>
          <button
            onClick={() => setActiveTab('receipts')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'receipts'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Upload Receipts
          </button>
        </div>

        {/* CSV Tab */}
        {activeTab === 'csv' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Download template, fill with your data, and upload CSV file.
              </p>
              <button
                onClick={downloadTemplate}
                className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                <span>Template</span>
              </button>
            </div>

            <div
              className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                multiple
              />
              
              <FileText className="mx-auto h-8 w-8 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Upload CSV files</h3>
              <p className="mt-1 text-xs text-gray-500">
                Drag and drop or click to select CSV, XLSX, XLS files
              </p>
            </div>
          </div>
        )}

        {/* Receipts Tab */}
        {activeTab === 'receipts' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Upload receipt images or PDF files for record keeping.
            </p>

            <div
              className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                multiple
              />
              
              <Image className="mx-auto h-8 w-8 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Upload receipts</h3>
              <p className="mt-1 text-xs text-gray-500">
                Drag and drop or click to select JPG, PNG, PDF files
              </p>
            </div>
          </div>
        )}

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            <h3 className="text-sm font-medium text-gray-900">Uploaded Files</h3>
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  {file.type.includes('image') ? (
                    <Image className="w-4 h-4 text-blue-500" />
                  ) : (
                    <FileText className="w-4 h-4 text-green-500" />
                  )}
                  <span className="text-sm text-gray-900">{file.name}</span>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700 text-xs"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 mt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={processFiles}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            disabled={uploadedFiles.length === 0}
          >
            Process Files
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;