import React, { useState, useEffect } from 'react';
import blogService from '../../services/blogService';
import ImageUploadField from '../../components/admin/ImageUploadField';
import DeleteConfirmModal from '../../components/admin/DeleteConfirmModal';
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiExternalLink,
  FiCheckCircle,
  FiX,
  FiLoader,
  FiAlertCircle,
  FiFileText,
  FiEye,
  FiEyeOff,
} from 'react-icons/fi';

const initialFormData = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: 'Community',
  authorName: 'Ajaysinh Foundation',
  authorTitle: 'Editorial Team',
  readTime: '5 min read',
  tags: '',
  published: true,
  featuredImage: { url: '', publicId: '' },
};

const categories = [
  'Community',
  'Education',
  'Healthcare',
  'Child Welfare',
  'Elder Care',
  'Women Empowerment',
  'Disability Support',
  'NGO Updates',
];

const BlogsManagementPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [publishedFilter, setPublishedFilter] = useState('All');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [saving, setSaving] = useState(false);
  const [modalError, setModalError] = useState('');

  // Delete State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Toast State
  const [toastMessage, setToastMessage] = useState('');

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const data = await blogService.getAllBlogsAdmin({
        search: search || undefined,
        category: categoryFilter !== 'All Categories' ? categoryFilter : undefined,
        published: publishedFilter === 'Published' ? 'true' : publishedFilter === 'Drafts' ? 'false' : undefined,
      });
      if (data && data.blogs) {
        setBlogs(data.blogs);
      }
    } catch (err) {
      console.error('Failed to load blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [categoryFilter, publishedFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchBlogs();
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(initialFormData);
    setModalError('');
    setModalOpen(true);
  };

  const handleOpenEdit = (blog) => {
    setEditingId(blog._id);
    setFormData({
      title: blog.title || '',
      slug: blog.slug || '',
      excerpt: blog.excerpt || '',
      content: typeof blog.content === 'string' ? blog.content : JSON.stringify(blog.content, null, 2),
      category: blog.category || 'Community',
      authorName: blog.author?.name || 'Ajaysinh Foundation',
      authorTitle: blog.author?.title || 'Editorial Team',
      readTime: blog.readTime || '5 min read',
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : '',
      published: Boolean(blog.published),
      featuredImage: blog.featuredImage || { url: blog.image || '', publicId: '' },
    });
    setModalError('');
    setModalOpen(true);
  };

  const handleTogglePublish = async (blog) => {
    try {
      await blogService.updateBlog(blog._id, { published: !blog.published });
      setToastMessage(`Article ${!blog.published ? 'published' : 'unpublished'}.`);
      fetchBlogs();
      setTimeout(() => setToastMessage(''), 3000);
    } catch (err) {
      console.error('Failed to toggle publish status:', err);
    }
  };

  const handleSaveBlog = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.excerpt || !formData.content) {
      setModalError('Title, excerpt, and content are required.');
      return;
    }

    setSaving(true);
    setModalError('');

    const payload = {
      title: formData.title,
      slug: formData.slug || undefined,
      excerpt: formData.excerpt,
      content: formData.content,
      category: formData.category,
      author: {
        name: formData.authorName,
        title: formData.authorTitle,
      },
      readTime: formData.readTime,
      tags: formData.tags ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      published: Boolean(formData.published),
      featuredImage: formData.featuredImage,
    };

    try {
      if (editingId) {
        await blogService.updateBlog(editingId, payload);
        setToastMessage('Blog article updated successfully.');
      } else {
        await blogService.createBlog(payload);
        setToastMessage('Blog article created successfully.');
      }
      setModalOpen(false);
      fetchBlogs();
      setTimeout(() => setToastMessage(''), 4000);
    } catch (err) {
      setModalError(err.response?.data?.message || 'Failed to save blog. Check inputs and try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleOpenDelete = (blog) => {
    setItemToDelete(blog);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    setDeleting(true);
    try {
      await blogService.deleteBlog(itemToDelete._id);
      setDeleteModalOpen(false);
      setItemToDelete(null);
      setToastMessage('Blog deleted successfully.');
      fetchBlogs();
      setTimeout(() => setToastMessage(''), 4000);
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-3 text-xs font-semibold animate-fade-in">
          <FiCheckCircle className="text-emerald-400 text-base" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Blog & Editorial Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Write, review, publish, and manage inspiring impact stories.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <FiPlus className="text-base" /> New Article
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search stories by title, excerpt, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800"
          />
        </form>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={publishedFilter}
            onChange={(e) => setPublishedFilter(e.target.value)}
            className="px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-700"
          >
            <option value="All">All Articles</option>
            <option value="Published">Published Only</option>
            <option value="Drafts">Drafts Only</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-700"
          >
            <option value="All Categories">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Blogs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <FiLoader className="text-3xl text-emerald-600 animate-spin mb-3" />
            <p className="text-xs font-semibold text-slate-500">Loading articles...</p>
          </div>
        ) : blogs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Article</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5">Author</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5">Date</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {blogs.map((b) => {
                  const imageUrl = b.featuredImage?.url || b.image || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=120&q=80';
                  const dateString = b.createdAt ? new Date(b.createdAt).toLocaleDateString() : 'Recent';

                  return (
                    <tr key={b._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3.5">
                          <img
                            src={imageUrl}
                            alt={b.title}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                          />
                          <div className="max-w-xs">
                            <p className="font-bold text-slate-900 truncate">{b.title}</p>
                            <p className="text-slate-400 text-[11px] truncate mt-0.5">{b.excerpt}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-semibold text-[11px]">
                          {b.category}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-slate-800 font-medium">
                          {b.author?.name || 'Ajaysinh Foundation'}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => handleTogglePublish(b)}
                          title="Click to toggle publish status"
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-all ${
                            b.published
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                          }`}
                        >
                          {b.published ? <FiEye className="text-xs" /> : <FiEyeOff className="text-xs" />}
                          <span>{b.published ? 'Published' : 'Draft'}</span>
                        </button>
                      </td>
                      <td className="px-4 py-4 text-slate-500 text-[11px]">
                        {dateString}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`/blogs/${b.slug || b._id}`}
                            target="_blank"
                            rel="noreferrer"
                            title="Preview on Public Website"
                            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                          >
                            <FiExternalLink className="text-sm" />
                          </a>
                          <button
                            onClick={() => handleOpenEdit(b)}
                            title="Edit Article"
                            className="p-1.5 text-slate-600 hover:text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
                          >
                            <FiEdit2 className="text-sm" />
                          </button>
                          <button
                            onClick={() => handleOpenDelete(b)}
                            title="Delete Article"
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <FiTrash2 className="text-sm" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center">
            <FiFileText className="text-4xl text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-800">No blog articles found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              No article matches your criteria. Click "New Article" to create a post.
            </p>
          </div>
        )}
      </div>

      {/* Create / Edit Blog Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full my-8 border border-slate-100 overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-base font-bold text-slate-900">
                {editingId ? 'Edit Article' : 'Create New Article'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveBlog} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {modalError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs flex items-center gap-2">
                  <FiAlertCircle /> <span>{modalError}</span>
                </div>
              )}

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. How Quality Education Opens Doors"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900 font-medium"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Custom Slug & Read Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Slug (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="education-opens-doors"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Estimated Read Time
                  </label>
                  <input
                    type="text"
                    placeholder="5 min read"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900"
                  />
                </div>
              </div>

              {/* Author Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Author Name
                  </label>
                  <input
                    type="text"
                    placeholder="Ajaysinh Foundation"
                    value={formData.authorName}
                    onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Author Title
                  </label>
                  <input
                    type="text"
                    placeholder="Education Lead"
                    value={formData.authorTitle}
                    onChange={(e) => setFormData({ ...formData, authorTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900"
                  />
                </div>
              </div>

              {/* Cloudinary Featured Image Uploader */}
              <ImageUploadField
                label="Article Featured Image"
                folder="ajaysinh/blogs"
                value={formData.featuredImage}
                onChange={(img) => setFormData({ ...formData, featuredImage: img })}
              />

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Excerpt (Brief Summary) *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Short engaging summary displayed on cards..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900"
                />
              </div>

              {/* Content Body */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Article Content *
                </label>
                <textarea
                  rows={6}
                  required
                  placeholder="Full article content text or story details..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="Learning, Rural Schools, Empowerment"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900"
                />
              </div>

              {/* Published Toggle */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="publishedCheckbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                />
                <label htmlFor="publishedCheckbox" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Publish article immediately to public website
                </label>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-all flex items-center gap-2 disabled:opacity-60 cursor-pointer"
                >
                  {saving && <FiLoader className="animate-spin" />}
                  <span>{editingId ? 'Save Article' : 'Publish Article'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Blog Article"
        message="Are you sure you want to delete this article? This will remove it from MongoDB and purge any uploaded image from Cloudinary."
        itemName={itemToDelete?.title}
        isDeleting={deleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};

export default BlogsManagementPage;
