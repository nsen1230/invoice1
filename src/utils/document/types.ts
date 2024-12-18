export interface DocumentNode {
  _: string | number;
  currencyID?: string;
  listVersionID?: string;
  schemeID?: string;
  schemeAgencyID?: string;
  listID?: string;
  listAgencyID?: string;
  unitCode?: string;
}

export interface DocumentElement {
  [key: string]: DocumentNode[] | DocumentElement[];
}

export interface InvoiceDocument {
  _D: string;
  _A: string;
  _B: string;
  Invoice: DocumentElement[];
}