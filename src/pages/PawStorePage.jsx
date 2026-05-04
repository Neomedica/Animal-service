import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PawStorePage.module.css";

const PRODUCTS = [
  {id:1,name:"สติ๊กเกอร์อุ้งมือ",desc:"ลายน้องหมาน้องแมว ติดโน้ตบุ๊ค กระเป๋า ขวดน้ำ",emoji:"🐾",price:"฿120",tag:"Bestseller"},
  {id:2,name:"พรมหน้าประตูลายหมา",desc:"ลายสุนัขพันธุ์ต่างๆ ขนาด 40x60 ซม.",emoji:"🐶",price:"฿390",tag:"New"},
  {id:3,name:"แก้วน้ำลายแมว",desc:"Ceramic ลายแมวน่ารัก พร้อมฝาปิด 350ml",emoji:"🐱",price:"฿280",tag:""},
  {id:4,name:"กระเป๋าผ้าอุ้งมือ",desc:"Canvas ลาย Furever Paw น่ารักสุดๆ",emoji:"👜",price:"฿199",tag:"Furever"},
  {id:5,name:"พวงกุญแจน้องหมา",desc:"อะคริลิครูปสุนัขพันธุ์ต่างๆ กว่า 20 แบบ",emoji:"🔑",price:"฿89",tag:""},
  {id:6,name:"โปสการ์ดสัตว์เลี้ยง",desc:"เซ็ต 6 ใบ เหมาะสำหรับของขวัญ",emoji:"💌",price:"฿149",tag:"Gift"},
  {id:7,name:"แม่เหล็กติดตู้เย็น",desc:"ลายสัตว์เลี้ยง เซ็ต 4 ชิ้น",emoji:"🧲",price:"฿99",tag:""},
  {id:8,name:"สมุดโน้ตลายแมว",desc:"A5 ปกแข็ง ลายแมวน่ารัก 120 หน้า",emoji:"📓",price:"฿175",tag:""},
];

const QUIRKY = [
  {id:9,name:"ที่คั่นหนังสือรูปหาง",desc:"อะคริลิครูปหางแมว ยาว 15 ซม.",emoji:"😺",price:"฿69",tag:"Unique"},
  {id:10,name:"ถุงมือแมว",desc:"ถักลายอุ้งเท้าแมว อบอุ่นและน่ารัก",emoji:"🧤",price:"฿220",tag:"Quirky"},
  {id:11,name:"หมวกหูแมว",desc:"ไหมพรมมีหูแมว สำหรับทั้งคนและน้องหมา",emoji:"🎩",price:"฿299",tag:"Quirky"},
  {id:12,name:"เคสโทรศัพท์ลายสัตว์",desc:"รองรับ iPhone/Samsung หลายรุ่น",emoji:"📱",price:"฿259",tag:"New"},
];

export default function PawStorePage() {
  const navigate = useNavigate();
  return (
    <main className={styles.page}>
      <div className={styles.heroBanner}>
        <div className={styles.heroContent}>
          <div className={styles.supportBadge}>🐾 Support Us</div>
          <h1 className={styles.heroTitle}>One of Our Paw<br/><span>by Furever</span></h1>
          <p className={styles.heroDesc}>ร้านของเราเอง! ทุกการซื้อช่วยสนับสนุน Furever ให้เติบโตต่อไป และช่วยสัตว์เลี้ยงในเชียงใหม่</p>
          <div className={styles.heroBtns}>
            <a href="https://line.me" target="_blank" rel="noreferrer" className={styles.btnOrder}>สั่งซื้อผ่าน LINE</a>
            <button className={styles.btnBack} onClick={()=>navigate(-1)}>🐾 กลับ</button>
          </div>
        </div>
        <div className={styles.heroEmoji}>🛍️🐾</div>
      </div>
      <div className="container">
        <div className={styles.section}>
          <div className={styles.sectionLabel}>ของขวัญและของใช้</div>
          <h2 className={styles.sectionTitle}>สินค้าแนะนำ</h2>
          <div className={styles.grid}>
            {PRODUCTS.map(p=>(
              <div key={p.id} className={styles.card}>
                <div className={styles.cardImg}>{p.emoji}</div>
                <div className={styles.cardBody}>
                  {p.tag&&<span className={styles.tag}>{p.tag}</span>}
                  <div className={styles.cardName}>{p.name}</div>
                  <div className={styles.cardDesc}>{p.desc}</div>
                  <div className={styles.cardPrice}>{p.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionLabel}>กุ๊กกิ๊ก สารพัด</div>
          <h2 className={styles.sectionTitle}>ของสุดยูนีค</h2>
          <p className={styles.sectionSub}>ของที่หาไม่ได้ที่ไหน เฉพาะที่ Furever เท่านั้น</p>
          <div className={styles.grid}>
            {QUIRKY.map(p=>(
              <div key={p.id} className={styles.card}>
                <div className={styles.cardImg}>{p.emoji}</div>
                <div className={styles.cardBody}>
                  {p.tag&&<span className={`${styles.tag} ${styles.tagQuirky}`}>{p.tag}</span>}
                  <div className={styles.cardName}>{p.name}</div>
                  <div className={styles.cardDesc}>{p.desc}</div>
                  <div className={styles.cardPrice}>{p.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.ctaBanner}>
          <div className={styles.ctaEmoji}>🐾</div>
          <div>
            <div className={styles.ctaTitle}>สั่งซื้อง่ายๆ ผ่าน LINE</div>
            <div className={styles.ctaDesc}>ส่งรูปสินค้าที่ต้องการมาที่ LINE @furever แล้วเราจะดูแลทุกอย่างให้</div>
          </div>
          <a href="https://line.me" target="_blank" rel="noreferrer" className={styles.btnOrder}>LINE: @furever</a>
        </div>
      </div>
    </main>
  );
}
