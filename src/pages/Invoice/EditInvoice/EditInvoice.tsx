import {
  invoiceUri,
  useMutateUpdateInvoice,
  useQueryDetailInvoice,
} from "@/api/invoice.query";
import { Form, Spin, Typography } from "antd";
import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import InvoiceForm from "../InoviceForm/InvoiceForm";
import { TInvoice } from "@/types/models";
import dayjs from "dayjs";
import { InvoicePaths } from "@/routes";
import { useQueryClient } from "react-query";

const EditInvoice: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isRefetching } = useQueryDetailInvoice(
    {
      id: id ?? "",
    },
    true
  );

  const {
    mutate,
    isLoading: editLoading,
    isSuccess: editSuccess,
  } = useMutateUpdateInvoice(id ?? "");

  if (editSuccess) {
    queryClient.invalidateQueries({ queryKey: [invoiceUri.list] });
    navigate(InvoicePaths.LIST);
  }

  const [form] = Form.useForm<TInvoice>();
  const submitHandler = (values: TInvoice) => {
    mutate(values);
  };

  useEffect(() => {
    if (data) {
      Object.entries(data)?.forEach((item) => {
        if (item[0] === "dateImport") {
          const value = dayjs(new Date(item[1]));
          form.setFieldValue(item[0], value);
          return;
        }

        form.setFieldValue(item[0], item[1]);
      });
    }
  }, [data, form]);

  return (
    <>
      <Typography.Title level={3}>Chỉnh sửa hóa đơn</Typography.Title>
      {isLoading || isRefetching ? (
        <div
          style={{
            minHeight: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <InvoiceForm
          form={form}
          onFinish={submitHandler}
          textAction="Sửa"
          isLoading={editLoading}
        />
      )}
    </>
  );
};

export default EditInvoice;
