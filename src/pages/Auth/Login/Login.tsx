import React, { useEffect } from "react";
import classes from "./Login.module.scss";
import { Button, Card, Form, Input, Space } from "antd";
import { useMutateLogin } from "@/api";
import { useUser } from "@/store";
import { useNavigate } from "react-router";
import { RootPaths } from "@/routes";

export type TDataLogin = {
  username: string;
  password: string;
};

const Login = () => {
  const { mutate, data, error } = useMutateLogin();
  const navigate = useNavigate();
  const [form] = Form.useForm<TDataLogin>();
  const { updateUser, userData } = useUser();
  const submitHandler = () => {
    form.validateFields().then((result) => {
      mutate(result);
    });
  };

  useEffect(() => {
    if (data && data.user) {
      updateUser({ user: data.user, access_token: data.access_token });
    }
  }, [data, updateUser, navigate]);

  useEffect(() => {
    if (userData.access_token) navigate(RootPaths.DASHBOARD);
  }, [userData, navigate]);

  return (
    <div className={classes["login-wrapper"]}>
      <Card>
        <Form form={form} onFinish={submitHandler}>
          <Space direction="vertical" size={"middle"}>
            <h2 className={classes.title}>Đăng Nhập</h2>
            <Form.Item
              label="Tài khoản"
              name="username"
              rules={[{ required: true, message: "Vui lòng nhập tài khoản!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            >
              <Input.Password />
            </Form.Item>

            <span className={classes.error}>
              {error?.response?.status === 400
                ? "Tài khoản hoặc mật khẩu không chính xác"
                : ""}
            </span>

            <div className={classes.center}>
              <Button type="primary" htmlType="submit">
                Đăng Nhập
              </Button>
            </div>
          </Space>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
