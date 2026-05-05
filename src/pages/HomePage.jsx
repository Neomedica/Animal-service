import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories';
import { PETS_FOR_ADOPTION, SPONSORS } from '../data/blog';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { useShops } from '../hooks/useShops';
import { useFounders } from '../hooks/useFounders';
import ShopCard from '../components/ui/ShopCard';
import ReactionBar from '../components/community/ReactionBar';
import CommentSection from '../components/community/CommentSection';
import styles from './HomePage.module.css';

export default function HomePage() {
  const navigate = useNavigate();
  const { shops } = useShops();
  const { categories } = useCategories();
  const { founders } = useFounders();
  const { posts: BLOG_POSTS } = useBlogPosts();

  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.blob1}/><div className={styles.blob2}/><div className={styles.blob3}/>
        <div className={styles.heroLeft}>
          <div className={styles.badge}><div className={styles.badgeDot}/>เปิดให้บริการในเชียงใหม่ก่อนเป็นที่แรก</div>
          <h1 className={styles.heroTitle}>ทุกบริการ<br/><span className={styles.hlBlue}>สัตว์เลี้ยง</span><br/>อยู่ที่<span className={styles.hlYellow}> เดียว</span></h1>
          <p className={styles.heroSub}>ค้นหาคลินิก ร้านฝากเลี้ยง โรงแรมสัตว์เลี้ยง ร้านตัดขน และอีกมากมาย — พร้อมรีวิวจริง ข้อมูลครบ ในเชียงใหม่</p>
          <div className={styles.heroBtns}>
            <button className={styles.btnPrimary} onClick={()=>navigate('/search')}>ค้นหาบริการ →</button>
            <button className={styles.btnSec} onClick={()=>navigate('/register')}>ลงทะเบียนร้าน ฟรี</button>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.statItem}><strong>120+</strong>ร้านค้าในเชียงใหม่</div>
            <div className={styles.statItem}><strong>8</strong>หมวดหมู่บริการ</div>
            <div className={styles.statItem}><strong>฿0</strong>ค่าลงทะเบียน</div>
          </div>
        </div>
        <div className={styles.heroRight}>
          <iframe src="https://www.google.com/maps/d/embed?mid=1rR-SLG7i71eum5RGpbkV4KpPj0oHJ-I" width="100%" height="380" style={{border:0,borderRadius:"20px",boxShadow:"0 16px 48px rgba(0,0,0,0.15)"}} allowFullScreen loading="lazy"/>
        </div>
      </section>

      <section className={styles.catSection}>
        <div className="container">
          <div className={styles.sectionLabel}>หมวดหมู่บริการ</div>
          <h2 className={styles.sectionTitle}>บริการครบ ทุกความต้องการ</h2>
          <div className={styles.catGrid}>
            {categories.map((cat,i)=>(
              <div key={cat.id} className={`${styles.catCard} ${i===0?styles.catFeatured:''}`} onClick={()=>navigate(`/search?cat=${cat.id}`)} role="button" tabIndex={0}>
                <div className={styles.catIcon}>{cat.icon}</div>
                <div className={styles.catName}>{cat.label}</div>
                <div className={styles.catCount}>{cat.count?`${cat.count} แห่ง`:'สำรวจทั้งหมด'}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.listingSection}>
        <div className="container">
          <div className={styles.sectionLabel}>ค้นพบบริการ</div>
          <h2 className={styles.sectionTitle}>ร้านค้าแนะนำใกล้คุณ</h2>
          <div className={styles.listingsGrid}>{shops.map(shop=><ShopCard key={shop.id} shop={shop}/>)}</div>
          <div className={styles.adsSlot}>
            <div><strong>🚀 ต้องการให้ร้านของคุณอยู่อันดับต้น?</strong><p>เปิดใช้งาน Boost หรือ Sponsored — เริ่มต้นเพียง ฿299/เดือน</p></div>
            <button className={styles.btnAds} onClick={()=>navigate('/register')}>ลงทะเบียนร้าน →</button>
          </div>
        </div>
      </section>

      <section className={styles.howSection}>
        <div className="container">
          <div className={styles.sectionLabel}>วิธีการใช้งาน</div>
          <h2 className={styles.sectionTitle}>ง่ายมาก ใช้ได้เลย</h2>
          <div className={styles.stepsGrid}>
            {[{num:1,icon:'🔍',title:'ค้นหาบริการ',desc:'ค้นหาตามหมวดหมู่ ทำเลที่ตั้ง หรือชื่อร้าน'},{num:2,icon:'📋',title:'เปรียบเทียบข้อมูล',desc:'ดูราคา รีวิวจริง รูปภาพ บริการ ครบในหน้าเดียว'},{num:3,icon:'💬',title:'ติดต่อ / นัดหมาย',desc:'โทร ส่ง LINE หรือนัดหมายผ่านแพลตฟอร์มได้เลย'}].map(s=>(
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
          <h2 className={styles.sectionTitle}>คนที่อยู่เบื้องหลัง Furever 🐾</h2>
          <p className={styles.sectionSub}>เราสร้าง Furever เพราะเราเป็นเจ้าของสัตว์เลี้ยงที่เจอปัญหาเดียวกัน</p>
          <div className={styles.founderGrid}>
            {founders.map(f=>(
              <div key={f.id} className={styles.founderCard}>
                <div className={styles.founderAvatarWrap}>
                  <div className={styles.founderAvatar} style={{background:f.bg}}><span className={styles.founderEmoji}>{f.emoji}</span></div>
                  <div className={styles.founderBadge}>{f.badge}</div>
                </div>
                <div className={styles.founderName}>{f.name}</div>
                <div className={styles.founderRole}>{f.role}</div>
                <p className={styles.founderBio}>{f.bio}</p>
                <span className={styles.founderTag}>{f.social}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.communitySection}>
        <div className="container">
          <div className={styles.sectionLabel}>ชุมชน & พันธมิตร</div>
          <h2 className={styles.sectionTitle}>ร่วมกันช่วยสัตว์เลี้ยง 🐾</h2>
          <div className={styles.communityGrid}>
            <div className={styles.petSection}>
              <div className={styles.petHeader}>
                <div className={styles.petHeaderTitle}>🏠 สัตว์เลี้ยงหาบ้าน</div>
                <div className={styles.petCount}>{PETS_FOR_ADOPTION.length} ตัวรอบ้านใหม่</div>
              </div>
              <div className={styles.petScroll}>
                {PETS_FOR_ADOPTION.map(p=>(
                  <div key={p.id} className={styles.petCard} onClick={()=>navigate('/adopt')}>
                    <div className={styles.petImg} style={{background:p.bg}}><span className={styles.petEmoji}>{p.emoji}</span></div>
                    <div className={styles.petInfo}>
                      <div className={styles.petName}>{p.name}</div>
                      <div className={styles.petDetail}>{p.type} · {p.age}</div>
                      <span className={styles.petBadge}>{p.badge}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className={styles.petCta} onClick={()=>navigate('/adopt')}>ดูสัตว์เลี้ยงทั้งหมด →</button>
            </div>
            <div className={styles.sponsorSection}>
              <div className={styles.sponsorTitle}>🤝 พันธมิตรและสปอนเซอร์</div>
              <div className={styles.sponsorSub}>แบรนด์ที่ร่วมสนับสนุน Furever</div>
              <div className={styles.sponsorGrid}>
                {SPONSORS.map(s=>(
                  <div key={s.name} className={styles.sponsorLogo} style={{background:s.bg}}>
                    <span className={styles.sponsorIcon}>{s.emoji}</span>
                    <div className={styles.sponsorName}>{s.name}</div>
                  </div>
                ))}
                <div className={styles.sponsorAdd} onClick={()=>navigate('/sponsor')}>
                  <div className={styles.sponsorAddIcon}>＋</div>
                  <div className={styles.sponsorAddText}>เป็นสปอนเซอร์</div>
                </div>
              </div>
              <button className={styles.sponsorCta} onClick={()=>navigate('/sponsor')}>ติดต่อเป็นพันธมิตร →</button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.blogSection}>
        <div className="container">
          <div className={styles.blogHeader}>
            <div><div className={styles.sectionLabel}>บทความและข่าวสาร</div><h2 className={styles.sectionTitle}>Furever Blog 🐾</h2></div>
            <button className={styles.btnViewAll} onClick={()=>navigate('/blog')}>ดูทั้งหมด →</button>
          </div>
          <div className={styles.blogTwoCols}>
            <div className={styles.announceBox}>
              <div className={styles.announceTitle}>📢 ประกาศและข่าวด่วน</div>
              {[
                {title:'Furever เปิดตัวแล้ว! ลงทะเบียนฟรีได้เลย', date:'2 พ.ค. 2568', isNew:true, slug:'furever-launch'},
                {title:'ร้านใหม่ 5 ร้านน่าลองในเชียงใหม่ เดือนพ.ค.', date:'2 พ.ค. 2568', isNew:true, slug:'new-shops'},
                {title:'อัปเดต: เพิ่มฟีเจอร์สัตว์หาบ้านแล้ว!', date:'1 พ.ค. 2568', isNew:false, slug:'furever-launch'},
                {title:'ขอบคุณ 100 ร้านค้าแรกที่เข้าร่วม Furever', date:'28 เม.ย. 2568', isNew:false, slug:'furever-launch'},
              ].map((a,i)=>(
                <div key={i} className={styles.announceItem} onClick={()=>navigate(`/blog/${a.slug}`)}>
                  <div className={styles.announceItemTitle}>{a.title}{a.isNew&&<span className={styles.announceNew}>ใหม่</span>}</div>
                  <div className={styles.announceItemDate}>{a.date}</div>
                </div>
              ))}
            </div>
            <div className={styles.blogListBox}>
              {BLOG_POSTS.slice(0,4).map(post=>(
                <div key={post.id} className={styles.blogListCard} onClick={()=>navigate(`/blog/${post.slug}`)}>
                  <div className={styles.blogListImg} style={{background:post.categoryBg}}>{post.emoji}</div>
                  <div className={styles.blogListBody}>
                    <div className={styles.blogListCat} style={{color:post.categoryColor,background:post.categoryBg}}>{post.category}</div>
                    <div className={styles.blogListTitle}>{post.title}</div>
                    <div className={styles.blogListMeta}>{post.date} · {post.readMin} นาที</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.reactionSection}>
        <div className="container">
          <div className={styles.sectionLabel}>ชุมชน Furever</div>
          <h2 className={styles.sectionTitle}>เจ้าของสัตว์เลี้ยงพูดถึงเรา 🐾</h2>
          <p className={styles.sectionSub}>ร่วมแสดงความรู้สึกและแชร์ประสบการณ์กับชุมชนคนรักสัตว์ในเชียงใหม่</p>
          <div className={styles.communityGrid}>
            <ReactionBar/>
            <CommentSection/>
          </div>
        </div>
      </section>
    </main>
  );
}
