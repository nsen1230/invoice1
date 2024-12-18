import { Invoice, Business, Customer } from '../types';
import { sha256 } from 'crypto-js';

export const hashDocument = (document: any): string => {
  return sha256(JSON.stringify(document)).toString();
};

export const generateInvoiceDocument = (
  invoice: Invoice,
  business: Business,
  customer: Customer
): any => {
  return {
    "_D": "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2",
    "_A": "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2",
    "_B": "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2",
    "Invoice": [{
      "ID": [{ "_": invoice.invoiceNumber }],
      "IssueDate": [{ "_": invoice.date }],
      "IssueTime": [{ "_": `${invoice.time}:00Z` }],
      "InvoiceTypeCode": [{ "_": "01", "listVersionID": "1.0" }],
      "DocumentCurrencyCode": [{ "_": invoice.currency }],
      "AccountingSupplierParty": [{
        "Party": [{
          "PartyIdentification": [{
            "ID": [{ "_": business.taxId, "schemeID": "TIN" }]
          }],
          "PartyLegalEntity": [{
            "RegistrationName": [{ "_": business.name }]
          }],
          "PostalAddress": [{
            "CityName": [{ "_": business.address.city }],
            "PostalZone": [{ "_": business.address.postalCode }],
            "CountrySubentityCode": [{ "_": business.address.state }],
            "AddressLine": [{ "Line": [{ "_": business.address.line }] }],
            "Country": [{ "IdentificationCode": [{ "_": business.address.country }] }]
          }],
          "Contact": [{ "Telephone": [{ "_": business.contactNumber }] }]
        }]
      }],
      "AccountingCustomerParty": [{
        "Party": [{
          "PartyIdentification": [{
            "ID": [{ "_": customer.taxId, "schemeID": "TIN" }]
          }],
          "PartyLegalEntity": [{
            "RegistrationName": [{ "_": customer.name }]
          }],
          "PostalAddress": [{
            "CityName": [{ "_": customer.address.city }],
            "PostalZone": [{ "_": customer.address.postalCode }],
            "CountrySubentityCode": [{ "_": customer.address.state }],
            "AddressLine": [{ "Line": [{ "_": customer.address.line }] }],
            "Country": [{ "IdentificationCode": [{ "_": customer.address.country }] }]
          }],
          "Contact": [{ "Telephone": [{ "_": customer.contactNumber }] }]
        }]
      }],
      "TaxTotal": [{
        "TaxAmount": [{ "_": invoice.tax, "currencyID": invoice.currency }],
        "TaxSubtotal": invoice.items.map(item => ({
          "TaxableAmount": [{ "_": item.total, "currencyID": invoice.currency }],
          "TaxAmount": [{ "_": item.Itemtax, "currencyID": invoice.currency }],
          "TaxCategory": [{
            "ID": [{ "_": "01" }],
            "TaxScheme": [{
              "ID": [{ "_": "OTH", "schemeAgencyID": "6", "schemeID": "UN/ECE 5153" }]
            }]
          }]
        }))
      }],
      "LegalMonetaryTotal": [{
        "LineExtensionAmount": [{ "_": invoice.subtotal, "currencyID": invoice.currency }],
        "TaxExclusiveAmount": [{ "_": invoice.subtotal, "currencyID": invoice.currency }],
        "TaxInclusiveAmount": [{ "_": invoice.total, "currencyID": invoice.currency }],
        "PayableAmount": [{ "_": invoice.total, "currencyID": invoice.currency }]
      }],
      "InvoiceLine": invoice.items.map((item, index) => ({
        "ID": [{ "_": (index + 1).toString() }],
        "InvoicedQuantity": [{ "_": item.quantity, "unitCode": "EA" }],
        "LineExtensionAmount": [{ "_": item.total, "currencyID": invoice.currency }],
        "TaxTotal": [{
          "TaxAmount": [{ "_": item.Itemtax, "currencyID": invoice.currency }],
          "TaxSubtotal": [{
            "TaxableAmount": [{ "_": item.total, "currencyID": invoice.currency }],
            "TaxAmount": [{ "_": item.Itemtax, "currencyID": invoice.currency }],
            "TaxCategory": [{
              "ID": [{ "_": "01" }],
              "TaxScheme": [{
                "ID": [{ "_": "OTH", "schemeAgencyID": "6", "schemeID": "UN/ECE 5153" }]
              }]
            }]
          }]
        }],
        "Item": [{
          "Description": [{ "_": item.productId }],
          "CommodityClassification": [{
            "ItemClassificationCode": [{ "_": "001", "listID": "CLASS" }]
          }]
        }],
        "Price": [{
          "PriceAmount": [{ "_": item.unitPrice, "currencyID": invoice.currency }]
        }]
      }))
    }]
  };
};