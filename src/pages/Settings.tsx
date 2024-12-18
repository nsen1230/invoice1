import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import ERPSystemSettings from '../components/Settings/ERPSystemSettings';

const Settings: React.FC = () => {
  return (
    <div>
      <div className="flex items-center mb-8">
        <SettingsIcon className="w-6 h-6 mr-2 text-gray-500 dark:text-gray-400" />
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">ERP System</h1>
      </div>

      <div className="space-y-6">
        <ERPSystemSettings />
      </div>
    </div>
  );
};

export default Settings;