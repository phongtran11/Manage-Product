import { Button } from "antd";
import { useState } from "react";
import { CreateUserModal } from "./CreateUserModal";

export const UserHeader = () => {
  const [openModal, setOpenModal] = useState(false);

  const changeOpenModalHandler = (status: boolean) => {
    setOpenModal(status);
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpenModal(true)}>
        Tạo nhân viên
      </Button>
      <CreateUserModal
        open={openModal}
        changeOpenModalHandler={changeOpenModalHandler}
      />
    </>
  );
};
