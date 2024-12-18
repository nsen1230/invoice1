import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { erpSystemSchema } from '../../validations/settings';
import { ERPSystem } from '../../types/settings';
import { Loader2 } from 'lucide-react';

interface ERPSystemFormProps {
  initialData: ERPSystem | null;
  onSubmit: (data: ERPSystem) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

const ERPSystemForm: React.FC<ERPSystemFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ERPSystem>({
    resolver: zodResolver(erpSystemSchema),
    defaultValues: {
      clientId: initialData?.clientId || '',
      clientSecret1: initialData?.clientSecret1 || '',
      clientSecret2: initialData?.clientSecret2 || '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Client ID
        </label>
        <input
          type="password"
          id="clientId"
          {...register('clientId')}
          disabled={isLoading}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:opacity-50"
        />
        {errors.clientId && (
          <p className="mt-1 text-sm text-red-600">{errors.clientId.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="clientSecret1" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Client Secret 1
        </label>
        <input
          type="password"
          id="clientSecret1"
          {...register('clientSecret1')}
          disabled={isLoading}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:opacity-50"
        />
        {errors.clientSecret1 && (
          <p className="mt-1 text-sm text-red-600">{errors.clientSecret1.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="clientSecret2" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Client Secret 2
        </label>
        <input
          type="password"
          id="clientSecret2"
          {...register('clientSecret2')}
          disabled={isLoading}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:opacity-50"
        />
        {errors.clientSecret2 && (
          <p className="mt-1 text-sm text-red-600">{errors.clientSecret2.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </form>
  );
};

export default ERPSystemForm;