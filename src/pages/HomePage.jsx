import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { SHOPS } from '../data/shops';
import ShopCard from '../components/ui/ShopCard';
import styles from './HomePage.module.css';

export default function HomePage() {
  const navigate = useNavigate();
  const searchRef = useRef(null);

  return (
    <main>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.blob1} />
        <div className={styles.blob2} />
        <div className={styles.blob3} />

        <div className={styles.heroLeft}>
          <div className={styles.badge}>
            <div className={styles.badgeDot} />
            เปิดให้บริการในเชียงใหม่ก่อนเป็นที่แรก
          </div>
          <h1 className={styles.heroTitle}>
            ทุกบริการ<br />
            <span className={styles.hlBlue}>สัตว์เลี้ยง</span><br />
            อยู่ที่<span className={styles.hlYellow}> เดียว</span>
          </h1>
          <p className={styles.heroSub}>
            ค้นหาคลินิก ร้านฝากเลี้ยง โรงแรมสัตว์เลี้ยง ร้านตัดขน และอีกมากมาย
            — พร้อมรีวิวจริง ข้อมูลครบ ในเชียงใหม่
          </p>
          <div className={styles.heroBtns}>
            <button className={styles.btnPrimary} onClick={() => navigate('/search')}>
              ค้นหาบริการ →
            </button>
            <button className={styles.btnSec} onClick={() => navigate('/register')}>
              ลงทะเบียนร้าน ฟรี
            </button>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.statItem}><strong>120+</strong>ร้านค้าในเชียงใหม่</div>
            <div className={styles.statItem}><strong>8</strong>หมวดหมู่บริการ</div>
            <div className={styles.statItem}><strong>฿0</strong>ค่าลงทะเบียน</div>
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.mapCard}>
            <div className={styles.mapHeader}>
              <span>🗺 บริการใกล้คุณ</span>
              <div className={styles.mapLocation}>📍 เชียงใหม่</div>
            </div>
            <div className={styles.mapPlaceholder}>
              <div className={styles.gridH} style={{ top: '33%' }} />
              <div className={styles.gridH} style={{ top: '66%' }} />
              <div className={styles.gridV} style={{ left: '33%' }} />
              <div className={styles.gridV} style={{ left: '66%' }} />
              <div className={`${styles.pin} ${styles.pinBlue}`} style={{ top: '22%', left: '28%' }}>🏥</div>
              <div className={`${styles.pin} ${styles.pinYellow}`} style={{ top: '50%', left: '55%' }}>🛁</div>
              <div className={`${styles.pin} ${styles.pinGreen}`} style={{ top: '35%', left: '70%' }}>🏨</div>
              <div className={`${styles.pin} ${styles.pinBlue}`} style={{ top: '65%', left: '20%' }}>🍖</div>
              <div className={styles.mapCount}>5 แห่งใกล้คุณ</div>
            </div>
            <div className={styles.resultGrid}>
              <div className={styles.rc}>
                <div className={styles.rcType}>คลินิก</div>
                <div className={styles.rcName}>หมอแมว นิมมาน <span className={styles.rcBadge}>Boost</span></div>
                <div className={styles.rcStars}>★★★★★</div>
                <div className={styles.rcDetail}>0.3 กม. · เปิดอยู่</div>
              </div>
              <div className={styles.rc}>
                <div className={styles.rcType}>ฝากเลี้ยง</div>
                <div className={styles.rcName}>Happy Paws Home</div>
                <div className={styles.rcStars}>★★★★☆</div>
                <div className={styles.rcDetail}>1.2 กม. · รับสุนัข</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className={styles.catSection}>
        <div className="container">
          <div className={styles.sectionLabel}>หมวดหมู่บริการ</div>
          <h2 className={styles.sectionTitle}>บริการครบ ทุกความต้องการ</h2>
          <p className={styles.sectionSub}>
            ไม่ว่าจะเป็นสุนัข แมว กระต่าย นก หรือสัตว์เลี้ยงชนิดอื่น เราครอบคลุมทุกบริการ
          </p>
          <div className={styles.catGrid}>
            {CATEGORIES.map((cat, i) => (
              <div
                key={cat.id}
                className={`${styles.catCard} ${i === 0 ? styles.catFeatured : ''}`}
                onClick={() => navigate(`/search?cat=${cat.id}`)}
                role="button"
                tabIndex={0}
              >
                <div className={styles.catIcon}>{cat.icon}</div>
                <div className={styles.catName}>{cat.label}</div>
                <div className={styles.catCount}>
                  {cat.count ? `${cat.count} แห่ง` : 'สำรวจทั้งหมด'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LISTINGS */}
      <section className={styles.listingSection}>
        <div className="container">
          <div className={styles.sectionLabel}>ค้นพบบริการ</div>
          <h2 className={styles.sectionTitle}>ร้านค้าแนะนำใกล้คุณ</h2>

          <div className={styles.listingsGrid}>
            {SHOPS.map(shop => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>

          <div className={styles.adsSlot}>
            <div>
              <strong>🚀 ต้องการให้ร้านของคุณอยู่อันดับต้น?</strong>
              <p>เปิดใช้งาน Boost หรือ Sponsored เพื่อเพิ่มการมองเห็น — เริ่มต้นเพียง ฿299/เดือน</p>
            </div>
            <button className={styles.btnAds} onClick={() => navigate('/pricing')}>
              ดูแพ็กเกจ →
            </button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className={styles.howSection}>
        <div className="container">
          <div className={styles.sectionLabel}>วิธีการใช้งาน</div>
          <h2 className={styles.sectionTitle}>ง่ายมาก ใช้ได้เลย</h2>
          <div className={styles.stepsGrid}>
            {[
              { num: 1, icon: '🔍', title: 'ค้นหาบริการ', desc: 'ค้นหาตามหมวดหมู่ ทำเลที่ตั้ง หรือชื่อร้าน พร้อมฟิลเตอร์ตามสัตว์เลี้ยงของคุณ' },
              { num: 2, icon: '📋', title: 'เปรียบเทียบข้อมูล', desc: 'ดูราคา รีวิวจริง รูปภาพ บริการ เวลาเปิด-ปิด ครบถ้วนในหน้าเดียว' },
              { num: 3, icon: '💬', title: 'ติดต่อ / นัดหมาย', desc: 'โทร ส่ง LINE หรือนัดหมายผ่านแพลตฟอร์มได้เลย ไม่มีค่าใช้จ่าย' },
            ].map(step => (
              <div key={step.num} className={styles.stepCard}>
                <div className={styles.stepNum}>{step.num}</div>
                <div className={styles.stepIcon}>{step.icon}</div>
                <div className={styles.stepTitle}>{step.title}</div>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section className={styles.planSection}>
        <div className="container">
          <div className={styles.sectionLabel}>สำหรับร้านค้า</div>
          <h2 className={styles.sectionTitle}>เริ่มต้นฟรี ขยายได้ตามต้องการ</h2>
          <p className={styles.sectionSub}>ช่วงเปิดตัวลงทะเบียนได้ฟรี ไม่มีค่าใช้จ่ายแอบแฝง</p>
          <div className={styles.planGrid}>
            {[
              {
                key: 'free', name: 'Free', price: '฿0', period: '/ เดือน',
                promo: '✓ ฟรีตลอดช่วง Early Access',
                badge: 'สำหรับทุกร้าน', badgeColor: '#888',
                features: [
                  { ok: true,  text: 'โปรไฟล์ร้านค้าพื้นฐาน' },
                  { ok: true,  text: 'ระบุที่อยู่ + แผนที่' },
                  { ok: true,  text: 'รับรีวิวจากลูกค้า' },
                  { ok: true,  text: 'เบอร์โทร + LINE' },
                  { ok: false, text: 'รูปภาพเพิ่มเติม (จำกัด 3 รูป)' },
                  { ok: false, text: 'การมองเห็นมาตรฐาน' },
                ],
                ctaLabel: 'ลงทะเบียนฟรี →',
                ctaAction: () => navigate('/register'),
              },
              {
                key: 'basic', name: 'Basic Boost', price: '฿299', period: '/ เดือน',
                promo: '→ มองเห็นได้ดีขึ้น 3–5 เท่า',
                badge: '⚡ ยอดนิยม', badgeColor: '#185FA5',
                features: [
                  { ok: true,  text: 'ทุกอย่างใน Free' },
                  { ok: true,  text: 'รูปภาพไม่จำกัด' },
                  { ok: true,  text: 'แสดงในอันดับสูงกว่า' },
                  { ok: true,  text: 'ป้าย Boost เด่นชัด' },
                  { ok: true,  text: 'Dashboard สถิติ' },
                  { ok: false, text: 'Sponsored / โฆษณา' },
                ],
                ctaLabel: 'เริ่มใช้งาน →',
                ctaAction: () => navigate('/pricing'),
              },
              {
                key: 'pro', name: 'Sponsored', price: '฿699', period: '/ เดือน',
                promo: '→ ปรากฏเป็นอันดับแรกในหมวด',
                badge: '🌟 Pro', badgeColor: '#8A6C00',
                features: [
                  { ok: true, text: 'ทุกอย่างใน Basic' },
                  { ok: true, text: 'ป้าย Sponsored บนแผนที่' },
                  { ok: true, text: 'แสดงใน Hero / Banner' },
                  { ok: true, text: 'ส่ง Push แจ้งเตือนผู้ใช้' },
                  { ok: true, text: 'Analytics รายสัปดาห์' },
                  { ok: true, text: 'Badge ยืนยันพิเศษ' },
                ],
                ctaLabel: 'ติดต่อทีมงาน →',
                ctaAction: () => navigate('/contact'),
              },
            ].map(plan => (
              <div key={plan.key} className={`${styles.planCard} ${styles[`plan_${plan.key}`]}`}>
                <div className={styles.planBadge} style={{ color: plan.badgeColor }}>{plan.badge}</div>
                <div className={styles.planName}>{plan.name}</div>
                <div className={styles.planPrice}>{plan.price} <span>{plan.period}</span></div>
                <div className={styles.planPromo}>{plan.promo}</div>
                <ul className={styles.planFeatures}>
                  {plan.features.map((f, i) => (
                    <li key={i}>
                      <span className={f.ok ? styles.featCheck : styles.featX}>{f.ok ? '✓' : '–'}</span>
                      {f.text}
                    </li>
                  ))}
                </ul>
                <button className={`${styles.planCta} ${styles[`cta_${plan.key}`]}`} onClick={plan.ctaAction}>
                  {plan.ctaLabel}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
