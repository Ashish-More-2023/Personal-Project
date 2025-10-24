import axiosInstance from './axiosConfig';

export const eventService = {
  getAll: async (workspaceId) => {
    const url = workspaceId ? `/events?workspaceId=${workspaceId}` : '/events';
    const response = await axiosInstance.get(url);
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`/events/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await axiosInstance.post('/events', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await axiosInstance.put(`/events/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(`/events/${id}`);
    return response.data;
  },
};
