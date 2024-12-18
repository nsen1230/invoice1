import React from 'react';
import { X } from 'lucide-react';
import { Invoice } from '../../types';
import { useStore } from '../../store/useStore';
import InvoiceItemsTable from './InvoiceItemsTable';
import { formatCurrency } from '../../utils/calculations';

interface InvoiceDetailsModalProps {
  invoice: Invoice;
  onClose: () => void;
}

const InvoiceDetailsModal: React.FC<InvoiceDetailsModalProps> = ({ invoice, onClose }) => {
  const { customers, products } = useStore();
  const customer = customers.find(c => c.id === invoice.customerId);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Invoice Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Invoice Header */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Invoice Information
                </h3>
                <dl className="space-y-1">
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Invoice Number:</dt>
                    <dd className="text-sm text-gray-900 dark:text-white">{invoice.invoiceNumber}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Date:</dt>
                    <dd className="text-sm text-gray-900 dark:text-white">{invoice.date}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Status:</dt>
                    <dd className="text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${invoice.status === 'paid' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                          : invoice.status === 'overdue'
                          ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Customer Information
                </h3>
                {customer && (
                  <dl className="space-y-1">
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500 dark:text-gray-400">Name:</dt>
                      <dd className="text-sm text-gray-900 dark:text-white">{customer.name}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500 dark:text-gray-400">Tax ID:</dt>
                      <dd className="text-sm text-gray-900 dark:text-white">{customer.taxId}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500 dark:text-gray-400">Contact:</dt>
                      <dd className="text-sm text-gray-900 dark:text-white">{customer.contactNumber}</dd>
                    </div>
                  </dl>
                )}
              </div>
            </div>

            {/* Invoice Items */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Items
              </h3>
              <InvoiceItemsTable items={invoice.items} products={products} />
            </div>

            {/* Invoice Summary */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500 dark:text-gray-400">Subtotal</dt>
                  <dd className="text-sm text-gray-900 dark:text-white">
                    {invoice.currency} {formatCurrency(invoice.subtotal)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500 dark:text-gray-400">Tax</dt>
                  <dd className="text-sm text-gray-900 dark:text-white">
                    {invoice.currency} {formatCurrency(invoice.tax)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2">
                  <dt className="text-base font-medium text-gray-900 dark:text-white">Total</dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                    {invoice.currency} {formatCurrency(invoice.total)}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Notes and Terms */}
            {(invoice.notes || invoice.terms) && (
              <div className="space-y-4">
                {invoice.notes && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Notes</h4>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{invoice.notes}</p>
                  </div>
                )}
                {invoice.terms && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Terms</h4>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{invoice.terms}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailsModal;