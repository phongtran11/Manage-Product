import { useQueryListInvoices } from "@/api/invoice.query";
import { Button, Space, Table, Tooltip, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { ETypeProduct } from "../Invoice.enum";
import { formatNumber } from "../InoviceForm/InvoiceForm";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { InvoicePaths } from "@/routes";

const InvoiceList = () => {
  const { data: invoices, isLoading: invoicesLoading } = useQueryListInvoices({
    page: 1,
    limit: 10,
  });

  const navigate = useNavigate();

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
      width: 200,
      align: "center",
    },

    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      render: (text) => <Typography.Text>{text}</Typography.Text>,
      width: 200,
      align: "center",
    },

    {
      title: "Loại",
      dataIndex: "type",
      render: (text: "A" | "B" | "C" | "D") => (
        <Typography.Text>{ETypeProduct[text]}</Typography.Text>
      ),
      width: 100,
      align: "center",
    },

    {
      title: "Quy cách hộp",
      dataIndex: "weightWrapper",
      render: (text: number) => (
        <Space direction="vertical">
          <Typography.Text>{formatNumber(text)} gram</Typography.Text>
          <Typography.Text>{formatNumber(text / 1000)} kg</Typography.Text>
        </Space>
      ),
      width: 200,
      align: "center",
    },

    {
      title: "Số lượng bao bì/hộp",
      dataIndex: "amountBox",
      render: (text) => <Typography.Text>{text}</Typography.Text>,
      width: 200,
      align: "center",
    },
    {
      title: "Trọng lượng bao bì/hộp",
      dataIndex: "weightBoxAndPackage",
      render: (text) => (
        <Space direction="vertical">
          <Typography.Text>{formatNumber(text)} gram</Typography.Text>
          <Typography.Text>{formatNumber(text / 1000)} kg</Typography.Text>
        </Space>
      ),
      width: 200,
      align: "center",
    },
    {
      title: "Trọng lượng hủy ở Đà Lạt",
      dataIndex: "weightCancelDL",
      render: (text) => (
        <Space direction="vertical">
          <Typography.Text>{formatNumber(text)} gram</Typography.Text>
          <Typography.Text>{formatNumber(text / 1000)} kg</Typography.Text>
        </Space>
      ),
      width: 200,
      align: "center",
    },
    {
      title: "Lý do",
      dataIndex: "reasonCancelDL",
      render: (text) => <Typography.Text>{text}</Typography.Text>,
      width: 300,
      align: "center",
    },

    {
      title: "Trọng lượng hủy ở Sài Gòn",
      dataIndex: "weightCancelSG",
      render: (text) => (
        <Space direction="vertical">
          <Typography.Text>{formatNumber(text)} gram</Typography.Text>
          <Typography.Text>{formatNumber(text / 1000)} kg</Typography.Text>
        </Space>
      ),
      width: 200,
      align: "center",
    },
    {
      title: "Lý do",
      dataIndex: "reasonCancelSG",
      render: (text) => <Typography.Text>{text}</Typography.Text>,
      width: 300,
      align: "center",
    },
    {
      title: "Tổng trọng lượng có bao bì",
      dataIndex: "totalWithWrapper",
      render: (_, invoice) => (
        <Space direction="vertical">
          <Typography.Text>
            {formatNumber(invoice.amountBox * invoice.weightWrapper)} gram
          </Typography.Text>
          <Typography.Text>
            {formatNumber((invoice.amountBox * invoice.weightWrapper) / 1000)}{" "}
            kg
          </Typography.Text>
        </Space>
      ),
    },
    {
      title: "Tổng trọng lượng  bao bì",
      dataIndex: "totalWrapper",
      render: (_, invoice) => (
        <Space direction="vertical">
          <Typography.Text>
            {formatNumber(invoice.amountBox * invoice.weightBoxAndPackage)} gram
          </Typography.Text>
          <Typography.Text>
            {formatNumber(
              (invoice.amountBox * invoice.weightBoxAndPackage) / 1000
            )}{" "}
            kg
          </Typography.Text>
        </Space>
      ),
    },
    {
      title: "Tổng trọng lượng không có bao bì",
      dataIndex: "totalWithoutWrapper",
      render: (_, invoice) => (
        <Space direction="vertical">
          <Typography.Text>
            {formatNumber(
              invoice.amountBox * invoice.weightWrapper -
                invoice.amountBox * invoice.weightBoxAndPackage
            )}{" "}
            gram
          </Typography.Text>
          <Typography.Text>
            {formatNumber(
              (invoice.amountBox * invoice.weightWrapper -
                invoice.amountBox * invoice.weightBoxAndPackage) /
                1000
            )}{" "}
            kg
          </Typography.Text>
        </Space>
      ),
    },
    {
      title: "Tổng trọng lượng thực nhận",
      dataIndex: "total",
      render: (_, invoice) => (
        <Space direction="vertical">
          <Typography.Text>
            {formatNumber(
              invoice.amountBox * invoice.weightWrapper -
                invoice.amountBox * invoice.weightBoxAndPackage -
                (invoice.weightCancelDL - invoice.weightCancelSG)
            )}{" "}
            gram
          </Typography.Text>
          <Typography.Text>
            {formatNumber(
              (invoice.amountBox * invoice.weightWrapper -
                invoice.amountBox * invoice.weightBoxAndPackage -
                (invoice.weightCancelDL - invoice.weightCancelSG)) /
                1000
            )}{" "}
            kg
          </Typography.Text>
        </Space>
      ),
    },
    {
      title: "Tùy chọn",
      fixed: "right",
      align: "center",
      render(_, invoice) {
        return (
          <Space>
            <Tooltip title="Sửa">
              <Button
                onClick={() =>
                  navigate(InvoicePaths.EDIT.replace(":id", invoice.id))
                }
                type="text"
              >
                <EditOutlined />
              </Button>
            </Tooltip>
            <Tooltip title="Xóa">
              <Button danger type="text">
                <DeleteOutlined />
              </Button>
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <h3>Danh Sách Hóa Đơn</h3>
      <Table
        columns={columns}
        dataSource={invoices?.data}
        scroll={{ x: "max-content" }}
        loading={invoicesLoading}
      />
    </div>
  );
};

export default InvoiceList;
