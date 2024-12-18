import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { ERPSystem } from '../../types/settings';
import { getERPToken } from '../../services/api';
import ERPSystemForm from './ERPSystemForm';
import ERPSystemDisplay from './ERPSystemDisplay';
import { Toaster, toast } from 'react-hot-toast';

const ERPSystemSettings: React.FC = () => {
  const { erpSystem, setERPSystem } = useStore();
  const [isEditing, setIsEditing] = useState(!erpSystem);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: ERPSystem) => {
    setIsLoading(true);
    try {
      const tokenResponse = await getERPToken(data);
      console.log(tokenResponse.access_token)
      if (tokenResponse.access_token) {
        setERPSystem(data);
        setIsEditing(false);
        toast.success('ERP System settings updated successfully');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to validate ERP credentials';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">
            ERP System Settings
          </h3>
          
          {isEditing ? (
            <ERPSystemForm
              initialData={erpSystem}
              onSubmit={handleSubmit}
              onCancel={() => erpSystem && setIsEditing(false)}
              isLoading={isLoading}
            />
          ) : (
            <ERPSystemDisplay
              data={erpSystem!}
              onEdit={() => setIsEditing(true)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ERPSystemSettings;