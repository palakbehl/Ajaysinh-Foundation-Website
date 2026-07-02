import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
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
      </Routes>
    </Router>
  );
}

export default App;
