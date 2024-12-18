import { InvoiceItem } from '../types';

export const calculateItemSubtotal = (item: InvoiceItem): number => {
  const subtotal = (item.quantity || 0) * (item.unitPrice || 0);
  return subtotal - (subtotal * ((item.discount || 0) / 100));
};

export const calculateItemTax = (item: InvoiceItem): number => {
  const subtotal = calculateItemSubtotal(item);
  return subtotal * ((item.taxRate || 0) / 100);
};

export const formatCurrency = (value: number | null | undefined): string => {
  return (value || 0).toFixed(2);
};