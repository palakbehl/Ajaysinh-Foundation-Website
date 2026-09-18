import React, { useState, useEffect } from 'react';
import volunteerService from '../../services/volunteerService';
import DeleteConfirmModal from '../../components/admin/DeleteConfirmModal';
import {
  FiSearch,
  FiEye,
  FiTrash2,
  FiUsers,
  FiLoader,
  FiCheckCircle,
  FiX,
  FiClock,
  FiMapPin,
  FiBriefcase,
  FiHeart,
} from 'react-icons/fi';

const statuses = ['Pending', 'Reviewed', 'Accepted', 'Rejected'];

const VolunteersManagementPage = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  // Delete State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState('');

  const fetchVolunteers = async () => {
    setLoading(true);
    try {
      const data = await volunteerService.getVolunteers({
        search: search || undefined,
        status: statusFilter !== 'All Status' ? statusFilter : undefined,
      });
      if (data && data.volunteers) {
        setVolunteers(data.volunteers);
      }
    } catch (err) {
      console.error('Failed to load volunteers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchVolunteers();
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await volunteerService.updateVolunteerStatus(id, newStatus);
      setToastMessage(`Volunteer status updated to ${newStatus}.`);
      setVolunteers((prev) =>
        prev.map((v) => (v._id === id ? { ...v, status: newStatus } : v))
      );
      if (selectedVolunteer && selectedVolunteer._id === id) {
        setSelectedVolunteer((prev) => ({ ...prev, status: newStatus }));
      }
      setTimeout(() => setToastMessage(''), 3000);
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleOpenDelete = (volunteer) => {
    setItemToDelete(volunteer);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    setDeleting(true);
    try {
      await volunteerService.deleteVolunteer(itemToDelete._id);
      setDeleteModalOpen(false);
      setItemToDelete(null);
      setToastMessage('Volunteer application deleted.');
      fetchVolunteers();
      setTimeout(() => setToastMessage(''), 3000);
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-3 text-xs font-semibold animate-fade-in">
          <FiCheckCircle className="text-emerald-400 text-base" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Volunteer Applications</h1>
          <p className="text-xs text-slate-500 mt-1">
            Review applicant profiles, change onboarding status, and manage volunteer assignments.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search volunteers by name, email, phone, city, occupation..."
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
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <FiLoader className="text-3xl text-emerald-600 animate-spin mb-3" />
            <p className="text-xs font-semibold text-slate-500">Loading volunteer applications...</p>
          </div>
        ) : volunteers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Volunteer</th>
                  <th className="px-4 py-3.5">Location & Age</th>
                  <th className="px-4 py-3.5">Area of Interest</th>
                  <th className="px-4 py-3.5">Availability</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5">Applied</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {volunteers.map((v) => (
                  <tr key={v._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-slate-900">{v.fullName}</p>
                        <p className="text-slate-400 text-[11px]">{v.email} • {v.phone}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-slate-800">
                        {v.city || '—'}{v.age ? ` (${v.age} yrs)` : ''}
                      </span>
                      {v.occupation && <p className="text-slate-400 text-[10px]">{v.occupation}</p>}
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-semibold text-[11px]">
                        {v.interests || 'General Support'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      {v.availability || 'Flexible'}
                    </td>
                    <td className="px-4 py-4">
                      <select
                        value={v.status || 'Pending'}
                        onChange={(e) => handleStatusChange(v._id, e.target.value)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full border outline-none cursor-pointer ${
                          v.status === 'Accepted'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : v.status === 'Rejected'
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : v.status === 'Reviewed'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {statuses.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-4 text-slate-500 text-[11px]">
                      {v.createdAt ? new Date(v.createdAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedVolunteer(v)}
                          title="View Application Details"
                          className="p-1.5 text-slate-600 hover:text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors cursor-pointer"
                        >
                          <FiEye className="text-sm" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(v)}
                          title="Delete Application"
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <FiTrash2 className="text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center">
            <FiUsers className="text-4xl text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-800">No applications found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              No volunteer submissions match your search or filter.
            </p>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedVolunteer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900">Volunteer Profile Details</h3>
              <button
                onClick={() => setSelectedVolunteer(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{selectedVolunteer.fullName}</h4>
                  <p className="text-slate-400 text-[11px]">{selectedVolunteer.occupation || 'Volunteer'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-medium">Status:</span>
                  <select
                    value={selectedVolunteer.status || 'Pending'}
                    onChange={(e) => handleStatusChange(selectedVolunteer._id, e.target.value)}
                    className="font-bold text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-slate-700">
                <div>
                  <span className="text-slate-400 block text-[10px]">Email Address:</span>
                  <span className="font-semibold">{selectedVolunteer.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Phone Number:</span>
                  <span className="font-semibold">{selectedVolunteer.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">City:</span>
                  <span className="font-semibold">{selectedVolunteer.city || '—'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Age:</span>
                  <span className="font-semibold">{selectedVolunteer.age || '—'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Area of Interest:</span>
                  <span className="font-semibold text-emerald-700">{selectedVolunteer.interests || '—'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Availability:</span>
                  <span className="font-semibold">{selectedVolunteer.availability || 'Flexible'}</span>
                </div>
              </div>

              {(selectedVolunteer.motivation || selectedVolunteer.message) && (
                <div className="mt-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider mb-1">
                    Why they want to volunteer (Motivation)
                  </span>
                  <p className="italic text-slate-800 leading-relaxed">
                    "{selectedVolunteer.motivation || selectedVolunteer.message}"
                  </p>
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedVolunteer(null)}
                className="px-5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Volunteer Application"
        message="Are you sure you want to delete this application record from the database?"
        itemName={itemToDelete?.fullName}
        isDeleting={deleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};

export default VolunteersManagementPage;
