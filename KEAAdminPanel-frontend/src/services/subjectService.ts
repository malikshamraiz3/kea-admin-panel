import api from "../api/axios";

export interface Subject {
  _id: string;
  name: string;
  classId?: string;
  createdAt: string;
  __v?: number;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const unwrapData = <T>(payload: unknown): T => {
  if (payload && typeof payload === "object" && "data" in payload) {
    const maybeData = (payload as { data?: T }).data;
    if (maybeData !== undefined) return maybeData;
  }
  return payload as T;
};

const isNotFound = (error: unknown) => {
  const status = (error as { response?: { status?: number } })?.response?.status;
  return status === 404;
};

export const getSubjectsByClassId = async (classId: string): Promise<Subject[]> => {
  try {
    const res = await api.get<ApiResponse<Subject[]> | Subject[]>(`/subjects/class/${classId}`);
    const payload = res.data as ApiResponse<Subject[]> | Subject[];
    const subjects = unwrapData<Subject[]>(payload);
    return subjects.filter((subject) => !subject.classId || subject.classId === classId);
  } catch (error) {
    if (!isNotFound(error)) throw error;

    try {
      const res = await api.get<ApiResponse<Subject[]> | Subject[]>("/subjects", { params: { classId } });
      const payload = res.data as ApiResponse<Subject[]> | Subject[];
      const subjects = unwrapData<Subject[]>(payload);
      return subjects.filter((subject) => !subject.classId || subject.classId === classId);
    } catch (fallbackError) {
      if (!isNotFound(fallbackError)) throw fallbackError;
      return [];
    }
  }
};

export const createSubject = async (classId: string, name: string): Promise<Subject> => {
  try {
    const res = await api.post<ApiResponse<Subject> | Subject>("/subjects", { name, classid: classId });
    const payload = res.data as ApiResponse<Subject> | Subject;
    return unwrapData<Subject>(payload);
  } catch (error) {
    if (!isNotFound(error)) throw error;

    const res = await api.post<ApiResponse<Subject> | Subject>(`/subjects/class/${classId}`, { name, classid: classId });
    const payload = res.data as ApiResponse<Subject> | Subject;
    return unwrapData<Subject>(payload);
  }
};

export const deleteSubject = async (id: string): Promise<void> => {
  await api.delete(`/subjects/${id}`);
};
