import { Invoice, InvoiceItem } from '../types';

export const calculateItemSubtotal = (item: InvoiceItem): number => {
  const quantity = item.quantity || 0;
  const unitPrice = item.unitPrice || 0;
  const discount = item.discount || 0;
  
  const subtotal = quantity * unitPrice;
  return subtotal - (subtotal * (discount / 100));
};

export const calculateItemTax = (item: InvoiceItem): number => {
  const subtotal = calculateItemSubtotal(item);
  const taxRate = item.taxRate || 0;
  return subtotal * (taxRate / 100);
};

export const calculateInvoiceTotal = (items: InvoiceItem[]): {
  subtotal: number;
  tax: number;
  total: number;
} => {
  const subtotal = items.reduce((sum, item) => sum + calculateItemSubtotal(item), 0);
  const tax = items.reduce((sum, item) => sum + calculateItemTax(item), 0);
  const total = subtotal + tax;

  return {
    subtotal,
    tax,
    total,
  };
};

export const generateInvoiceNumber = (prefix: string, lastInvoiceNumber?: string): string => {
  if (!lastInvoiceNumber) {
    return `${prefix}0001`;
  }

  const currentNumber = parseInt(lastInvoiceNumber.replace(prefix, ''));
  return `${prefix}${(currentNumber + 1).toString().padStart(4, '0')}`;
};