import { TInvoice, TInvoiceResponsePaginate } from "@/types/models";
import { useMutation, useQuery } from "react-query";
import { InstanceAxios } from "./baseApi";

export const invoiceUri = {
  list: "/invoice/list",
  create: "/invoice/create",
};

export const useMutateCreateInvoice = () => {
  return useMutation({
    mutationFn: async (payload: TInvoice) => {
      const res = await InstanceAxios.post(invoiceUri.create, payload);

      return res.data;
    },
  });
};

export const useQueryListInvoices = (query: {
  page: number;
  limit: number;
}) => {
  return useQuery({
    queryKey: [invoiceUri.list],
    queryFn: async () => {
      const result = await InstanceAxios.get(invoiceUri.list, {
        params: query,
      });

      return result.data as TInvoiceResponsePaginate;
    },
  });
};
