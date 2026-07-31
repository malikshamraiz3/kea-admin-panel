import api from "../api/axios";
import type { Document } from "../types/document";

export interface ApiResponse<T> {
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

type RawDocument = Partial<Document> & {
  id?: string;
  title?: string;
  documentName?: string;
  fileName?: string;
  filename?: string;
  subjectid?: string;
};

const getDocumentName = (document: RawDocument) =>
  document.name ?? document.title ?? document.documentName ?? document.fileName ?? document.filename ?? "";

const normalizeDocument = (document: RawDocument): Document | null => {
  const name = getDocumentName(document).trim();
  if (!name) return null;
  const subjectid = document.subjectid ?? document.subjectId;

  return {
    _id: document._id ?? document.id ?? name,
    name,
    title: document.title ?? name,
    driveFileLink: document.driveFileLink ?? "",
    type: document.type ?? "Notes",
    subjectid,
    subjectId: subjectid,
    createdAt: document.createdAt ?? new Date().toISOString(),
    __v: document.__v,
  };
};

const normalizeDocuments = (payload: unknown, subjectId: string) => {
  if (!Array.isArray(payload)) return [];

  return payload
    .map((document) => normalizeDocument(document as RawDocument))
    .filter((document): document is Document => Boolean(document))
    .filter((document) => !document.subjectId || document.subjectId === subjectId);
};

export const getDocumentsBySubjectId = async (subjectId: string): Promise<Document[]> => {
  try {
    const res = await api.get<ApiResponse<Document[]> | Document[]>(`/documents/subject/${subjectId}`);
    const payload = res.data as ApiResponse<Document[]> | Document[];
    return normalizeDocuments(unwrapData<Document[]>(payload), subjectId);
  } catch (error) {
    if (!isNotFound(error)) throw error;

    try {
      const res = await api.get<ApiResponse<Document[]> | Document[]>("/documents", { params: { subjectId } });
      const payload = res.data as ApiResponse<Document[]> | Document[];
      return normalizeDocuments(unwrapData<Document[]>(payload), subjectId);
    } catch (fallbackError) {
      if (!isNotFound(fallbackError)) throw fallbackError;
      return [];
    }
  }
};

export interface CreateDocumentPayload {
  title: string;
  driveFileLink: string;
  type: string;
}

const createFallbackDocument = (subjectId: string, payload: CreateDocumentPayload): Document => ({
  _id: crypto.randomUUID(),
  name: payload.title,
  title: payload.title,
  driveFileLink: payload.driveFileLink,
  type: payload.type,
  subjectid: subjectId,
  subjectId,
  createdAt: new Date().toISOString(),
});

export const createDocument = async (subjectId: string, document: CreateDocumentPayload): Promise<Document> => {
  const requestBody = {
    subjectid: subjectId,
    title: document.title,
    driveFileLink: document.driveFileLink,
    type: document.type,
  };

  try {
    const res = await api.post<ApiResponse<Document> | Document>("/documents", requestBody);
    const payload = res.data as ApiResponse<Document> | Document;
    return normalizeDocument(unwrapData<Document>(payload)) ?? createFallbackDocument(subjectId, document);
  } catch (error) {
    if (!isNotFound(error)) throw error;

    const res = await api.post<ApiResponse<Document> | Document>(`/documents/subject/${subjectId}`, requestBody);
    const payload = res.data as ApiResponse<Document> | Document;
    return normalizeDocument(unwrapData<Document>(payload)) ?? createFallbackDocument(subjectId, document);
  }
};

export const deleteDocument = async (id: string): Promise<void> => {
  await api.delete(`/documents/${id}`);
};
