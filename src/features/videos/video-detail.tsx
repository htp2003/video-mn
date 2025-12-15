import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spin } from "antd";

// 1. Import Global Components
import { AppPageHeader } from "../../components/common/app-page-header";

// 2. Import Feature Components & Hooks
import { VideoForm } from "./components/video-form";
import {
  useVideoDetail,
  useCreateVideo,
  useUpdateVideo,
} from "./hooks/use-video";
import type { CreateVideoDto } from "./services/types";

const VideoDetail: React.FC = () => {
  const { id } = useParams(); // Lấy ID từ URL (nếu có)
  const navigate = useNavigate();

  // Logic xác định chế độ: Có ID -> Edit Mode, Không có -> Create Mode
  const isEditMode = !!id;

  // --- HOOKS ---
  // 1. Lấy dữ liệu chi tiết (Chỉ chạy khi có id)
  const { data: videoData, isLoading: isLoadingGet } = useVideoDetail(id);

  // 2. Các hành động thêm/sửa
  const createMutation = useCreateVideo();
  const updateMutation = useUpdateVideo();

  // --- HANDLERS ---
  const handleFinish = (values: CreateVideoDto) => {
    if (isEditMode) {
      // Logic Sửa
      updateMutation.mutate(
        { id: id!, data: values },
        {
          // Hook useAppMutation đã lo thông báo rồi, ta chỉ việc chuyển trang
          onSuccess: () => navigate("/videos"),
        }
      );
    } else {
      // Logic Tạo
      createMutation.mutate(values, {
        onSuccess: () => navigate("/videos"),
      });
    }
  };

  const handleCancel = () => {
    navigate("/videos");
  };

  // Trạng thái đang lưu (chung cho cả tạo và sửa)
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  // --- RENDER ---

  // Nếu đang mode Sửa mà dữ liệu chưa về -> Hiện Loading
  if (isEditMode && isLoadingGet) {
    return (
      <Spin
        size="large"
        tip="Đang tải dữ liệu..."
        style={{ display: "block", margin: "50px auto" }}
      />
    );
  }

  const pageTitle = isEditMode ? `Cập nhật Video` : "Tạo Video Mới";

  return (
    <div>
      {/* Header đồng bộ */}
      <AppPageHeader title={pageTitle} />

      {/* Form tái sử dụng */}
      <VideoForm
        title={isEditMode ? "Thông tin chỉnh sửa" : "Nhập thông tin video"}
        initialValues={videoData} // Nếu Create thì undefined -> Form tự reset
        onFinish={handleFinish}
        onCancel={handleCancel}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default VideoDetail;
