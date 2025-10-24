import axiosInstance from './axiosConfig';

export const noteService = {
  getAll: async (workspaceId) => {
    const url = workspaceId ? `/notes?workspaceId=${workspaceId}` : '/notes';
    const response = await axiosInstance.get(url);
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`/notes/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await axiosInstance.post('/notes', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await axiosInstance.put(`/notes/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(`/notes/${id}`);
    return response.data;
  },
};
