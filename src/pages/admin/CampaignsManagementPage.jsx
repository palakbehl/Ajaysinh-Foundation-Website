import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import campaignService from '../../services/campaignService';
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
  FiFilter,
  FiStar,
  FiTarget,
} from 'react-icons/fi';

const initialFormData = {
  title: '',
  slug: '',
  description: '',
  shortDescription: '',
  category: 'Education',
  goalAmount: '',
  raisedAmount: 0,
  daysLeft: 30,
  beneficiaries: '100+',
  status: 'Active',
  featured: false,
  featuredImage: { url: '', publicId: '' },
};

const categories = [
  'Education',
  'Healthcare',
  'Elder Care',
  'Community Welfare',
  'Women Empowerment',
  'Disability Support',
  'Environment',
];

const CampaignsManagementPage = () => {
  const location = useLocation();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');

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

  // Success Toast
  const [toastMessage, setToastMessage] = useState('');

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const data = await campaignService.getCampaigns({
        search: search || undefined,
        status: statusFilter !== 'All Status' ? statusFilter : undefined,
        category: categoryFilter !== 'All Categories' ? categoryFilter : undefined,
      });
      if (data && data.campaigns) {
        setCampaigns(data.campaigns);
      }
    } catch (err) {
      console.error('Failed to load campaigns:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [statusFilter, categoryFilter]);

  // Open create modal if URL has ?create=true
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('create') === 'true') {
      handleOpenCreate();
    }
  }, [location.search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchCampaigns();
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(initialFormData);
    setModalError('');
    setModalOpen(true);
  };

  const handleOpenEdit = (campaign) => {
    setEditingId(campaign._id);
    setFormData({
      title: campaign.title || '',
      slug: campaign.slug || '',
      description: campaign.description || '',
      shortDescription: campaign.shortDescription || '',
      category: campaign.category || 'Education',
      goalAmount: campaign.goalAmount || '',
      raisedAmount: campaign.raisedAmount || 0,
      daysLeft: campaign.daysLeft || 30,
      beneficiaries: campaign.beneficiaries || '100+',
      status: campaign.status || 'Active',
      featured: Boolean(campaign.featured),
      featuredImage: campaign.featuredImage || { url: campaign.image || '', publicId: '' },
    });
    setModalError('');
    setModalOpen(true);
  };

  const handleSaveCampaign = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.goalAmount) {
      setModalError('Title, description, and goal amount are required.');
      return;
    }

    setSaving(true);
    setModalError('');

    try {
      if (editingId) {
        await campaignService.updateCampaign(editingId, formData);
        setToastMessage('Campaign updated successfully.');
      } else {
        await campaignService.createCampaign(formData);
        setToastMessage('Campaign created successfully.');
      }
      setModalOpen(false);
      fetchCampaigns();
      setTimeout(() => setToastMessage(''), 4000);
    } catch (err) {
      setModalError(err.response?.data?.message || 'Failed to save campaign. Check fields and try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleOpenDelete = (campaign) => {
    setItemToDelete(campaign);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    setDeleting(true);
    try {
      await campaignService.deleteCampaign(itemToDelete._id);
      setDeleteModalOpen(false);
      setItemToDelete(null);
      setToastMessage('Campaign deleted successfully.');
      fetchCampaigns();
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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Campaign Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Create, publish, edit, and monitor fundraising campaigns.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <FiPlus className="text-base" /> Add Campaign
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search campaigns by title, description, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800"
          />
        </form>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-700"
          >
            <option value="All Status">All Status</option>
            <option value="Active">Active</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
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

      {/* Campaigns Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <FiLoader className="text-3xl text-emerald-600 animate-spin mb-3" />
            <p className="text-xs font-semibold text-slate-500">Loading campaigns...</p>
          </div>
        ) : campaigns.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Cause</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5">Raised / Goal</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5">Featured</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {campaigns.map((c) => {
                  const imageUrl = c.featuredImage?.url || c.image || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=120&q=80';
                  const progress = Math.min(Math.round(((c.raisedAmount || 0) / (c.goalAmount || 1)) * 100), 100);

                  return (
                    <tr key={c._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3.5">
                          <img
                            src={imageUrl}
                            alt={c.title}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                          />
                          <div className="max-w-xs">
                            <p className="font-bold text-slate-900 truncate">{c.title}</p>
                            <p className="text-slate-400 text-[11px] truncate mt-0.5">/{c.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-semibold text-[11px]">
                          {c.category}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                            <span className="text-emerald-700">₹{(c.raisedAmount || 0).toLocaleString('en-IN')}</span>
                            <span className="text-slate-400 font-normal">of ₹{(c.goalAmount || 0).toLocaleString('en-IN')}</span>
                          </div>
                          <div className="w-32 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-emerald-500 h-1.5 rounded-full"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          c.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                          c.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                          'bg-slate-200 text-slate-700'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {c.featured ? (
                          <span className="text-amber-500 font-bold flex items-center gap-1 text-[11px]">
                            <FiStar className="fill-current" /> Yes
                          </span>
                        ) : (
                          <span className="text-slate-300 text-[11px]">No</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`/campaigns/${c.slug || c._id}`}
                            target="_blank"
                            rel="noreferrer"
                            title="Preview on Public Page"
                            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                          >
                            <FiExternalLink className="text-sm" />
                          </a>
                          <button
                            onClick={() => handleOpenEdit(c)}
                            title="Edit Campaign"
                            className="p-1.5 text-slate-600 hover:text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
                          >
                            <FiEdit2 className="text-sm" />
                          </button>
                          <button
                            onClick={() => handleOpenDelete(c)}
                            title="Delete Campaign"
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
            <FiTarget className="text-4xl text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-800">No campaigns found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              No campaign matches your current search or filter criteria. Click "Add Campaign" to create a cause.
            </p>
          </div>
        )}
      </div>

      {/* Create / Edit Campaign Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full my-8 border border-slate-100 overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-base font-bold text-slate-900">
                {editingId ? 'Edit Campaign' : 'Create New Campaign'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveCampaign} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {modalError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs flex items-center gap-2">
                  <FiAlertCircle /> <span>{modalError}</span>
                </div>
              )}

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Campaign Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Clean Drinking Water Initiative"
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

              {/* Slug (Optional) & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Custom Slug (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="clean-drinking-water"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900 font-medium"
                  >
                    <option value="Active">Active</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              {/* Goal & Raised Amounts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Target Goal Amount (₹) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    placeholder="1500000"
                    value={formData.goalAmount}
                    onChange={(e) => setFormData({ ...formData, goalAmount: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Raised Amount (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={formData.raisedAmount}
                    onChange={(e) => setFormData({ ...formData, raisedAmount: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900"
                  />
                </div>
              </div>

              {/* Beneficiaries & Days Left */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Beneficiaries Target
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 500+ Children"
                    value={formData.beneficiaries}
                    onChange={(e) => setFormData({ ...formData, beneficiaries: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Days Left
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="45"
                    value={formData.daysLeft}
                    onChange={(e) => setFormData({ ...formData, daysLeft: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900"
                  />
                </div>
              </div>

              {/* Featured Image Cloudinary Uploader */}
              <ImageUploadField
                label="Campaign Featured Image"
                folder="ajaysinh/campaigns"
                value={formData.featuredImage}
                onChange={(img) => setFormData({ ...formData, featuredImage: img })}
              />

              {/* Short Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  placeholder="Brief summary for card display..."
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900"
                />
              </div>

              {/* Detailed Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Full Story & Description *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Explain the background, mission, and how donations will be utilized..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900"
                />
              </div>

              {/* Featured Flag */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredCheckbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                />
                <label htmlFor="featuredCheckbox" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Feature this campaign on Home Page
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
                  <span>{editingId ? 'Save Changes' : 'Create Campaign'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Campaign"
        message="Are you sure you want to delete this campaign? The campaign will be permanently removed from MongoDB and any associated media will be deleted from Cloudinary."
        itemName={itemToDelete?.title}
        isDeleting={deleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};

export default CampaignsManagementPage;
