import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Layout,
  Button,
  theme,
  Dropdown,
  Space,
  Avatar,
  Typography,
  type MenuProps,
} from "antd";
import {
  LeftOutlined,
  RightOutlined,
  UserOutlined,
  LogoutOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../providers/auth-provider"; // <--- Import đúng chỗ này

const { Header } = Layout;
const { Text } = Typography;

interface AppHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ collapsed, setCollapsed }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Xử lý đăng xuất
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Menu xổ xuống
  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: "Hồ sơ cá nhân",
      icon: <UserOutlined />,
    },
    { type: "divider" },
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <Header
      style={{
        padding: "0 24px",
        background: colorBgContainer,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between", // Tách 2 bên: Nút toggle trái, User phải
        boxShadow: "0 1px 4px rgba(0,21,41,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 1,
      }}
    >
      {/* Bên trái: Nút đóng mở Menu */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button
          type="text"
          icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{ fontSize: "16px", width: 64, height: 64 }}
        />
        <h3 style={{ margin: "0 16px" }}>Dashboard</h3>
      </div>

      {/* Bên phải: User Info & Logout */}
      <Dropdown menu={{ items: userMenuItems }} trigger={["click"]}>
        <Space style={{ cursor: "pointer" }}>
          <Avatar src={user?.avatar} icon={<UserOutlined />} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: "1.2",
            }}
          >
            <Text strong>{user?.name || user?.username}</Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {user?.role}
            </Text>
          </div>
          <DownOutlined style={{ fontSize: 10, color: "#999" }} />
        </Space>
      </Dropdown>
    </Header>
  );
};

export default AppHeader;
