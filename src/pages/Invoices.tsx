import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, PlusCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import InvoiceListItem from '../components/InvoiceList/InvoiceListItem';

const Invoices: React.FC = () => {
  const { invoices } = useStore();

  const sortedInvoices = [...invoices].sort((a, b) => {
    // Sort by date descending, then by invoice number descending
    const dateComparison = new Date(b.date).getTime() - new Date(a.date).getTime();
    if (dateComparison !== 0) return dateComparison;
    return b.invoiceNumber.localeCompare(a.invoiceNumber);
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <FileText className="w-6 h-6 mr-2 text-gray-500 dark:text-gray-400" />
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Invoices</h1>
        </div>
        <Link
          to="/invoices/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          New Invoice
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        {sortedInvoices.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Invoice Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {sortedInvoices.map((invoice) => (
                <InvoiceListItem key={invoice.id} invoice={invoice} />
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No invoices created yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Invoices;