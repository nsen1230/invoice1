import React from 'react';
import { useStore } from '../../store/useStore';
import { Customer } from '../../types';

interface CustomerSelectProps {
  value: string;
  onChange: (customerId: string) => void;
  error?: string;
}

const CustomerSelect: React.FC<CustomerSelectProps> = ({ value, onChange, error }) => {
  const { customers } = useStore();

  return (
    <div>
      {/* Removed the Customer label */}
      {/* <label htmlFor="customer" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Customer
      </label> */}
      <div className="mt-1">
        <select
          id="customer"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`shadow-sm block w-2/5 sm:text-sm rounded-md ${
            error
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500'
          }`}
        >
          <option value="">Select a customer</option>
          {customers.map((customer: Customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
      </div>
      {value && (
        <div className="mt-1">
          <p className="text-sm text-gray-600 dark:text-gray-400">TIN: {customers.find(c => c.id === value)?.taxId}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Contact Number: {customers.find(c => c.id === value)?.contactNumber}</p>
        </div>
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default CustomerSelect;