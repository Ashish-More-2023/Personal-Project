import axiosInstance from './axiosConfig';

export const summaryService = {
  getDaily: async (date) => {
    const url = date ? `/summary/daily?date=${date}` : '/summary/daily';
    const response = await axiosInstance.get(url);
    return response.data;
  },
};
