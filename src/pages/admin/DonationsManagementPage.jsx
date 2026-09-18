import React, { useState, useEffect } from 'react';
import donationService from '../../services/donationService';
import {
  FiSearch,
  FiEye,
  FiDownload,
  FiX,
  FiHeart,
  FiLoader,
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
  FiFilter,
  FiFileText,
} from 'react-icons/fi';

const DonationsManagementPage = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [successfulAmount, setSuccessfulAmount] = useState(0);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const data = await donationService.getDonations({
        search: search || undefined,
        status: statusFilter !== 'All Status' ? statusFilter : undefined,
      });
      if (data && data.donations) {
        setDonations(data.donations);
        setTotalCount(data.total || data.donations.length);
        setSuccessfulAmount(data.successfulAmount || 0);
      }
    } catch (err) {
      console.error('Failed to load donations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchDonations();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Donation Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Track verified contributions, 80G tax exemption claims, and payment records.
          </p>
        </div>
      </div>

      {/* Overview Stat Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Records</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{totalCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center text-lg">
            <FiHeart />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">Verified Amount</p>
            <p className="text-2xl font-extrabold text-emerald-700 mt-1">
              ₹{successfulAmount.toLocaleString('en-IN')}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">
            <FiCheckCircle />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-600">Status Auditing</p>
            <p className="text-xs font-medium text-slate-600 mt-1">
              Immutable ledger compliant with regulatory standards
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg">
            <FiFileText />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search by donor name, email, phone, transaction ID or UTR..."
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
            <option value="successful">Successful</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Donations Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <FiLoader className="text-3xl text-emerald-600 animate-spin mb-3" />
            <p className="text-xs font-semibold text-slate-500">Loading donation records...</p>
          </div>
        ) : donations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Donor</th>
                  <th className="px-4 py-3.5">Amount</th>
                  <th className="px-4 py-3.5">Method</th>
                  <th className="px-4 py-3.5">Transaction ID</th>
                  <th className="px-4 py-3.5">80G Claim</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5">Date</th>
                  <th className="px-6 py-3.5 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {donations.map((d) => (
                  <tr key={d._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-slate-900">{d.donorName || 'Anonymous'}</p>
                        <p className="text-slate-400 text-[11px]">{d.email || d.phone || 'No contact provided'}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-extrabold text-slate-900 text-sm">
                        ₹{(d.amount || 0).toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td className="px-4 py-4 capitalize text-slate-600">
                      {d.paymentMethod || 'Online'}
                    </td>
                    <td className="px-4 py-4 font-mono text-[11px] text-slate-500">
                      {d.transactionId || d.paymentId || '—'}
                    </td>
                    <td className="px-4 py-4">
                      {d.claim80G ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          Claimed ({d.pan || 'PAN on file'})
                        </span>
                      ) : (
                        <span className="text-slate-300 text-[10px]">No</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                        d.status === 'successful' ? 'bg-emerald-100 text-emerald-800' :
                        d.status === 'failed' ? 'bg-red-100 text-red-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {d.status || 'pending'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-500 text-[11px]">
                      {d.createdAt ? new Date(d.createdAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedDonation(d)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <FiEye /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center">
            <FiHeart className="text-4xl text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-800">No donations found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              No donation records match your search or filter criteria.
            </p>
          </div>
        )}
      </div>

      {/* Donation Detail Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900">Donation Record Details</h3>
              <button
                onClick={() => setSelectedDonation(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs">
              {/* Amount Highlight */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Contribution Amount</p>
                  <p className="text-2xl font-extrabold text-emerald-800 mt-0.5">
                    ₹{(selectedDonation.amount || 0).toLocaleString('en-IN')}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                  selectedDonation.status === 'successful' ? 'bg-emerald-200 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {selectedDonation.status}
                </span>
              </div>

              {/* Donor Section */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider pb-1 border-b border-slate-100">
                  Donor Information
                </h4>
                <div className="grid grid-cols-2 gap-3 text-slate-700">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Full Name:</span>
                    <span className="font-semibold">{selectedDonation.donorName || 'Anonymous'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Email Address:</span>
                    <span className="font-semibold">{selectedDonation.email || '—'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Phone Number:</span>
                    <span className="font-semibold">{selectedDonation.phone || '—'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Country:</span>
                    <span className="font-semibold">{selectedDonation.country || 'India'}</span>
                  </div>
                  {selectedDonation.pan && (
                    <div>
                      <span className="text-slate-400 block text-[10px]">PAN (for 80G):</span>
                      <span className="font-mono font-bold text-slate-900">{selectedDonation.pan}</span>
                    </div>
                  )}
                  {selectedDonation.address && (
                    <div className="col-span-2">
                      <span className="text-slate-400 block text-[10px]">Billing Address:</span>
                      <span className="font-medium">{selectedDonation.address}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Transaction Section */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider pb-1 border-b border-slate-100">
                  Payment & Verification
                </h4>
                <div className="grid grid-cols-2 gap-3 text-slate-700">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Payment Method:</span>
                    <span className="capitalize font-semibold">{selectedDonation.paymentMethod || 'Online'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Transaction ID / UTR:</span>
                    <span className="font-mono text-slate-900">{selectedDonation.transactionId || '—'}</span>
                  </div>
                  {selectedDonation.paymentId && (
                    <div>
                      <span className="text-slate-400 block text-[10px]">Payment Gateway ID:</span>
                      <span className="font-mono text-slate-900">{selectedDonation.paymentId}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-slate-400 block text-[10px]">Submitted At:</span>
                    <span>{selectedDonation.createdAt ? new Date(selectedDonation.createdAt).toLocaleString() : '—'}</span>
                  </div>
                </div>
              </div>

              {/* Message if any */}
              {selectedDonation.message && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Donor Note</span>
                  <p className="italic text-slate-700">"{selectedDonation.message}"</p>
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedDonation(null)}
                className="px-5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationsManagementPage;
