"use client";

import React from 'react';
import { Search, Bell } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Greeting */}
        <div className="hidden lg:block">
          <h1 className="text-xl font-semibold text-gray-900">Good Morning, John!</h1>
          <p className="text-sm text-gray-500">Business Manager</p>
        </div>

        {/* Mobile menu button */}
        <button className="lg:hidden p-2">
          <span className="text-xl">☰</span>
        </button>

        {/* Search and Profile */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          </div>

          {/* Notifications */}
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-2">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="hidden lg:block text-sm font-medium text-gray-700">John Doe</span>
            <span className="hidden lg:block text-gray-400">▼</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;