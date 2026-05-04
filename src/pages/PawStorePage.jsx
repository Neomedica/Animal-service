import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
export default function PawStorePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [settings, setSettings] = useState({title:"One of Our Paw",subtitle:"by Furever",description:"ร้านของเราเอง! ทุกการซื้อช่วยสนับสนุน Furever และช่วยสัตว์เลี้ยงในเชียงใหม่",line_url:"https://line.me"});
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    async function load(){
      const [p,s]=await Promise.all([
        supabase.from("paw_products").select("*").eq("status","active").order("sort_order"),
        supabase.from("paw_store_settings").select("*").limit(1).single(),
      ]);
      if(p.data)setProducts(p.data);
      if(s.data)setSettings(s.data);
      setLoading(false);
    }
    load();
  },[]);
  const normal=products.filter(p=>!p.is_quirky);
  const quirky=products.filter(p=>p.is_quirky);
  const btnY={background:"#FFD94D",color:"#3A2800",border:"none",borderRadius:"50px",padding:"13px 28px",fontSize:"14px",fontWeight:"800",cursor:"pointer",textDecoration:"none",fontFamily:"var(--font-body)"};
  const btnW={background:"rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.7)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:"50px",padding:"13px 24px",fontSize:"14px",fontWeight:"600",cursor:"pointer",fontFamily:"var(--font-body)",marginLeft:"10px"};
  const grid={display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"16px",marginTop:"20px"};
  const card={background:"white",borderRadius:"16px",border:"1.5px solid rgba(184,228,249,0.5)",overflow:"hidden",cursor:"pointer"};
  if(loading)return <div style={{padding:"80px",textAlign:"center",fontSize:"48px"}}>🐾</div>;
  return(
    <main style={{padding:"0 0 80px"}}>
      <div style={{background:"linear-gradient(135deg,#1E2A3B,#2D4A6B)",padding:"60px 80px",display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"48px"}}>
        <div>
          <div style={{display:"inline-block",background:"#FFD94D",color:"#7A5C00",fontSize:"12px",fontWeight:"800",padding:"5px 14px",borderRadius:"50px",marginBottom:"16px"}}>🐾 Support Us</div>
          <h1 style={{fontFamily:"var(--font-display)",fontSize:"42px",fontWeight:"900",color:"white",lineHeight:"1.2",marginBottom:"14px"}}>{settings.title}<br/><span style={{color:"#6BC5ED"}}>{settings.subtitle}</span></h1>
          <p style={{fontSize:"15px",color:"rgba(255,255,255,0.7)",lineHeight:"1.7",marginBottom:"24px"}}>{settings.description}</p>
          <a href={settings.line_url} target="_blank" rel="noreferrer" style={btnY}>สั่งซื้อผ่าน LINE</a>
          <button style={btnW} onClick={()=>navigate(-1)}>🐾 กลับ</button>
        </div>
        <div style={{fontSize:"80px",opacity:"0.8"}}>🛍️🐾</div>
      </div>
      <div className="container">
        {normal.length>0&&(
          <div style={{marginBottom:"48px"}}>
            <div style={{fontSize:"11px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"1.5px",color:"var(--blue-deep)",marginBottom:"6px"}}>ของขวัญและของใช้</div>
            <h2 style={{fontFamily:"var(--font-display)",fontSize:"26px",fontWeight:"900",color:"var(--text-dark)",marginBottom:"20px"}}>สินค้าแนะนำ</h2>
            <div style={grid}>
              {normal.map(p=>(
                <div key={p.id} style={card}>
                  <div style={{height:"120px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"52px",background:"linear-gradient(135deg,#EEF8FF,#FFFDE8)"}}>
                    {p.image_url?<img src={p.image_url} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span>{p.emoji}</span>}
                  </div>
                  <div style={{padding:"12px 14px"}}>
                    {p.tag&&<span style={{display:"inline-block",background:"#EEF8FF",color:"#185FA5",fontSize:"9px",fontWeight:"800",padding:"2px 8px",borderRadius:"50px",marginBottom:"6px"}}>{p.tag}</span>}
                    <div style={{fontFamily:"var(--font-display)",fontSize:"14px",fontWeight:"800",color:"var(--text-dark)",marginBottom:"4px"}}>{p.name}</div>
                    <div style={{fontSize:"12px",color:"var(--text-mid)",lineHeight:"1.5",marginBottom:"8px"}}>{p.description}</div>
                    <div style={{fontSize:"16px",fontWeight:"800",color:"var(--blue-deep)"}}>{p.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {quirky.length>0&&(
          <div style={{marginBottom:"48px"}}>
            <div style={{fontSize:"11px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"1.5px",color:"var(--blue-deep)",marginBottom:"6px"}}>กุ๊กกิ๊ก สารพัด</div>
            <h2 style={{fontFamily:"var(--font-display)",fontSize:"26px",fontWeight:"900",color:"var(--text-dark)",marginBottom:"6px"}}>ของสุดยูนีค</h2>
            <p style={{fontSize:"14px",color:"var(--text-mid)",marginBottom:"20px"}}>ของที่หาไม่ได้ที่ไหน เฉพาะที่ Furever เท่านั้น</p>
            <div style={grid}>
              {quirky.map(p=>(
                <div key={p.id} style={card}>
                  <div style={{height:"120px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"52px",background:"linear-gradient(135deg,#F0E8FF,#FFFDE8)"}}>
                    {p.image_url?<img src={p.image_url} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span>{p.emoji}</span>}
                  </div>
                  <div style={{padding:"12px 14px"}}>
                    {p.tag&&<span style={{display:"inline-block",background:"#F0E8FF",color:"#5B3FA0",fontSize:"9px",fontWeight:"800",padding:"2px 8px",borderRadius:"50px",marginBottom:"6px"}}>{p.tag}</span>}
                    <div style={{fontFamily:"var(--font-display)",fontSize:"14px",fontWeight:"800",color:"var(--text-dark)",marginBottom:"4px"}}>{p.name}</div>
                    <div style={{fontSize:"12px",color:"var(--text-mid)",lineHeight:"1.5",marginBottom:"8px"}}>{p.description}</div>
                    <div style={{fontSize:"16px",fontWeight:"800",color:"var(--blue-deep)"}}>{p.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div style={{background:"linear-gradient(135deg,#1E2A3B,#2D4A6B)",borderRadius:"20px",padding:"32px",display:"flex",alignItems:"center",gap:"24px"}}>
          <div style={{fontSize:"48px"}}>🐾</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:"var(--font-display)",fontSize:"20px",fontWeight:"900",color:"white",marginBottom:"6px"}}>สั่งซื้อง่ายๆ ผ่าน LINE</div>
            <div style={{fontSize:"13px",color:"rgba(255,255,255,0.7)"}}>ส่งรูปสินค้าที่ต้องการมาที่ LINE แล้วเราจะดูแลทุกอย่างให้</div>
          </div>
          <a href={settings.line_url} target="_blank" rel="noreferrer" style={btnY}>LINE: @furever</a>
        </div>
      </div>
    </main>
  );
}
