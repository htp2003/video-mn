import React from "react";
import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

interface DeleteButtonProps {
  onConfirm: () => void;
  loading?: boolean;
  title?: string;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  onConfirm,
  loading,
  title = "Bạn có chắc chắn muốn xóa?",
}) => {
  return (
    <Popconfirm title={title} onConfirm={onConfirm} okButtonProps={{ loading }}>
      <Button danger icon={<DeleteOutlined />} loading={loading} />
    </Popconfirm>
  );
};
