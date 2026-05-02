import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <Link to="/" className={styles.logo}>
        <div className={styles.logoPaw}>🐾</div>
        Paw<span>Pal</span>
      </Link>
      <div className={styles.links}>
        <Link to="/search">ค้นหาบริการ</Link>
        <Link to="/search?cat=clinic">คลินิก</Link>
        <Link to="/search?cat=boarding">ฝากเลี้ยง</Link>
        <Link to="/search?cat=hotel">โรงแรมสัตว์</Link>
        <Link to="/blog">บทความ</Link>
        <Link to="/register">สำหรับร้านค้า</Link>
      </div>
      <button className={styles.cta} onClick={() => navigate('/register')}>ลงทะเบียนร้านค้า ฟรี!</button>
    </nav>
  );
}
