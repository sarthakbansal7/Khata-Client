"use client";

import React from 'react';
import Sidebar from '../../components/finance/Sidebar';
import Navbar from '../../components/finance/Navbar';
import SummaryCards from '../../components/finance/SummaryCards';
import EarningReport from '../../components/finance/EarningReport';
import TransactionHistory from '../../components/finance/TransactionHistory';
import FormationStatus from '../../components/finance/FormationStatus';
import LastMonthTransactions from '../../components/finance/LastMonthTransactions';
import MostPaidRecipients from '../../components/finance/MostPaidRecipients';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-16">
        {/* Navbar */}
        <Navbar />
        
        {/* Dashboard Content */}
        <div className="flex-1 p-4">
          <div className="max-w-6xl mx-auto">
            {/* Summary Cards */}
            <SummaryCards />
            
            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-4">
                <EarningReport />
                <TransactionHistory />
              </div>
              
              {/* Right Column */}
              <div className="space-y-4">
                <FormationStatus />
                <LastMonthTransactions />
                <MostPaidRecipients />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;