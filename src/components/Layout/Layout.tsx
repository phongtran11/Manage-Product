import { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  PoweroffOutlined,
  UnorderedListOutlined,
  FormOutlined,
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
import { ERoles } from "@/pages";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import { useWindowSize } from "@/hook";

const { Header, Sider, Content } = Layout;
export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { width } = useWindowSize();

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

  const items = getMenuItems(user?.role);

  useEffect(() => {
    if (width <= 768) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [width]);

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
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          className={
            width > 768 ? classes["header"] : classes["header-collapsed"]
          }
        >
          {width > 768 && (
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
          )}
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
              <Avatar className={classes["avatar"]} size="small" gap={2}>
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

const getMenuItems = (role?: ERoles) => {
  let items: MenuItemType[] = [];

  const adminMenu = [
    {
      icon: <UserOutlined />,
      key: "user/list",
      label: "Nhân viên",
    },
  ];

  const coordinatorMenu = [
    {
      icon: <UnorderedListOutlined />,
      key: "invoice/list",
      label: "Danh sách Đơn",
    },
    {
      icon: <FormOutlined />,
      key: "invoice/create",
      label: "Tạo đơn",
    },
  ];

  switch (role) {
    case ERoles.admin:
      items = [...items, ...adminMenu, ...coordinatorMenu];
      break;

    case ERoles.coordinator:
      items = [...items, ...coordinatorMenu];
      break;

    default:
      return;
  }

  return items;
};
