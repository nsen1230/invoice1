import { Invoice, Business, Customer, Product } from '../../types';
import { InvoiceDocument, DocumentElement } from './types';
import { formatDate, formatTime } from '../formatters';

const generateSupplierParty = (business: Business): DocumentElement => ({
  Party: [{
    PartyIdentification: [{
      ID: [{ _: business.taxId, schemeID: 'TIN' }]
    }],
    PartyLegalEntity: [{
      RegistrationName: [{ _: business.name }]
    }],
    PostalAddress: [{
      CityName: [{ _: business.address.city }],
      PostalZone: [{ _: business.address.postalCode }],
      CountrySubentityCode: [{ _: business.address.state }],
      AddressLine: [{ Line: [{ _: business.address.line }] }],
      Country: [{ IdentificationCode: [{ _: business.address.country }] }]
    }],
    Contact: [{ Telephone: [{ _: business.contactNumber }] }]
  }]
});

const generateCustomerParty = (customer: Customer): DocumentElement => ({
  Party: [{
    PartyIdentification: [{
      ID: [{ _: customer.taxId, schemeID: 'TIN' }]
    }],
    PartyLegalEntity: [{
      RegistrationName: [{ _: customer.name }]
    }],
    PostalAddress: [{
      CityName: [{ _: customer.address.city }],
      PostalZone: [{ _: customer.address.postalCode }],
      CountrySubentityCode: [{ _: customer.address.state }],
      AddressLine: [{ Line: [{ _: customer.address.line }] }],
      Country: [{ IdentificationCode: [{ _: customer.address.country }] }]
    }],
    Contact: [{ Telephone: [{ _: customer.contactNumber }] }]
  }]
});

const generateInvoiceLines = (invoice: Invoice, products: Product[]): DocumentElement[] => {
  return invoice.items.map((item, index) => {
    const product = products.find(p => p.id === item.productId);
    const subtotal = item.quantity * item.unitPrice * (1 - (item.discount || 0) / 100);
    const taxAmount = subtotal * (item.taxRate / 100);

    return {
      ID: [{ _: (index + 1).toString() }],
      InvoicedQuantity: [{ _: item.quantity, unitCode: 'EA' }],
      LineExtensionAmount: [{ _: subtotal, currencyID: invoice.currency }],
      TaxTotal: [{
        TaxAmount: [{ _: taxAmount, currencyID: invoice.currency }],
        TaxSubtotal: [{
          TaxableAmount: [{ _: subtotal, currencyID: invoice.currency }],
          TaxAmount: [{ _: taxAmount, currencyID: invoice.currency }],
          TaxCategory: [{
            ID: [{ _: product?.taxType || '01' }],
            TaxScheme: [{
              ID: [{ _: 'OTH', schemeAgencyID: '6', schemeID: 'UN/ECE 5153' }]
            }]
          }]
        }]
      }],
      Item: [{
        Description: [{ _: product?.name || '' }],
        CommodityClassification: [{
          ItemClassificationCode: [{ _: '001', listID: 'CLASS' }]
        }]
      }],
      Price: [{
        PriceAmount: [{ _: item.unitPrice, currencyID: invoice.currency }]
      }]
    };
  });
};

export const generateInvoiceDocument = (
  invoice: Invoice,
  business: Business,
  customer: Customer,
  products: Product[]
): InvoiceDocument => {
  return {
    _D: 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2',
    _A: 'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2',
    _B: 'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2',
    Invoice: [{
      ID: [{ _: invoice.invoiceNumber }],
      IssueDate: [{ _: formatDate(invoice.date) }],
      IssueTime: [{ _: formatTime(invoice.time) }],
      InvoiceTypeCode: [{ _: '01', listVersionID: '1.0' }],
      DocumentCurrencyCode: [{ _: invoice.currency }],
      AccountingSupplierParty: [generateSupplierParty(business)],
      AccountingCustomerParty: [generateCustomerParty(customer)],
      TaxTotal: [{
        TaxAmount: [{ _: invoice.tax, currencyID: invoice.currency }]
      }],
      LegalMonetaryTotal: [{
        LineExtensionAmount: [{ _: invoice.subtotal, currencyID: invoice.currency }],
        TaxExclusiveAmount: [{ _: invoice.subtotal, currencyID: invoice.currency }],
        TaxInclusiveAmount: [{ _: invoice.total, currencyID: invoice.currency }],
        PayableAmount: [{ _: invoice.total, currencyID: invoice.currency }]
      }],
      InvoiceLine: generateInvoiceLines(invoice, products)
    }]
  };
};