import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const Dashboard: React.FC = () => {
  return (
    <div>
      <Title level={2}>Dashboard</Title>
      <Paragraph>Welcome to your main dashboard area.</Paragraph>
    </div>
  );
};

export default Dashboard;
