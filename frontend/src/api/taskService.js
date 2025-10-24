import axiosInstance from './axiosConfig';

export const taskService = {
  getAll: async (workspaceId) => {
    const url = workspaceId ? `/tasks?workspaceId=${workspaceId}` : '/tasks';
    const response = await axiosInstance.get(url);
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`/tasks/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await axiosInstance.post('/tasks', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await axiosInstance.put(`/tasks/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(`/tasks/${id}`);
    return response.data;
  },
};
