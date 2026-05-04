import React from "react";
import { useNavigate } from "react-router-dom";

const PRODUCTS = [
  {id:1,name:"สติ๊กเกอร์อุ้งมือ",desc:"ลายน้องหมาน้องแมว ติดโน้ตบุ๊ค กระเป๋า",emoji:"🐾",price:"฿120",tag:"Bestseller",quirky:false},
  {id:2,name:"พรมหน้าประตูลายหมา",desc:"ลายสุนัขพันธุ์ต่างๆ ขนาด 40x60 ซม.",emoji:"🐶",price:"฿390",tag:"New",quirky:false},
  {id:3,name:"แก้วน้ำลายแมว",desc:"Ceramic ลายแมวน่ารัก พร้อมฝาปิด 350ml",emoji:"🐱",price:"฿280",tag:"",quirky:false},
  {id:4,name:"กระเป๋าผ้าอุ้งมือ",desc:"Canvas ลาย Furever Paw",emoji:"👜",price:"฿199",tag:"Furever",quirky:false},
  {id:5,name:"พวงกุญแจน้องหมา",desc:"อะคริลิครูปสุนัขกว่า 20 แบบ",emoji:"🔑",price:"฿89",tag:"",quirky:false},
  {id:6,name:"โปสการ์ดสัตว์เลี้ยง",desc:"เซ็ต 6 ใบ เหมาะสำหรับของขวัญ",emoji:"💌",price:"฿149",tag:"Gift",quirky:false},
  {id:7,name:"ที่คั่นหนังสือรูปหาง",desc:"อะคริลิครูปหางแมว ยาว 15 ซม.",emoji:"😺",price:"฿69",tag:"Unique",quirky:true},
  {id:8,name:"ถุงมือแมว",desc:"ถักลายอุ้งเท้าแมว อบอุ่นและน่ารัก",emoji:"🧤",price:"฿220",tag:"Quirky",quirky:true},
  {id:9,name:"หมวกหูแมว",desc:"ไหมพรมมีหูแมว สำหรับทั้งคนและน้องหมา",emoji:"🎩",price:"฿299",tag:"Quirky",quirky:true},
  {id:10,name:"เคสโทรศัพท์ลายสัตว์",desc:"รองรับ iPhone/Samsung หลายรุ่น",emoji:"📱",price:"฿259",tag:"New",quirky:true},
];

const s = {
  page:{padding:"0 0 80px"},
  banner:{background:"linear-gradient(135deg,#1E2A3B,#2D4A6B)",padding:"60px 80px",display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"48px"},
  badge:{display:"inline-block",background:"#FFD94D",color:"#7A5C00",fontSize:"12px",fontWeight:"800",padding:"5px 14px",borderRadius:"50px",marginBottom:"16px"},
  title:{fontFamily:"var(--font-display)",fontSize:"42px",fontWeight:"900",color:"white",lineHeight:"1.2",marginBottom:"14px"},
  desc:{fontSize:"15px",color:"rgba(255,255,255,0.7)",lineHeight:"1.7",marginBottom:"24px"},
  btnY:{background:"#FFD94D",color:"#3A2800",border:"none",borderRadius:"50px",padding:"13px 28px",fontSize:"14px",fontWeight:"800",cursor:"pointer",textDecoration:"none",fontFamily:"var(--font-body)"},
  btnW:{background:"rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.7)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:"50px",padding:"13px 24px",fontSize:"14px",fontWeight:"600",cursor:"pointer",fontFamily:"var(--font-body)",marginLeft:"10px"},
  label:{fontSize:"11px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"1.5px",color:"var(--blue-deep)",marginBottom:"6px"},
  h2:{fontFamily:"var(--font-display)",fontSize:"26px",fontWeight:"900",color:"var(--text-dark)",marginBottom:"6px"},
  grid:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"16px",marginTop:"20px"},
  card:{background:"white",borderRadius:"16px",border:"1.5px solid rgba(184,228,249,0.5)",overflow:"hidden",transition:"all .2s",cursor:"pointer"},
  cardImg:{height:"120px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"52px",background:"linear-gradient(135deg,#EEF8FF,#FFFDE8)"},
  cardBody:{padding:"12px 14px"},
  tag:{display:"inline-block",background:"#EEF8FF",color:"#185FA5",fontSize:"9px",fontWeight:"800",padding:"2px 8px",borderRadius:"50px",textTransform:"uppercase",marginBottom:"6px"},
  tagQ:{display:"inline-block",background:"#F0E8FF",color:"#5B3FA0",fontSize:"9px",fontWeight:"800",padding:"2px 8px",borderRadius:"50px",textTransform:"uppercase",marginBottom:"6px"},
  cardName:{fontFamily:"var(--font-display)",fontSize:"14px",fontWeight:"800",color:"var(--text-dark)",marginBottom:"4px"},
  cardDesc:{fontSize:"12px",color:"var(--text-mid)",lineHeight:"1.5",marginBottom:"8px"},
  cardPrice:{fontSize:"16px",fontWeight:"800",color:"var(--blue-deep)"},
  cta:{background:"linear-gradient(135deg,#1E2A3B,#2D4A6B)",borderRadius:"20px",padding:"32px",display:"flex",alignItems:"center",gap:"24px",marginTop:"24px"},
};

export default function PawStorePage() {
  const navigate = useNavigate();
  const normal = PRODUCTS.filter(p=>!p.quirky);
  const quirky = PRODUCTS.filter(p=>p.quirky);
  return (
    <main style={s.page}>
      <div style={s.banner}>
        <div>
          <div style={s.badge}>🐾 Support Us</div>
          <h1 style={s.title}>One of Our Paw<br/><span style={{color:"#6BC5ED"}}>by Furever</span></h1>
          <p style={s.desc}>ร้านของเราเอง! ทุกการซื้อช่วยสนับสนุน Furever และช่วยสัตว์เลี้ยงในเชียงใหม่</p>
          <a href="https://line.me" target="_blank" rel="noreferrer" style={s.btnY}>สั่งซื้อผ่าน LINE</a>
          <button style={s.btnW} onClick={()=>navigate(-1)}>🐾 กลับ</button>
        </div>
        <div style={{fontSize:"80px",opacity:"0.8"}}>🛍️🐾</div>
      </div>
      <div className="container">
        <div style={{marginBottom:"48px"}}>
          <div style={s.label}>ของขวัญและของใช้</div>
          <h2 style={s.h2}>สินค้าแนะนำ ✨</h2>
          <div style={s.grid}>
            {normal.map(p=>(
              <div key={p.id} style={s.card}>
                <div style={s.cardImg}>{p.emoji}</div>
                <div style={s.cardBody}>
                  {p.tag&&<span style={s.tag}>{p.tag}</span>}
                  <div style={s.cardName}>{p.name}</div>
                  <div style={s.cardDesc}>{p.desc}</div>
                  <div style={s.cardPrice}>{p.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{marginBottom:"48px"}}>
          <div style={s.label}>กุ๊กกิ๊ก สารพัด</div>
          <h2 style={s.h2}>ของสุดยูนีค 🎉</h2>
          <p style={{fontSize:"14px",color:"var(--text-mid)",marginBottom:"20px"}}>ของที่หาไม่ได้ที่ไหน เฉพาะที่ Furever เท่านั้น</p>
          <div style={s.grid}>
            {quirky.map(p=>(
              <div key={p.id} style={s.card}>
                <div style={s.cardImg}>{p.emoji}</div>
                <div style={s.cardBody}>
                  {p.tag&&<span style={s.tagQ}>{p.tag}</span>}
                  <div style={s.cardName}>{p.name}</div>
                  <div style={s.cardDesc}>{p.desc}</div>
                  <div style={s.cardPrice}>{p.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={s.cta}>
          <div style={{fontSize:"48px"}}>🐾</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:"var(--font-display)",fontSize:"20px",fontWeight:"900",color:"white",marginBottom:"6px"}}>สั่งซื้อง่ายๆ ผ่าน LINE</div>
            <div style={{fontSize:"13px",color:"rgba(255,255,255,0.7)"}}>ส่งรูปสินค้าที่ต้องการมาที่ LINE @furever แล้วเราจะดูแลทุกอย่างให้</div>
          </div>
          <a href="https://line.me" target="_blank" rel="noreferrer" style={s.btnY}>LINE: @furever</a>
        </div>
      </div>
    </main>
  );
}
