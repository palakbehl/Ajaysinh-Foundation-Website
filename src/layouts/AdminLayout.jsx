import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FiGrid,
  FiTarget,
  FiFileText,
  FiHeart,
  FiUsers,
  FiBriefcase,
  FiMail,
  FiLogOut,
  FiMenu,
  FiX,
  FiExternalLink,
  FiShield,
  FiUser,
} from 'react-icons/fi';

const navItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: FiGrid },
  { name: 'Campaigns', path: '/admin/campaigns', icon: FiTarget },
  { name: 'Blogs & Stories', path: '/admin/blogs', icon: FiFileText },
  { name: 'Donations', path: '/admin/donations', icon: FiHeart },
  { name: 'Volunteers', path: '/admin/volunteers', icon: FiUsers },
  { name: 'CSR Inquiries', path: '/admin/csr-inquiries', icon: FiBriefcase },
  { name: 'Contact Messages', path: '/admin/messages', icon: FiMail },
];

const AdminLayout = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row text-slate-800 font-sans antialiased">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/60 z-30 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 bg-slate-900 text-slate-300 flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
              <FiShield className="text-xl" />
            </div>
            <div>
              <h1 className="font-bold text-white text-sm tracking-wide">AJAYSINH</h1>
              <p className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase">Admin Portal</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white p-1"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Management
          </p>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`
              }
            >
              <item.icon className="text-lg flex-shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          ))}

          <div className="pt-6 pb-2">
            <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Quick Links
            </p>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              <span className="flex items-center gap-2">
                <FiExternalLink className="text-sm" /> View Public Site
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">↗</span>
            </a>
          </div>
        </nav>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/30">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center flex-shrink-0 font-bold text-sm border border-emerald-500/20">
                <FiUser />
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate">{admin?.name || 'Administrator'}</p>
                <p className="text-[10px] text-slate-400 truncate">{admin?.email || 'admin@ajaysinh.org'}</p>
              </div>
            </div>
            <button
              onClick={() => setShowLogoutConfirm(true)}
              title="Log out"
              className="text-slate-400 hover:text-red-400 p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
            >
              <FiLogOut className="text-base" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              <FiMenu className="text-2xl" />
            </button>
            <div className="hidden sm:block">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Foundation Portal</span>
              <h2 className="text-sm font-bold text-slate-800">Ajaysinh Foundation Control Center</h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live System</span>
            </div>

            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-slate-200"
            >
              <FiLogOut className="text-sm" />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        </header>

        {/* Page Outlet */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center border border-slate-100">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
              <FiLogOut className="text-2xl" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Sign Out</h3>
            <p className="text-sm text-slate-600 mt-1 mb-6">
              Are you sure you want to log out of the admin panel?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Stay Logged In
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
