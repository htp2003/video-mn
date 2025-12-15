import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../providers/auth-provider"; // Import Hook của mình

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth(); // Lấy hàm login từ Context

  // State loading nội bộ (để xoay vòng khi đang gọi API)
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Xử lý logic sau khi login xong
  // Nếu người dùng bị đá từ trang /videos về đây, thì login xong phải trả họ về /videos
  // from chính là cái đường dẫn cũ đó.
  const from = location.state?.from?.pathname || "/dashboard";

  const onFinish = async (values: any) => {
    setIsSubmitting(true);
    try {
      // 1. Gọi hàm login giả lập từ Context
      await login(values);

      // 2. Thành công -> Thông báo & Chuyển trang
      message.success("Đăng nhập thành công!");
      navigate(from, { replace: true });
    } catch (error) {
      // 3. Thất bại -> Hiện lỗi
      message.error("Sai tài khoản hoặc mật khẩu!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5", // Màu nền xám nhẹ chuẩn AntD
      }}
    >
      <Card style={{ width: 400, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          {/* Logo nếu có */}
          <Title level={3}>Đăng nhập hệ thống</Title>
          <Text type="secondary">Chào mừng quay trở lại!</Text>
        </div>

        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          {/* USERNAME */}
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập tên đăng nhập!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username (admin / user)"
            />
          </Form.Item>

          {/* PASSWORD */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Ghi nhớ đăng nhập</Checkbox>
            </Form.Item>
            <a style={{ float: "right" }} href="">
              Quên mật khẩu?
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={isSubmitting} // Hiệu ứng xoay khi đang đăng nhập
            >
              Đăng nhập
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center" }}>
            Mock Account: <b>admin / user</b>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
