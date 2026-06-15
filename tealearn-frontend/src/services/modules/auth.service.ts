import { api } from "@/services/api/axios";

import type {
  LoginRequest,
  LoginResponse,
} from "@/types/auth";

export async function loginService(
  data: LoginRequest
) {
  const response =
    await api.post<LoginResponse>(
      "/auth/login",
      data
    );

  return response.data;
}