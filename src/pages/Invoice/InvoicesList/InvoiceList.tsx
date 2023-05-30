import { useQueryListInvoices } from "@/api/invoice.query";
import { Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";

const InvoiceList = () => {
  const { data: invoices } = useQueryListInvoices({
    page: 1,
    limit: 10,
  });

  const columns: ColumnsType<any> = [
    {
      title: "STT",
      render: (_, __, index) => {
        if (invoices) return (invoices.page - 1) * invoices.limit + index + 1;
      },
      width: 50,
      align: "center",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customerName",
      render: (text) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      render: (text) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: "Loại",
      dataIndex: "type",
      render: (text) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: "Quy cách hộp",
      dataIndex: "weightWrapper",
      render: (text) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: "Số lượng bao bì/hộp",
      dataIndex: "amountBox",
      render: (text) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: "Trọng lượng bao bì/hộp",
      dataIndex: "weightBoxAndPackage",
      render: (text) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: "Trọng lượng bao bì/hộp",
      dataIndex: "weightBoxAndPackage",
      render: (text) => <Typography.Text>{text}</Typography.Text>,
    },
  ];

  return (
    <div>
      <h3>Danh Sách Hóa Đơn</h3>
      <Table
        columns={columns}
        dataSource={invoices?.data}
        scroll={{ x: true }}
      />
    </div>
  );
};

export default InvoiceList;
