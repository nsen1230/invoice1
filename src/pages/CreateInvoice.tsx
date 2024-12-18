import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileText, Plus, Package, UserPlus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-hot-toast';
import { useStore } from '../store/useStore';
import { invoiceSchema } from '../validations/invoice';
import { calculateInvoiceTotal, generateInvoiceNumber } from '../utils/invoice';
import CustomerSelect from '../components/InvoiceForm/CustomerSelect';
import InvoiceItems from '../components/InvoiceForm/InvoiceItems';
import ProductModal from '../components/ProductForm/ProductModal';
import CustomerModal from '../components/CustomerForm/CustomerModal';
import { useProductModal } from '../hooks/useProductModal';
import { useCustomerModal } from '../hooks/useCustomerModal';
import { submitInvoice } from '../services/api/invoice';
import type { InvoiceItem } from '../types';

interface InvoiceFormData {
  customerId: string;
  date: string;
  time: string;
  currency: string;
  items: InvoiceItem[];
  notes?: string;
  terms?: string;
}

const CreateInvoice: React.FC = () => {
  const navigate = useNavigate();
  const { business, customers, products, invoices, addInvoice, erpSystem } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { 
    isOpen: isProductModalOpen, 
    openModal: openProductModal, 
    closeModal: closeProductModal, 
    handleAddProduct, 
    lastProductCode 
  } = useProductModal();
  
  const { 
    isOpen: isCustomerModalOpen, 
    openModal: openCustomerModal, 
    closeModal: closeCustomerModal, 
    handleAddCustomer 
  } = useCustomerModal();

  const lastInvoice = [...invoices].sort((a, b) => 
    b.invoiceNumber.localeCompare(a.invoiceNumber)
  )[0];
  
  const invoiceNumber = generateInvoiceNumber(
    business?.invoicePrefix || 'INV',
    lastInvoice?.invoiceNumber
  );

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      customerId: '',
      currency: 'MYR',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
      items: [],
      notes: '',
      terms: '',
    },
  });

  const items = watch('items') || [];
  const { subtotal, tax, total } = calculateInvoiceTotal(items);

  const onSubmit = async (data: InvoiceFormData) => {
    if (!business) {
      toast.error('Please configure business profile first');
      return;
    }

    if (!erpSystem) {
      toast.error('Please configure ERP system settings first');
      return;
    }

    const customer = customers.find(c => c.id === data.customerId);
    if (!customer) {
      toast.error('Invalid customer selected');
      return;
    }

    setIsSubmitting(true);
    try {
      const invoice = {
        id: uuidv4(),
        invoiceNumber,
        ...data,
        subtotal,
        tax,
        total,
        status: 'pending' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // const submissionResponse = await submitInvoice(
      //   invoice,
      //   business,
      //   customer,
      //   products,
      //   erpSystem
      // );

      // const finalInvoice = {
      //   ...invoice,
      //   status: submissionResponse.status === 'accepted' ? 'pending' : 'draft'
      // };

      // addInvoice(finalInvoice);
      addInvoice(invoice);
      toast.success('Invoice created successfully');
      navigate('/invoices');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create invoice';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <FileText className="w-6 h-6 mr-2 text-gray-500 dark:text-gray-400" />
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Create New Invoice</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Invoice Details Section */}
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Invoice Details</h2>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Invoice Number
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={invoiceNumber}
                    disabled
                    className="bg-gray-50 dark:bg-gray-700 shadow-sm block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Date
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    {...control.register('date')}
                    className="shadow-sm block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Time
                </label>
                <div className="mt-1">
                  <input
                    type="time"
                    {...control.register('time')}
                    className="shadow-sm block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Section */}
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Customer Information</h2>
              <button
                type="button"
                onClick={openCustomerModal}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add New Customer
              </button>
            </div>
            <CustomerSelect
              value={watch('customerId')}
              onChange={(value) => setValue('customerId', value)}
              error={errors.customerId?.message}
            />
          </div>
        </div>

        {/* Items Section */}
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Items</h2>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={openProductModal}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <Package className="w-4 h-4 mr-2" />
                  Add New Product
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setValue('items', [
                      ...items,
                      {
                        id: uuidv4(),
                        productId: '',
                        quantity: 1,
                        unitPrice: 0,
                        discount: 0,
                        taxrate: 0,
                        Itemtax: 0,
                        total: 0,
                      },
                    ]);
                  }}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </button>
              </div>
            </div>
            <InvoiceItems
              items={items}
              onAddItem={() => {
                setValue('items', [
                  ...items,
                  {
                    id: uuidv4(),
                    productId: '',
                    quantity: 1,
                    unitPrice: 0,
                    discount: 0,
                    taxrate: 0,
                    Itemtax: 0,
                    total: 0,
                  },
                ]);
              }}
              onRemoveItem={(index) => {
                setValue(
                  'items',
                  items.filter((_, i) => i !== index)
                );
              }}
              onUpdateItem={(index, updates) => {
                const updatedItems = [...items];
                updatedItems[index] = { ...updatedItems[index], ...updates };
                setValue('items', updatedItems);
              }}
              errors={errors.items as Record<string, string>}
            />
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Summary</h2>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600 dark:text-gray-400">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                  {watch('currency')} {subtotal.toFixed(2)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600 dark:text-gray-400">Tax</dt>
                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                  {watch('currency')} {tax.toFixed(2)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2">
                <dt className="text-base font-medium text-gray-900 dark:text-white">Total</dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">
                  {watch('currency')} {total.toFixed(2)}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/invoices')}
            className="bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'Create Invoice'}
          </button>
        </div>
      </form>

      {isProductModalOpen && (
        <ProductModal
          isOpen={isProductModalOpen}
          onClose={closeProductModal}
          onSuccess={handleAddProduct}
          lastProductCode={lastProductCode}
        />
      )}

      {isCustomerModalOpen && (
        <CustomerModal
          isOpen={isCustomerModalOpen}
          onClose={closeCustomerModal}
          onSuccess={handleAddCustomer}
        />
      )}
    </div>
  );
};

export default CreateInvoice;