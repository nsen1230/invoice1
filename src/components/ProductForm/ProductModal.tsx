import React from 'react';
import { X } from 'lucide-react';
import ProductFormContent from './ProductFormContent';
import { Product } from '../../types';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (product: Product) => void;
  lastProductCode?: string;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  lastProductCode,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add New Product
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <ProductFormContent
            onSubmit={(product) => {
              onSuccess(product);
              onClose();
            }}
            onCancel={onClose}
            lastProductCode={lastProductCode}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductModal;