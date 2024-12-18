import React from 'react';
import { useStore } from '../../store/useStore';
import { Product } from '../../types';

interface ProductSelectProps {
  value?: string;
  onChange: (productId: string) => void;
  error?: string;
}

const ProductSelect: React.FC<ProductSelectProps> = ({ value, onChange, error }) => {
  const { products } = useStore();

  return (
    <div>
      <label htmlFor="product" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {/* Product123 - Removed this line */}
      </label>
      <div className="mt-1">
        <select
          id="product"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className={`shadow-sm block w-full sm:text-sm rounded-md ${
            error
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500'
          }`}
        >
          <option value="">Select a product</option>
          {products.map((product: Product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default ProductSelect;