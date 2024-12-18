import React from 'react';
import { InvoiceItem, Product } from '../../types';
import { calculateItemSubtotal, calculateItemTax, formatCurrency } from '../../utils/calculations';

interface InvoiceItemsTableProps {
  items: InvoiceItem[];
  products: Product[];
}

const InvoiceItemsTable: React.FC<InvoiceItemsTableProps> = ({ items, products }) => {
  const getProduct = (productId: string) => products.find(p => p.id === productId);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              #
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Product
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Unit Price
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Discount
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Tax Rate
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Subtotal
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Tax
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {items.map((item, index) => {
            const product = getProduct(item.productId);
            return (
              <tr key={item.id}>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                  {index + 1}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  {product?.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white text-right">
                  {formatCurrency(item.unitPrice)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white text-right">
                  {item.quantity || 0}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white text-right">
                  {item.discount || 0}%
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white text-right">
                  {item.taxrate || 0}%
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white text-right">
                  {formatCurrency(calculateItemSubtotal(item))}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white text-right">
                  {formatCurrency(calculateItemTax(item))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceItemsTable;