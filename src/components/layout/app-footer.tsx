import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const AppFooter: React.FC = () => {
  return (
    <Footer style={{ textAlign: "center" }}>
      My Dashboard ©{new Date().getFullYear()} Created with Ant Design
    </Footer>
  );
};

export default AppFooter;
