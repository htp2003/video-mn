import React from "react";
import { Card, Form, Button, Space, Divider } from "antd";

const SettingPage: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: unknown) => {
    console.log("Settings saved:", values);
  };

  return (
    <div style={{ padding: "24px" }}>
      <Card title="Settings" style={{ maxWidth: "600px" }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Setting Name"
            name="settingName"
            rules={[{ required: true, message: "Please input setting name" }]}
          >
            <input type="text" placeholder="Enter setting name" />
          </Form.Item>

          <Divider />

          <Space>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
            <Button onClick={() => form.resetFields()}>Reset</Button>
          </Space>
        </Form>
      </Card>
    </div>
  );
};

export default SettingPage;
