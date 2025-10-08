import { Transaction } from '@/app/authContext/transactionApi';

export interface ExportData {
  transactions: Transaction[];
  summary: {
    totalIncome: number;
    totalExpenses: number;
    balance: number;
    transactionCount: number;
    dateRange: string;
    categories: { [key: string]: number };
  };
}

// Calculate summary statistics
export const calculateSummary = (transactions: Transaction[]): ExportData['summary'] => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + (t.amount || 0), 0);
    
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + (t.amount || 0), 0);
    
  const balance = totalIncome - totalExpenses;
  
  // Calculate category breakdown
  const categories: { [key: string]: number } = {};
  transactions.forEach(t => {
    const category = t.category || 'Unknown';
    categories[category] = (categories[category] || 0) + (t.amount || 0);
  });
  
  // Determine date range
  const dates = transactions
    .map(t => t.date ? new Date(t.date) : new Date())
    .sort((a, b) => a.getTime() - b.getTime());
  
  const dateRange = dates.length > 0 
    ? `${dates[0].toLocaleDateString()} - ${dates[dates.length - 1].toLocaleDateString()}`
    : 'No transactions';
  
  return {
    totalIncome,
    totalExpenses,
    balance,
    transactionCount: transactions.length,
    dateRange,
    categories
  };
};

// Export to CSV
export const exportToCSV = (data: ExportData): void => {
  const { transactions, summary } = data;
  
  // Create CSV content
  let csvContent = '';
  
  // Add summary section
  csvContent += 'TRANSACTION SUMMARY\n';
  csvContent += `Export Date,${new Date().toLocaleDateString()}\n`;
  csvContent += `Date Range,${summary.dateRange}\n`;
  csvContent += `Total Transactions,${summary.transactionCount}\n`;
  csvContent += `Total Income,$${summary.totalIncome.toFixed(2)}\n`;
  csvContent += `Total Expenses,$${summary.totalExpenses.toFixed(2)}\n`;
  csvContent += `Net Balance,$${summary.balance.toFixed(2)}\n`;
  csvContent += '\n';
  
  // Add category breakdown
  csvContent += 'CATEGORY BREAKDOWN\n';
  csvContent += 'Category,Amount\n';
  Object.entries(summary.categories).forEach(([category, amount]) => {
    csvContent += `${category},$${amount.toFixed(2)}\n`;
  });
  csvContent += '\n';
  
  // Add transaction details
  csvContent += 'TRANSACTION DETAILS\n';
  csvContent += 'Date,Title,Category,Type,Amount,Description,Payment Method,Recipient\n';
  
  transactions.forEach(transaction => {
    const row = [
      transaction.date || '',
      `"${(transaction.title || '').replace(/"/g, '""')}"`, // Escape quotes with null check
      transaction.category || '',
      transaction.type || '',
      (transaction.amount || 0).toFixed(2),
      `"${(transaction.description || '').replace(/"/g, '""')}"`,
      transaction.paymentMethod || '',
      transaction.recipient || ''
    ].join(',');
    csvContent += row + '\n';
  });
  
  // Download the file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `transactions-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Simple PDF export without external dependencies
export const exportToPDF = (data: ExportData): void => {
  const { transactions, summary } = data;
  
  // Create HTML content for PDF conversion
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Transaction Report</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .summary { background: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
        .summary-row { display: flex; justify-content: space-between; margin-bottom: 5px; }
        .categories { margin-bottom: 20px; }
        .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .table th, .table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .table th { background-color: #f2f2f2; }
        .income { color: green; font-weight: bold; }
        .expense { color: red; font-weight: bold; }
        .balance-positive { color: green; font-weight: bold; }
        .balance-negative { color: red; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Transaction Report</h1>
        <p>Generated on ${new Date().toLocaleDateString()}</p>
        <p>Date Range: ${summary.dateRange}</p>
      </div>
      
      <div class="summary">
        <h2>Financial Summary</h2>
        <div class="summary-row">
          <span>Total Transactions:</span>
          <span>${summary.transactionCount}</span>
        </div>
        <div class="summary-row">
          <span>Total Income:</span>
          <span class="income">$${summary.totalIncome.toFixed(2)}</span>
        </div>
        <div class="summary-row">
          <span>Total Expenses:</span>
          <span class="expense">$${summary.totalExpenses.toFixed(2)}</span>
        </div>
        <div class="summary-row">
          <span>Net Balance:</span>
          <span class="${summary.balance >= 0 ? 'balance-positive' : 'balance-negative'}">$${summary.balance.toFixed(2)}</span>
        </div>
      </div>
      
      <div class="categories">
        <h2>Category Breakdown</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(summary.categories).map(([category, amount]) => `
              <tr>
                <td>${category}</td>
                <td>$${amount.toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      
      <div>
        <h2>Transaction Details</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${transactions.map(t => `
              <tr>
                <td>${t.date ? new Date(t.date).toLocaleDateString() : ''}</td>
                <td>${t.title || ''}</td>
                <td>${t.category || ''}</td>
                <td class="${t.type}">${(t.type || '').toUpperCase()}</td>
                <td>$${(t.amount || 0).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </body>
    </html>
  `;

  // Create a new window and print it as PDF
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load then print
    printWindow.onload = () => {
      printWindow.print();
      setTimeout(() => {
        printWindow.close();
      }, 1000);
    };
  } else {
    // Fallback: create downloadable HTML file
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transaction-report-${new Date().toISOString().split('T')[0]}.html`;
    link.click();
    URL.revokeObjectURL(url);
    
    alert('PDF export opened in a new window. Please use your browser\'s print function to save as PDF.');
  }
};