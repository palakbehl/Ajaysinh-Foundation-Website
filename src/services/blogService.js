import api from './api';

export const blogService = {
  getBlogs: async (params = {}) => {
    const response = await api.get('/blogs', { params });
    return response.data;
  },

  getAllBlogsAdmin: async (params = {}) => {
    const response = await api.get('/blogs/admin/all', { params });
    return response.data;
  },

  getBlogByIdOrSlug: async (idOrSlug) => {
    const response = await api.get(`/blogs/${idOrSlug}`);
    return response.data;
  },

  createBlog: async (blogData) => {
    const response = await api.post('/blogs', blogData);
    return response.data;
  },

  updateBlog: async (id, blogData) => {
    const response = await api.put(`/blogs/${id}`, blogData);
    return response.data;
  },

  deleteBlog: async (id) => {
    const response = await api.delete(`/blogs/${id}`);
    return response.data;
  },
};

export default blogService;
