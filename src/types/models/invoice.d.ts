export type TInvoice = {
  customerName: string;
  productName: string;
  type: string;
  weightWrapper: number;
  weightBoxAndPackage: number;
  amountBox: number;
  dateImport: Date;
  weightCancelSG: number;
  reasonCancelSG: string;
  weightCancelDL: number;
  reasonCancelDL: string;
  id: string;
};

export type TInvoiceResponsePaginate = {
  data: TInvoice[];
  page: number;
  limit: number;
  totalPage: number;
  totalRecord: number;
};
