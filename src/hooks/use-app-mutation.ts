import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
  type QueryKey,
} from "@tanstack/react-query";
import { message } from "antd";

// 1. Định nghĩa Interface mở rộng
interface AppMutationOptions<TData, TError, TVariables, TContext>
  extends UseMutationOptions<TData, TError, TVariables, TContext> {
  successMessage?: string;
  invalidateKeys?: QueryKey[];
}

// 2. Hook chính
export const useAppMutation = <
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown
>(
  options: AppMutationOptions<TData, TError, TVariables, TContext>
) => {
  const queryClient = useQueryClient();
  const { successMessage, invalidateKeys, ...restOptions } = options;

  return useMutation({
    ...restOptions,

    // SỬA: Dùng ...args để TS tự hiểu đúng số lượng tham số
    onSuccess: (...args) => {
      // args[0] = data, args[1] = variables, args[2] = context

      // 1. Hiện thông báo
      if (successMessage) {
        message.success(successMessage);
      }

      // 2. Làm mới dữ liệu
      if (invalidateKeys) {
        invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }

      // 3. Gọi callback gốc (Truyền nguyên cụm args đi để không bị lỗi thiếu context)
      restOptions.onSuccess?.(...args);
    },

    onError: (...args) => {
      // args[0] = error, args[1] = variables, args[2] = context
      const [error] = args;

      // 1. Hiện thông báo lỗi
      const msg = (error as Error).message || "Có lỗi xảy ra";
      message.error(msg);

      // 2. Gọi callback gốc
      restOptions.onError?.(...args);
    },

    // Nếu muốn override cả onSettled sau này thì cũng dùng ...args luôn
    // onSettled: (...args) => { ... }
  });
};
