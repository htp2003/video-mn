// 1. Entity: Dữ liệu đầy đủ từ Server trả về
export interface Video {
  id: string; // MockAPI luôn trả về string
  userName: string;
  videoTitle: string; // Lưu ý: MockAPI của bạn đang dùng 'videoTitle'
  url: string;
  createdAt?: string; // Trường này MockAPI tự sinh, có thể dùng để sort
  chapters?: VideoChapter[];
}

export interface VideoChapter {
  time: string;
  label: string;
}

export interface CreateVideoPayload {
  videoTitle: string;
  url: string;
  chapters?: VideoChapter[];
}

// 2. DTO (Data Transfer Object): Dữ liệu gửi đi để tạo mới / cập nhật
// Dùng Omit để loại bỏ 'id' và 'createdAt' (vì 2 cái này Server tự xử lý)
export type CreateVideoDto = Omit<Video, "id" | "createdAt">;
