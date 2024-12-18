import React from 'react';
import { Trash2 } from 'lucide-react';
import { InvoiceItem, Product } from '../../types';
import ProductSelect from './ProductSelect';

interface InvoiceTableRowProps {
  item: InvoiceItem;
  index: number;
  onRemove: () => void;
  onUpdate: (updates: Partial<InvoiceItem>) => void;
  error?: string;
  getProduct: (productId: string) => Product | undefined;
}

const InvoiceTableRow: React.FC<InvoiceTableRowProps> = ({
  item,
  index,
  onRemove,
  onUpdate,
  error,
  getProduct,
}) => {
  const calculateSubtotal = () => {
    const subtotal = item.quantity * (item.unitPrice || 0);
    return subtotal - (subtotal * ((item.discount || 0) / 100));
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    return subtotal * ((item.taxRate || 0) / 100);
  };

  return (
    <tr>
      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
        {index + 1}
      </td>
      <td className="px-4 py-3">
        <ProductSelect
          value={item.productId}
          onChange={(productId) => {
            const selectedProduct = getProduct(productId);
            if (selectedProduct) {
              onUpdate({
                productId,
                unitPrice: selectedProduct.unitPrice,
                taxRate: selectedProduct.taxRate,
              });
            }
          }}
          error={error}
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
            onUpdate({ unitPrice });
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
            onUpdate({ quantity });
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
            onUpdate({ discount });
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
            onUpdate({ taxRate });
          }}
          className="block w-full text-right rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </td>
      <td className="px-4 py-3 text-right font-medium text-gray-900 dark:text-white">
        {calculateSubtotal().toFixed(2)}
      </td>
      <td className="px-4 py-3 text-right font-medium text-gray-900 dark:text-white">
        {calculateTax().toFixed(2)}
      </td>
      <td className="px-4 py-3 text-center">
        <button
          type="button"
          onClick={onRemove}
          className="text-red-600 hover:text-red-800 dark:hover:text-red-400"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
};

export default InvoiceTableRow;