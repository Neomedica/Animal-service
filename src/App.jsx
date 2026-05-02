import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/global.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ShopDetailPage from './pages/ShopDetailPage';
import RegisterPage from './pages/RegisterPage';
import BlogPage from './pages/BlogPage';

function NotFound() {
  return (
    <div style={{ textAlign:'center', padding:'100px 20px', color:'var(--text-light)' }}>
      <div style={{ fontSize:'48px', marginBottom:'16px' }}>🐾</div>
      <h2 style={{ fontFamily:'var(--font-display)', fontSize:'24px', color:'var(--text-dark)', marginBottom:'8px' }}>ไม่พบหน้าที่ต้องการ</h2>
      <a href="/" style={{ color:'var(--blue-deep)', fontSize:'14px' }}>กลับหน้าหลัก</a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/shop/:id" element={<ShopDetailPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
