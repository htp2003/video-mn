import React, { useEffect } from "react";
import { Form, Input, Button, Card, Space } from "antd";
import { SaveOutlined, VideoCameraOutlined } from "@ant-design/icons";
import type { CreateVideoDto } from "../services/types";

// Component này chỉ phục vụ feature Video
interface VideoFormProps {
  initialValues?: CreateVideoDto;
  onFinish: (values: CreateVideoDto) => void;
  isLoading?: boolean;
  onCancel: () => void;
  title: string;
}

export const VideoForm: React.FC<VideoFormProps> = ({
  initialValues,
  onFinish,
  isLoading,
  onCancel,
  title,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) form.setFieldsValue(initialValues);
    else form.resetFields();
  }, [initialValues, form]);

  return (
    <Card title={title}>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          name="videoTitle"
          label="Tiêu đề"
          rules={[{ required: true }]}
        >
          <Input prefix={<VideoCameraOutlined />} />
        </Form.Item>

        <Form.Item
          name="url"
          label="URL"
          rules={[{ required: true, type: "url" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="userName"
          label="Người tạo"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button onClick={onCancel}>Hủy</Button>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={isLoading}
            >
              Lưu lại
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};
