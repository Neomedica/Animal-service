import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ShopCard.module.css';

const PLAN_LABEL = {
  sponsored: { label: '⚡ Sponsored', cls: styles.badgeSponsored },
  basic:     { label: '🔼 Boost',     cls: styles.badgeBoost },
  free:      null,
};

export default function ShopCard({ shop }) {
  const navigate = useNavigate();
  const plan = PLAN_LABEL[shop.plan];

  return (
    <div
      className={`${styles.card} ${shop.plan === 'sponsored' ? styles.promoted : ''}`}
      onClick={() => navigate(`/shop/${shop.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/shop/${shop.id}`)}
    >
      <div className={styles.img} style={{ background: shop.bgGradient }}>
        <span className={styles.emoji}>{shop.emoji}</span>
        {plan && <div className={`${styles.ribbon} ${plan.cls}`}>{plan.label}</div>}
        {shop.isVerified && (
          <div className={styles.verified}>
            <div className={styles.verifiedDot} />
            ยืนยันแล้ว
          </div>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.tags}>
          <span className={styles.tagBlue}>{shop.category}</span>
          {shop.isOpen
            ? <span className={styles.tagGreen}>เปิดอยู่</span>
            : <span className={styles.tagGray}>ปิดแล้ว</span>}
        </div>

        <div className={styles.name}>{shop.name}</div>
        <div className={styles.meta}>
          📍 {shop.address.split(' ')[0]}
          <span className={styles.dot}>·</span>
          {shop.distance} กม.
        </div>

        <div className={styles.rating}>
          <span className={styles.stars}>{'★'.repeat(Math.round(shop.rating))}{'☆'.repeat(5 - Math.round(shop.rating))}</span>
          {shop.rating.toFixed(1)}
          <span className={styles.reviewCount}>({shop.reviewCount} รีวิว)</span>
        </div>

        <div className={styles.row}>
          <div className={styles.price}>
            เริ่มต้น <strong>฿{shop.priceFrom.toLocaleString()}</strong>
          </div>
          <button className={styles.btnView} onClick={(e) => { e.stopPropagation(); navigate(`/shop/${shop.id}`); }}>
            ดูรายละเอียด
          </button>
        </div>
      </div>
    </div>
  );
}
