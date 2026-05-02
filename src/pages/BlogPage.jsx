import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blog';
import styles from './BlogPage.module.css';

const CATS = ['ทั้งหมด','ข่าว PawPal','คลินิก','ฝากเลี้ยง','กรูมมิ่ง','อาหารสัตว์'];

export default function BlogPage() {
  const navigate = useNavigate();
  const [activeCat, setActiveCat] = useState('ทั้งหมด');
  const featured = BLOG_POSTS.find(p => p.hot);
  const filtered = activeCat === 'ทั้งหมด' ? BLOG_POSTS : BLOG_POSTS.filter(p => p.category === activeCat);
  const rest = filtered.filter(p => p.id !== featured?.id);

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.sectionLabel}>บทความและข่าวสาร</div>
          <h1 className={styles.title}>PawPal Blog 🐾</h1>
          <p className={styles.sub}>เคล็ดลับดูแลสัตว์เลี้ยง ข่าวสารจากทีม และอัปเดตร้านค้าใหม่ในเชียงใหม่</p>
        </div>
        {activeCat === 'ทั้งหมด' && featured && (
          <div className={styles.featured} onClick={() => navigate(`/blog/${featured.slug}`)}>
            <div className={styles.featuredImg}>
              <span className={styles.featuredEmoji}>{featured.emoji}</span>
              <div className={styles.featuredBadge}>🔥 บทความแนะนำ</div>
            </div>
            <div className={styles.featuredBody}>
              <div className={styles.catTag} style={{ color: featured.categoryColor, background: featured.categoryBg }}>{featured.category}</div>
              <h2 className={styles.featuredTitle}>{featured.title}</h2>
              <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
              <div className={styles.featuredMeta}>
                <span>📅 {featured.date}</span>
                <span>⏱ {featured.readMin} นาที</span>
                <span className={styles.readMore}>อ่านต่อ →</span>
              </div>
            </div>
          </div>
        )}
        <div className={styles.filterRow}>
          {CATS.map(c => (
            <button key={c} className={`${styles.filterBtn} ${activeCat === c ? styles.filterActive : ''}`} onClick={() => setActiveCat(c)}>{c}</button>
          ))}
        </div>
        <div className={styles.grid}>
          {(activeCat === 'ทั้งหมด' ? rest : filtered).map(post => (
            <div key={post.id} className={styles.card} onClick={() => navigate(`/blog/${post.slug}`)}>
              <div className={styles.cardImg} style={{ background: post.categoryBg }}>
                <span className={styles.cardEmoji}>{post.emoji}</span>
                {post.hot && <div className={styles.hotBadge}>🔥 Hot</div>}
              </div>
              <div className={styles.cardBody}>
                <div className={styles.catTag} style={{ color: post.categoryColor, background: post.categoryBg }}>{post.category}</div>
                <h3 className={styles.cardTitle}>{post.title}</h3>
                <p className={styles.cardExcerpt}>{post.excerpt}</p>
                <div className={styles.cardMeta}><span>{post.date}</span><span>⏱ {post.readMin} นาที</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
