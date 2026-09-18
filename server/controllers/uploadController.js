import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';

/**
 * @desc    Upload image to Cloudinary
 * @route   POST /api/upload/image
 * @access  Private (Admin)
 */
export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided for upload',
      });
    }

    const folder = req.body.folder || 'ajaysinh';
    const result = await uploadToCloudinary(req.file.buffer, folder);

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully to Cloudinary',
      image: {
        url: result.url,
        publicId: result.publicId,
        originalname: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
      },
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Image upload to Cloudinary failed',
    });
  }
};

/**
 * @desc    Delete image from Cloudinary
 * @route   DELETE /api/upload/image
 * @access  Private (Admin)
 */
export const deleteImage = async (req, res, next) => {
  try {
    const { publicId } = req.body;

    if (!publicId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide publicId of the image to delete',
      });
    }

    await deleteFromCloudinary(publicId);

    res.status(200).json({
      success: true,
      message: 'Image removed from Cloudinary',
    });
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to remove image from Cloudinary',
    });
  }
};
