import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Product } from '../types';

export const useProductModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { products, addProduct } = useStore();

  const getLastProductCode = (): string | undefined => {
    if (products.length === 0) return undefined;
    return [...products]
      .sort((a, b) => b.code.localeCompare(a.code))[0]
      .code;
  };

  const handleAddProduct = (product: Product) => {
    addProduct(product);
    setIsOpen(false);
  };

  return {
    isOpen,
    openModal: () => setIsOpen(true),
    closeModal: () => setIsOpen(false),
    handleAddProduct,
    lastProductCode: getLastProductCode(),
  };
};