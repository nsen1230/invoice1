import { z } from 'zod';

export const invoiceSchema = z.object({
  customerId: z.string().min(1, 'Customer is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  currency: z.string().min(1, 'Currency is required'),
  items: z
    .array(
      z.object({
        productId: z.string().min(1, 'Product is required'),
        quantity: z.number().min(1, 'Quantity must be at least 1'),
        unitPrice: z.number().min(0, 'Unit price must be at least 0'),
        discount: z.number().min(0, 'Discount must be at least 0').max(100, 'Discount cannot exceed 100%'),
      })
    )
    .min(1, 'At least one item is required'),
  notes: z.string().optional(),
  terms: z.string().optional(),
});