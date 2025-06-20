/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { AxiosError } from "axios";
import Cookies from "js-cookie";
import api from "./api";
export interface GenerateResponse {
  success: boolean;
  status: number;
  data?: {
    username: string;
    fashion_type: string;
    season: string;
    culture: string;
    region: string;
    brand_price: string;
    platform: string;
  };
  message?: string;
  access_token: string;
  refresh_token: string;
}

export interface GenerateHistoryResponse {
  id: number;
  name_idea: string;
  full_idea: string;
  brand_price: string;
  created_at: string;
  fashion_type: string;
  season: string;
  culture: string;
  region: string;
  platform: string;
  material_idea: {
    map(
      arg0: (item: unknown) => import("react").JSX.Element
    ): import("react").ReactNode;
    material: string;
    range_price: string;
  };
}

export const GenerateIdea = async (formData: {
  username: string;
  fashion_type: string;
  season: string;
  culture: string;
  region: string;
  brand_price: string;
  platform: string;
}): Promise<GenerateResponse> => {
  try {
    const token = Cookies.get("access_token");

    const response = await api.post<GenerateResponse>(
      "/idea/generate",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError;
  }
};

export const HistoriesIdea = async (formData: {
  fashion_type: string;
  season: string;
  culture: string;
  region: string;
  brand_price: string;
  platform: string;
}): Promise<GenerateResponse> => {
  try {
    const token = Cookies.get("access_token");

    const response = await api.post<GenerateResponse>("/histories", formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError;
  }
};

export const SaveIdea = async (formData: {
  full_idea: string;
  material_idea: string[];
  name_idea: string;
  histories_id: string;
}): Promise<GenerateResponse> => {
  try {
    const token = Cookies.get("access_token");

    const response = await api.post<GenerateResponse>("/idea/save", formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError;
  }
};

export const HistoryIdea = async (): Promise<GenerateHistoryResponse> => {
  try {
    const token = Cookies.get("access_token");

    const response = await api.get<GenerateHistoryResponse>(`/idea/history`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (response.data && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("Data not found");
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError;
  }
};
