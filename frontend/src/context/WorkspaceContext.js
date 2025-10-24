import axiosInstance from '../api/axiosConfig.js';

export const workspaceService = {
  getAll: async () => {
    const response = await axiosInstance.get('/workspaces');
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`/workspaces/${id}`);
    return response.data;
  },

  getStats: async (id) => {
    const response = await axiosInstance.get(`/workspaces/${id}/stats`);
    return response.data;
  },

  create: async (data) => {
    const response = await axiosInstance.post('/workspaces', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await axiosInstance.put(`/workspaces/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(`/workspaces/${id}`);
    return response.data;
  },
};
