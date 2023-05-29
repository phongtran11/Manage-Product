import { useCallback, useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select, Typography, message } from "antd";
import { useMutateRegister, useQueryUserList } from "@/api";
import { ERoles } from "../../user.enum";

type Props = {
  open: boolean;
  changeOpenModalHandler: (status: boolean) => void;
};

type TForm = {
  username: string;
  password: string;
  displayname: string;
  rePassword: string;
  role: string;
};

export const CreateUserModal = ({ open, changeOpenModalHandler }: Props) => {
  const { mutate, error, isLoading } = useMutateRegister();
  const [fetchUser, setFetchUser] = useState(false);

  useQueryUserList({ page: 1, limit: 10 }, fetchUser);

  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm<TForm>();

  const submitHandler = ({ username, password, displayname, role }: TForm) => {
    mutate(
      { username, password, displayname, role },
      {
        onSuccess() {
          changeOpenModalHandler(false);
          openNotifications("Tạo thành công");
          setFetchUser(true);
          form.resetFields();
        },
      }
    );
  };

  const openNotifications = useCallback(
    (message: string) => {
      messageApi.open({
        type: "success",
        content: message,
        duration: 2,
      });
    },
    [messageApi]
  );

  const usernameField = Form.useWatch(["username"], form);

  useEffect(() => {
    form.setFieldValue(["username"], usernameField?.replace(/\s/g, ""));
  }, [usernameField, form]);

  return (
    <Modal
      title={<Typography.Title level={3}>Tạo Nhân Viên</Typography.Title>}
      centered
      open={open}
      onCancel={() => changeOpenModalHandler(false)}
      footer={null}
      maskClosable={false}
      destroyOnClose={true}
    >
      {contextHolder}
      <Form
        form={form}
        onFinish={submitHandler}
        name="createUser"
        layout="vertical"
      >
        <Form.Item
          name="username"
          label="Tài Khoản"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="rePassword"
          label="Xác Nhận Lại Mật khẩu"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không khớp!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Vui lòng nhập",
            },
          ]}
          name="displayname"
          label="Tên nhân viên"
        >
          <Input />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: "Vui lòng chọn",
            },
          ]}
          name="role"
          label="Chức danh"
        >
          <Select
            options={[
              {
                label: "nhân viên điều phối",
                value: ERoles.coordinator,
              },
              {
                label: "nhân viên giao hàng",
                value: ERoles.shipper,
              },
              {
                label: "nhân viên kế toán",
                value: ERoles.accountant,
              },
            ]}
          />
        </Form.Item>

        <div style={{ minHeight: "20px", width: "100%" }}>
          <Typography.Text type="danger">
            {error?.response?.data.message}
          </Typography.Text>
        </div>

        <div style={{ padding: "10px" }}>
          <Button
            htmlType="submit"
            style={{ marginRight: "10px" }}
            type="primary"
            disabled={isLoading}
          >
            Tạo
          </Button>
          <Button
            onClick={() => changeOpenModalHandler(false)}
            disabled={isLoading}
          >
            Hủy
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
