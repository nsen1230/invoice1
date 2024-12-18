import { z } from 'zod';
import { TAX_TYPES } from '../types';

export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  unitPrice: z.number().min(0, 'Unit price must be greater than or equal to 0'),
  taxType: z.enum(['01', '02', '06'] as const, {
    required_error: 'Tax type is required'
  }),
  taxRate: z.number()
    .min(0, 'Tax rate must be greater than or equal to 0')
    .max(100, 'Tax rate cannot exceed 100%')
});