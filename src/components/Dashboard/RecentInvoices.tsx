import React, { useState } from 'react';
import { Invoice } from '../../types';
import InvoiceDetailsModal from '../InvoiceDetails/InvoiceDetailsModal';

interface RecentInvoicesProps {
  invoices: Invoice[];
}

const RecentInvoices: React.FC<RecentInvoicesProps> = ({ invoices }) => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const sortedInvoices = [...invoices].sort((a, b) => {
    // Sort by date descending, then by invoice number descending
    const dateComparison = new Date(b.date).getTime() - new Date(a.date).getTime();
    if (dateComparison !== 0) return dateComparison;
    return b.invoiceNumber.localeCompare(a.invoiceNumber);
  });

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Recent Invoices
      </h2>
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {sortedInvoices.length > 0 ? (
            sortedInvoices.slice(0, 5).map((invoice) => (
              <li key={invoice.id}>
                <button
                  onClick={() => setSelectedInvoice(invoice)}
                  className="w-full text-left block hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400 truncate">
                        {invoice.invoiceNumber}
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(
                            invoice.status
                          )}`}
                        >
                          {invoice.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <div className="sm:flex">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(invoice.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-sm text-gray-900 dark:text-gray-100">
                        {invoice.currency} {(invoice.total || 0).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </button>
              </li>
            ))
          ) : (
            <li className="px-4 py-4 text-center text-gray-500 dark:text-gray-400">
              No invoices yet
            </li>
          )}
        </ul>
      </div>

      {selectedInvoice && (
        <InvoiceDetailsModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      )}
    </div>
  );
};

export default RecentInvoices;