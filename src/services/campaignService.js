import api from './api';

export const campaignService = {
  getCampaigns: async (params = {}) => {
    const response = await api.get('/campaigns', { params });
    return response.data;
  },

  getCampaignByIdOrSlug: async (idOrSlug) => {
    const response = await api.get(`/campaigns/${idOrSlug}`);
    return response.data;
  },

  createCampaign: async (campaignData) => {
    const response = await api.post('/campaigns', campaignData);
    return response.data;
  },

  updateCampaign: async (id, campaignData) => {
    const response = await api.put(`/campaigns/${id}`, campaignData);
    return response.data;
  },

  deleteCampaign: async (id) => {
    const response = await api.delete(`/campaigns/${id}`);
    return response.data;
  },
};

export default campaignService;
