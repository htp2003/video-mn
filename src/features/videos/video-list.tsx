import React from "react";
import { Table, Button, Space, Tag } from "antd";
import {
  EditOutlined,
  PlusOutlined,
  VideoCameraOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";

// 1. Import Global Components (Dùng chung)
import { AppPageHeader } from "../../components/common/app-page-header";
import { DeleteButton } from "../../components/common/delete-button";

// 2. Import Feature Hooks & Types (Nghiệp vụ Video)
import { useVideos, useDeleteVideo } from "./hooks/use-video";
import type { Video } from "./services/types";

const VideoList: React.FC = () => {
  const navigate = useNavigate();

  // Gọi Hooks: Tự động lấy data và cache
  const { data, isLoading } = useVideos();
  const deleteMutation = useDeleteVideo();

  // Định nghĩa cột
  const columns: ColumnsType<Video> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
    },
    {
      title: "Tiêu đề Video",
      dataIndex: "videoTitle",
      render: (text) => (
        <Space>
          <VideoCameraOutlined style={{ color: "#1890ff" }} />
          <span style={{ fontWeight: 500 }}>{text}</span>
        </Space>
      ),
    },
    {
      title: "Chapters",
      dataIndex: "chapters",
      render: (chapters) => {
        if (!chapters || chapters.length === 0) {
          return <Tag color="red">Chưa có</Tag>;
        }
        return (
          <Space>
            <UnorderedListOutlined style={{ color: "green" }} />
            <span>{chapters.length} chapter(s)</span>
          </Space>
        );
      },
    },
    {
      title: "Người tạo",
      dataIndex: "userName",
      render: (name) => <Tag color="blue">{name}</Tag>,
    },
    {
      title: "Link",
      dataIndex: "url",
      render: (url: string) => (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          style={{ color: "gray" }}
        >
          Xem ngay
        </a>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      width: 150,
      render: (_, record) => (
        <Space>
          {/* Nút Sửa: Chuyển trang */}
          <Button
            icon={<EditOutlined />}
            type="text"
            onClick={() => navigate(`/videos/${record.id}`)}
          />

          {/* Nút Xóa: Dùng component chung đã có Popconfirm */}
          <DeleteButton
            title="Bạn có chắc muốn xóa video này?"
            loading={deleteMutation.isPending}
            onConfirm={() => deleteMutation.mutate(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Header chuẩn của hệ thống */}
      <AppPageHeader
        title="Quản lý Video"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate("/videos/create")}
          >
            Thêm Video
          </Button>
        }
      />

      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        rowKey="id" // Quan trọng: MockAPI dùng field 'id' làm khóa chính
        pagination={{ pageSize: 5 }} // Phân trang nhẹ nhàng
      />
    </div>
  );
};

export default VideoList;
