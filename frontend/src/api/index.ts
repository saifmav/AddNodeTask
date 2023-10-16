import axios from 'axios';

export interface Document {
  id: number;
  uuid: number;
  name: string;
}

const API_URL = 'http://localhost:3001'

export const fetchDocuments = async (): Promise<Document[]> => {
  const response = await axios.get(`${API_URL}/documents`);
  return response.data;
};

export const uploadDocuments = async (files: File[]): Promise<void> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });
  const response = await axios.post(`${API_URL}/upload`, formData);
  return response.data;
};

export const downloadDocument = async (id: number): Promise<Blob> => {
  const response = await axios.get(`${API_URL}/download/${id}`, {
    responseType: 'blob',
  });
  return response.data;
};

export const deleteDocument = async (id: number):Promise<Document[]> => {
  const response = await axios.delete(`${API_URL}/delete/${id}`);
  return response.data;
};
