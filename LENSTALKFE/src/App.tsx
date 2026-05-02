import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import ScrollToTop from './utils/ScrollToTop';
import LandingLoader from './components/LandingLoader';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import CampaignDetail from './pages/CampaignDetail';
import NotFound from './pages/NotFound';

// Admin Pages
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './pages/admin/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Submissions from './pages/admin/Submissions';
import HeroManager from './pages/admin/HeroManager';
import GalleryManager from './pages/admin/GalleryManager';
import BlogManager from './pages/admin/BlogManager';
import ClientManager from './pages/admin/ClientManager';
import TestimonialManager from './pages/admin/TestimonialManager';
import TeamManager from './pages/admin/TeamManager';
import BusinessPillarManager from './pages/admin/BusinessPillarManager';
import ProcessManager from './pages/admin/ProcessManager';
import StatsManager from './pages/admin/StatsManager';
import CampaignManager from './pages/admin/CampaignManager';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LandingLoader onComplete={() => setLoading(false)} />}
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/portfolio" element={<Layout><Portfolio /></Layout>} />
          <Route path="/blog" element={<Layout><Blog /></Layout>} />
          <Route path="/blog/:slug" element={<Layout><BlogDetail /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/portfolio/campaign/:slug" element={<Layout><CampaignDetail /></Layout>} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="hero" element={<HeroManager />} />
            <Route path="gallery" element={<GalleryManager />} />
            <Route path="pillars" element={<BusinessPillarManager />} />
            <Route path="process" element={<ProcessManager />} />
            <Route path="stats" element={<StatsManager />} />
            <Route path="campaigns" element={<CampaignManager />} />
            <Route path="blog" element={<BlogManager />} />
            <Route path="clients" element={<ClientManager />} />
            <Route path="testimonials" element={<TestimonialManager />} />
            <Route path="team" element={<TeamManager />} />
            <Route path="submissions" element={<Submissions />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
