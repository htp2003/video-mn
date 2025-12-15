import type { LoginPayload, User } from "../../auth/services/types";
export const login = (payload: LoginPayload): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // LOGIC QUYẾT ĐỊNH Ở ĐÂY:

      // 1. Nếu nhập username là 'admin' -> Trả về role ADMIN
      if (payload.username === "admin") {
        resolve({
          id: "1",
          username: "admin",
          name: "Admin User",
          role: "admin", // <--- Quyền lực nằm ở đây
          avatar: "https://i.pravatar.cc/150?u=admin",
        });
        return;
      }

      // 2. Nếu nhập username là 'user' -> Trả về role USER
      if (payload.username === "user") {
        resolve({
          id: "2",
          username: "user",
          name: "Regular User",
          role: "user", // <--- thuờng dân :)
          avatar: "https://i.pravatar.cc/150?u=user",
        });
        return;
      }

      // 3. Nhập cái khác -> Lỗi
      reject(new Error("Tài khoản hoặc mật khẩu không đúng"));
    }, 1000);
  });
};
