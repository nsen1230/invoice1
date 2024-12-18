import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FileText, Users, Package, Building2, Settings, Sun, Moon } from 'lucide-react';
import { useStore } from '../store/useStore';

const Layout: React.FC = () => {
  const { darkMode, toggleDarkMode } = useStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link
                to="/"
                className="flex items-center px-2 py-2 text-gray-900 dark:text-white font-medium"
              >
                <FileText className="w-6 h-6 mr-2" />
                Invoice System
              </Link>
              <div className="ml-6 flex space-x-4">
                <Link
                  to="/invoices"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Invoices
                </Link>
                <Link
                  to="/customers"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Customers
                </Link>
                <Link
                  to="/products"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <Package className="w-4 h-4 mr-2" />
                  Products
                </Link>
                <Link
                  to="/business"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  Business Profile
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Link>
              </div>
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;