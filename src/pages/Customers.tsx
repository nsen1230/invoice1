import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Users, UserPlus, Pencil, Trash2 } from 'lucide-react';
import { Customer, MALAYSIAN_STATES } from '../types';
import CustomerForm from '../components/CustomerForm';

const Customers: React.FC = () => {
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const handleAddCustomer = (customer: Customer) => {
    addCustomer(customer);
    setShowForm(false);
  };

  const handleUpdateCustomer = (customer: Customer) => {
    updateCustomer(customer);
    setEditingCustomer(null);
  };

  const handleDeleteCustomer = (customerId: string) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      deleteCustomer(customerId);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Users className="w-6 h-6 mr-2 text-gray-500" />
          <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add Customer
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {customers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registration No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    State
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {customer.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.idType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.registrationNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.contactNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {MALAYSIAN_STATES[customer.address.state]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => setEditingCustomer(customer)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCustomer(customer.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No customers added yet.</p>
        )}
      </div>

      {(showForm || editingCustomer) && (
        <CustomerForm
          onSubmit={editingCustomer ? handleUpdateCustomer : handleAddCustomer}
          onCancel={() => {
            setShowForm(false);
            setEditingCustomer(null);
          }}
          initialData={editingCustomer || undefined}
        />
      )}
    </div>
  );
};

export default Customers;