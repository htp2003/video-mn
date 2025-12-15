import React, { useEffect, useState } from "react";
import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import AppHeader from "../components/layout/app-header";
import AppFooter from "../components/layout/app-footer";
import SideMenu from "../components/layout/side-menu";

const { Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideMenu collapsed={collapsed} />
      <Layout>
        <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <AppFooter />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
