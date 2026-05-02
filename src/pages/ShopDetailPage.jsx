import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SHOPS } from '../data/shops';
import styles from './ShopDetailPage.module.css';

export default function ShopDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const shop = SHOPS.find(s => s.id === Number(id));
  const [selectedService, setSelectedService] = useState(0);

  if (!shop) return (
    <div style={{ padding: '80px', textAlign: 'center', color: 'var(--text-light)' }}>
      ไม่พบร้านค้านี้ <button onClick={() => navigate('/search')} style={{ color: 'var(--blue-deep)', cursor: 'pointer', background: 'none', border: 'none', fontSize: '14px', marginLeft: '8px' }}>กลับไปค้นหา</button>
    </div>
  );

  const stars = (r) => '★'.repeat(Math.round(r)) + '☆'.repeat(5 - Math.round(r));

  return (
    <main className={styles.page}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <span onClick={() => navigate('/')} className={styles.bcLink}>หน้าหลัก</span>
        <span className={styles.bcSep}>/</span>
        <span onClick={() => navigate('/search')} className={styles.bcLink}>ค้นหาบริการ</span>
        <span className={styles.bcSep}>/</span>
        <span className={styles.bcCurrent}>{shop.name}</span>
      </div>

      <div className={styles.layout}>
        {/* LEFT */}
        <div className={styles.left}>
          {/* Hero Image */}
          <div className={styles.heroImg} style={{ background: shop.bgGradient }}>
            <span className={styles.heroEmoji}>{shop.emoji}</span>
            {shop.plan === 'sponsored' && <div className={styles.sponsoredBadge}>⚡ Sponsored</div>}
            {shop.isVerified && <div className={styles.verifiedBadge}><div className={styles.vDot}/> ยืนยันแล้ว</div>}
          </div>

          {/* Header */}
          <div className={styles.header}>
            <div>
              <div className={styles.tags}>
                <span className={styles.tagBlue}>{shop.category}</span>
                <span className={shop.isOpen ? styles.tagGreen : styles.tagGray}>
                  {shop.isOpen ? `เปิดอยู่ ${shop.hours}` : 'ปิดแล้ว'}
                </span>
              </div>
              <h1 className={styles.shopName}>{shop.name}</h1>
              <div className={styles.shopMeta}>
                📍 {shop.address}
                <span className={styles.dot}>·</span>
                📞 {shop.phone}
                <span className={styles.dot}>·</span>
                LINE: {shop.line}
              </div>
            </div>
            <div className={styles.ratingBig}>
              ★ {shop.rating.toFixed(1)}
              <span>({shop.reviewCount})</span>
            </div>
          </div>

          {/* Info Grid */}
          <div className={styles.infoGrid}>
            <div className={styles.infoBox}>
              <div className={styles.infoLabel}>ประเภทสัตว์ที่รับ</div>
              <div className={styles.infoVal}>{shop.pets.join(', ')}</div>
            </div>
            <div className={styles.infoBox}>
              <div className={styles.infoLabel}>ที่จอดรถ</div>
              <div className={styles.infoVal}>{shop.parking ? 'มีที่จอดรถ (ฟรี)' : 'ไม่มีที่จอดรถ'}</div>
            </div>
            <div className={styles.infoBox}>
              <div className={styles.infoLabel}>เวลาทำการ</div>
              <div className={styles.infoVal}>{shop.hours}</div>
            </div>
            <div className={styles.infoBox}>
              <div className={styles.infoLabel}>ราคาเริ่มต้น</div>
              <div className={styles.infoVal}>฿{shop.priceFrom.toLocaleString()} / ครั้ง</div>
            </div>
            {shop.vetCount > 0 && (
              <div className={styles.infoBox}>
                <div className={styles.infoLabel}>จำนวนสัตวแพทย์</div>
                <div className={styles.infoVal}>{shop.vetCount} คน</div>
              </div>
            )}
            {shop.emergency !== undefined && (
              <div className={styles.infoBox}>
                <div className={styles.infoLabel}>บริการฉุกเฉิน</div>
                <div className={styles.infoVal}>{shop.emergency ? 'มี (โทรล่วงหน้า)' : 'ไม่มี'}</div>
              </div>
            )}
          </div>

          {/* Services */}
          {shop.services?.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>บริการและราคา</div>
              {shop.services.map((s, i) => (
                <div key={i} className={styles.serviceRow}>
                  <span>{s.name}</span>
                  <span className={styles.servicePrice}>฿{s.priceFrom.toLocaleString()}–{s.priceTo.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}

          {/* Reviews */}
          {shop.reviews?.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>รีวิวล่าสุด</div>
              {shop.reviews.map((r, i) => (
                <div key={i} className={styles.reviewCard}>
                  <div className={styles.reviewTop}>
                    <span className={styles.reviewer}>{r.author}</span>
                    <span className={styles.reviewStars}>{stars(r.rating)}</span>
                  </div>
                  <p className={styles.reviewText}>{r.text}</p>
                  <div className={styles.reviewPet}>🐾 {r.pet}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Booking */}
        <div className={styles.right}>
          <div className={styles.bookingCard}>
            <div className={styles.bookingTitle}>นัดหมายหรือสอบถาม</div>
            {shop.services?.map((s, i) => (
              <div
                key={i}
                className={`${styles.bookOption} ${selectedService === i ? styles.bookSelected : ''}`}
                onClick={() => setSelectedService(i)}
              >
                <div>
                  <div className={styles.boName}>{s.name}</div>
                  <div className={styles.boSub}>~30 นาที</div>
                </div>
                <div className={styles.boPrice}>฿{s.priceFrom.toLocaleString()}</div>
              </div>
            ))}

            <button className={styles.btnBook}>📅 นัดหมาย</button>
            <button className={styles.btnLine}>💬 ติดต่อผ่าน LINE</button>
            <div className={styles.freeLabel}>ไม่มีค่าใช้จ่ายในการจอง</div>

            <div className={styles.contactGrid}>
              <div className={styles.contactItem}>
                <div className={styles.contactLabel}>โทรศัพท์</div>
                <div className={styles.contactVal}>{shop.phone}</div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactLabel}>LINE</div>
                <div className={styles.contactVal}>{shop.line}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
