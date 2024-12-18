import React from 'react';
import { Trash2 } from 'lucide-react';
import { InvoiceItem, Product } from '../../types';
import ProductSelect from './ProductSelect';
import { useStore } from '../../store/useStore';
import { calculateItemSubtotal, calculateItemTax } from '../../utils/invoice';

interface InvoiceItemsProps {
  items: InvoiceItem[];
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  onUpdateItem: (index: number, item: Partial<InvoiceItem>) => void;
  errors?: Record<string, string>;
}

const InvoiceItems: React.FC<InvoiceItemsProps> = ({
  items,
  onRemoveItem,
  onUpdateItem,
  errors = {},
}) => {
  const { products } = useStore();

  const getProduct = (productId: string): Product | undefined => {
    return products.find((p) => p.id === productId);
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-16">
                #
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Product
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-28">
                Unit Price
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-28">
                Quantity
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-32">
                Discount (%)
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-32">
                Tax Rate (%)
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-28">
                Subtotal
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-28">
                Tax
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-20">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {items.map((item, index) => {
              const product = getProduct(item.productId);
              const subtotal = calculateItemSubtotal(item);
              const tax = calculateItemTax(item);

              return (
                <tr key={item.id}>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3">
                    <ProductSelect
                      value={item.productId}
                      onChange={(productId) => {
                        const selectedProduct = getProduct(productId);
                        if (selectedProduct) {
                          onUpdateItem(index, {
                            productId,
                            unitPrice: selectedProduct.unitPrice,
                            taxRate: selectedProduct.taxRate,
                          });
                        }
                      }}
                      error={errors[`items.${index}.productId`]}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.unitPrice || ''}
                      onChange={(e) => {
                        const unitPrice = parseFloat(e.target.value) || 0;
                        onUpdateItem(index, { unitPrice });
                      }}
                      className="block w-full text-right rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity || ''}
                      onChange={(e) => {
                        const quantity = parseInt(e.target.value) || 0;
                        onUpdateItem(index, { quantity });
                      }}
                      className="block w-full text-right rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={item.discount || ''}
                      onChange={(e) => {
                        const discount = Math.max(0, Math.min(100, parseInt(e.target.value) || 0));
                        onUpdateItem(index, { discount });
                      }}
                      className="block w-full text-right rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={item.taxRate || ''}
                      onChange={(e) => {
                        const taxRate = Math.max(0, Math.min(100, parseInt(e.target.value) || 0));
                        onUpdateItem(index, { taxRate });
                      }}
                      className="block w-full text-right rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-gray-900 dark:text-white">
                    {subtotal.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-gray-900 dark:text-white">
                    {tax.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      type="button"
                      onClick={() => onRemoveItem(index)}
                      className="text-red-600 hover:text-red-800 dark:hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceItems;