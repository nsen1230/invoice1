import { z } from 'zod';

export interface BusinessAddress {
  line: string;
  postalCode: string;
  city: string;
  state: '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16';
  country: 'MYS';
}

export interface Business {
  id: string;
  name: string;
  taxId: string;
  registrationNo: string;
  idType: 'BRN' | 'NRIC' | 'PASSPORT';
  contactNumber: string;
  address: BusinessAddress;
  sstRegistrationNo?: string;
  businessActivity: {
    category: string;
    msicCode: string;
    description: string;
  };
  invoicePrefix: string;
  createdAt: string;
  updatedAt: string;
}

export const MALAYSIAN_STATES = {
  '01': 'Johor',
  '02': 'Kedah',
  '03': 'Kelantan',
  '04': 'Melaka',
  '05': 'Negeri Sembilan',
  '06': 'Pahang',
  '07': 'Pulau Pinang',
  '08': 'Perak',
  '09': 'Perlis',
  '10': 'Selangor',
  '11': 'Terengganu',
  '12': 'Sabah',
  '13': 'Sarawak',
  '14': 'Kuala Lumpur',
  '15': 'Labuan',
  '16': 'Putrajaya'
} as const;

export const BUSINESS_CATEGORIES = [
  {
    category: 'Food and Beverage Production',
    activities: [
      { msicCode: '10101', description: '10101 - Processing and preserving of meat and meat products.' },
      { msicCode: '10711', description: '10711 - Manufacture of biscuits and cookies.' },
      { msicCode: '10792', description: '10792 - Manufacture of tea.' }
    ]
  },
  {
    category: 'Agriculture and Horticulture',
    activities: [
      { msicCode: '01112', description: '01112 - Growing of leguminous crops.' },
      { msicCode: '01227', description: '01227 - Growing of pineapple.' },
      { msicCode: '01291', description: '01291 - Growing of rubber trees (estate).' }
    ]
  },
  {
    category: 'Retail and Trade of Clothing and Textiles',
    activities: [
      { msicCode: '14102', description: '14102 - Manufacture of clothing.' },
      { msicCode: '14103', description: '14103 - Custom tailoring.' }
    ]
  },
  {
    category: 'Construction-Related Manufacturing',
    activities: [
      { msicCode: '16222', description: '16222 - Manufacture of joinery wood products.' },
      { msicCode: '17020', description: '17020 - Manufacture of corrugated paper and paperboard for packaging.' }
    ]
  },
  {
    category: 'Health and Beauty Products',
    activities: [
      { msicCode: '20232', description: '20232 - Manufacture of perfumes and toilet preparations.' },
      { msicCode: '21003', description: '21003 - Manufacture of medicaments.' }
    ]
  }
] as const;

export interface CustomerAddress {
  line: string;
  postalCode: string;
  city: string;
  state: '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16';
  country: 'MYS';
}

export interface Customer {
  id: string;
  name: string;
  taxId: string;
  registrationNo: string;
  idType: 'BRN' | 'NRIC' | 'PASSPORT';
  contactNumber: string;
  address: CustomerAddress;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  unitPrice: number;
  taxType: TaxType;
  taxRate: number;
  createdAt: string;
  updatedAt: string;
}

export type TaxType = '01' | '02' | '06';

export const TAX_TYPES: Record<TaxType, string> = {
  '01': 'Sales Tax',
  '02': 'Service Tax',
  '06': 'Not Applicable'
} as const;

export interface InvoiceItem {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  taxrate: number;
  Itemtax: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  date: string;
  time: string;
  currency: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'pending' | 'paid' | 'overdue';
  notes?: string;
  terms?: string;
  createdAt: string;
  updatedAt: string;
}