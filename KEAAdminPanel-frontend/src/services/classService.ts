import api from "../api/axios";

export interface Class {
  _id: string;
  name: string;
  createdAt: string;
  __v?: number;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// GET all classes
export const getClasses = async (): Promise<Class[]> => {
  const res = await api.get<ApiResponse<Class[]>>("/classes");
  return res.data.data;
};

// POST create class
export const createClass = async (name: string): Promise<Class> => {
  const res = await api.post<ApiResponse<Class>>("/classes", { name });
  return res.data.data;
};

// DELETE class by id
export const deleteClass = async (id: string): Promise<void> => {
  await api.delete(`/classes/${id}`);
};