import { FC } from "react";
import { Typography } from "antd";
import { UserHeader, UserList } from "./components";

const User: FC = () => {
  return (
    <>
      <Typography.Title level={3}>Quản lý nhân viên</Typography.Title>
      <UserHeader />
      <UserList />
    </>
  );
};

export default User;
