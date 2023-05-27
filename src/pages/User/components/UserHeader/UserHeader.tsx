import { Button, Space } from "antd";
import React, { useState } from "react";
import { CreateUserModal } from "./CreateUserModal";

type Props = object;

export const UserHeader = (props: Props) => {
  const [openModal, setOpenModal] = useState(false);

  const changeOpenModalHandler = (status: boolean) => {
    setOpenModal(status);
  };

  return (
    <Space>
      <Button type="primary" onClick={() => setOpenModal(true)}>
        Tạo nhân viên
      </Button>
      <CreateUserModal
        open={openModal}
        changeOpenModalHandler={changeOpenModalHandler}
      />
    </Space>
  );
};
