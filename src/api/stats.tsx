import api from "./api";
import { AxiosError } from "axios";

export interface ContextTotalResponse {
  id: number;
}

export const ContextTotal = async (
  Params: string
): Promise<ContextTotalResponse> => {
  try {
    const response = await api.get<{ data: ContextTotalResponse }>(
      `/stats/context_total/${Params}`
    );

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

export const MostSaved = async (): Promise<ContextTotalResponse> => {
  try {
    const response = await api.get<{ data: ContextTotalResponse }>(
      `/stats/user/most_idea_saved`
    );

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
