import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <div className={styles.logoPaw}>🐾</div>
            Paw<span>Pal</span>
          </div>
          <p className={styles.tagline}>
            แพลตฟอร์มบริการสัตว์เลี้ยงครบวงจร<br />
            เริ่มต้นจากเชียงใหม่ สู่ทั่วประเทศ
          </p>
        </div>

        <div className={styles.col}>
          <h4>บริการ</h4>
          <Link to="/search?cat=clinic">คลินิก / สัตวแพทย์</Link>
          <Link to="/search?cat=boarding">ฝากเลี้ยงสัตว์</Link>
          <Link to="/search?cat=hotel">โรงแรมสัตว์</Link>
          <Link to="/search?cat=grooming">กรูมมิ่ง</Link>
          <Link to="/search?cat=food">ร้านอาหารสัตว์</Link>
        </div>

        <div className={styles.col}>
          <h4>สำหรับร้านค้า</h4>
          <Link to="/register">ลงทะเบียนร้านค้า</Link>
          <Link to="/pricing">แพ็กเกจโฆษณา</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>

        <div className={styles.col}>
          <h4>ติดต่อ</h4>
          <a href="https://line.me" target="_blank" rel="noreferrer">LINE Official</a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
          <Link to="/report">แจ้งปัญหา</Link>
          <Link to="/privacy">ข้อมูลส่วนตัว</Link>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© 2025 Furever · สร้างด้วยความรักในเชียงใหม่ 🐾</span>
        <span>เวอร์ชัน 0.1 Early Access</span>
      </div>
    </footer>
  );
}
