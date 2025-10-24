import axiosInstance from './axiosConfig';

export const timelineService = {
  getAll: async (workspaceId) => {
    const url = workspaceId ? `/timelines?workspaceId=${workspaceId}` : '/timelines';
    const response = await axiosInstance.get(url);
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`/timelines/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await axiosInstance.post('/timelines', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await axiosInstance.put(`/timelines/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(`/timelines/${id}`);
    return response.data;
  },

  checkClashes: async (workspaceId) => {
    const url = workspaceId ? `/timelines/clashes?workspaceId=${workspaceId}` : '/timelines/clashes';
    const response = await axiosInstance.get(url);
    return response.data;
  },
};
