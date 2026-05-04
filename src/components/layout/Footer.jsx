import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>🐾 Furever</div>
            <p className={styles.tagline}>แพลตฟอร์มบริการสัตว์เลี้ยง<br/>เริ่มต้นจากเชียงใหม่ สู่ทั่วประเทศ</p>
          </div>
          <div className={styles.col}>
            <h4>บริการ</h4>
            <Link to="/search?cat=clinic">คลินิกสัตว์</Link>
            <Link to="/search?cat=boarding">ฝากเลี้ยง</Link>
            <Link to="/search?cat=grooming">กรูมมิ่ง</Link>
            <Link to="/search?cat=hotel">โรงแรมสัตว์</Link>
          </div>
          <div className={styles.col}>
            <h4>สำหรับร้านค้า</h4>
            <Link to="/register">ลงทะเบียนร้าน</Link>
            <Link to="/sponsor">เป็นสปอนเซอร์</Link>
            <Link to="/blog">บทความ</Link>
            <Link to="/adopt">สัตว์หาบ้าน</Link>
          </div>
          <div className={styles.col}>
            <h4>ติดต่อ</h4>
            <a href="https://line.me" target="_blank" rel="noreferrer">LINE: @furever</a>
            <a href="mailto:hello@furever.co">hello@furever.co</a>
            <Link to="/admin" className={styles.adminLink}>🔐 Dashboard</Link>
          </div>
        </div>
        <div className={styles.bottom}>
          <div>© 2568 Furever & Co. All rights reserved.</div>
          <div className={styles.madeWith}>Made with 🐾 in Chiang Mai</div>
        </div>
      </div>
    </footer>
  );
}
