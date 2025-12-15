import api from "../../../api/axios-client";
import type { Video, CreateVideoDto } from "./types";

export const getVideos = async (): Promise<Video[]> => {
  const res = await api.get("/videos");
  return res.data;
};

export const getVideoById = async (id: string): Promise<Video> => {
  const res = await api.get(`/videos/${id}`);
  return res.data;
};

export const createVideo = async (data: CreateVideoDto): Promise<Video> => {
  const res = await api.post("/videos", data);
  return res.data;
};

export const updateVideo = async (
  id: string,
  data: CreateVideoDto
): Promise<Video> => {
  const res = await api.put(`/videos/${id}`, data);
  return res.data;
};

export const deleteVideo = async (id: string): Promise<void> => {
  await api.delete(`/videos/${id}`);
};
