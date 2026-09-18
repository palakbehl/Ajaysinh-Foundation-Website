import api from './api';

export const donationService = {
  getDonations: async (params = {}) => {
    const response = await api.get('/donations', { params });
    return response.data;
  },

  getDonationById: async (id) => {
    const response = await api.get(`/donations/${id}`);
    return response.data;
  },

  createDonation: async (donationData) => {
    const response = await api.post('/donations', donationData);
    return response.data;
  },
};

export default donationService;
