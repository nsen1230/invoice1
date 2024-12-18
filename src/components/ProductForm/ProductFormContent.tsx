import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '../../validations/product';
import { Product, TAX_TYPES, TaxType } from '../../types';
import { v4 as uuidv4 } from 'uuid';

interface ProductFormProps {
  onSubmit: (product: Product) => void;
  onCancel: () => void;
  initialData?: Partial<Product>;
  lastProductCode?: string;
}

const ProductFormContent: React.FC<ProductFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  lastProductCode,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name || '',
      unitPrice: initialData?.unitPrice || 0,
      taxType: initialData?.taxType || '06',
      taxRate: initialData?.taxRate || 0,
    },
  });

  const generateProductCode = (prefix: string = 'P'): string => {
    if (!lastProductCode) {
      return `${prefix}0001`;
    }
    const currentNumber = parseInt(lastProductCode.replace(prefix, ''));
    return `${prefix}${(currentNumber + 1).toString().padStart(4, '0')}`;
  };

  const onFormSubmit = (data: any) => {
    const product: Product = {
      id: initialData?.id || uuidv4(),
      code: initialData?.code || generateProductCode(),
      ...data,
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onSubmit(product);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Product Name
        </label>
        <input
          type="text"
          {...register('name')}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Unit Price
        </label>
        <input
          type="number"
          step="0.01"
          {...register('unitPrice', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.unitPrice && (
          <p className="mt-1 text-sm text-red-600">{errors.unitPrice.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Tax Type
        </label>
        <select
          {...register('taxType')}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          {(Object.entries(TAX_TYPES) as [TaxType, string][]).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {errors.taxType && (
          <p className="mt-1 text-sm text-red-600">{errors.taxType.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Tax Rate (%)
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          max="100"
          {...register('taxRate', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.taxRate && (
          <p className="mt-1 text-sm text-red-600">{errors.taxRate.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Adding...' : 'Add Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductFormContent;