import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

const EMOJIS = ["🐶","🐱","🐰","🐹","🐻","🦊","🐼","🐨","🐯","🦁","🐮","🐷"];

export default function CommentSection() {
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loginName, setLoginName] = useState("");
  const [loginEmoji, setLoginEmoji] = useState("🐶");
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("furever_user");
    if (saved) setUser(JSON.parse(saved));
    loadComments();

    const sub = supabase.channel("comments_realtime")
      .on("postgres_changes", {event:"INSERT", schema:"public", table:"comments"}, payload => {
        setComments(prev => [payload.new, ...prev]);
      })
      .subscribe();

    return () => supabase.removeChannel(sub);
  }, []);

  async function loadComments() {
    const { data } = await supabase.from("comments").select("*").order("created_at", {ascending:false}).limit(20);
    if (data) setComments(data);
  }

  function saveUser() {
    if (!loginName.trim()) return;
    const u = {name: loginName.trim(), emoji: loginEmoji};
    localStorage.setItem("furever_user", JSON.stringify(u));
    setUser(u);
    setShowLogin(false);
  }

  async function sendComment() {
    if (!text.trim() || !user) return;
    setSending(true);
    await supabase.from("comments").insert({
      user_name: user.name,
      user_emoji: user.emoji,
      content: text.trim(),
    });
    setText("");
    setSending(false);
  }

  async function likeComment(id, currentLikes) {
    await supabase.from("comments").update({likes: currentLikes+1}).eq("id", id);
    setComments(prev => prev.map(c => c.id === id ? {...c, likes: currentLikes+1} : c));
  }

  function formatTime(ts) {
    const d = new Date(ts);
    const now = new Date();
    const diff = Math.floor((now - d) / 1000);
    if (diff < 60) return "เมื่อกี้";
    if (diff < 3600) return Math.floor(diff/60) + " นาทีที่แล้ว";
    if (diff < 86400) return Math.floor(diff/3600) + " ชั่วโมงที่แล้ว";
    return Math.floor(diff/86400) + " วันที่แล้ว";
  }

  return (
    <div style={{marginTop:"24px"}}>
      <h3 style={{fontFamily:"var(--font-display)",fontSize:"16px",fontWeight:"800",color:"var(--text-dark)",marginBottom:"16px"}}>💬 ความคิดเห็น</h3>

      {user ? (
        <div style={{display:"flex",gap:"10px",marginBottom:"20px",alignItems:"flex-start"}}>
          <div style={{fontSize:"32px",flexShrink:0}}>{user.emoji}</div>
          <div style={{flex:1}}>
            <div style={{fontSize:"12px",fontWeight:"700",color:"var(--text-mid)",marginBottom:"6px"}}>
              {user.name} · <button onClick={()=>setUser(null)||localStorage.removeItem("furever_user")} style={{background:"none",border:"none",color:"var(--text-light)",fontSize:"11px",cursor:"pointer",textDecoration:"underline"}}>เปลี่ยน</button>
            </div>
            <textarea
              value={text}
              onChange={e=>setText(e.target.value)}
              placeholder="แชร์ประสบการณ์ของคุณ..."
              rows={2}
              style={{width:"100%",border:"1.5px solid rgba(184,228,249,0.8)",borderRadius:"12px",padding:"10px 14px",fontSize:"13px",fontFamily:"var(--font-body)",resize:"none",outline:"none"}}
            />
            <button
              onClick={sendComment}
              disabled={!text.trim()||sending}
              style={{background:"var(--blue-deep)",color:"white",border:"none",borderRadius:"50px",padding:"8px 20px",fontSize:"13px",fontWeight:"700",cursor:"pointer",fontFamily:"var(--font-body)",marginTop:"8px",opacity:!text.trim()||sending?0.5:1}}
            >
              {sending ? "กำลังส่ง..." : "ส่ง 🐾"}
            </button>
          </div>
        </div>
      ) : (
        <div style={{marginBottom:"20px"}}>
          {showLogin ? (
            <div style={{background:"white",border:"1.5px solid rgba(184,228,249,0.6)",borderRadius:"16px",padding:"16px"}}>
              <div style={{fontSize:"14px",fontWeight:"700",color:"var(--text-dark)",marginBottom:"12px"}}>เลือก emoji และชื่อของคุณ</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"}}>
                {EMOJIS.map(e=>(
                  <button key={e} onClick={()=>setLoginEmoji(e)} style={{fontSize:"24px",background:loginEmoji===e?"#EEF8FF":"white",border:loginEmoji===e?"2px solid var(--blue-deep)":"2px solid transparent",borderRadius:"10px",padding:"4px",cursor:"pointer"}}>
                    {e}
                  </button>
                ))}
              </div>
              <input
                value={loginName}
                onChange={e=>setLoginName(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&saveUser()}
                placeholder="ชื่อของคุณ..."
                style={{width:"100%",border:"1.5px solid rgba(184,228,249,0.8)",borderRadius:"10px",padding:"9px 14px",fontSize:"13px",fontFamily:"var(--font-body)",outline:"none",marginBottom:"10px"}}
              />
              <div style={{display:"flex",gap:"8px"}}>
                <button onClick={saveUser} disabled={!loginName.trim()} style={{background:"var(--blue-deep)",color:"white",border:"none",borderRadius:"50px",padding:"8px 20px",fontSize:"13px",fontWeight:"700",cursor:"pointer",fontFamily:"var(--font-body)"}}>เข้าร่วม 🐾</button>
                <button onClick={()=>setShowLogin(false)} style={{background:"#F0F4F8",color:"var(--text-mid)",border:"none",borderRadius:"50px",padding:"8px 16px",fontSize:"13px",cursor:"pointer",fontFamily:"var(--font-body)"}}>ยกเลิก</button>
              </div>
            </div>
          ) : (
            <button onClick={()=>setShowLogin(true)} style={{background:"white",border:"1.5px dashed rgba(184,228,249,0.8)",borderRadius:"12px",padding:"12px 20px",fontSize:"13px",color:"var(--text-mid)",cursor:"pointer",fontFamily:"var(--font-body)",width:"100%"}}>
              🐾 เลือก emoji แล้วร่วมแสดงความคิดเห็น...
            </button>
          )}
        </div>
      )}

      <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
        {comments.map(c=>(
          <div key={c.id} style={{display:"flex",gap:"10px",alignItems:"flex-start"}}>
            <div style={{fontSize:"28px",flexShrink:0}}>{c.user_emoji}</div>
            <div style={{flex:1,background:"white",borderRadius:"14px",padding:"12px 14px",border:"1px solid rgba(184,228,249,0.4)"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:"4px"}}>
                <span style={{fontSize:"13px",fontWeight:"700",color:"var(--text-dark)"}}>{c.user_name}</span>
                <span style={{fontSize:"11px",color:"var(--text-light)"}}>{formatTime(c.created_at)}</span>
              </div>
              <div style={{fontSize:"13px",color:"var(--text-mid)",lineHeight:"1.6"}}>{c.content}</div>
              <button onClick={()=>likeComment(c.id,c.likes||0)} style={{background:"none",border:"none",fontSize:"12px",color:"var(--text-light)",cursor:"pointer",marginTop:"6px",fontFamily:"var(--font-body)"}}>
                🤍 {c.likes||0}
cd ~/Downloads/pawpal && cat > src/components/community/CommentSection.jsx << 'EOF'
import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

const EMOJIS = ["🐶","🐱","🐰","🐹","🐻","🦊","🐼","🐨","🐯","🦁","🐮","🐷"];

export default function CommentSection() {
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loginName, setLoginName] = useState("");
  const [loginEmoji, setLoginEmoji] = useState("🐶");
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("furever_user");
    if (saved) setUser(JSON.parse(saved));
    loadComments();

    const sub = supabase.channel("comments_realtime")
      .on("postgres_changes", {event:"INSERT", schema:"public", table:"comments"}, payload => {
        setComments(prev => [payload.new, ...prev]);
      })
      .subscribe();

    return () => supabase.removeChannel(sub);
  }, []);

  async function loadComments() {
    const { data } = await supabase.from("comments").select("*").order("created_at", {ascending:false}).limit(20);
    if (data) setComments(data);
  }

  function saveUser() {
    if (!loginName.trim()) return;
    const u = {name: loginName.trim(), emoji: loginEmoji};
    localStorage.setItem("furever_user", JSON.stringify(u));
    setUser(u);
    setShowLogin(false);
  }

  async function sendComment() {
    if (!text.trim() || !user) return;
    setSending(true);
    await supabase.from("comments").insert({
      user_name: user.name,
      user_emoji: user.emoji,
      content: text.trim(),
    });
    setText("");
    setSending(false);
  }

  async function likeComment(id, currentLikes) {
    await supabase.from("comments").update({likes: currentLikes+1}).eq("id", id);
    setComments(prev => prev.map(c => c.id === id ? {...c, likes: currentLikes+1} : c));
  }

  function formatTime(ts) {
    const d = new Date(ts);
    const now = new Date();
    const diff = Math.floor((now - d) / 1000);
    if (diff < 60) return "เมื่อกี้";
    if (diff < 3600) return Math.floor(diff/60) + " นาทีที่แล้ว";
    if (diff < 86400) return Math.floor(diff/3600) + " ชั่วโมงที่แล้ว";
    return Math.floor(diff/86400) + " วันที่แล้ว";
  }

  return (
    <div style={{marginTop:"24px"}}>
      <h3 style={{fontFamily:"var(--font-display)",fontSize:"16px",fontWeight:"800",color:"var(--text-dark)",marginBottom:"16px"}}>💬 ความคิดเห็น</h3>

      {user ? (
        <div style={{display:"flex",gap:"10px",marginBottom:"20px",alignItems:"flex-start"}}>
          <div style={{fontSize:"32px",flexShrink:0}}>{user.emoji}</div>
          <div style={{flex:1}}>
            <div style={{fontSize:"12px",fontWeight:"700",color:"var(--text-mid)",marginBottom:"6px"}}>
              {user.name} · <button onClick={()=>setUser(null)||localStorage.removeItem("furever_user")} style={{background:"none",border:"none",color:"var(--text-light)",fontSize:"11px",cursor:"pointer",textDecoration:"underline"}}>เปลี่ยน</button>
            </div>
            <textarea
              value={text}
              onChange={e=>setText(e.target.value)}
              placeholder="แชร์ประสบการณ์ของคุณ..."
              rows={2}
              style={{width:"100%",border:"1.5px solid rgba(184,228,249,0.8)",borderRadius:"12px",padding:"10px 14px",fontSize:"13px",fontFamily:"var(--font-body)",resize:"none",outline:"none"}}
            />
            <button
              onClick={sendComment}
              disabled={!text.trim()||sending}
              style={{background:"var(--blue-deep)",color:"white",border:"none",borderRadius:"50px",padding:"8px 20px",fontSize:"13px",fontWeight:"700",cursor:"pointer",fontFamily:"var(--font-body)",marginTop:"8px",opacity:!text.trim()||sending?0.5:1}}
            >
              {sending ? "กำลังส่ง..." : "ส่ง 🐾"}
            </button>
          </div>
        </div>
      ) : (
        <div style={{marginBottom:"20px"}}>
          {showLogin ? (
            <div style={{background:"white",border:"1.5px solid rgba(184,228,249,0.6)",borderRadius:"16px",padding:"16px"}}>
              <div style={{fontSize:"14px",fontWeight:"700",color:"var(--text-dark)",marginBottom:"12px"}}>เลือก emoji และชื่อของคุณ</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"}}>
                {EMOJIS.map(e=>(
                  <button key={e} onClick={()=>setLoginEmoji(e)} style={{fontSize:"24px",background:loginEmoji===e?"#EEF8FF":"white",border:loginEmoji===e?"2px solid var(--blue-deep)":"2px solid transparent",borderRadius:"10px",padding:"4px",cursor:"pointer"}}>
                    {e}
                  </button>
                ))}
              </div>
              <input
                value={loginName}
                onChange={e=>setLoginName(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&saveUser()}
                placeholder="ชื่อของคุณ..."
                style={{width:"100%",border:"1.5px solid rgba(184,228,249,0.8)",borderRadius:"10px",padding:"9px 14px",fontSize:"13px",fontFamily:"var(--font-body)",outline:"none",marginBottom:"10px"}}
              />
              <div style={{display:"flex",gap:"8px"}}>
                <button onClick={saveUser} disabled={!loginName.trim()} style={{background:"var(--blue-deep)",color:"white",border:"none",borderRadius:"50px",padding:"8px 20px",fontSize:"13px",fontWeight:"700",cursor:"pointer",fontFamily:"var(--font-body)"}}>เข้าร่วม 🐾</button>
                <button onClick={()=>setShowLogin(false)} style={{background:"#F0F4F8",color:"var(--text-mid)",border:"none",borderRadius:"50px",padding:"8px 16px",fontSize:"13px",cursor:"pointer",fontFamily:"var(--font-body)"}}>ยกเลิก</button>
              </div>
            </div>
          ) : (
            <button onClick={()=>setShowLogin(true)} style={{background:"white",border:"1.5px dashed rgba(184,228,249,0.8)",borderRadius:"12px",padding:"12px 20px",fontSize:"13px",color:"var(--text-mid)",cursor:"pointer",fontFamily:"var(--font-body)",width:"100%"}}>
              🐾 เลือก emoji แล้วร่วมแสดงความคิดเห็น...
            </button>
          )}
        </div>
      )}

      <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
        {comments.map(c=>(
          <div key={c.id} style={{display:"flex",gap:"10px",alignItems:"flex-start"}}>
            <div style={{fontSize:"28px",flexShrink:0}}>{c.user_emoji}</div>
            <div style={{flex:1,background:"white",borderRadius:"14px",padding:"12px 14px",border:"1px solid rgba(184,228,249,0.4)"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:"4px"}}>
                <span style={{fontSize:"13px",fontWeight:"700",color:"var(--text-dark)"}}>{c.user_name}</span>
                <span style={{fontSize:"11px",color:"var(--text-light)"}}>{formatTime(c.created_at)}</span>
              </div>
              <div style={{fontSize:"13px",color:"var(--text-mid)",lineHeight:"1.6"}}>{c.content}</div>
              <button onClick={()=>likeComment(c.id,c.likes||0)} style={{background:"none",border:"none",fontSize:"12px",color:"var(--text-light)",cursor:"pointer",marginTop:"6px",fontFamily:"var(--font-body)"}}>
                🤍 {c.likes||0}
              </button>
            </div>
          </div>
        ))}
        {comments.length===0&&<div style={{textAlign:"center",color:"var(--text-light)",fontSize:"13px",padding:"20px"}}>ยังไม่มีความคิดเห็น เป็นคนแรกสิ! 🐾</div>}
      </div>
    </div>
  );
}
