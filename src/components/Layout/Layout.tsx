import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Button,
  theme,
  Popover,
  Avatar,
  Result,
  Image,
} from "antd";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useUser } from "@/store/user.store";
import classes from "./Layout.module.scss";
import dashboardSvg from "@/assets/dashboard-bg.jpg";

const { Header, Sider, Content } = Layout;
export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  const {
    userData: { user },
    updateUser,
  } = useUser();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [openPopover, setOpenPopover] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpenPopover(newOpen);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={({ key }) => {
            navigate(key);
          }}
          items={[
            {
              key: "dashboard",
              icon: <UserOutlined />,
              label: "Quản lý",
              children:
                user?.role === "admin"
                  ? [
                      {
                        key: "user/list",
                        icon: <UserOutlined />,
                        label: "Nhân viên",
                      },
                    ]
                  : [],
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header className={classes["header"]}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Popover
            content={
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                items={[
                  {
                    key: "logout",
                    label: "Đăng xuất",
                    icon: <PoweroffOutlined />,
                  },
                ]}
                onClick={({ key }) => {
                  if (key === "logout") {
                    updateUser({ user: undefined, access_token: undefined });
                  }
                }}
              />
            }
            trigger="click"
            open={openPopover}
            onOpenChange={handleOpenChange}
          >
            <Button className={classes["user-info"]} type="primary">
              <Avatar className={classes["avatar"]} size="large" gap={2}>
                {user?.displayname?.split("").shift()?.toUpperCase()}
              </Avatar>
              {user?.displayname}
            </Button>
          </Popover>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {location.pathname === "/" && (
            <Result
              icon={
                <Image
                  height={500}
                  width={500}
                  src={dashboardSvg}
                  preview={false}
                />
              }
              title="Chào bạn đến với trang chủ"
              subTitle="Vui lòng chọn tác vụ nhé!"
            />
          )}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
