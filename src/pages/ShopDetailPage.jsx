import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SHOPS } from "../data/shops";
import styles from "./ShopDetailPage.module.css";

export default function ShopDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const shop = SHOPS.find(s => String(s.id) === String(id));

  if (!shop) return (
    <div style={{padding:"80px",textAlign:"center"}}>
      <div style={{fontSize:"48px",marginBottom:"16px"}}>🐾</div>
      <p>ไม่พบร้านค้า</p>
      <button onClick={()=>navigate(-1)} style={{marginTop:"16px",padding:"8px 20px",cursor:"pointer"}}>← กลับ</button>
    </div>
  );

  const catLabel = {clinic:"คลินิก",boarding:"ฝากเลี้ยง",grooming:"กรูมมิ่ง",hotel:"โรงแรม",food:"อาหาร",other:"อื่นๆ"}[shop.category]||shop.category;

  return (
    <main className={styles.page}>
      <div className="container">
        <button className={styles.back} onClick={()=>navigate(-1)}>← กลับ</button>
        <div className={styles.hero}>
          <div className={styles.heroImg} style={{background:shop.image_url?"none":"linear-gradient(135deg,#D8F5FF,#FFF0A0)"}}>
            {shop.image_url
              ? <img src={shop.image_url} alt={shop.name} className={styles.heroImgReal}/>
              : <span style={{fontSize:"72px"}}>{shop.emoji||"🏪"}</span>}
            {shop.plan==="sponsored"&&<div className={styles.sponsoredBadge}>⭐ Sponsored</div>}
            {shop.isVerified&&<div className={styles.verifiedBadge}>✅ Verified</div>}
          </div>
          <div className={styles.heroInfo}>
            <div className={styles.catChip}>{catLabel}</div>
            <h1 className={styles.shopName}>{shop.name}</h1>
            <div className={styles.metaRow}>
              {shop.rating>0&&<span>⭐ {shop.rating} ({shop.reviewCount||0} รีวิว)</span>}
              {shop.hours&&<span>🕐 {shop.hours}</span>}
              {shop.parking&&<span>🅿️ มีที่จอดรถ</span>}
              {shop.distance&&<span>📍 {shop.distance} กม.</span>}
            </div>
            {shop.description&&<p className={styles.desc}>{shop.description}</p>}
            <div className={styles.contactGrid}>
              {shop.address&&<div className={styles.contactItem}><span>📍</span><span>{shop.address}</span></div>}
              {shop.phone&&<a href={"tel:"+shop.phone} className={styles.contactItem}><span>📞</span><span>{shop.phone}</span></a>}
              {shop.lineId&&<a href={"https://line.me/ti/p/"+shop.lineId} target="_blank" rel="noreferrer" className={styles.contactItem}><span>💬</span><span>LINE: {shop.lineId}</span></a>}
              {shop.priceFrom>0&&<div className={styles.contactItem}><span>💰</span><span>เริ่มต้น ฿{shop.priceFrom?.toLocaleString()}</span></div>}
            </div>
            <div className={styles.ctaRow}>
              {shop.phone&&<a href={"tel:"+shop.phone} className={styles.btnCall}>📞 โทรเลย</a>}
              {shop.lineId&&<a href={"https://line.me/ti/p/"+shop.lineId} target="_blank" rel="noreferrer" className={styles.btnLine}>💬 LINE</a>}
              {shop.mapsUrl&&<a href={shop.mapsUrl} target="_blank" rel="noreferrer" className={styles.btnMaps}>📍 Google Maps</a>}
            </div>
          </div>
        </div>
        {shop.lat&&shop.lng&&(
          <div className={styles.mapSection}>
            <h2 className={styles.sectionTitle}>📍 แผนที่</h2>
            <iframe
              src={"https://maps.google.com/maps?q="+shop.lat+","+shop.lng+"&z=16&output=embed"}
              width="100%" height="350"
              style={{border:0,borderRadius:"16px",marginTop:"12px"}}
              allowFullScreen loading="lazy"
            />
          </div>
        )}
        {shop.services&&shop.services.length>0&&(
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>🛎 บริการ</h2>
            <div className={styles.tagGrid}>
              {shop.services.map((s,i)=><span key={i} className={styles.tag}>{s}</span>)}
            </div>
          </div>
        )}
        {shop.reviews&&shop.reviews.length>0&&(
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>💬 รีวิว</h2>
            {shop.reviews.map((r,i)=>(
              <div key={i} className={styles.reviewCard}>
                <div className={styles.reviewHeader}><strong>{r.name}</strong><span>{"★".repeat(r.rating)}</span></div>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
