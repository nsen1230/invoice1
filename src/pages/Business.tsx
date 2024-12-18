import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Building2, PencilIcon } from 'lucide-react';
import BusinessForm from '../components/BusinessForm';
import { MALAYSIAN_STATES } from '../types';

const Business: React.FC = () => {
  const { business } = useStore();
  const [showForm, setShowForm] = useState(!business);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Building2 className="w-6 h-6 mr-2 text-gray-500" />
          <h1 className="text-2xl font-semibold text-gray-900">Business Profile</h1>
        </div>
        {business && (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <PencilIcon className="w-4 h-4 mr-2" />
            Edit Profile
          </button>
        )}
      </div>

      {showForm ? (
        <BusinessForm
          onCancel={() => business && setShowForm(false)}
          initialData={business || undefined}
        />
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Taxpayer Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{business.name}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Tax ID (TIN)</dt>
                <dd className="mt-1 text-sm text-gray-900">{business.taxId}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Registration Number</dt>
                <dd className="mt-1 text-sm text-gray-900">{business.registrationNo}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">ID Type</dt>
                <dd className="mt-1 text-sm text-gray-900">{business.idType}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Contact Number</dt>
                <dd className="mt-1 text-sm text-gray-900">{business.contactNumber}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">SST Registration Number</dt>
                <dd className="mt-1 text-sm text-gray-900">{business.sstRegistrationNo || '-'}</dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <p>{business.address.line}</p>
                  <p>
                    {business.address.postalCode} {business.address.city}
                  </p>
                  <p>
                    {MALAYSIAN_STATES[business.address.state]}, {business.address.country}
                  </p>
                </dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Business Activity</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <p className="font-medium">{business.businessActivity.category}</p>
                  <p>{business.businessActivity.description}</p>
                  <p className="text-gray-500">MSIC Code: {business.businessActivity.msicCode}</p>
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Invoice Prefix</dt>
                <dd className="mt-1 text-sm text-gray-900">{business.invoicePrefix}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
};

export default Business;