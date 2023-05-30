import { lazy } from "react";

export const CreateInvoice = lazy(
  () => import("./CreateInvoice/CreateInvoice")
);

export const InvoiceList = lazy(() => import("./InvoicesList/InvoiceList"));
