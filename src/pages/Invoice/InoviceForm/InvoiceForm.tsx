import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import classes from "./InvoiceForm.module.scss";
import { ETypeProduct } from "../Invoice.enum";
import { typeProducts } from "../Invoice.constant";
import { TInvoice } from "@/types/models";

type Props = {
  form: FormInstance;
  onFinish: ((values: TInvoice) => void) | undefined;
  initialValues?: Partial<TInvoice>;
};

export const formatNumber = (value: any) => {
  const parsed = Number(value);
  if (typeof parsed === "number") {
    return new Intl.NumberFormat("en-US").format(parsed);
  }
  return "0";
};

const InvoiceForm = ({ form, onFinish, initialValues }: Props) => {
  const amountBox = Form.useWatch(["amountBox"], form);
  const weightWrapper = Form.useWatch(["weightWrapper"], form);
  const weightBoxAndPackage = Form.useWatch(["weightBoxAndPackage"], form);
  const weightCancelSg = Form.useWatch("weightCancelSG", form);
  const weightCancelDl = Form.useWatch("weightCancelDL", form);

  const totalWithWrapper = amountBox * weightWrapper;
  const totalWrapper = amountBox * weightBoxAndPackage;
  const totalWithoutWrapper = totalWithWrapper - totalWrapper;
  const total = totalWithoutWrapper - weightCancelSg - weightCancelDl;

  return (
    <>
      <Row gutter={[12, 12]} className={classes.wrapper}>
        <Col span={24} xl={16}>
          <Form
            form={form}
            initialValues={initialValues}
            layout="vertical"
            onFinish={onFinish}
            className={classes.form}
          >
            <Row gutter={[12, 12]}>
              <Col span={24} style={{ display: "flex", justifyContent: "end" }}>
                <Button htmlType="submit" type="primary">
                  Tạo
                </Button>
              </Col>
              <Col span={12}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng điền",
                    },
                  ]}
                  name="dateImport"
                  label="Ngày nhập kho"
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    placeholder="năm/tháng/ngày"
                  />
                </Form.Item>
              </Col>
              <Col span={12}></Col>

              <Col span={24} md={12}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng điền",
                    },
                  ]}
                  name="customerName"
                  label="Tên khách hàng"
                >
                  <Input placeholder="Trần Văn Nam" />
                </Form.Item>
              </Col>
              <Col span={24} md={12}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng điền",
                    },
                  ]}
                  name="productName"
                  label="Tên sản phẩm"
                >
                  <Input placeholder="Dâu nhật" />
                </Form.Item>
              </Col>

              <Col span={24} md={12}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng điền",
                    },
                  ]}
                  name="type"
                  label="Loại"
                >
                  <Select
                    options={typeProducts.map((type) => ({
                      label: ETypeProduct[type],
                      value: type,
                    }))}
                  />
                </Form.Item>
              </Col>
              <Col span={24} md={12}>
                <Form.Item
                  rules={[
                    {
                      validator(_, value) {
                        if (value === 0) {
                          return Promise.reject("Vui lòng điền");
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                  name="weightWrapper"
                  label="Quy cách hộp"
                >
                  <InputNumber formatter={formatNumber} addonAfter="gram" />
                </Form.Item>
              </Col>

              <Col span={24} md={12}>
                <Form.Item
                  rules={[
                    {
                      validator(_, value) {
                        if (value === 0) {
                          return Promise.reject("Vui lòng điền");
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                  name="amountBox"
                  label="Số lượng bao bì/hộp"
                >
                  <InputNumber
                    formatter={formatNumber}
                    addonAfter="bao bì/ hộp"
                  />
                </Form.Item>
              </Col>
              <Col span={24} md={12}>
                <Form.Item
                  rules={[
                    {
                      validator(_, value) {
                        if (value === 0) {
                          return Promise.reject("Vui lòng điền");
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                  name="weightBoxAndPackage"
                  label="Trọng lượng bao bì/hộp"
                >
                  <InputNumber formatter={formatNumber} addonAfter="gram" />
                </Form.Item>
              </Col>

              <Col span={24} md={12}>
                <Form.Item name="weightCancelDL" label="Số lượng hủy Đà lạt">
                  <InputNumber formatter={formatNumber} addonAfter="gram" />
                </Form.Item>
              </Col>
              <Col span={24} md={12}>
                <Form.Item name="reasonCancelDL" label="Lý do">
                  <Input.TextArea />
                </Form.Item>
              </Col>

              <Col span={24} md={12}>
                <Form.Item name="weightCancelSG" label="Số lượng hủy Sài Gòn">
                  <InputNumber formatter={formatNumber} addonAfter="gram" />
                </Form.Item>
              </Col>
              <Col span={24} md={12}>
                <Form.Item name="reasonCancelSG" label="Lý do">
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col span={24} xl={8}>
          <Card className={classes.summary}>
            <Row gutter={[24, 0]} className={classes.item}>
              <Col span={16}>Tổng trọng lượng gồm bao bì</Col>
              <Col span={8}>
                <div> {formatNumber(totalWithWrapper)} gram </div>
                <div>{formatNumber(totalWithWrapper / 1000)} kg</div>
              </Col>

              <Divider />

              <Col span={16}>Tổng trọng lượng bao bì</Col>
              <Col span={8}>
                <div>{formatNumber(totalWrapper)} gram</div>
                <div>{formatNumber(totalWrapper / 1000)} kg</div>
              </Col>

              <Divider />

              <Col span={16}>Tổng trọng lượng trừ bao bì</Col>
              <Col span={8}>
                <div>{formatNumber(totalWithoutWrapper)} gram</div>
                <div>{formatNumber(totalWithoutWrapper / 1000)} kg</div>
              </Col>

              <Divider />

              <Col span={16}>Trọng lượng hủy ở Đà lạt</Col>
              <Col span={8}>
                <div>{formatNumber(weightCancelDl)} gram</div>
                <div>{formatNumber(weightCancelDl / 1000)} kg</div>
              </Col>

              <Col span={16}>Trọng lượng hủy ở Sài Gòn</Col>
              <Col span={8}>
                <div>{formatNumber(weightCancelSg)} gram</div>
                <div>{formatNumber(weightCancelSg / 1000)} kg</div>
              </Col>

              <Divider />

              <Col span={16}>Tổng Trọng lượng thực tế</Col>
              <Col span={8}>
                <div>{formatNumber(total)} gram</div>
                <div>{formatNumber(total / 1000)} kg</div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default InvoiceForm;
