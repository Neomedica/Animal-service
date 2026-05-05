import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

const EMOJIS = ["🐶","🐱","🐰","🐹","🐻","🦊","🐼","🐨","🐯","🦁","🐮","🐷"];
const ROLES = [
  {id:"owner_dog", label:"เจ้าของหมา", emoji:"🐶"},
  {id:"owner_cat", label:"เจ้าของแมว", emoji:"🐱"},
  {id:"owner_other", label:"เจ้าของสัตว์อื่น", emoji:"🐾"},
  {id:"shop", label:"เจ้าของร้าน", emoji:"🏪"},
  {id:"vet", label:"สัตวแพทย์", emoji:"🩺"},
  {id:"visitor", label:"แค่มาเยี่ยมชม", emoji:"👀"},
];

function genId() {
  return "u_" + Math.random().toString(36).substr(2,9) + "_" + Date.now();
}

export default function CommentSection() {
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);
  const [step, setStep] = useState(0);
  const [loginName, setLoginName] = useState("");
  const [loginEmoji, setLoginEmoji] = useState("🐶");
  const [loginRole, setLoginRole] = useState(null);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("furever_user");
    if (saved) {
      const u = JSON.parse(saved);
      if (!u.id) { u.id = genId(); localStorage.setItem("furever_user", JSON.stringify(u)); }
      setUser(u);
    }
    loadComments();
    const sub = supabase.channel("comments_rt")
      .on("postgres_changes", {event:"*", schema:"public", table:"comments"}, loadComments)
      .subscribe();
    return () => supabase.removeChannel(sub);
  }, []);

  async function loadComments() {
    const { data } = await supabase.from("comments").select("*").order("created_at",{ascending:false}).limit(30);
    if (data) setComments(data);
  }

  function saveUser() {
    if (!loginName.trim() || !loginRole) return;
    const u = { id: genId(), name: loginName.trim(), emoji: loginEmoji, role: loginRole };
    localStorage.setItem("furever_user", JSON.stringify(u));
    setUser(u);
    setStep(0);
  }

  async function sendComment() {
    if (!text.trim() || !user) return;
    setSending(true);
    await supabase.from("comments").insert({
      user_id: user.id,
      user_name: user.name,
      user_emoji: user.emoji,
      user_role: user.role,
      content: text.trim(),
    });
    setText("");
    setSending(false);
  }

  async function likeComment(id, likes) {
    await supabase.from("comments").update({likes: likes+1}).eq("id", id);
    setComments(prev => prev.map(c => c.id===id ? {...c,likes:likes+1} : c));
  }

  async function deleteComment(id) {
    if (!window.confirm("ลบความคิดเห็นนี้?")) return;
    await supabase.from("comments").delete().eq("id", id);
    setComments(prev => prev.filter(c => c.id!==id));
  }

  function formatTime(ts) {
    const diff = Math.floor((new Date() - new Date(ts)) / 1000);
    if (diff < 60) return "เมื่อกี้";
    if (diff < 3600) return Math.floor(diff/60) + " นาทีที่แล้ว";
    if (diff < 86400) return Math.floor(diff/3600) + " ชั่วโมงที่แล้ว";
    return Math.floor(diff/86400) + " วันที่แล้ว";
  }

  const roleLabel = ROLES.find(r => r.id===user?.role)?.label || "";

  return (
    <div style={{marginTop:"24px"}}>
      <h3 style={{fontFamily:"var(--font-display)",fontSize:"16px",fontWeight:"800",color:"var(--text-dark)",marginBottom:"16px"}}>💬 ความคิดเห็น</h3>

      {user ? (
        <div style={{display:"flex",gap:"10px",marginBottom:"20px",alignItems:"flex-start"}}>
          <div style={{fontSize:"32px",flexShrink:0}}>{user.emoji}</div>
          <div style={{flex:1}}>
            <div style={{fontSize:"12px",fontWeight:"700",color:"var(--text-mid)",marginBottom:"6px",display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap"}}>
              <span>{user.name}</span>
              <span style={{background:"#EEF8FF",color:"#185FA5",padding:"2px 8px",borderRadius:"50px",fontSize:"10px"}}>{roleLabel}</span>
              <button onClick={()=>{setUser(null);localStorage.removeItem("furever_user");setStep(0);}} style={{background:"none",border:"none",color:"var(--text-light)",fontSize:"11px",cursor:"pointer",textDecoration:"underline"}}>เปลี่ยน</button>
            </div>
            <textarea value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),sendComment())} placeholder="แชร์ประสบการณ์... (Enter ส่ง, Shift+Enter ขึ้นบรรทัด)" rows={2} style={{width:"100%",border:"1.5px solid rgba(184,228,249,0.8)",borderRadius:"12px",padding:"10px 14px",fontSize:"13px",fontFamily:"var(--font-body)",resize:"none",outline:"none",boxSizing:"border-box"}}/>
            <button onClick={sendComment} disabled={!text.trim()||sending} style={{background:"var(--blue-deep)",color:"white",border:"none",borderRadius:"50px",padding:"8px 20px",fontSize:"13px",fontWeight:"700",cursor:"pointer",fontFamily:"var(--font-body)",marginTop:"8px",opacity:(!text.trim()||sending)?0.5:1}}>
              {sending?"กำลังส่ง...":"ส่ง 🐾"}
            </button>
          </div>
        </div>
      ) : (
        <div style={{marginBottom:"20px"}}>
          {step===0&&(
            <button onClick={()=>setStep(1)} style={{background:"white",border:"1.5px dashed rgba(184,228,249,0.8)",borderRadius:"12px",padding:"14px 20px",fontSize:"13px",color:"var(--text-mid)",cursor:"pointer",fontFamily:"var(--font-body)",width:"100%",textAlign:"left"}}>
              🐾 ร่วมแสดงความคิดเห็น — กดที่นี่เพื่อเริ่ม
            </button>
          )}
          {step===1&&(
            <div style={{background:"white",border:"1.5px solid rgba(184,228,249,0.6)",borderRadius:"16px",padding:"20px"}}>
              <div style={{fontSize:"15px",fontWeight:"800",color:"var(--text-dark)",marginBottom:"4px"}}>คุณเป็นใคร? 🐾</div>
              <div style={{fontSize:"12px",color:"var(--text-mid)",marginBottom:"14px"}}>เลือกบทบาทที่ตรงที่สุด</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
                {ROLES.map(r=>(
                  <button key={r.id} onClick={()=>{setLoginRole(r.id);setLoginEmoji(r.emoji);setStep(2);}} style={{background:"white",border:"1.5px solid rgba(184,228,249,0.5)",borderRadius:"12px",padding:"12px",cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",fontFamily:"var(--font-body)",textAlign:"left"}}>
                    <span style={{fontSize:"22px"}}>{r.emoji}</span>
                    <span style={{fontSize:"13px",fontWeight:"600",color:"var(--text-dark)"}}>{r.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {step===2&&(
            <div style={{background:"white",border:"1.5px solid rgba(184,228,249,0.6)",borderRadius:"16px",padding:"20px"}}>
              <div style={{fontSize:"15px",fontWeight:"800",color:"var(--text-dark)",marginBottom:"14px"}}>เลือก emoji และชื่อเล่น</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"14px"}}>
                {EMOJIS.map(e=>(
                  <button key={e} onClick={()=>setLoginEmoji(e)} style={{fontSize:"24px",background:loginEmoji===e?"#EEF8FF":"white",border:loginEmoji===e?"2px solid var(--blue-deep)":"2px solid transparent",borderRadius:"10px",padding:"4px 6px",cursor:"pointer"}}>{e}</button>
                ))}
              </div>
              <input value={loginName} onChange={e=>setLoginName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&saveUser()} placeholder="ชื่อเล่นของคุณ..." style={{width:"100%",border:"1.5px solid rgba(184,228,249,0.8)",borderRadius:"10px",padding:"9px 14px",fontSize:"13px",fontFamily:"var(--font-body)",outline:"none",marginBottom:"12px",boxSizing:"border-box"}}/>
              <div style={{display:"flex",gap:"8px"}}>
                <button onClick={saveUser} disabled={!loginName.trim()} style={{background:"var(--blue-deep)",color:"white",border:"none",borderRadius:"50px",padding:"10px 24px",fontSize:"13px",fontWeight:"700",cursor:"pointer",fontFamily:"var(--font-body)",opacity:!loginName.trim()?0.5:1}}>เข้าร่วม 🐾</button>
                <button onClick={()=>setStep(1)} style={{background:"#F0F4F8",color:"var(--text-mid)",border:"none",borderRadius:"50px",padding:"10px 16px",fontSize:"13px",cursor:"pointer",fontFamily:"var(--font-body)"}}>← กลับ</button>
              </div>
            </div>
          )}
        </div>
      )}

      <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
        {comments.map(c=>(
          <div key={c.id} style={{display:"flex",gap:"10px",alignItems:"flex-start"}}>
            <div style={{fontSize:"28px",flexShrink:0}}>{c.user_emoji}</div>
            <div style={{flex:1,background:"white",borderRadius:"14px",padding:"12px 14px",border:"1px solid rgba(184,228,249,0.4)"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:"4px",flexWrap:"wrap",gap:"4px"}}>
                <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
                  <span style={{fontSize:"13px",fontWeight:"700",color:"var(--text-dark)"}}>{c.user_name}</span>
                  {c.user_role&&<span style={{background:"#EEF8FF",color:"#185FA5",padding:"1px 7px",borderRadius:"50px",fontSize:"10px",fontWeight:"700"}}>{ROLES.find(r=>r.id===c.user_role)?.label||""}</span>}
                </div>
                <span style={{fontSize:"11px",color:"var(--text-light)"}}>{formatTime(c.created_at)}</span>
              </div>
              <div style={{fontSize:"13px",color:"var(--text-mid)",lineHeight:"1.6"}}>{c.content}</div>
              <div style={{display:"flex",alignItems:"center",gap:"12px",marginTop:"6px"}}>
                <button onClick={()=>likeComment(c.id,c.likes||0)} style={{background:"none",border:"none",fontSize:"12px",color:"var(--text-light)",cursor:"pointer",fontFamily:"var(--font-body)"}}>{"🤍 "+(c.likes||0)}</button>
                {user&&user.id===c.user_id&&(
                  <button onClick={()=>deleteComment(c.id)} style={{background:"none",border:"none",fontSize:"11px",color:"#E24B4A",cursor:"pointer",fontFamily:"var(--font-body)"}}>🗑 ลบ</button>
                )}
              </div>
            </div>
          </div>
        ))}
        {comments.length===0&&<div style={{textAlign:"center",color:"var(--text-light)",fontSize:"13px",padding:"20px"}}>ยังไม่มีความคิดเห็น เป็นคนแรกสิ! 🐾</div>}
      </div>
    </div>
  );
}
