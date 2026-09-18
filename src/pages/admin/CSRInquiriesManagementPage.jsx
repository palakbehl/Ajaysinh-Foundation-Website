import React, { useState, useEffect } from 'react';
import csrService from '../../services/csrService';
import DeleteConfirmModal from '../../components/admin/DeleteConfirmModal';
import {
  FiSearch,
  FiEye,
  FiTrash2,
  FiBriefcase,
  FiLoader,
  FiCheckCircle,
  FiX,
  FiMail,
  FiPhone,
} from 'react-icons/fi';

const statuses = ['New', 'Contacted', 'In Progress', 'Completed'];

const CSRInquiriesManagementPage = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  // Delete State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState('');

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const data = await csrService.getCSRInquiries({
        search: search || undefined,
        status: statusFilter !== 'All Status' ? statusFilter : undefined,
      });
      if (data && data.inquiries) {
        setInquiries(data.inquiries);
      }
    } catch (err) {
      console.error('Failed to load CSR inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchInquiries();
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await csrService.updateCSRStatus(id, newStatus);
      setToastMessage(`Inquiry status updated to ${newStatus}.`);
      setInquiries((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
      );
      if (selectedInquiry && selectedInquiry._id === id) {
        setSelectedInquiry((prev) => ({ ...prev, status: newStatus }));
      }
      setTimeout(() => setToastMessage(''), 3000);
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleOpenDelete = (inquiry) => {
    setItemToDelete(inquiry);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    setDeleting(true);
    try {
      await csrService.deleteCSRInquiry(itemToDelete._id);
      setDeleteModalOpen(false);
      setItemToDelete(null);
      setToastMessage('CSR inquiry deleted.');
      fetchInquiries();
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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">CSR Partnership Inquiries</h1>
          <p className="text-xs text-slate-500 mt-1">
            Corporate social responsibility partnerships, sponsorship proposals, and institutional grants.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search inquiries by company name, contact person, email, or domain..."
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
            <p className="text-xs font-semibold text-slate-500">Loading inquiries...</p>
          </div>
        ) : inquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Company</th>
                  <th className="px-4 py-3.5">Contact Person</th>
                  <th className="px-4 py-3.5">CSR Area</th>
                  <th className="px-4 py-3.5">Proposed Budget</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5">Received</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {inquiries.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-slate-900">{item.companyName}</p>
                        <p className="text-slate-400 text-[11px]">{item.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-slate-800">{item.contactPerson}</p>
                      <p className="text-slate-400 text-[10px]">{item.phone}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-semibold text-[11px]">
                        {item.csrInterest || 'General'}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-bold text-emerald-700">
                      {item.budgetRange || item.proposedBudget || 'Not specified'}
                    </td>
                    <td className="px-4 py-4">
                      <select
                        value={item.status || 'New'}
                        onChange={(e) => handleStatusChange(item._id, e.target.value)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full border outline-none cursor-pointer ${
                          item.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : item.status === 'In Progress'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : item.status === 'Contacted'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {statuses.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-4 text-slate-500 text-[11px]">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedInquiry(item)}
                          title="View Inquiry Details"
                          className="p-1.5 text-slate-600 hover:text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors cursor-pointer"
                        >
                          <FiEye className="text-sm" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(item)}
                          title="Delete Inquiry"
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
            <FiBriefcase className="text-4xl text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-800">No CSR inquiries found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              No corporate inquiries match your current search or filter.
            </p>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900">CSR Proposal Details</h3>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{selectedInquiry.companyName}</h4>
                  <p className="text-slate-500 text-[11px]">POC: {selectedInquiry.contactPerson}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-medium">Status:</span>
                  <select
                    value={selectedInquiry.status || 'New'}
                    onChange={(e) => handleStatusChange(selectedInquiry._id, e.target.value)}
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
                  <span className="font-semibold">{selectedInquiry.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Phone Number:</span>
                  <span className="font-semibold">{selectedInquiry.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Area of Focus:</span>
                  <span className="font-semibold text-emerald-700">{selectedInquiry.csrInterest || 'General'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Proposed Budget:</span>
                  <span className="font-bold text-slate-900">{selectedInquiry.budgetRange || selectedInquiry.proposedBudget || 'Not specified'}</span>
                </div>
              </div>

              {selectedInquiry.message && (
                <div className="mt-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider mb-1">
                    Partnership Objectives & Message
                  </span>
                  <p className="text-slate-800 leading-relaxed whitespace-pre-wrap">
                    {selectedInquiry.message}
                  </p>
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedInquiry(null)}
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
        title="Delete CSR Inquiry"
        message="Are you sure you want to delete this CSR partnership inquiry?"
        itemName={itemToDelete?.companyName}
        isDeleting={deleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};

export default CSRInquiriesManagementPage;
