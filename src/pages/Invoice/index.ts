import { lazy } from "react";

export const InvoiceList = lazy(() => import("./InvoicesList/InvoiceList"));

export const CreateInvoice = lazy(
  () => import("./CreateInvoice/CreateInvoice")
);

export const EditInvoice = lazy(() => import("./EditInvoice/EditInvoice"));
