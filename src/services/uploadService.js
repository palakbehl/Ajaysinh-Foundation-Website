import api from './api';

export const uploadService = {
  uploadImage: async (file, folder = 'ajaysinh') => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);

    const response = await api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteImage: async (publicId) => {
    const response = await api.delete('/upload/image', {
      data: { publicId },
    });
    return response.data;
  },
};

export default uploadService;
