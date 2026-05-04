import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import styles from "./ShopDetailPage.module.css";

export default function ShopDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("shops").select("*").eq("id", id).single();
      if (data) setShop(data);
      else {
        const { data: d2 } = await supabase.from("shops").select("*").limit(10);
        if (d2) {
          const found = d2.find(s => String(s.id) === String(id) || s.name.toLowerCase().includes(id));
          setShop(found || null);
        }
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) return <div style={{padding:"80px",textAlign:"center",fontSize:"48px"}}>🐾</div>;
  if (!shop) return <div style={{padding:"80px",textAlign:"center"}}><div style={{fontSize:"48px"}}>🐾</div><p style={{marginTop:"16px"}}>ไม่พบร้านค้า</p><button onClick={()=>navigate(-1)} style={{marginTop:"16px",padding:"10px 24px",cursor:"pointer",borderRadius:"50px",border:"1px solid #ccc"}}>← กลับ</button></div>;

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
              {shop.phone&&<a href={"tel:"+shop.phone} className={styles.contactItem}><span>📞</span><span>{shop.phone}</span></a>}
              {shop.line_id&&<a href={"https://line.me/ti/p/"+shop.line_id} target="_blank" rel="noreferrer" className={styles.contactItem}><span>💬</span><span>LINE: {shop.line_id}</span></a>}
              {shop.price_from>0&&<div className={styles.contactItem}><span>💰</span><span>เริ่มต้น ฿{Number(shop.price_from).toLocaleString()}</span></div>}
            </div>
            <div className={styles.ctaRow}>
              {shop.phone&&<a href={"tel:"+shop.phone} className={styles.btnCall}>📞 โทรเลย</a>}
              {shop.line_id&&<a href={"https://line.me/ti/p/"+shop.line_id} target="_blank" rel="noreferrer" className={styles.btnLine}>💬 LINE</a>}
              {shop.maps_url&&<a href={shop.maps_url} target="_blank" rel="noreferrer" className={styles.btnMaps}>📍 Google Maps</a>}
            </div>
          </div>
        </div>
        {shop.lat&&shop.lng&&(
          <div className={styles.mapSection}>
            <h2 className={styles.sectionTitle}>📍 แผนที่</h2>
            <iframe src={"https://maps.google.com/maps?q="+shop.lat+","+shop.lng+"&z=16&output=embed"} width="100%" height="350" style={{border:0,borderRadius:"16px",marginTop:"12px"}} allowFullScreen loading="lazy"/>
          </div>
        )}
      </div>
    </main>
  );
}
