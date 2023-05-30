import { TInvoice } from "@/types/models";
import { useMutateCreateInvoice } from "@/api/invoice.query";
import InvoiceForm from "../InoviceForm/InvoiceForm";
import { Form, Typography } from "antd";

const CreateInvoice = () => {
  const [form] = Form.useForm<TInvoice>();
  const { mutate } = useMutateCreateInvoice();

  const submitHandler = (values: TInvoice) => {
    mutate(values);
  };

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
      />
    </>
  );
};

export default CreateInvoice;
