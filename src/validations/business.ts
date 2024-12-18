import { z } from 'zod';
import { BUSINESS_CATEGORIES } from '../types';

const businessAddressSchema = z.object({
  line: z.string().min(1, 'Address line is required'),
  postalCode: z.string().min(5, 'Postal code must be 5 digits').max(5, 'Postal code must be 5 digits'),
  city: z.string().min(1, 'City is required'),
  state: z.enum(['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16'], {
    required_error: 'State is required'
  }),
  country: z.literal('MYS')
});

const businessActivitySchema = z.object({
  category: z.string().min(1, 'Business category is required'),
  msicCode: z.string().min(1, 'MSIC code is required'),
  description: z.string().min(1, 'Business activity description is required')
});

export const businessSchema = z.object({
  name: z.string().min(1, 'Taxpayer name is required'),
  taxId: z.string().min(1, 'Tax ID is required'),
  registrationNo: z.string().min(1, 'Registration number is required'),
  idType: z.enum(['BRN', 'NRIC', 'PASSPORT'], {
    required_error: 'ID type is required'
  }),
  contactNumber: z.string()
    .min(10, 'Contact number must be at least 10 digits')
    .max(15, 'Contact number must not exceed 15 digits')
    .regex(/^\+?[0-9]+$/, 'Invalid contact number format'),
  address: businessAddressSchema,
  sstRegistrationNo: z.string().optional(),
  businessActivity: businessActivitySchema,
  invoicePrefix: z.string().min(1, 'Invoice prefix is required')
});