import api from './api';

export const csrService = {
  getCSRInquiries: async (params = {}) => {
    const response = await api.get('/csr-inquiries', { params });
    return response.data;
  },

  updateCSRStatus: async (id, status) => {
    const response = await api.put(`/csr-inquiries/${id}`, { status });
    return response.data;
  },

  deleteCSRInquiry: async (id) => {
    const response = await api.delete(`/csr-inquiries/${id}`);
    return response.data;
  },

  submitCSRInquiry: async (csrData) => {
    const response = await api.post('/csr-inquiries', csrData);
    return response.data;
  },
};

export default csrService;
