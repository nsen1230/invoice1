import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { customerSchema } from '../../validations/customer';
import { Customer, CustomerAddress, MALAYSIAN_STATES } from '../../types';
import { v4 as uuidv4 } from 'uuid';

interface CustomerFormProps {
  onSubmit: (customer: Customer) => void;
  onCancel: () => void;
  initialData?: Partial<Customer>;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: initialData?.name || '',
      taxId: initialData?.taxId || '',
      registrationNo: initialData?.registrationNo || '',
      idType: initialData?.idType || 'BRN',
      contactNumber: initialData?.contactNumber || '',
      address: initialData?.address || {
        line: '',
        postalCode: '',
        city: '',
        state: 'Select State',
        country: 'MYS',
      },
    },
  });

  const onFormSubmit = (data: any) => {
    const customer: Customer = {
      id: initialData?.id || uuidv4(),
      ...data,
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onSubmit(customer);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {initialData ? 'Edit Customer' : 'Add New Customer'}
            </h2>
            <button
              type="button"
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Customer Name
              </label>
              <input
                type="text"
                {...register('name')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tax ID (TIN)
                </label>
                <input
                  type="text"
                  {...register('taxId')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.taxId && (
                  <p className="mt-1 text-sm text-red-600">{errors.taxId.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Registration Number
                </label>
                <input
                  type="text"
                  {...register('registrationNo')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.registrationNo && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.registrationNo.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  ID Type
                </label>
                <select
                  {...register('idType')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="BRN">Business Registration Number (BRN)</option>
                  <option value="NRIC">National ID (NRIC)</option>
                  <option value="PASSPORT">Passport</option>
                </select>
                {errors.idType && (
                  <p className="mt-1 text-sm text-red-600">{errors.idType.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <input
                  type="text"
                  {...register('contactNumber')}
                  placeholder="+60123456789"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.contactNumber && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.contactNumber.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Address</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address Line
                </label>
                <input
                  type="text"
                  {...register('address.line')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.address?.line && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.address.line.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    {...register('address.postalCode')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  {errors.address?.postalCode && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.address.postalCode.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    {...register('address.city')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  {errors.address?.city && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.address.city.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <select
                  {...register('address.state')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  {Object.entries(MALAYSIAN_STATES).map(([code, name]) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
                {errors.address?.state && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.address.state.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {initialData ? 'Update Customer' : 'Add Customer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;