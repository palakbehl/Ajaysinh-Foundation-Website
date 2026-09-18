import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import adminService from '../../services/adminService';
import {
  FiTarget,
  FiHeart,
  FiUsers,
  FiBriefcase,
  FiMail,
  FiFileText,
  FiArrowRight,
  FiPlus,
  FiRefreshCw,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
} from 'react-icons/fi';

const DashboardOverviewPage = () => {
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await adminService.getDashboardStats();
      if (data && data.success) {
        setStats(data.stats);
        setRecentActivity(data.recentActivity);
      }
    } catch (err) {
      console.error('Error loading dashboard stats:', err);
      setError('Unable to load live dashboard statistics. Please ensure the backend server and MongoDB are running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Campaigns',
      value: stats?.totalCampaigns ?? 0,
      subtext: `${stats?.activeCampaigns ?? 0} Active Causes`,
      icon: FiTarget,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      link: '/admin/campaigns',
    },
    {
      title: 'Total Donations',
      value: stats?.totalDonations ?? 0,
      subtext: `₹${(stats?.totalDonationAmount ?? 0).toLocaleString('en-IN')} Raised`,
      icon: FiHeart,
      color: 'bg-rose-500',
      textColor: 'text-rose-600',
      bgColor: 'bg-rose-50',
      link: '/admin/donations',
    },
    {
      title: 'Volunteers',
      value: stats?.totalVolunteers ?? 0,
      subtext: `${stats?.pendingVolunteers ?? 0} Pending Review`,
      icon: FiUsers,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      link: '/admin/volunteers',
    },
    {
      title: 'CSR Inquiries',
      value: stats?.totalCSRInquiries ?? 0,
      subtext: `${stats?.newCSRInquiries ?? 0} New Partners`,
      icon: FiBriefcase,
      color: 'bg-amber-500',
      textColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      link: '/admin/csr-inquiries',
    },
    {
      title: 'Messages',
      value: stats?.totalMessages ?? 0,
      subtext: `${stats?.unreadMessages ?? 0} Unread Inquiries`,
      icon: FiMail,
      color: 'bg-indigo-500',
      textColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      link: '/admin/messages',
    },
    {
      title: 'Stories & Blogs',
      value: stats?.totalBlogs ?? 0,
      subtext: 'Published Articles',
      icon: FiFileText,
      color: 'bg-teal-500',
      textColor: 'text-teal-600',
      bgColor: 'bg-teal-50',
      link: '/admin/blogs',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Overview Dashboard</h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time analytics and activity monitoring for Ajaysinh Foundation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchStats}
            disabled={loading}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-all shadow-sm flex items-center gap-2"
          >
            <FiRefreshCw className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
          <Link
            to="/admin/campaigns?create=true"
            className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1.5"
          >
            <FiPlus /> New Campaign
          </Link>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-3">
          <FiAlertCircle className="text-lg flex-shrink-0 mt-0.5 text-amber-600" />
          <div className="flex-1">
            <p className="font-semibold">Backend Connection Notice</p>
            <p className="mt-0.5 text-amber-700">{error}</p>
          </div>
        </div>
      )}

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {statCards.map((card, i) => (
          <Link
            key={i}
            to={card.link}
            className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  {card.title}
                </span>
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {loading ? '—' : card.value}
                </span>
              </div>
              <div className={`w-12 h-12 rounded-2xl ${card.bgColor} ${card.textColor} flex items-center justify-center text-xl group-hover:scale-105 transition-transform`}>
                <card.icon />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-600">{card.subtext}</span>
              <span className="text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all">
                <FiArrowRight />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Donations */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FiHeart className="text-rose-500" /> Recent Donations
            </h2>
            <Link to="/admin/donations" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700">
              View All
            </Link>
          </div>

          {loading ? (
            <div className="py-8 text-center text-xs text-slate-400">Loading donations...</div>
          ) : recentActivity?.donations?.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {recentActivity.donations.map((d) => (
                <div key={d._id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-slate-800">{d.donorName || 'Anonymous Supporter'}</p>
                    <p className="text-slate-400 text-[11px]">{d.email || 'No email provided'}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-600 text-sm">₹{d.amount?.toLocaleString('en-IN')}</p>
                    <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      d.status === 'successful' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {d.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">No donations recorded yet.</div>
          )}
        </div>

        {/* Recent Volunteers */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FiUsers className="text-blue-500" /> Recent Volunteer Applications
            </h2>
            <Link to="/admin/volunteers" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700">
              View All
            </Link>
          </div>

          {loading ? (
            <div className="py-8 text-center text-xs text-slate-400">Loading applications...</div>
          ) : recentActivity?.volunteers?.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {recentActivity.volunteers.map((v) => (
                <div key={v._id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-slate-800">{v.fullName}</p>
                    <p className="text-slate-400 text-[11px]">{v.city ? `${v.city} • ` : ''}{v.interests || 'General'}</p>
                  </div>
                  <div>
                    <span className={`inline-block text-[10px] px-2.5 py-0.5 rounded-full font-semibold ${
                      v.status === 'Accepted' ? 'bg-emerald-100 text-emerald-700' :
                      v.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                      v.status === 'Reviewed' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {v.status || 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">No volunteer applications yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverviewPage;
