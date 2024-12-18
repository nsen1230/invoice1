import React from 'react';
import { X } from 'lucide-react';
import CustomerForm from './index';
import { Customer } from '../../types';

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (customer: Customer) => void;
}

const CustomerModal: React.FC<CustomerModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add New Customer
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <CustomerForm
            onSubmit={(customer) => {
              onSuccess(customer);
              onClose();
            }}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerModal;