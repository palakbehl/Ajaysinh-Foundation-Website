import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';

// Public Layout & Pages
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CampaignsPage from './pages/CampaignsPage';
import CampaignDetailPage from './pages/CampaignDetailPage';
import BlogsPage from './pages/BlogsPage';
import BlogDetailPage from './pages/BlogDetailPage';
import CSRPage from './pages/CSRPage';
import VolunteerPage from './pages/VolunteerPage';
import ContactPage from './pages/ContactPage';
import DonatePage from './pages/DonatePage';
import ScrollToTop from './components/ScrollToTop';

// Admin Layout & Pages
import AdminLayout from './layouts/AdminLayout';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import DashboardOverviewPage from './pages/admin/DashboardOverviewPage';
import CampaignsManagementPage from './pages/admin/CampaignsManagementPage';
import BlogsManagementPage from './pages/admin/BlogsManagementPage';
import DonationsManagementPage from './pages/admin/DonationsManagementPage';
import VolunteersManagementPage from './pages/admin/VolunteersManagementPage';
import CSRInquiriesManagementPage from './pages/admin/CSRInquiriesManagementPage';
import MessagesManagementPage from './pages/admin/MessagesManagementPage';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="campaigns" element={<CampaignsPage />} />
            <Route path="campaigns/:id" element={<CampaignDetailPage />} />
            <Route path="blogs" element={<BlogsPage />} />
            <Route path="blogs/:id" element={<BlogDetailPage />} />
            <Route path="csr" element={<CSRPage />} />
            <Route path="volunteer" element={<VolunteerPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="donate" element={<DonatePage />} />
          </Route>

          {/* Admin Authentication */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardOverviewPage />} />
              <Route path="campaigns" element={<CampaignsManagementPage />} />
              <Route path="blogs" element={<BlogsManagementPage />} />
              <Route path="donations" element={<DonationsManagementPage />} />
              <Route path="volunteers" element={<VolunteersManagementPage />} />
              <Route path="csr-inquiries" element={<CSRInquiriesManagementPage />} />
              <Route path="messages" element={<MessagesManagementPage />} />
            </Route>
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  </ErrorBoundary>
  );
}

export default App;
