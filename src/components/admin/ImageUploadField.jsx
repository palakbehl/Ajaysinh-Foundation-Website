import React, { useState, useRef } from 'react';
import { FiUploadCloud, FiTrash2, FiImage, FiLoader, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import uploadService from '../../services/uploadService';

const ImageUploadField = ({
  value,
  onChange,
  folder = 'ajaysinh',
  label = 'Featured Image',
  recommendedSize = 'Recommended: 1200 x 800px (Max 5MB)',
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [manualUrl, setManualUrl] = useState('');
  const fileInputRef = useRef(null);

  // Normalize value: can be object { url, publicId } or string url
  const currentUrl = typeof value === 'object' && value !== null ? value.url : (value || '');
  const currentPublicId = typeof value === 'object' && value !== null ? value.publicId : '';

  const handleFile = async (file) => {
    if (!file) return;

    // Validate mime type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPEG, PNG, or WebP).');
      return;
    }

    // Validate size: 5MB
    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit. Please choose a smaller image.');
      return;
    }

    setError('');
    setUploading(true);

    try {
      const response = await uploadService.uploadImage(file, folder);
      if (response && response.image) {
        onChange({
          url: response.image.url,
          publicId: response.image.publicId,
        });
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Image upload failed';
      setError(msg);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = async () => {
    if (currentPublicId) {
      try {
        await uploadService.deleteImage(currentPublicId);
      } catch (err) {
        console.warn('Could not remove remote image from Cloudinary:', err);
      }
    }
    onChange({ url: '', publicId: '' });
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleManualUrlSubmit = (e) => {
    e.preventDefault();
    if (!manualUrl.trim()) return;
    onChange({ url: manualUrl.trim(), publicId: '' });
    setShowUrlInput(false);
    setManualUrl('');
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
        >
          {showUrlInput ? 'Upload File' : 'Paste Direct URL'}
        </button>
      </div>

      {showUrlInput ? (
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="https://images.unsplash.com/..."
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            className="flex-1 px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900"
          />
          <button
            type="button"
            onClick={handleManualUrlSubmit}
            className="px-4 py-2.5 text-xs font-bold text-white bg-slate-800 hover:bg-slate-900 rounded-xl transition-colors"
          >
            Apply URL
          </button>
        </div>
      ) : currentUrl ? (
        /* Image Preview Box */
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 group">
          <img
            src={currentUrl}
            alt="Preview"
            className="w-full h-48 object-cover object-center"
          />
          <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-1.5 bg-white text-slate-900 rounded-lg text-xs font-bold shadow-md hover:bg-slate-100 transition-all flex items-center gap-1.5"
            >
              <FiImage /> Replace
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="px-3.5 py-1.5 bg-red-600 text-white rounded-lg text-xs font-bold shadow-md hover:bg-red-700 transition-all flex items-center gap-1.5"
            >
              <FiTrash2 /> Remove
            </button>
          </div>
          {currentPublicId && (
            <span className="absolute bottom-2 right-2 bg-emerald-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm flex items-center gap-1">
              <FiCheckCircle /> Cloudinary
            </span>
          )}
        </div>
      ) : (
        /* Dropzone Box */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 ${
            dragOver
              ? 'border-emerald-500 bg-emerald-50/50'
              : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100/60 hover:border-slate-300'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/jpg"
            onChange={(e) => handleFile(e.target.files[0])}
            className="hidden"
          />

          {uploading ? (
            <div className="py-4 flex flex-col items-center">
              <FiLoader className="text-3xl text-emerald-600 animate-spin mb-2" />
              <p className="text-xs font-bold text-slate-700">Uploading to Cloudinary...</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Please wait a moment</p>
            </div>
          ) : (
            <div className="py-2 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <FiUploadCloud className="text-2xl" />
              </div>
              <p className="text-sm font-semibold text-slate-700">
                Click to upload or drag & drop
              </p>
              <p className="text-xs text-slate-400 mt-1">{recommendedSize}</p>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-xs text-red-600 font-medium">
          <FiAlertCircle className="text-base flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default ImageUploadField;
