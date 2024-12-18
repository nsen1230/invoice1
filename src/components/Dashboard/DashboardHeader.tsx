import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

const DashboardHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
      <Link
        to="/invoices/new"
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        <PlusCircle className="w-4 h-4 mr-2" />
        New Invoice
      </Link>
    </div>
  );
};

export default DashboardHeader;