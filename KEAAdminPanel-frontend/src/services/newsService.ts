import api from "../api/axios";

export interface News {
  _id: string;
  newsTitle: string;
  newsDetail: string;
  newsType: string;
  createdAt: string;
  __v?: number;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const getAllNews = async (): Promise<News[]> => {
  const res = await api.get<ApiResponse<News[]>>("/news/getAllNews");
  return res.data.data;
};

export const createNews = async (payload: { newsTitle: string; newsDetail: string; newsType: string }) => {
  const res = await api.post<ApiResponse<News>>("/news", payload);
  return res.data.data;
};

export const updateNews = async (id: string, payload: { newsTitle: string; newsDetail: string; newsType: string }) => {
  const res = await api.put<ApiResponse<News>>(`/news/${id}`, payload);
  return res.data.data;
};

export const deleteNews = async (id: string): Promise<void> => {
  await api.delete(`/news/${id}`);
};
