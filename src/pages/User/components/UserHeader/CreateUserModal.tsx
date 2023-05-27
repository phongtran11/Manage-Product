import React, { useCallback, useEffect } from "react";
import { Button, Form, Input, Modal, Typography, message } from "antd";
import { useMutateRegister } from "@/api";

type Props = {
  open: boolean;
  changeOpenModalHandler: (status: boolean) => void;
};

type TForm = {
  username: string;
  password: string;
  displayname: string;
  rePassword: string;
};

export const CreateUserModal = ({ open, changeOpenModalHandler }: Props) => {
  const { mutate, error, isLoading, data } = useMutateRegister();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm<TForm>();

  const submitHandler = ({ username, password, displayname }: TForm) => {
    mutate({ username, password, displayname });
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

  useEffect(() => {
    if (data) {
      changeOpenModalHandler(false);
      openNotifications("Tạo thành công");
    }
  }, [data, changeOpenModalHandler, openNotifications]);

  return (
    <Modal
      title={<Typography.Title level={3}>Tạo Nhân Viên</Typography.Title>}
      centered
      open={open}
      onCancel={() => changeOpenModalHandler(false)}
      footer={null}
      maskClosable={false}
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
          <Button disabled={isLoading}>Hủy</Button>
        </div>
      </Form>
    </Modal>
  );
};
