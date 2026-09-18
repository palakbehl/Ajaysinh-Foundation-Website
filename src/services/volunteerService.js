import api from './api';

export const volunteerService = {
  getVolunteers: async (params = {}) => {
    const response = await api.get('/volunteers', { params });
    return response.data;
  },

  updateVolunteerStatus: async (id, status) => {
    const response = await api.put(`/volunteers/${id}`, { status });
    return response.data;
  },

  deleteVolunteer: async (id) => {
    const response = await api.delete(`/volunteers/${id}`);
    return response.data;
  },

  submitVolunteer: async (volunteerData) => {
    const response = await api.post('/volunteers', volunteerData);
    return response.data;
  },
};

export default volunteerService;
