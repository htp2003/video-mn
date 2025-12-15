import React from "react";
import { Layout, Menu, ConfigProvider } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/auth-provider";

const { Sider } = Layout;

interface SideMenuProps {
  collapsed: boolean;
}

const menuItems = [
  {
    key: "/dashboard",
    icon: <UserOutlined />,
    label: "Dashboard",
    role: ["admin", "user"],
  },
  {
    key: "/videos",
    icon: <VideoCameraOutlined />,
    label: "Videos",
    role: ["admin", "user"],
  },
  {
    key: "/settings",
    icon: <UploadOutlined />,
    label: "Settings",
    role: ["admin"],
  },
];

const SideMenu: React.FC<SideMenuProps> = ({ collapsed }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Lọc menu theo role người dùng
  const items = menuItems.filter((item) => {
    if (!item.role) return true;
    return user && item.role.includes(user.role);
  });
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
      <div
        style={{
          height: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          whiteSpace: "nowrap",
          borderBottom: "1px solid #f0f0f0",
          borderRight: "1px solid rgb(240, 240, 240)",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: collapsed ? "20px" : "24px",
            fontWeight: "bold",
            color: "#00b96b",
            transition: "all 0.2s",
            letterSpacing: "1px",
          }}
        >
          {collapsed ? "Z" : "ZOZIEN"}
        </h1>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemColor: "#333",
              itemHoverColor: "#00b96b",
              itemSelectedColor: "#00b96b",
              itemHoverBg: "#f6ffed",
              itemSelectedBg: "#f6ffed",
            },
          },
        }}
      >
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["/dashboard"]}
          items={items}
          onClick={({ key }) => navigate(key)}
        />
      </ConfigProvider>
    </Sider>
  );
};

export default SideMenu;
