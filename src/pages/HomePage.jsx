import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { FOUNDERS, BLOG_POSTS } from '../data/blog';
import { useShops } from '../hooks/useShops';
import ShopCard from '../components/ui/ShopCard';
import ReactionBar from '../components/community/ReactionBar';
import CommentSection from '../components/community/CommentSection';
import styles from './HomePage.module.css';

export default function HomePage() {
  const navigate = useNavigate();
  const { shops } = useShops();

  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.blob1} /><div className={styles.blob2} /><div className={styles.blob3} />
        <div className={styles.heroLeft}>
          <div className={styles.badge}><div className={styles.badgeDot} />เปิดให้บริการในเชียงใหม่ก่อนเป็นที่แรก</div>
          <h1 className={styles.heroTitle}>ทุกบริการ<br /><span className={styles.hlBlue}>สัตว์เลี้ยง</span><br />อยู่ที่<span className={styles.hlYellow}> เดียว</span></h1>
          <p className={styles.heroSub}>ค้นหาคลินิก ร้านฝากเลี้ยง โรงแรมสัตว์เลี้ยง ร้านตัดขน และอีกมากมาย — พร้อมรีวิวจริง ข้อมูลครบ ในเชียงใหม่</p>
          <div className={styles.heroBtns}>
            <button className={styles.btnPrimary} onClick={() => navigate('/search')}>ค้นหาบริการ →</button>
            <button className={styles.btnSec} onClick={() => navigate('/register')}>ลงทะเบียนร้าน ฟรี</button>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.statItem}><strong>120+</strong>ร้านค้าในเชียงใหม่</div>
            <div className={styles.statItem}><strong>8</strong>หมวดหมู่บริการ</div>
            <div className={styles.statItem}><strong>฿0</strong>ค่าลงทะเบียน</div>
          </div>
        </div>
        <div className={styles.heroRight}>
          <div className={styles.mapCard}>
            <div className={styles.mapHeader}><span>🗺 บริการใกล้คุณ</span><div className={styles.mapLocation}>📍 เชียงใหม่</div></div>
            <div className={styles.mapPlaceholder}>
              <div className={styles.gridH} style={{top:'33%'}} /><div className={styles.gridH} style={{top:'66%'}} />
              <div className={styles.gridV} style={{left:'33%'}} /><div className={styles.gridV} style={{left:'66%'}} />
              <div className={`${styles.pin} ${styles.pinBlue}`} style={{top:'22%',left:'28%'}}>🏥</div>
              <div className={`${styles.pin} ${styles.pinYellow}`} style={{top:'50%',left:'55%'}}>🛁</div>
              <div className={`${styles.pin} ${styles.pinGreen}`} style={{top:'35%',left:'70%'}}>🏨</div>
              <div className={`${styles.pin} ${styles.pinBlue}`} style={{top:'65%',left:'20%'}}>🍖</div>
              <div className={styles.mapCount}>5 แห่งใกล้คุณ</div>
            </div>
            <div className={styles.resultGrid}>
              <div className={styles.rc}><div className={styles.rcType}>คลินิก</div><div className={styles.rcName}>หมอแมว นิมมาน <span className={styles.rcBadge}>Boost</span></div><div className={styles.rcStars}>★★★★★</div><div className={styles.rcDetail}>0.3 กม. · เปิดอยู่</div></div>
              <div className={styles.rc}><div className={styles.rcType}>ฝากเลี้ยง</div><div className={styles.rcName}>Happy Paws Home</div><div className={styles.rcStars}>★★★★☆</div><div className={styles.rcDetail}>1.2 กม. · รับสุนัข</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.catSection}>
        <div className="container">
          <div className={styles.sectionLabel}>หมวดหมู่บริการ</div>
          <h2 className={styles.sectionTitle}>บริการครบ ทุกความต้องการ</h2>
          <p className={styles.sectionSub}>ไม่ว่าจะเป็นสุนัข แมว กระต่าย นก หรือสัตว์เลี้ยงชนิดอื่น เราครอบคลุมทุกบริการ</p>
          <div className={styles.catGrid}>
            {CATEGORIES.map((cat,i) => (
              <div key={cat.id} className={`${styles.catCard} ${i===0?styles.catFeatured:''}`} onClick={() => navigate(`/search?cat=${cat.id}`)} role="button" tabIndex={0}>
                <div className={styles.catIcon}>{cat.icon}</div>
                <div className={styles.catName}>{cat.label}</div>
                <div className={styles.catCount}>{cat.count ? `${cat.count} แห่ง` : 'สำรวจทั้งหมด'}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.listingSection}>
        <div className="container">
          <div className={styles.sectionLabel}>ค้นพบบริการ</div>
          <h2 className={styles.sectionTitle}>ร้านค้าแนะนำใกล้คุณ</h2>
          <div className={styles.listingsGrid}>
            {shops.map(shop => <ShopCard key={shop.id} shop={shop} />)}
          </div>
          <div className={styles.adsSlot}>
            <div><strong>🚀 ต้องการให้ร้านของคุณอยู่อันดับต้น?</strong><p>เปิดใช้งาน Boost หรือ Sponsored — เริ่มต้นเพียง ฿299/เดือน</p></div>
            <button className={styles.btnAds} onClick={() => navigate('/pricing')}>ดูแพ็กเกจ →</button>
          </div>
        </div>
      </section>

      <section className={styles.howSection}>
        <div className="container">
          <div className={styles.sectionLabel}>วิธีการใช้งาน</div>
          <h2 className={styles.sectionTitle}>ง่ายมาก ใช้ได้เลย</h2>
          <div className={styles.stepsGrid}>
            {[{num:1,icon:'🔍',title:'ค้นหาบริการ',desc:'ค้นหาตามหมวดหมู่ ทำเลที่ตั้ง หรือชื่อร้าน'},{num:2,icon:'📋',title:'เปรียบเทียบข้อมูล',desc:'ดูราคา รีวิวจริง รูปภาพ บริการ ครบในหน้าเดียว'},{num:3,icon:'💬',title:'ติดต่อ / นัดหมาย',desc:'โทร ส่ง LINE หรือนัดหมายผ่านแพลตฟอร์มได้เลย'}].map(s => (
              <div key={s.num} className={styles.stepCard}>
                <div className={styles.stepNum}>{s.num}</div>
                <div className={styles.stepIcon}>{s.icon}</div>
                <div className={styles.stepTitle}>{s.title}</div>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.founderSection}>
        <div className="container">
          <div className={styles.sectionLabel}>ทีมผู้ก่อตั้ง</div>
          <h2 className={styles.sectionTitle}>คนที่อยู่เบื้องหลัง PawPal 🐾</h2>
          <p className={styles.sectionSub}>เราสร้าง PawPal เพราะเราเป็นเจ้าของสัตว์เลี้ยงที่เจอปัญหาเดียวกัน</p>
          <div className={styles.founderGrid}>
            {FOUNDERS.map(f => (
              <div key={f.id} className={styles.founderCard}>
                <div className={styles.founderAvatar} style={{background:f.bg}}><span className={styles.founderEmoji}>{f.emoji}</span></div>
                <div className={styles.founderName}>{f.name}</div>
                <div className={styles.founderRole}>{f.role}</div>
                <p className={styles.founderBio}>{f.bio}</p>
                <div className={styles.founderSocial}>{f.social}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.blogSection}>
        <div className="container">
          <div className={styles.blogHeader}>
            <div><div className={styles.sectionLabel}>บทความและข่าวสาร</div><h2 className={styles.sectionTitle}>PawPal Blog 🐾</h2></div>
            <button className={styles.btnViewAll} onClick={() => navigate('/blog')}>ดูทั้งหมด →</button>
          </div>
          <div className={styles.blogGrid}>
            {BLOG_POSTS.slice(0,3).map(post => (
              <div key={post.id} className={styles.blogCard} onClick={() => navigate(`/blog/${post.slug}`)}>
                <div className={styles.blogCardImg} style={{background:post.categoryBg}}><span className={styles.blogEmoji}>{post.emoji}</span>{post.hot && <div className={styles.hotBadge}>🔥 Hot</div>}</div>
                <div className={styles.blogCardBody}>
                  <div className={styles.blogCatTag} style={{color:post.categoryColor,background:post.categoryBg}}>{post.category}</div>
                  <div className={styles.blogCardTitle}>{post.title}</div>
                  <div className={styles.blogCardMeta}>{post.date} · {post.readMin} นาที</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.communitySection}>
        <div className="container">
          <div className={styles.sectionLabel}>ชุมชน PawPal</div>
          <h2 className={styles.sectionTitle}>เจ้าของสัตว์เลี้ยงพูดถึงเรา 🐾</h2>
          <p className={styles.sectionSub}>ร่วมแสดงความรู้สึกและแชร์ประสบการณ์กับชุมชนคนรักสัตว์ในเชียงใหม่</p>
          <div className={styles.communityGrid}>
            <ReactionBar />
            <CommentSection />
          </div>
        </div>
      </section>
    </main>
  );
}
