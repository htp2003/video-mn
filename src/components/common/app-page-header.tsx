import React from "react";
import { Typography, Space } from "antd";

const { Title } = Typography;

interface AppPageHeaderProps {
  title: string;
  extra?: React.ReactNode; // Nút bấm hoặc action bên phải
}

export const AppPageHeader: React.FC<AppPageHeaderProps> = ({
  title,
  extra,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
      }}
    >
      <Title level={3} style={{ margin: 0 }}>
        {title}
      </Title>
      {extra && <Space>{extra}</Space>}
    </div>
  );
};
