import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Customer } from '../types';

export const useCustomerModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { addCustomer } = useStore();

  const handleAddCustomer = (customer: Customer) => {
    addCustomer(customer);
    setIsOpen(false);
  };

  return {
    isOpen,
    openModal: () => setIsOpen(true),
    closeModal: () => setIsOpen(false),
    handleAddCustomer,
  };
};