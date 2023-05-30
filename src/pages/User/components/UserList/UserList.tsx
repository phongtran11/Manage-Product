import { useMutateDeleteUser, useQueryUserList } from "@/api";
import { Button, Modal, Table, Tooltip, Typography, message } from "antd";

import type { ColumnsType } from "antd/es/table";
import { TUser } from "../../user.type";
import { ERoles } from "../../user.enum";
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";

export const UserList = () => {
  const [deletePopup, setDeletePopup] = useState(false);
  const [userId, setUserId] = useState<TUser | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const { data, isLoading, refetch } = useQueryUserList(
    {
      page: 1,
      limit: 10,
    },
    true
  );

  const { mutate: deleteUser, isLoading: deleteLoading } =
    useMutateDeleteUser();

  const deleteUserHandler = () => {
    deleteUser(userId?.id ?? "", {
      onSuccess() {
        setDeletePopup(false);
        messageApi.open({
          type: "error",
          content: "Xóa thành công",
          duration: 2,
        });

        refetch();
      },
    });
  };

  const renderRole = (role: ERoles) => {
    const roleDisplay =
      role === ERoles.accountant
        ? "Kế toán"
        : role === ERoles.coordinator
        ? "Điều phối"
        : role === ERoles.shipper
        ? "Giao hàng"
        : "ADMIN";

    return <Typography.Text>{roleDisplay}</Typography.Text>;
  };

  const columns: ColumnsType<TUser> = [
    {
      title: "STT",
      render: (_, __, index) => {
        if (data) return (data.page - 1) * data.limit + index + 1;
      },
      width: 50,
      align: "center",
    },
    {
      title: "Tên",
      dataIndex: "displayname",
      render: (text) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: "Tài khoản",
      dataIndex: "username",
      render: (text) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: "Chức vụ",
      dataIndex: "role",
      render: (role) => renderRole(role),
    },
    {
      title: "Thao tác",
      dataIndex: Math.random(),
      render: (_, record) => {
        return (
          <Tooltip trigger="hover" title="Xóa">
            <Button
              onClick={() => {
                setDeletePopup(true);
                setUserId(record);
              }}
              disabled={record.role === ERoles.admin}
              danger
              icon={<DeleteOutlined />}
            />
          </Tooltip>
        );
      },
    },
  ];

  return (
    <>
      {contextHolder}
      <Table
        columns={columns}
        dataSource={data?.data ?? []}
        loading={isLoading}
        scroll={{
          x: true,
        }}
      />
      <Modal
        open={deletePopup}
        okButtonProps={{ danger: true, loading: deleteLoading }}
        cancelButtonProps={{ loading: deleteLoading }}
        okText="Xóa"
        cancelText="Hủy"
        onCancel={() => setDeletePopup(false)}
        onOk={deleteUserHandler}
        centered
        closable={false}
        maskClosable={false}
      >
        <h3>Bạn có muốn xóa tài khoản "{userId?.username}"</h3>
      </Modal>
    </>
  );
};
