import { AxiosError } from "axios";
import Cookies from "js-cookie";
import api from "./api";
interface LoginResponse {
  success: boolean;
  status: number;
  data?: {
    access_token: string;
    refresh_token: string;
    user?: {
      id: number;
      username: string;
      email: string;
    };
  };
  message?: string;
  access_token: string;
  refresh_token: string;
}

export interface ProfileResponse {
  success: boolean;
  status: number;
  data: {
    username: string | null;
    limit_token: number | null;
  };
  message?: string;
}

export const Login = async (formData: {
  username: string;
  password: string;
}): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("/auth/login", formData, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError;
  }
};

export const Register = async (formData: {
  username: string;
  password: string;
  email: string;
  telegram_user_id: string;
}): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("/auth/register", formData, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError;
  }
};

export const Profile = async (): Promise<ProfileResponse> => {
  try {
    const token = Cookies.get("access_token");

    const response = await api.get<ProfileResponse>("/user/profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 401) {
      try {
        const refreshResponse = await RefreshToken();

        Cookies.set("access_token", refreshResponse.access_token);

        const retryResponse = await api.get<ProfileResponse>("/user/profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshResponse.access_token}`,
          },
        });

        return retryResponse.data;
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        throw refreshError;
      }
    }

    throw axiosError;
  }
};

export const RefreshToken = async (): Promise<LoginResponse> => {
  try {
    const token = Cookies.get("refresh_token");
    const response = await api.post<LoginResponse>("/auth/refresh", {
      refresh_token: token,
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      sessionStorage.removeItem("username");
    }
    throw axiosError;
  }
};
