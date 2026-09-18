import React, { useState, useEffect } from 'react';
import contactService from '../../services/contactService';
import DeleteConfirmModal from '../../components/admin/DeleteConfirmModal';
import {
  FiSearch,
  FiEye,
  FiTrash2,
  FiMail,
  FiLoader,
  FiCheckCircle,
  FiX,
  FiSend,
  FiInbox,
  FiCheck,
} from 'react-icons/fi';

const MessagesManagementPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [readFilter, setReadFilter] = useState('All');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  // Delete State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState('');

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const data = await contactService.getContactMessages({
        search: search || undefined,
        read: readFilter === 'Read' ? 'true' : readFilter === 'Unread' ? 'false' : undefined,
      });
      if (data && data.messages) {
        setMessages(data.messages);
        setUnreadCount(data.unreadCount ?? 0);
      }
    } catch (err) {
      console.error('Failed to load messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [readFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchMessages();
  };

  const handleToggleRead = async (id, currentRead) => {
    try {
      const res = await contactService.toggleMessageRead(id, !currentRead);
      const newReadState = res.data?.read ?? !currentRead;
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, read: newReadState } : m))
      );
      setUnreadCount((prev) => (newReadState ? Math.max(0, prev - 1) : prev + 1));
      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage((prev) => ({ ...prev, read: newReadState }));
      }
      setToastMessage(`Message marked as ${newReadState ? 'read' : 'unread'}.`);
      setTimeout(() => setToastMessage(''), 3000);
    } catch (err) {
      console.error('Failed to toggle read state:', err);
    }
  };

  const handleOpenDetail = (message) => {
    setSelectedMessage(message);
    // If opening an unread message, mark it as read automatically
    if (!message.read) {
      handleToggleRead(message._id, false);
    }
  };

  const handleOpenDelete = (message) => {
    setItemToDelete(message);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    setDeleting(true);
    try {
      await contactService.deleteContactMessage(itemToDelete._id);
      setDeleteModalOpen(false);
      setItemToDelete(null);
      setToastMessage('Message deleted.');
      fetchMessages();
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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Contact Messages</h1>
          <p className="text-xs text-slate-500 mt-1">
            General inquiries, feedback, and communication received via the website contact form.
          </p>
        </div>

        {unreadCount > 0 && (
          <span className="px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold self-start sm:self-auto flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            {unreadCount} Unread {unreadCount === 1 ? 'Message' : 'Messages'}
          </span>
        )}
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search messages by sender name, email, subject, or message text..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800"
          />
        </form>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={readFilter}
            onChange={(e) => setReadFilter(e.target.value)}
            className="px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-700"
          >
            <option value="All">All Inquiries</option>
            <option value="Unread">Unread Only</option>
            <option value="Read">Read Only</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <FiLoader className="text-3xl text-emerald-600 animate-spin mb-3" />
            <p className="text-xs font-semibold text-slate-500">Loading messages...</p>
          </div>
        ) : messages.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-4 py-3.5">Sender</th>
                  <th className="px-4 py-3.5">Subject</th>
                  <th className="px-4 py-3.5">Inquiry Type</th>
                  <th className="px-4 py-3.5">Received</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {messages.map((m) => (
                  <tr
                    key={m._id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      !m.read ? 'bg-emerald-50/20 font-semibold' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleRead(m._id, m.read)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                          m.read
                            ? 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                            : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        }`}
                      >
                        {m.read ? <FiCheck className="text-xs" /> : <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                        <span>{m.read ? 'Read' : 'Unread'}</span>
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-bold text-slate-900">{m.name}</p>
                        <p className="text-slate-400 text-[11px] font-normal">{m.email}{m.phone ? ` • ${m.phone}` : ''}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-slate-900 truncate max-w-xs">{m.subject}</p>
                      <p className="text-slate-400 text-[11px] truncate max-w-xs font-normal">{m.message}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-semibold text-[11px]">
                        {m.inquiryType || 'General Inquiry'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-500 text-[11px] font-normal">
                      {m.createdAt ? new Date(m.createdAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenDetail(m)}
                          title="Read Full Message"
                          className="p-1.5 text-slate-600 hover:text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors cursor-pointer"
                        >
                          <FiEye className="text-sm" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(m)}
                          title="Delete Message"
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
            <FiInbox className="text-4xl text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-800">Inbox is empty</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              No contact messages found matching your criteria.
            </p>
          </div>
        )}
      </div>

      {/* Message Viewer Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900">Contact Message</h3>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-base">{selectedMessage.subject}</h4>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Category: <span className="font-semibold text-slate-700">{selectedMessage.inquiryType || 'General Inquiry'}</span>
                  </p>
                </div>
                <button
                  onClick={() => handleToggleRead(selectedMessage._id, selectedMessage.read)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                    selectedMessage.read ? 'bg-slate-100 text-slate-600' : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {selectedMessage.read ? 'Mark Unread' : 'Mark Read'}
                </button>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 grid grid-cols-2 gap-3 text-slate-700">
                <div>
                  <span className="text-slate-400 block text-[10px]">From:</span>
                  <span className="font-bold text-slate-900">{selectedMessage.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Email:</span>
                  <a href={`mailto:${selectedMessage.email}`} className="text-emerald-600 hover:underline font-medium">
                    {selectedMessage.email}
                  </a>
                </div>
                {selectedMessage.phone && (
                  <div>
                    <span className="text-slate-400 block text-[10px]">Phone:</span>
                    <span className="font-medium">{selectedMessage.phone}</span>
                  </div>
                )}
                <div>
                  <span className="text-slate-400 block text-[10px]">Received At:</span>
                  <span>{selectedMessage.createdAt ? new Date(selectedMessage.createdAt).toLocaleString() : '—'}</span>
                </div>
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-2xl">
                <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider mb-2">
                  Message Content
                </span>
                <p className="text-slate-800 text-xs leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all inline-flex items-center gap-2"
              >
                <FiSend /> Reply via Email
              </a>
              <button
                onClick={() => setSelectedMessage(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
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
        title="Delete Contact Message"
        message="Are you sure you want to permanently delete this message?"
        itemName={itemToDelete?.subject}
        isDeleting={deleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};

export default MessagesManagementPage;
