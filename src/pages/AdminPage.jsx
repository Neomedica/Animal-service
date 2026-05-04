import React, { useState, useRef } from "react";
import { supabase } from "../lib/supabase";
import styles from "./AdminPage.module.css";
const PW = "furever2568";
const BCATS = ["ข่าว Furever","คลินิก","ฝากเลี้ยง","กรูมมิ่ง","อาหารสัตว์","โรงแรม"];
const CC = {"ข่าว Furever":{c:"#854F0B",b:"#FAEEDA"},"คลินิก":{c:"#185FA5",b:"#E6F1FB"},"ฝากเลี้ยง":{c:"#0F6E56",b:"#E1F5EE"},"กรูมมิ่ง":{c:"#3B6D11",b:"#EAF3DE"},"อาหารสัตว์":{c:"#712B13",b:"#FAECE7"},"โรงแรม":{c:"#5B3FA0",b:"#F0EBFF"}};
const EB = {title:"",excerpt:"",content:"",category:"ข่าว Furever",emoji:"📝",image_url:"",link_url:"",link_label:"",slug:"",is_hot:false,read_min:3,published_date:"",status:"active"};
const ES = {name:"",category:"clinic",address:"",phone:"",line_id:"",description:"",price_from:0,plan:"free",status:"active",emoji:"🏪",rating:0,hours:"09:00-18:00",parking:false,is_verified:false,image_url:""};
const EP = {name:"",type:"",age:"",emoji:"🐾",bg:"#FFF0A0",badge:"สุขภาพดี",status:"active",history:"",contact:"LINE: @furever_adopt",image_url:""};
export default function AdminPage() {
  const [ok,setOk]=useState(false);
  const [pw,setPw]=useState("");
  const [err,setErr]=useState(false);
  const [tab,setTab]=useState("blog");
  const [posts,setPosts]=useState([]);
  const [shops,setShops]=useState([]);
  const [pets,setPets]=useState([]);
  const [partners,setPartners]=useState([]);
  const [founders,setFounders]=useState([]);
  const [editB,setEditB]=useState(null);
  const [editS,setEditS]=useState(null);
  const [editP,setEditP]=useState(null);
  const [formB,setFormB]=useState(EB);
  const [formS,setFormS]=useState(ES);
  const [formP,setFormP]=useState(EP);
  const [uploading,setUploading]=useState(false);
  const [saving,setSaving]=useState(false);
  const [msg,setMsg]=useState("");
  const refB=useRef();
  const refS=useRef();
  const refP=useRef();

  function login(){if(pw===PW){setOk(true);load();}else setErr(true);}

  async function load(){
    const [b,s,p,pa,f]=await Promise.all([
      supabase.from("blog_posts").select("*").order("created_at",{ascending:false}),
      supabase.from("shops").select("*").order("created_at",{ascending:false}),
      supabase.from("pets").select("*").order("created_at",{ascending:false}),
      supabase.from("partners").select("*").order("created_at",{ascending:false}),
      supabase.from("founders").select("*").order("sort_order"),
    ]);
    if(b.data)setPosts(b.data);
    if(s.data)setShops(s.data);
    if(p.data)setPets(p.data);
    if(pa.data)setPartners(pa.data);
    if(f.data)setFounders(f.data);
  }

  function toast(m){setMsg(m);setTimeout(()=>setMsg(""),3000);}

  async function uploadImg(file,onDone){
    if(!file)return;
    setUploading(true);
    const path=Date.now()+"."+file.name.split(".").pop();
    const {error}=await supabase.storage.from("blog-images").upload(path,file);
    if(!error){const {data}=supabase.storage.from("blog-images").getPublicUrl(path);onDone(data.publicUrl);toast("อัปโหลดสำเร็จ");}
    setUploading(false);
  }

  async function saveB(){
    setSaving(true);
    const cat=CC[formB.category]||CC["ข่าว Furever"];
    const slug=formB.slug||formB.title.toLowerCase().replace(/\s+/g,"-").replace(/[^\w-]/g,"");
    const d={...formB,slug,category_color:cat.c,category_bg:cat.b};
    if(editB==="new")await supabase.from("blog_posts").insert(d);
    else await supabase.from("blog_posts").update(d).eq("id",editB);
    await load();setEditB(null);setSaving(false);toast("บันทึก Blog สำเร็จ");
  }

  async function saveS(){
    setSaving(true);
    if(editS==="new")await supabase.from("shops").insert(formS);
    else await supabase.from("shops").update(formS).eq("id",editS);
    await load();setEditS(null);setSaving(false);toast("บันทึกร้านค้าสำเร็จ");
  }

  async function saveP(){
    setSaving(true);
    if(editP==="new")await supabase.from("pets").insert(formP);
    else await supabase.from("pets").update(formP).eq("id",editP);
    await load();setEditP(null);setSaving(false);toast("บันทึกสัตว์สำเร็จ");
  }

  async function delB(id){if(!window.confirm("ลบ?"))return;await supabase.from("blog_posts").delete().eq("id",id);await load();toast("ลบแล้ว");}
  async function delS(id){if(!window.confirm("ลบ?"))return;await supabase.from("shops").delete().eq("id",id);await load();toast("ลบแล้ว");}
  async function delP(id){if(!window.confirm("ลบ?"))return;await supabase.from("pets").delete().eq("id",id);await load();toast("ลบแล้ว");}
  async function upStatus(t,id,st,set){await supabase.from(t).update({status:st}).eq("id",id);set(p=>p.map(x=>x.id===id?{...x,status:st}:x));toast("อัปเดตแล้ว");}
  async function delRow(t,id,set){if(!window.confirm("ลบ?"))return;await supabase.from(t).delete().eq("id",id);set(p=>p.filter(x=>x.id!==id));toast("ลบแล้ว");}
  if(!ok)return(
    <div className={styles.loginWrap}>
      <div className={styles.loginCard}>
        <div className={styles.loginEmoji}>🔐</div>
        <h2 className={styles.loginTitle}>Furever Admin</h2>
        <input type="password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} className={styles.loginInput} placeholder="รหัสผ่าน..."/>
        {err&&<div className={styles.errorMsg}>รหัสผ่านไม่ถูกต้อง</div>}
        <button className={styles.loginBtn} onClick={login}>เข้าสู่ระบบ →</button>
        <div className={styles.loginHint}>รหัส: furever2568</div>
      </div>
    </div>
  );
  return(
    <div className={styles.admin}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarLogo}><div className={styles.logoText}>Fur<span>ever</span></div><div className={styles.logoSub}>Admin</div></div>
        {[{id:"blog",icon:"📝",label:"Blog"},{id:"shops",icon:"🏪",label:"ร้านค้า"},{id:"pets",icon:"🐾",label:"สัตว์หาบ้าน"},{id:"partners",icon:"🤝",label:"พาร์ทเนอร์"},{id:"founders",icon:"👥",label:"Founders"}].map(t=>(
          <div key={t.id} className={styles.navItem+(tab===t.id?" "+styles.navActive:"")} onClick={()=>setTab(t.id)}>
            <span>{t.icon}</span>{t.label}
          </div>
        ))}
        <div className={styles.sidebarBottom}><button className={styles.logoutBtn} onClick={()=>setOk(false)}>ออกจากระบบ</button></div>
      </div>
      <div className={styles.main}>
        {msg&&<div className={styles.toast}>{msg}</div>}
        {tab==="blog"&&(<>
          {editB?(
            <div className={styles.formCard}>
              <div className={styles.formHeader}><div className={styles.formTitle}>{editB==="new"?"เพิ่มบทความ":"แก้ไขบทความ"}</div><button className={styles.btnCancel} onClick={()=>setEditB(null)}>← กลับ</button></div>
              <div className={styles.formGrid}>
                <div className={styles.field+" "+styles.fullCol}><label>หัวข้อ *</label><input value={formB.title} onChange={e=>setFormB({...formB,title:e.target.value})} placeholder="หัวข้อ..."/></div>
                <div className={styles.field}><label>หมวดหมู่</label><select value={formB.category} onChange={e=>setFormB({...formB,category:e.target.value})}>{BCATS.map(c=><option key={c}>{c}</option>)}</select></div>
                <div className={styles.field}><label>Emoji</label><input value={formB.emoji} onChange={e=>setFormB({...formB,emoji:e.target.value})}/></div>
                <div className={styles.field}><label>เวลาอ่าน (นาที)</label><input type="number" value={formB.read_min} onChange={e=>setFormB({...formB,read_min:Number(e.target.value)})}/></div>
                <div className={styles.field}><label>วันที่</label><input value={formB.published_date} onChange={e=>setFormB({...formB,published_date:e.target.value})} placeholder="1 พ.ค. 2568"/></div>
                <div className={styles.field+" "+styles.fullCol}><label>สรุปย่อ</label><textarea rows={2} value={formB.excerpt} onChange={e=>setFormB({...formB,excerpt:e.target.value})}/></div>
                <div className={styles.field+" "+styles.fullCol}><label>เนื้อหา</label><textarea rows={5} value={formB.content} onChange={e=>setFormB({...formB,content:e.target.value})}/></div>
                <div className={styles.field+" "+styles.fullCol}><label>รูปภาพ</label><div className={styles.uploadRow}><input value={formB.image_url} onChange={e=>setFormB({...formB,image_url:e.target.value})} placeholder="URL รูป..."/><button className={styles.btnUpload} onClick={()=>refB.current.click()} disabled={uploading}>{uploading?"⏳":"📤"}</button><input ref={refB} type="file" accept="image/*" style={{display:"none"}} onChange={e=>uploadImg(e.target.files[0],url=>setFormB(f=>({...f,image_url:url})))}/></div>{formB.image_url&&<img src={formB.image_url} alt="" className={styles.imgPreview}/>}</div>
                <div className={styles.field}><label>ลิ้งก์</label><input value={formB.link_url} onChange={e=>setFormB({...formB,link_url:e.target.value})} placeholder="https://..."/></div>
                <div className={styles.field}><label>ชื่อปุ่ม</label><input value={formB.link_label} onChange={e=>setFormB({...formB,link_label:e.target.value})}/></div>
                <div className={styles.field}><label style={{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"}}><input type="checkbox" checked={formB.is_hot} onChange={e=>setFormB({...formB,is_hot:e.target.checked})}/>🔥 Hot</label></div>
              </div>
              <div className={styles.formActions}><button className={styles.btnSave} onClick={saveB} disabled={!formB.title||saving}>{saving?"กำลังบันทึก...":"💾 บันทึก"}</button><button className={styles.btnCancel} onClick={()=>setEditB(null)}>ยกเลิก</button></div>
            </div>
          ):(
            <div className={styles.sectionCard}>
              <div className={styles.sectionHeader}><div className={styles.pageTitle}>📝 Blog ({posts.length})</div><button className={styles.btnAdd} onClick={()=>{setEditB("new");setFormB(EB);}}>+ เพิ่มบทความ</button></div>
              <div className={styles.blogList}>{posts.map(p=>(<div key={p.id} className={styles.blogRow}><div className={styles.blogRowEmoji}>{p.emoji}</div><div className={styles.blogRowInfo}><div className={styles.blogRowTitle}>{p.title}{p.is_hot&&" 🔥"}</div><div className={styles.blogRowMeta}><span style={{color:p.category_color,background:p.category_bg,padding:"2px 8px",borderRadius:"50px",fontSize:"10px",fontWeight:"700"}}>{p.category}</span> {p.published_date}{p.image_url&&" 📷"}{p.link_url&&" 🔗"}</div></div><div className={styles.actions}><button className={styles.btnSm+" "+styles.btnEdit} onClick={()=>{setEditB(p.id);setFormB({...EB,...p});}}>✏️</button><button className={styles.btnSm+" "+styles.btnDelete} onClick={()=>delB(p.id)}>🗑</button></div></div>))}{posts.length===0&&<div className={styles.empty}>ยังไม่มีบทความ</div>}</div>
            </div>
          )}
        </>)}
        {tab==="shops"&&(<>
          {editS?(
            <div className={styles.formCard}>
              <div className={styles.formHeader}><div className={styles.formTitle}>{editS==="new"?"เพิ่มร้านค้า":"แก้ไขร้านค้า"}</div><button className={styles.btnCancel} onClick={()=>setEditS(null)}>← กลับ</button></div>
              <div className={styles.formGrid}>
                <div className={styles.field+" "+styles.fullCol}><label>ชื่อร้าน *</label><input value={formS.name} onChange={e=>setFormS({...formS,name:e.target.value})} placeholder="ชื่อร้าน..."/></div>
                <div className={styles.field}><label>ประเภท</label><select value={formS.category} onChange={e=>setFormS({...formS,category:e.target.value})}><option value="clinic">คลินิก</option><option value="boarding">ฝากเลี้ยง</option><option value="grooming">กรูมมิ่ง</option><option value="hotel">โรงแรม</option><option value="food">อาหาร</option><option value="other">อื่นๆ</option></select></div>
                <div className={styles.field}><label>แพ็กเกจ</label><select value={formS.plan} onChange={e=>setFormS({...formS,plan:e.target.value})}><option value="free">Free</option><option value="basic">Basic</option><option value="sponsored">Sponsored</option></select></div>
                <div className={styles.field+" "+styles.fullCol}><label>ที่อยู่</label><input value={formS.address} onChange={e=>setFormS({...formS,address:e.target.value})} placeholder="ที่อยู่ร้าน..."/></div>
                <div className={styles.field}><label>เบอร์โทร</label><input value={formS.phone} onChange={e=>setFormS({...formS,phone:e.target.value})} placeholder="0XX-XXX-XXXX"/></div>
                <div className={styles.field}><label>LINE ID</label><input value={formS.line_id} onChange={e=>setFormS({...formS,line_id:e.target.value})} placeholder="@shop"/></div>
                <div className={styles.field}><label>ราคาเริ่มต้น (฿)</label><input type="number" value={formS.price_from} onChange={e=>setFormS({...formS,price_from:Number(e.target.value)})}/></div>
                <div className={styles.field}><label>เวลาทำการ</label><input value={formS.hours} onChange={e=>setFormS({...formS,hours:e.target.value})} placeholder="09:00-18:00"/></div>
                <div className={styles.field+" "+styles.fullCol}><label>รายละเอียด</label><textarea rows={3} value={formS.description} onChange={e=>setFormS({...formS,description:e.target.value})}/></div>
                <div className={styles.field+" "+styles.fullCol}><label>รูปภาพ</label><div className={styles.uploadRow}><input value={formS.image_url||""} onChange={e=>setFormS({...formS,image_url:e.target.value})} placeholder="URL รูป..."/><button className={styles.btnUpload} onClick={()=>refS.current.click()} disabled={uploading}>{uploading?"⏳":"📤"}</button><input ref={refS} type="file" accept="image/*" style={{display:"none"}} onChange={e=>uploadImg(e.target.files[0],url=>setFormS(f=>({...f,image_url:url})))}/></div>{formS.image_url&&<img src={formS.image_url} alt="" className={styles.imgPreview}/>}</div>
                <div className={styles.field}><label style={{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"}}><input type="checkbox" checked={formS.parking} onChange={e=>setFormS({...formS,parking:e.target.checked})}/>มีที่จอดรถ</label></div>
                <div className={styles.field}><label style={{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"}}><input type="checkbox" checked={formS.is_verified} onChange={e=>setFormS({...formS,is_verified:e.target.checked})}/>✅ Verified</label></div>
                <div className={styles.field}><label>สถานะ</label><select value={formS.status} onChange={e=>setFormS({...formS,status:e.target.value})}><option value="active">อนุมัติ</option><option value="pending">รออนุมัติ</option><option value="rejected">ระงับ</option></select></div>
              </div>
              <div className={styles.formActions}><button className={styles.btnSave} onClick={saveS} disabled={!formS.name||saving}>{saving?"กำลังบันทึก...":"💾 บันทึก"}</button><button className={styles.btnCancel} onClick={()=>setEditS(null)}>ยกเลิก</button></div>
            </div>
          ):(
            <div className={styles.sectionCard}>
              <div className={styles.sectionHeader}><div className={styles.pageTitle}>🏪 ร้านค้า ({shops.length})</div><button className={styles.btnAdd} onClick={()=>{setEditS("new");setFormS(ES);}}>+ เพิ่มร้านค้า</button></div>
              <table className={styles.table}><thead><tr><th>ร้านค้า</th><th>ประเภท</th><th>แพ็กเกจ</th><th>สถานะ</th><th>Action</th></tr></thead><tbody>{shops.map(s=>(<tr key={s.id}><td><strong>{s.name}</strong><br/><span className={styles.meta}>{s.address}</span></td><td>{s.category}</td><td><span className={styles.badge}>{s.plan}</span></td><td><span className={styles.badge}>{s.status==="active"?"อนุมัติ":s.status==="pending"?"รออนุมัติ":"ระงับ"}</span></td><td><div className={styles.actions}><button className={styles.btnSm+" "+styles.btnEdit} onClick={()=>{setEditS(s.id);setFormS({...ES,...s});}}>✏️ แก้ไข</button><button className={styles.btnSm+" "+styles.btnDelete} onClick={()=>delS(s.id)}>🗑</button></div></td></tr>))}</tbody></table>
            </div>
          )}
        </>)}
        {tab==="pets"&&(<>
          {editP?(
            <div className={styles.formCard}>
              <div className={styles.formHeader}><div className={styles.formTitle}>{editP==="new"?"เพิ่มสัตว์":"แก้ไขสัตว์"}</div><button className={styles.btnCancel} onClick={()=>setEditP(null)}>← กลับ</button></div>
              <div className={styles.formGrid}>
                <div className={styles.field}><label>ชื่อ *</label><input value={formP.name} onChange={e=>setFormP({...formP,name:e.target.value})} placeholder="ชื่อน้อง..."/></div>
                <div className={styles.field}><label>Emoji</label><input value={formP.emoji} onChange={e=>setFormP({...formP,emoji:e.target.value})}/></div>
                <div className={styles.field}><label>ประเภท</label><input value={formP.type} onChange={e=>setFormP({...formP,type:e.target.value})} placeholder="แมวเมีย / สุนัขผสม..."/></div>
                <div className={styles.field}><label>อายุ</label><input value={formP.age} onChange={e=>setFormP({...formP,age:e.target.value})} placeholder="1 ปี / 8 เดือน..."/></div>
                <div className={styles.field}><label>ป้าย</label><select value={formP.badge} onChange={e=>setFormP({...formP,badge:e.target.value})}><option>สุขภาพดี</option><option>ฉีดวัคซีนแล้ว</option><option>ทำหมันแล้ว</option></select></div>
                <div className={styles.field}><label>ติดต่อ</label><input value={formP.contact} onChange={e=>setFormP({...formP,contact:e.target.value})} placeholder="LINE: @furever_adopt"/></div>
                <div className={styles.field+" "+styles.fullCol}><label>ประวัติ</label><textarea rows={2} value={formP.history} onChange={e=>setFormP({...formP,history:e.target.value})}/></div>
                <div className={styles.field+" "+styles.fullCol}><label>รูปภาพ</label><div className={styles.uploadRow}><input value={formP.image_url||""} onChange={e=>setFormP({...formP,image_url:e.target.value})} placeholder="URL รูป..."/><button className={styles.btnUpload} onClick={()=>refP.current.click()} disabled={uploading}>{uploading?"⏳":"📤"}</button><input ref={refP} type="file" accept="image/*" style={{display:"none"}} onChange={e=>uploadImg(e.target.files[0],url=>setFormP(f=>({...f,image_url:url})))}/></div>{formP.image_url&&<img src={formP.image_url} alt="" className={styles.imgPreview}/>}</div>
                <div className={styles.field}><label>สถานะ</label><select value={formP.status} onChange={e=>setFormP({...formP,status:e.target.value})}><option value="active">แสดงอยู่</option><option value="hidden">ซ่อน</option></select></div>
              </div>
              <div className={styles.formActions}><button className={styles.btnSave} onClick={saveP} disabled={!formP.name||saving}>{saving?"กำลังบันทึก...":"💾 บันทึก"}</button><button className={styles.btnCancel} onClick={()=>setEditP(null)}>ยกเลิก</button></div>
            </div>
          ):(
            <div className={styles.sectionCard}>
              <div className={styles.sectionHeader}><div className={styles.pageTitle}>🐾 สัตว์หาบ้าน ({pets.length})</div><button className={styles.btnAdd} onClick={()=>{setEditP("new");setFormP(EP);}}>+ เพิ่มสัตว์</button></div>
              <table className={styles.table}><thead><tr><th>สัตว์</th><th>ประเภท</th><th>อายุ</th><th>สถานะ</th><th>Action</th></tr></thead><tbody>{pets.map(p=>(<tr key={p.id}><td><span style={{fontSize:"20px"}}>{p.emoji}</span> <strong>{p.name}</strong></td><td>{p.type}</td><td>{p.age}</td><td><span className={styles.badge}>{p.status==="active"?"แสดงอยู่":"ซ่อน"}</span></td><td><div className={styles.actions}><button className={styles.btnSm+" "+styles.btnEdit} onClick={()=>{setEditP(p.id);setFormP({...EP,...p});}}>✏️ แก้ไข</button><button className={styles.btnSm+" "+styles.btnDelete} onClick={()=>delP(p.id)}>🗑</button></div></td></tr>))}</tbody></table>
            </div>
          )}
        </>)}
        {tab==="partners"&&(<div className={styles.sectionCard}><div className={styles.sectionHeader}><div className={styles.pageTitle}>🤝 พาร์ทเนอร์ ({partners.length})</div></div><table className={styles.table}><thead><tr><th>บริษัท</th><th>ผู้ติดต่อ</th><th>เบอร์</th><th>แพ็กเกจ</th><th>สถานะ</th><th>Action</th></tr></thead><tbody>{partners.map(p=>(<tr key={p.id}><td><strong>{p.company}</strong></td><td>{p.contact}</td><td>{p.phone}</td><td>{p.package}</td><td><span className={styles.badge}>{p.status==="active"?"อนุมัติ":"รออนุมัติ"}</span></td><td><div className={styles.actions}>{p.status==="pending"&&<button className={styles.btnSm+" "+styles.btnApprove} onClick={()=>upStatus("partners",p.id,"active",setPartners)}>✓</button>}{p.status==="active"&&<button className={styles.btnSm+" "+styles.btnReject} onClick={()=>upStatus("partners",p.id,"rejected",setPartners)}>ระงับ</button>}<button className={styles.btnSm+" "+styles.btnDelete} onClick={()=>delRow("partners",p.id,setPartners)}>🗑</button></div></td></tr>))}</tbody></table></div>)}
        {tab==="founders"&&(<div className={styles.sectionCard}><div className={styles.sectionHeader}><div className={styles.pageTitle}>👥 Founders</div><div className={styles.hint}>แก้ไขได้ใน Supabase</div></div><table className={styles.table}><thead><tr><th>ชื่อ</th><th>ตำแหน่ง</th><th>Bio</th><th>Social</th></tr></thead><tbody>{founders.map(f=>(<tr key={f.id}><td><span style={{fontSize:"20px"}}>{f.emoji}</span> <strong>{f.name}</strong></td><td>{f.role}</td><td style={{maxWidth:"200px",fontSize:"12px",color:"#7A8999"}}>{f.bio}</td><td>{f.social}</td></tr>))}</tbody></table></div>)}
      </div>
    </div>
  );
}
