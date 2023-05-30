import { TInvoice } from "@/types/models";
import { invoiceUri, useMutateCreateInvoice } from "@/api/invoice.query";
import InvoiceForm from "../InoviceForm/InvoiceForm";
import { Form, Typography } from "antd";
import { useNavigate } from "react-router";
import { InvoicePaths } from "@/routes";
import { useQueryClient } from "react-query";

const CreateInvoice = () => {
  const [form] = Form.useForm<TInvoice>();
  const { mutate, isSuccess: createSuccess } = useMutateCreateInvoice();
  const navigate = useNavigate();
  const submitHandler = (values: TInvoice) => {
    mutate(values);
  };

  const queryClient = useQueryClient();

  if (createSuccess) {
    queryClient.invalidateQueries({ queryKey: [invoiceUri.list] });
    navigate(InvoicePaths.LIST);
  }

  const initialValues: Partial<TInvoice> = {
    weightBoxAndPackage: 0,
    weightCancelDL: 0,
    weightCancelSG: 0,
    weightWrapper: 0,
    amountBox: 0,
  };

  return (
    <>
      <Typography.Title level={3}>Tạo hóa đơn</Typography.Title>
      <InvoiceForm
        form={form}
        onFinish={submitHandler}
        initialValues={initialValues}
        textAction="Tạo"
      />
    </>
  );
};

export default CreateInvoice;
