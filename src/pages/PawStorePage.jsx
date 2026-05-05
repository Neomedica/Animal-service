import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function PawStorePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [settings, setSettings] = useState({title:"One of Our Paw",subtitle:"by Furever",description:"ร้านของเราเอง! ทุกการซื้อช่วยสนับสนุน Furever และช่วยสัตว์เลี้ยงในเชียงใหม่",line_url:"https://line.me"});
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    async function load() {
      const [p,s] = await Promise.all([
        supabase.from("paw_products").select("*").eq("status","active").order("sort_order"),
        supabase.from("paw_store_settings").select("*").limit(1).single(),
      ]);
      if(p.data) setProducts(p.data);
      if(s.data) setSettings(s.data);
      setLoading(false);
    }
    load();
  }, []);

  function addToCart(product) {
    setCart(prev => {
      const exist = prev.find(i => i.id === product.id);
      if(exist) return prev.map(i => i.id === product.id ? {...i, qty: i.qty+1} : i);
      return [...prev, {...product, qty:1}];
    });
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(i => i.id !== id));
  }

  function updateQty(id, qty) {
    if(qty < 1) { removeFromCart(id); return; }
    setCart(prev => prev.map(i => i.id === id ? {...i, qty} : i));
  }

  function totalItems() { return cart.reduce((s,i) => s+i.qty, 0); }

  function totalPrice() {
    return cart.reduce((s,i) => {
      const num = Number(i.price.replace(/[^0-9.]/g,""));
      return s + (num * i.qty);
    }, 0);
  }

  function orderViaLine() {
    const lines = cart.map(i => `${i.emoji} ${i.name} x${i.qty} = ${i.price}`).join("%0A");
    const total = totalPrice();
    const msg = `🛍️ สั่งซื้อสินค้า One of Our Paw by Furever%0A%0A${lines}%0A%0A💰 รวมทั้งหมด ฿${total.toLocaleString()}%0A%0Aกรุณายืนยันออเดอร์ด้วยนะคะ 🐾`;
    const lineUrl = settings.line_url || "https://line.me";
    const lineId = lineUrl.includes("@") ? lineUrl.split("@").pop() : "";
    if(lineId) window.open(`https://line.me/ti/p/@${lineId}?text=${msg}`, "_blank");
    else window.open(`${lineUrl}?text=${msg}`, "_blank");
  }

  const normal = products.filter(p => !p.is_quirky);
  const quirky = products.filter(p => p.is_quirky);

  const btnY = {background:"#FFD94D",color:"#3A2800",border:"none",borderRadius:"50px",padding:"10px 20px",fontSize:"13px",fontWeight:"800",cursor:"pointer",fontFamily:"var(--font-body)",whiteSpace:"nowrap"};
  const grid = {display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"16px",marginTop:"20px"};

  if(loading) return <div style={{padding:"80px",textAlign:"center",fontSize:"48px"}}>🐾</div>;

  return (
    <main style={{padding:"0 0 80px"}}>
      <div style={{background:"linear-gradient(135deg,#1E2A3B,#2D4A6B)",padding:"60px 80px",display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"48px"}}>
        <div>
          <div style={{display:"inline-block",background:"#FFD94D",color:"#7A5C00",fontSize:"12px",fontWeight:"800",padding:"5px 14px",borderRadius:"50px",marginBottom:"16px"}}>🐾 Support Us</div>
          <h1 style={{fontFamily:"var(--font-display)",fontSize:"42px",fontWeight:"900",color:"white",lineHeight:"1.2",marginBottom:"14px"}}>{settings.title}<br/><span style={{color:"#6BC5ED"}}>{settings.subtitle}</span></h1>
          <p style={{fontSize:"15px",color:"rgba(255,255,255,0.7)",lineHeight:"1.7",marginBottom:"24px"}}>{settings.description}</p>
          <button style={{...btnY,padding:"13px 28px",fontSize:"14px"}} onClick={()=>setShowCart(true)}>🛒 ตะกร้า {totalItems()>0&&`(${totalItems()})`}</button>
          <button style={{background:"rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.7)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:"50px",padding:"13px 24px",fontSize:"14px",fontWeight:"600",cursor:"pointer",fontFamily:"var(--font-body)",marginLeft:"10px"}} onClick={()=>navigate(-1)}>🐾 กลับ</button>
        </div>
        <div style={{fontSize:"80px",opacity:"0.8"}}>🛍️🐾</div>
      </div>

      <div className="container">
        {normal.length>0&&(
          <div style={{marginBottom:"48px"}}>
            <div style={{fontSize:"11px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"1.5px",color:"var(--blue-deep)",marginBottom:"6px"}}>ของขวัญและของใช้</div>
            <h2 style={{fontFamily:"var(--font-display)",fontSize:"26px",fontWeight:"900",color:"var(--text-dark)",marginBottom:"20px"}}>สินค้าแนะนำ ✨</h2>
            <div style={grid}>
              {normal.map(p=>(
                <div key={p.id} style={{background:"white",borderRadius:"16px",border:"1.5px solid rgba(184,228,249,0.5)",overflow:"hidden"}}>
                  <div style={{height:"120px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"52px",background:"linear-gradient(135deg,#EEF8FF,#FFFDE8)"}}>
                    {p.image_url?<img src={p.image_url} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span>{p.emoji}</span>}
                  </div>
                  <div style={{padding:"12px 14px"}}>
                    {p.tag&&<span style={{display:"inline-block",background:"#EEF8FF",color:"#185FA5",fontSize:"9px",fontWeight:"800",padding:"2px 8px",borderRadius:"50px",marginBottom:"6px"}}>{p.tag}</span>}
                    <div style={{fontFamily:"var(--font-display)",fontSize:"14px",fontWeight:"800",color:"var(--text-dark)",marginBottom:"4px"}}>{p.name}</div>
                    <div style={{fontSize:"12px",color:"var(--text-mid)",lineHeight:"1.5",marginBottom:"8px"}}>{p.description}</div>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <div style={{fontSize:"16px",fontWeight:"800",color:"var(--blue-deep)"}}>{p.price}</div>
                      <button onClick={()=>addToCart(p)} style={{background:"var(--blue-deep)",color:"white",border:"none",borderRadius:"50px",padding:"5px 12px",fontSize:"12px",fontWeight:"700",cursor:"pointer",fontFamily:"var(--font-body)"}>{cart.find(i=>i.id===p.id)?.qty>0?`✓ ${cart.find(i=>i.id===p.id).qty} ชิ้น`:"+ ใส่ตะกร้า"}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {quirky.length>0&&(
          <div style={{marginBottom:"48px"}}>
            <div style={{fontSize:"11px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"1.5px",color:"var(--blue-deep)",marginBottom:"6px"}}>กุ๊กกิ๊ก สารพัด</div>
            <h2 style={{fontFamily:"var(--font-display)",fontSize:"26px",fontWeight:"900",color:"var(--text-dark)",marginBottom:"6px"}}>ของสุดยูนีค 🎉</h2>
            <p style={{fontSize:"14px",color:"var(--text-mid)",marginBottom:"20px"}}>ของที่หาไม่ได้ที่ไหน เฉพาะที่ Furever เท่านั้น</p>
            <div style={grid}>
              {quirky.map(p=>(
                <div key={p.id} style={{background:"white",borderRadius:"16px",border:"1.5px solid rgba(184,228,249,0.5)",overflow:"hidden"}}>
                  <div style={{height:"120px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"52px",background:"linear-gradient(135deg,#F0E8FF,#FFFDE8)"}}>
                    {p.image_url?<img src={p.image_url} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span>{p.emoji}</span>}
                  </div>
                  <div style={{padding:"12px 14px"}}>
                    {p.tag&&<span style={{display:"inline-block",background:"#F0E8FF",color:"#5B3FA0",fontSize:"9px",fontWeight:"800",padding:"2px 8px",borderRadius:"50px",marginBottom:"6px"}}>{p.tag}</span>}
                    <div style={{fontFamily:"var(--font-display)",fontSize:"14px",fontWeight:"800",color:"var(--text-dark)",marginBottom:"4px"}}>{p.name}</div>
                    <div style={{fontSize:"12px",color:"var(--text-mid)",lineHeight:"1.5",marginBottom:"8px"}}>{p.description}</div>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <div style={{fontSize:"16px",fontWeight:"800",color:"var(--blue-deep)"}}>{p.price}</div>
                      <button onClick={()=>addToCart(p)} style={{background:"#5B3FA0",color:"white",border:"none",borderRadius:"50px",padding:"5px 12px",fontSize:"12px",fontWeight:"700",cursor:"pointer",fontFamily:"var(--font-body)"}>{cart.find(i=>i.id===p.id)?.qty>0?`✓ ${cart.find(i=>i.id===p.id).qty} ชิ้น`:"+ ใส่ตะกร้า"}</button>
                    </div>
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
            <div style={{fontSize:"13px",color:"rgba(255,255,255,0.7)"}}>ใส่สินค้าลงตะกร้า แล้วกดสั่งซื้อ ระบบจะส่งรายการให้อัตโนมัติ</div>
          </div>
          <button onClick={()=>setShowCart(true)} style={{...btnY,padding:"13px 28px",fontSize:"14px"}}>🛒 ดูตะกร้า</button>
        </div>
      </div>

      {/* ไอคอนตะกร้าลอย */}
      {totalItems()>0&&(
        <div onClick={()=>setShowCart(true)} style={{position:"fixed",bottom:"32px",right:"32px",background:"var(--blue-deep)",color:"white",borderRadius:"50px",padding:"14px 20px",fontSize:"16px",fontWeight:"800",cursor:"pointer",boxShadow:"0 4px 20px rgba(58,168,216,0.4)",zIndex:100,display:"flex",alignItems:"center",gap:"8px"}}>
          🛒 <span>{totalItems()}</span>
        </div>
      )}

      {/* Modal ตะกร้า */}
      {showCart&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={()=>setShowCart(false)}>
          <div style={{background:"white",borderRadius:"20px 20px 0 0",width:"100%",maxWidth:"500px",padding:"24px",maxHeight:"80vh",overflow:"auto"}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"}}>
              <h3 style={{fontFamily:"var(--font-display)",fontSize:"20px",fontWeight:"900",color:"var(--text-dark)"}}>🛒 ตะกร้าสินค้า</h3>
              <button onClick={()=>setShowCart(false)} style={{background:"none",border:"none",fontSize:"20px",cursor:"pointer"}}>✕</button>
            </div>
            {cart.length===0?(
              <div style={{textAlign:"center",padding:"40px",color:"var(--text-mid)"}}>
                <div style={{fontSize:"48px",marginBottom:"12px"}}>🛒</div>
                <div>ยังไม่มีสินค้าในตะกร้า</div>
              </div>
            ):(
              <>
                {cart.map(item=>(
                  <div key={item.id} style={{display:"flex",alignItems:"center",gap:"12px",padding:"12px 0",borderBottom:"1px solid #F0F4F8"}}>
                    <div style={{fontSize:"32px"}}>{item.emoji}</div>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:"700",fontSize:"14px",color:"var(--text-dark)"}}>{item.name}</div>
                      <div style={{fontSize:"13px",color:"var(--blue-deep)",fontWeight:"800"}}>{item.price}</div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                      <button onClick={()=>updateQty(item.id,item.qty-1)} style={{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid #D5E3EE",background:"white",cursor:"pointer",fontSize:"16px",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                      <span style={{fontWeight:"700",minWidth:"20px",textAlign:"center"}}>{item.qty}</span>
                      <button onClick={()=>updateQty(item.id,item.qty+1)} style={{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid #D5E3EE",background:"white",cursor:"pointer",fontSize:"16px",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                    </div>
                  </div>
                ))}
                <div style={{paddingTop:"16px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:"16px"}}>
                    <span style={{fontWeight:"700",color:"var(--text-dark)"}}>รวมทั้งหมด</span>
                    <span style={{fontFamily:"var(--font-display)",fontSize:"20px",fontWeight:"900",color:"var(--blue-deep)"}}>฿{totalPrice().toLocaleString()}</span>
                  </div>
                  <button onClick={orderViaLine} style={{...btnY,width:"100%",padding:"14px",fontSize:"15px",textAlign:"center"}}>💬 สั่งซื้อผ่าน LINE</button>
                  <button onClick={()=>setCart([])} style={{width:"100%",padding:"10px",marginTop:"8px",background:"none",border:"none",color:"var(--text-light)",fontSize:"13px",cursor:"pointer"}}>ล้างตะกร้า</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
