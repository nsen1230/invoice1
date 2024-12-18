import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Business, Customer, Product, Invoice } from '../types';
import { ERPSystem } from '../types/settings';

interface TokenState {
  accessToken: string | null;
  expiresAt: number | null;
}

interface Store {
  darkMode: boolean;
  toggleDarkMode: () => void;
  business: Business | null;
  customers: Customer[];
  products: Product[];
  invoices: Invoice[];
  erpSystem: ERPSystem | null;
  tokenState: TokenState;
  setBusiness: (business: Business) => void;
  addCustomer: (customer: Customer) => void;
  updateCustomer: (customer: Customer) => void;
  deleteCustomer: (customerId: string) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addInvoice: (invoice: Invoice) => void;
  updateInvoice: (invoice: Invoice) => void;
  setERPSystem: (erpSystem: ERPSystem) => void;
  setTokenState: (state: TokenState) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      business: null,
      customers: [],
      products: [],
      invoices: [],
      erpSystem: null,
      tokenState: {
        accessToken: null,
        expiresAt: null,
      },
      setBusiness: (business) => set({ business }),
      addCustomer: (customer) =>
        set((state) => ({ customers: [...state.customers, customer] })),
      updateCustomer: (customer) =>
        set((state) => ({
          customers: state.customers.map((c) =>
            c.id === customer.id ? customer : c
          ),
        })),
      deleteCustomer: (customerId) =>
        set((state) => ({
          customers: state.customers.filter((c) => c.id !== customerId),
        })),
      addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),
      updateProduct: (product) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === product.id ? product : p
          ),
        })),
      deleteProduct: (productId) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== productId),
        })),
      addInvoice: (invoice) =>
        set((state) => ({ invoices: [...state.invoices, invoice] })),
      updateInvoice: (invoice) =>
        set((state) => ({
          invoices: state.invoices.map((inv) =>
            inv.id === invoice.id ? invoice : inv
          ),
        })),
      setERPSystem: (erpSystem) => set({ erpSystem }),
      setTokenState: (tokenState) => set({ tokenState }),
    }),
    {
      name: 'invoice-storage',
    }
  )
);