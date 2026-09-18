import api from './api';

export const contactService = {
  getContactMessages: async (params = {}) => {
    const response = await api.get('/messages', { params });
    return response.data;
  },

  toggleMessageRead: async (id, read) => {
    const response = await api.put(`/messages/${id}`, { read });
    return response.data;
  },

  deleteContactMessage: async (id) => {
    const response = await api.delete(`/messages/${id}`);
    return response.data;
  },

  submitContactMessage: async (messageData) => {
    const response = await api.post('/messages', messageData);
    return response.data;
  },
};

export default contactService;
