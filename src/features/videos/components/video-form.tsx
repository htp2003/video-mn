import React, { useEffect } from "react";
import { Form, Input, Button, Card, Space, Typography, Row, Col } from "antd";
import {
  SaveOutlined,
  VideoCameraOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  ClockCircleOutlined,
  UserOutlined,
  LinkOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import type { CreateVideoDto } from "../services/types";

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
    if (initialValues) {
      // Khi có data sửa, form tự map vào các field, kể cả mảng chapters
      form.setFieldsValue(initialValues);
    } else {
      // Khi tạo mới -> Reset form
      form.resetFields();
    }
  }, [initialValues, form]);

  return (
    <Card title={title} bordered={false}>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        disabled={isLoading}
        // Quan trọng: Khởi tạo mảng chapters rỗng để tránh lỗi null
        initialValues={{ chapters: [], ...initialValues }}
      >
        {/* --- KHU VỰC THÔNG TIN CHUNG --- */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="videoTitle"
              label="Tiêu đề Video"
              rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
            >
              <Input
                prefix={<VideoCameraOutlined className="site-form-item-icon" />}
                placeholder="Nhập tiêu đề video..."
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="userName"
              label="Người tạo"
              rules={[
                { required: true, message: "Vui lòng nhập tên người tạo" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Nhập tên của bạn..."
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="url"
          label="YouTube URL"
          rules={[
            { required: true, message: "Vui lòng nhập URL video" },
            { type: "url", message: "Link không đúng định dạng" },
          ]}
        >
          <Input
            prefix={<LinkOutlined />}
            placeholder="https://youtube.com/..."
          />
        </Form.Item>

        {/* --- KHU VỰC CHAPTERS (FORM.LIST) --- */}
        <div
          style={{
            marginTop: 24,
            marginBottom: 24,
            background: "#fafafa", // Nền xám nhẹ để phân biệt
            padding: 20,
            borderRadius: 8,
            border: "1px dashed #d9d9d9",
          }}
        >
          <Typography.Title level={5} style={{ marginBottom: 16 }}>
            ⏱️ Mốc thời gian (Chapters)
          </Typography.Title>

          <Form.List name="chapters">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row
                    key={key}
                    gutter={8}
                    align="middle"
                    style={{ marginBottom: 12 }}
                  >
                    {/* Cột 1: Thời gian */}
                    <Col span={5}>
                      <Form.Item
                        {...restField}
                        name={[name, "time"]}
                        rules={[{ required: true, message: "Nhập giờ" }]}
                        style={{ marginBottom: 0 }} // Bỏ margin để thẳng hàng
                      >
                        <Input
                          placeholder="00:00"
                          prefix={
                            <ClockCircleOutlined style={{ color: "#bfbfbf" }} />
                          }
                        />
                      </Form.Item>
                    </Col>

                    {/* Cột 2: Nội dung chapter */}
                    <Col span={17}>
                      <Form.Item
                        {...restField}
                        name={[name, "label"]}
                        rules={[{ required: true, message: "Nhập nội dung" }]}
                        style={{ marginBottom: 0 }}
                      >
                        <Input placeholder="Nội dung đoạn này là gì?" />
                      </Form.Item>
                    </Col>

                    {/* Cột 3: Nút xóa */}
                    <Col span={2} style={{ textAlign: "center" }}>
                      <MinusCircleOutlined
                        onClick={() => remove(name)}
                        style={{
                          color: "#ff4d4f",
                          fontSize: 18,
                          cursor: "pointer",
                        }}
                      />
                    </Col>
                  </Row>
                ))}

                {/* Nút thêm mới */}
                <Form.Item style={{ marginTop: 12, marginBottom: 0 }}>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Thêm mốc thời gian
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </div>

        {/* --- BUTTONS --- */}
        <Form.Item style={{ marginTop: 24, textAlign: "right" }}>
          <Space>
            <Button onClick={onCancel} icon={<CloseOutlined />}>
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={isLoading}
            >
              Lưu Video
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};
