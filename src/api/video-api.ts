import { useQuery } from "@tanstack/react-query";
import axiosClient from "./axios-client";

export interface Video {
  id: string;
  userName: string;
  videoTitle: string;
  url: string;
}

export const getVideo = async (id: string) => {
  const response = await axiosClient.get(`/videos/${id}`);
  return response.data;
};

export const useGetVideo = (id: string) => {
  return useQuery({
    queryKey: ["video", id],
    queryFn: () => getVideo(id),
  });
};

//delete video
export const deleteVideo = async (id: string) => {
  const response = await axiosClient.delete(`/videos/${id}`);
  return response.data;
};

//add video
export const addVideo = async (video: Omit<Video, "id">) => {
  const response = await axiosClient.post("/videos", video);
  return response.data;
};
