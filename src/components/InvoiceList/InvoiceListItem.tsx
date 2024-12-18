import React, { useState } from 'react';
import { Invoice } from '../../types';
import InvoiceDetailsModal from '../InvoiceDetails/InvoiceDetailsModal';

interface InvoiceListItemProps {
  invoice: Invoice;
}

const InvoiceListItem: React.FC<InvoiceListItemProps> = ({ invoice }) => {
  const [showDetails, setShowDetails] = useState(false);

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
    <>
      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600 dark:text-indigo-400">
          <button
            onClick={() => setShowDetails(true)}
            className="hover:underline focus:outline-none focus:underline"
          >
            {invoice.invoiceNumber}
          </button>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          {invoice.date}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(
              invoice.status
            )}`}
          >
            {invoice.status}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 text-right">
          {invoice.currency} {(invoice.total || 0).toFixed(2)}
        </td>
      </tr>

      {showDetails && (
        <InvoiceDetailsModal
          invoice={invoice}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
};

export default InvoiceListItem;