export type UserRole = "admin" | "user" | "guest";

export interface User {
  id: string;
  username: string;
  name?: string;
  role: UserRole;
  avatar?: string;
}

export interface LoginPayload {
  username: string;
  password?: string;
  remember?: boolean;
}

// Interface cho Context để Provider dùng
export interface AuthContextType {
  user: User | null;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean; // Thêm cái này để chặn route khi đang F5
}
