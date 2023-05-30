import { TInvoice, TInvoiceResponsePaginate } from "@/types/models";
import { useMutation, useQuery } from "react-query";
import { InstanceAxios } from "./baseApi";

export const invoiceUri = {
  list: "/invoice/list",
  create: "/invoice/create",
  detail: "/invoice/detail",
  update: "/invoice/update",
  delete: "/invoice/delete",
};

export const useMutateCreateInvoice = () => {
  return useMutation({
    mutationFn: async (payload: TInvoice) => {
      const res = await InstanceAxios.post(invoiceUri.create, payload);

      return res.data;
    },
  });
};

export const useQueryListInvoices = (
  enabled: boolean,
  query?: {
    page: number;
    limit: number;
  }
) => {
  return useQuery({
    queryKey: [invoiceUri.list],
    queryFn: async () => {
      const result = await InstanceAxios.get(invoiceUri.list, {
        params: query,
      });

      return result.data as TInvoiceResponsePaginate;
    },
    enabled,
  });
};

export const useQueryDetailInvoice = (
  query: { id: string },
  enabled: boolean
) => {
  return useQuery({
    queryKey: [invoiceUri.detail],
    queryFn: async () => {
      const result = await InstanceAxios.get(invoiceUri.detail, {
        params: query,
      });

      return result.data as TInvoice;
    },
    enabled,
  });
};

export const useMutateUpdateInvoice = (id: string, onSuccess?: () => void) => {
  return useMutation({
    mutationKey: [invoiceUri.update],
    mutationFn: async (payload: Partial<TInvoice>) => {
      const result = await InstanceAxios.patch(
        `${invoiceUri.update}/${id}`,
        payload
      );

      return result.data as TInvoice;
    },
    onSuccess,
  });
};

export const useMutateDeleteInvoice = (onSuccess?: () => void) => {
  return useMutation({
    mutationKey: [invoiceUri.delete],
    mutationFn: async (id: string) => {
      const result = await InstanceAxios.delete(`${invoiceUri.delete}/${id}`);

      return result.data as TInvoice;
    },
    onSuccess,
  });
};
