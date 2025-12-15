import { useQuery } from "@tanstack/react-query";
import { useAppMutation } from "../../../hooks/use-app-mutation";
import {
  getVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
} from "../services/video-api";
import type { CreateVideoDto } from "../services/types";

// --- QUERIES ---
export const useVideos = () => {
  return useQuery({
    queryKey: ["videos"],
    queryFn: getVideos,
  });
};

export const useVideoDetail = (id?: string) => {
  return useQuery({
    queryKey: ["video", id],
    queryFn: () => getVideoById(id!),
    enabled: !!id, // Chỉ fetch khi có ID
  });
};

// --- MUTATIONS ---
export const useCreateVideo = () => {
  return useAppMutation({
    mutationFn: (data: CreateVideoDto) => createVideo(data),
    successMessage: "Tạo video thành công!",
    invalidateKeys: [["videos"]],
  });
};

export const useUpdateVideo = () => {
  return useAppMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateVideoDto }) =>
      updateVideo(id, data),
    successMessage: "Cập nhật video thành công!",
    invalidateKeys: [["videos"]],
  });
};

export const useDeleteVideo = () => {
  return useAppMutation({
    mutationFn: deleteVideo,
    successMessage: "Đã xóa video!",
    invalidateKeys: [["videos"]],
  });
};
