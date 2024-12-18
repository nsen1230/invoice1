import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { businessSchema } from '../../validations/business';
import { Business, BUSINESS_CATEGORIES, MALAYSIAN_STATES } from '../../types';
import { useStore } from '../../store/useStore';
import { v4 as uuidv4 } from 'uuid';

interface BusinessFormProps {
  onCancel?: () => void;
  initialData?: Partial<Business>;
}

const BusinessForm: React.FC<BusinessFormProps> = ({ onCancel, initialData }) => {
  const { setBusiness } = useStore();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(businessSchema),
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
        state: '01',
        country: 'MYS',
      },
      sstRegistrationNo: initialData?.sstRegistrationNo || '',
      businessActivity: initialData?.businessActivity || {
        category: '',
        msicCode: '',
        description: '',
      },
      invoicePrefix: initialData?.invoicePrefix || 'INV',
    },
  });

  const selectedCategory = watch('businessActivity.category');
  const activities = BUSINESS_CATEGORIES.find(
    (cat) => cat.category === selectedCategory
  )?.activities || [];

  const onSubmit = async (data: any) => {
    try {
      const business: Business = {
        id: initialData?.id || uuidv4(),
        ...data,
        createdAt: initialData?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setBusiness(business);
      if (onCancel) {
        onCancel();
      }
    } catch (error) {
      console.error('Error saving business profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Taxpayer Name
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

            <div className="grid grid-cols-2 gap-4 sm:col-span-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tax ID (TIN)
                </label>
                <input
                  type="text"
                  {...register('taxId')}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.taxId && (
                  <p className="mt-1 text-sm text-red-600">{errors.taxId.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Contact Number
                </label>
                <input
                  type="text"
                  {...register('contactNumber')}
                  placeholder="+60123456789"
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.contactNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.contactNumber.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:col-span-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  ID Type
                </label>
                <select
                  {...register('idType')}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Business Registration no./NRIC/Passport 
                </label>
                <input
                  type="text"
                  {...register('registrationNo')}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.registrationNo && (
                  <p className="mt-1 text-sm text-red-600">{errors.registrationNo.message}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                SST Registration Number (Optional)
              </label>
              <input
                type="text"
                {...register('sstRegistrationNo')}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Address</h3>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Address Line
                  </label>
                  <input
                    type="text"
                    {...register('address.line')}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  {errors.address?.line && (
                    <p className="mt-1 text-sm text-red-600">{errors.address.line.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    {...register('address.postalCode')}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  {errors.address?.postalCode && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.address.postalCode.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    City
                  </label>
                  <input
                    type="text"
                    {...register('address.city')}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  {errors.address?.city && (
                    <p className="mt-1 text-sm text-red-600">{errors.address.city.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    State
                  </label>
                  <select
                    {...register('address.state')}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
            </div>

            <div className="sm:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Business Activity</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Category
                  </label>
                  <select
                    {...register('businessActivity.category')}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="">Select a category</option>
                    {BUSINESS_CATEGORIES.map((category) => (
                      <option key={category.category} value={category.category}>
                        {category.category}
                      </option>
                    ))}
                  </select>
                  {errors.businessActivity?.category && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.businessActivity.category.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Activity
                  </label>
                  <select
                    {...register('businessActivity.msicCode')}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onChange={(e) => {
                      const activity = activities.find(
                        (a) => a.msicCode === e.target.value
                      );
                      if (activity) {
                        setValue('businessActivity.description', activity.description);
                      }
                    }}
                  >
                    <option value="">Select an activity</option>
                    {activities.map((activity) => (
                      <option key={activity.msicCode} value={activity.msicCode}>
                        {activity.description}
                      </option>
                    ))}
                  </select>
                  {errors.businessActivity?.msicCode && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.businessActivity.msicCode.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Invoice Prefix
              </label>
              <input
                type="text"
                {...register('invoicePrefix')}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.invoicePrefix && (
                <p className="mt-1 text-sm text-red-600">{errors.invoicePrefix.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          {initialData ? 'Update Profile' : 'Save Profile'}
        </button>
      </div>
    </form>
  );
};

export default BusinessForm;