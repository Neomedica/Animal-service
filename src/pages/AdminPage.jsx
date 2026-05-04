import React, { useState, useRef } from "react";
import { supabase } from "../lib/supabase";
import styles from "./AdminPage.module.css";
const pw_correct = "furever2568";
const CATS = ["ข่าว Furever","คลินิก","ฝากเลี้ยง","กรูมมิ่ง","อาหารสัตว์","โรงแรม"];
const CC = {"ข่าว Furever":{c:"#854F0B",b:"#FAEEDA"},"คลินิก":{c:"#185FA5",b:"#E6F1FB"},"ฝากเลี้ยง":{c:"#0F6E56",b:"#E1F5EE"},"กรูมมิ่ง":{c:"#3B6D11",b:"#EAF3DE"},"อาหารสัตว์":{c:"#712B13",b:"#FAECE7"},"โรงแรม":{c:"#5B3FA0",b:"#F0EBFF"}};
const E0 = {title:"",excerpt:"",content:"",category:"ข่าว Furever",emoji:"📝",image_url:"",link_url:"",link_label:"",slug:"",is_hot:false,read_min:3,published_date:"",status:"active"};
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
  const [editing,setEditing]=useState(null);
  const [form,setForm]=useState(E0);
  const [uploading,setUploading]=useState(false);
  const [saving,setSaving]=useState(false);
  const [msg,setMsg]=useState("");
  const ref=useRef();
  function login(){if(pw===pw_correct){setOk(true);load();}else setErr(true);}
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
  async function upload(e){
    const file=e.target.files[0];if(!file)return;
    setUploading(true);
    const path=Date.now()+"."+file.name.split(".").pop();
    const {error}=await supabase.storage.from("blog-images").upload(path,file);
    if(!error){const {data}=supabase.storage.from("blog-images").getPublicUrl(path);setForm(f=>({...f,image_url:data.publicUrl}));toast("อัปโหลดสำเร็จ");}
    setUploading(false);
  }
  async function save(){
    setSaving(true);
    const cat=CC[form.category]||CC["ข่าว Furever"];
    const slug=form.slug||form.title.toLowerCase().replace(/\s+/g,"-").replace(/[^\w-]/g,"");
    const d={...form,slug,category_color:cat.c,category_bg:cat.b};
    if(editing==="new")await supabase.from("blog_posts").insert(d);
    else await supabase.from("blog_posts").update(d).eq("id",editing);
    await load();setEditing(null);setSaving(false);toast("บันทึกสำเร็จ");
  }
  async function del(id){if(!window.confirm("ลบ?"))return;await supabase.from("blog_posts").delete().eq("id",id);await load();toast("ลบแล้ว");}
  async function upStatus(t,id,st,set){await supabase.from(t).update({status:st}).eq("id",id);set(p=>p.map(x=>x.id===id?{...x,status:st}:x));toast("อัปเดตแล้ว");}
  async function delRow(t,id,set){if(!window.confirm("ลบ?"))return;await supabase.from(t).delete().eq("id",id);set(p=>p.filter(x=>x.id!==id));toast("ลบแล้ว");}
  if(!ok)return(
    <div className={styles.loginWrap}>
      <div className={styles.loginCard}>
        <div className={styles.loginEmoji}>🔐</div>
        <h2 className={styles.loginTitle}>Furever Admin</h2>
        <p className={styles.loginSub}>กรอกรหัสผ่าน</p>
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
          <div key={t.id} className={styles.navItem+(tab===t.id?" "+styles.navActive:"")} onClick={()=>{setTab(t.id);setEditing(null);}}>
            <span>{t.icon}</span>{t.label}
          </div>
        ))}
        <div className={styles.sidebarBottom}><button className={styles.logoutBtn} onClick={()=>setOk(false)}>ออกจากระบบ</button></div>
      </div>
      <div className={styles.main}>
        {msg&&<div className={styles.toast}>{msg}</div>}
        {tab==="blog"&&(
          <>
            {editing?(
              <div className={styles.formCard}>
                <div className={styles.formHeader}>
                  <div className={styles.formTitle}>{editing==="new"?"เพิ่มบทความ":"แก้ไขบทความ"}</div>
                  <button className={styles.btnCancel} onClick={()=>setEditing(null)}>← กลับ</button>
                </div>
                <div className={styles.formGrid}>
                  <div className={styles.field+" "+styles.fullCol}><label>หัวข้อ *</label><input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="หัวข้อ..."/></div>
                  <div className={styles.field}><label>หมวดหมู่</label><select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>{CATS.map(c=><option key={c}>{c}</option>)}</select></div>
                  <div className={styles.field}><label>Emoji</label><input value={form.emoji} onChange={e=>setForm({...form,emoji:e.target.value})}/></div>
                  <div className={styles.field}><label>เวลาอ่าน (นาที)</label><input type="number" value={form.read_min} onChange={e=>setForm({...form,read_min:Number(e.target.value)})}/></div>
                  <div className={styles.field}><label>วันที่</label><input value={form.published_date} onChange={e=>setForm({...form,published_date:e.target.value})} placeholder="1 พ.ค. 2568"/></div>
                  <div className={styles.field+" "+styles.fullCol}><label>สรุปย่อ</label><textarea rows={2} value={form.excerpt} onChange={e=>setForm({...form,excerpt:e.target.value})}/></div>
                  <div className={styles.field+" "+styles.fullCol}><label>เนื้อหา</label><textarea rows={5} value={form.content} onChange={e=>setForm({...form,content:e.target.value})}/></div>
                  <div className={styles.field+" "+styles.fullCol}>
                    <label>รูปภาพ</label>
                    <div className={styles.uploadRow}>
                      <input value={form.image_url} onChange={e=>setForm({...form,image_url:e.target.value})} placeholder="URL รูป หรืออัปโหลด..."/>
                      <button className={styles.btnUpload} onClick={()=>ref.current.click()} disabled={uploading}>{uploading?"⏳":"📤 อัปโหลด"}</button>
                      <input ref={ref} type="file" accept="image/*" style={{display:"none"}} onChange={upload}/>
                    </div>
                    {form.image_url&&<img src={form.image_url} alt="" className={styles.imgPreview}/>}
                  </div>
                  <div className={styles.field}><label>ลิ้งก์</label><input value={form.link_url} onChange={e=>setForm({...form,link_url:e.target.value})} placeholder="https://..."/></div>
                  <div className={styles.field}><label>ชื่อปุ่ม</label><input value={form.link_label} onChange={e=>setForm({...form,link_label:e.target.value})} placeholder="ดูวิดีโอ..."/></div>
                  <div className={styles.field}><label style={{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"}}><input type="checkbox" checked={form.is_hot} onChange={e=>setForm({...form,is_hot:e.target.checked})}/>🔥 Hot</label></div>
                </div>
                <div className={styles.formActions}>
                  <button className={styles.btnSave} onClick={save} disabled={!form.title||saving}>{saving?"กำลังบันทึก...":"💾 บันทึก"}</button>
                  <button className={styles.btnCancel} onClick={()=>setEditing(null)}>ยกเลิก</button>
                </div>
              </div>
            ):(
              <div className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <div className={styles.pageTitle}>📝 Blog ({posts.length})</div>
                  <button className={styles.btnAdd} onClick={()=>{setEditing("new");setForm(E0);}}>+ เพิ่มบทความ</button>
                </div>
                <div className={styles.blogList}>
                  {posts.map(p=>(
                    <div key={p.id} className={styles.blogRow}>
                      <div className={styles.blogRowEmoji}>{p.emoji}</div>
                      <div className={styles.blogRowInfo}>
                        <div className={styles.blogRowTitle}>{p.title}{p.is_hot&&" 🔥"}</div>
                        <div className={styles.blogRowMeta}>
                          <span style={{color:p.category_color,background:p.category_bg,padding:"2px 8px",borderRadius:"50px",fontSize:"10px",fontWeight:"700"}}>{p.category}</span>
                          {p.published_date} · {p.read_min} นาที
                          {p.image_url&&" 📷"}{p.link_url&&" 🔗"}
                        </div>
                      </div>
                      <div className={styles.actions}>
                        <button className={styles.btnSm+" "+styles.btnEdit} onClick={()=>{setEditing(p.id);setForm({...E0,...p});}}>✏️</button>
                        <button className={styles.btnSm+" "+styles.btnDelete} onClick={()=>del(p.id)}>🗑</button>
                      </div>
                    </div>
                  ))}
                  {posts.length===0&&<div className={styles.empty}>ยังไม่มีบทความ</div>}
                </div>
              </div>
            )}
          </>
        )}
        {tab==="shops"&&(<div className={styles.sectionCard}><div className={styles.sectionHeader}><div className={styles.pageTitle}>🏪 ร้านค้า ({shops.length})</div></div><table className={styles.table}><thead><tr><th>ร้านค้า</th><th>ประเภท</th><th>แพ็กเกจ</th><th>สถานะ</th><th>Action</th></tr></thead><tbody>{shops.map(s=>(<tr key={s.id}><td><strong>{s.name}</strong><br/><span className={styles.meta}>{s.address}</span></td><td>{s.category}</td><td><span className={styles.badge}>{s.plan}</span></td><td><span className={styles.badge}>{s.status==="active"?"อนุมัติ":s.status==="pending"?"รออนุมัติ":"ระงับ"}</span></td><td><div className={styles.actions}>{s.status==="pending"&&<button className={styles.btnSm+" "+styles.btnApprove} onClick={()=>upStatus("shops",s.id,"active",setShops)}>✓</button>}{s.status==="active"&&<button className={styles.btnSm+" "+styles.btnReject} onClick={()=>upStatus("shops",s.id,"rejected",setShops)}>ระงับ</button>}{s.status==="rejected"&&<button className={styles.btnSm+" "+styles.btnApprove} onClick={()=>upStatus("shops",s.id,"active",setShops)}>เปิด</button>}<button className={styles.btnSm+" "+styles.btnDelete} onClick={()=>delRow("shops",s.id,setShops)}>🗑</button></div></td></tr>))}</tbody></table></div>)}
        {tab==="pets"&&(<div className={styles.sectionCard}><div className={styles.sectionHeader}><div className={styles.pageTitle}>🐾 สัตว์หาบ้าน ({pets.length})</div></div><table className={styles.table}><thead><tr><th>สัตว์</th><th>ประเภท</th><th>อายุ</th><th>สถานะ</th><th>Action</th></tr></thead><tbody>{pets.map(p=>(<tr key={p.id}><td><span style={{fontSize:"20px"}}>{p.emoji}</span> <strong>{p.name}</strong></td><td>{p.type}</td><td>{p.age}</td><td><span className={styles.badge}>{p.status==="active"?"แสดงอยู่":"ซ่อน"}</span></td><td><div className={styles.actions}>{p.status==="active"?<button className={styles.btnSm+" "+styles.btnReject} onClick={()=>upStatus("pets",p.id,"hidden",setPets)}>ซ่อน</button>:<button className={styles.btnSm+" "+styles.btnApprove} onClick={()=>upStatus("pets",p.id,"active",setPets)}>แสดง</button>}<button className={styles.btnSm+" "+styles.btnDelete} onClick={()=>delRow("pets",p.id,setPets)}>🗑</button></div></td></tr>))}</tbody></table></div>)}
        {tab==="partners"&&(<div className={styles.sectionCard}><div className={styles.sectionHeader}><div className={styles.pageTitle}>🤝 พาร์ทเนอร์ ({partners.length})</div></div><table className={styles.table}><thead><tr><th>บริษัท</th><th>ผู้ติดต่อ</th><th>เบอร์</th><th>แพ็กเกจ</th><th>สถานะ</th><th>Action</th></tr></thead><tbody>{partners.map(p=>(<tr key={p.id}><td><strong>{p.company}</strong></td><td>{p.contact}</td><td>{p.phone}</td><td>{p.package}</td><td><span className={styles.badge}>{p.status==="active"?"อนุมัติ":"รออนุมัติ"}</span></td><td><div className={styles.actions}>{p.status==="pending"&&<button className={styles.btnSm+" "+styles.btnApprove} onClick={()=>upStatus("partners",p.id,"active",setPartners)}>✓</button>}{p.status==="active"&&<button className={styles.btnSm+" "+styles.btnReject} onClick={()=>upStatus("partners",p.id,"rejected",setPartners)}>ระงับ</button>}<button className={styles.btnSm+" "+styles.btnDelete} onClick={()=>delRow("partners",p.id,setPartners)}>🗑</button></div></td></tr>))}</tbody></table></div>)}
        {tab==="founders"&&(<div className={styles.sectionCard}><div className={styles.sectionHeader}><div className={styles.pageTitle}>👥 Founders</div><div className={styles.hint}>แก้ไขได้ใน Supabase</div></div><table className={styles.table}><thead><tr><th>ชื่อ</th><th>ตำแหน่ง</th><th>Bio</th><th>Social</th></tr></thead><tbody>{founders.map(f=>(<tr key={f.id}><td><span style={{fontSize:"20px"}}>{f.emoji}</span> <strong>{f.name}</strong></td><td>{f.role}</td><td style={{maxWidth:"200px",fontSize:"12px",color:"#7A8999"}}>{f.bio}</td><td>{f.social}</td></tr>))}</tbody></table></div>)}
      </div>
    </div>
  );
}
