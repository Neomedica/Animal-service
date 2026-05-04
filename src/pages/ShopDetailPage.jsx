import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { SHOPS } from "../data/shops";
import styles from "./ShopDetailPage.module.css";

export default function ShopDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const local = SHOPS.find(s => String(s.id) === String(id));
      if (local) { setShop({...local, price_from: local.priceFrom, line_id: local.lineId, is_verified: local.isVerified, review_count: local.reviewCount}); setLoading(false); return; }
      const { data } = await supabase.from("shops").select("*").eq("id", id).single();
      setShop(data || null);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) return <div style={{padding:"80px",textAlign:"center",fontSize:"48px"}}>🐾</div>;
  if (!shop) return (
    <div style={{padding:"80px",textAlign:"center"}}>
      <div style={{fontSize:"48px"}}>🐾</div>
      <p style={{marginTop:"16px",color:"#7A8999"}}>ไม่พบร้านค้า</p>
      <button onClick={()=>navigate(-1)} style={{marginTop:"16px",padding:"10px 24px",cursor:"pointer",borderRadius:"50px",border:"1.5px solid #B8E4F9",fontFamily:"inherit"}}>🐾 กลับ</button>
    </div>
  );

  const catLabel = {clinic:"คลินิก",boarding:"ฝากเลี้ยง",grooming:"กรูมมิ่ง",hotel:"โรงแรม",food:"อาหาร",other:"อื่นๆ"}[shop.category]||shop.category;

  return (
    <main className={styles.page}>
      <div className="container">
        <button className={styles.back} onClick={()=>navigate(-1)}>
          <span>🐾</span> กลับ
        </button>
        <div className={styles.hero}>
          <div className={styles.heroImg}>
            {shop.image_url
              ? <img src={shop.image_url} alt={shop.name} className={styles.heroImgReal}/>
              : <span style={{fontSize:"72px"}}>{shop.emoji||"🏪"}</span>}
            {shop.plan==="sponsored"&&<div className={styles.sponsoredBadge}>⭐ Sponsored</div>}
            {shop.is_verified&&<div className={styles.verifiedBadge}>✅ Verified</div>}
          </div>
          <div className={styles.heroInfo}>
            <div className={styles.catChip}>{catLabel}</div>
            <h1 className={styles.shopName}>{shop.name}</h1>
            <div className={styles.metaRow}>
              {shop.rating>0&&<span>⭐ {shop.rating} ({shop.review_count||0} รีวิว)</span>}
              {shop.hours&&<span>🕐 {shop.hours}</span>}
              {shop.parking&&<span>🅿️ มีที่จอดรถ</span>}
            </div>
            {shop.description&&<p className={styles.desc}>{shop.description}</p>}
            <div className={styles.contactGrid}>
              {shop.address&&<div className={styles.contactItem}><span>📍</span><span>{shop.address}</span></div>}
              {shop.phone&&<div className={styles.contactItem}><span>📞</span><span>{shop.phone}</span></div>}
              {shop.line_id&&<div className={styles.contactItem}><span>💬</span><span>LINE: {shop.line_id}</span></div>}
              {shop.price_from>0&&<div className={styles.contactItem}><span>💰</span><span>เริ่มต้น ฿{Number(shop.price_from).toLocaleString()}</span></div>}
            </div>
            <div className={styles.ctaRow}>
              {shop.phone&&<a href={"tel:"+shop.phone} className={styles.btnCall}>📞 โทรเลย</a>}
              {shop.line_id&&<a href={"https://line.me/ti/p/"+shop.line_id} target="_blank" rel="noreferrer" className={styles.btnLine}>💬 LINE</a>}
              {shop.maps_url&&<a href={shop.maps_url} target="_blank" rel="noreferrer" className={styles.btnMaps}>📍 Maps</a>}
            </div>
          </div>
        </div>
        {shop.lat&&shop.lng&&(
          <div className={styles.mapSection}>
            <h2 className={styles.sectionTitle}>📍 แผนที่</h2>
            <iframe src={"https://maps.google.com/maps?q="+shop.lat+","+shop.lng+"&z=16&output=embed"} width="100%" height="350" style={{border:0,borderRadius:"16px",marginTop:"12px"}} allowFullScreen loading="lazy"/>
          </div>
        )}
        {shop.services&&shop.services.length>0&&(
          <div className={styles.mapSection}>
            <h2 className={styles.sectionTitle}>🛎 บริการ</h2>
            <div style={{display:"flex",gap:"8px",flexWrap:"wrap",marginTop:"12px"}}>
              {shop.services.map((s,i)=><span key={i} style={{background:"#EEF8FF",color:"#185FA5",fontSize:"13px",fontWeight:"600",padding:"6px 14px",borderRadius:"50px"}}>{s}</span>)}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
