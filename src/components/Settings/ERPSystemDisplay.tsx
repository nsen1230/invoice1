import React from 'react';
import { ERPSystem } from '../../types/settings';

interface ERPSystemDisplayProps {
  data: ERPSystem;
  onEdit: () => void;
}

const ERPSystemDisplay: React.FC<ERPSystemDisplayProps> = ({ data, onEdit }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Client ID
        </label>
        <div className="mt-1 flex items-center">
          <input
            type="password"
            value={data.clientId}
            disabled
            className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-50"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Client Secret 1
        </label>
        <div className="mt-1">
          <input
            type="password"
            value={data.clientSecret1}
            disabled
            className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-50"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Client Secret 2
        </label>
        <div className="mt-1">
          <input
            type="password"
            value={data.clientSecret2}
            disabled
            className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-50"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onEdit}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Edit Settings
        </button>
      </div>
    </div>
  );
};

export default ERPSystemDisplay;