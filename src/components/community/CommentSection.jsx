import React, { useState } from 'react';
import styles from './CommentSection.module.css';

const MOCK = [
  {id:1,av:'😺',bg:'#FFF0A0',name:'คุณมินต์',text:'หาคลินิกแมวในเชียงใหม่ยากมากเลย เจอแพลตฟอร์มนี้แล้วโล่งใจมากค่ะ 🐱',likes:12,isNew:true},
  {id:2,av:'🐶',bg:'#D8F5FF',name:'คุณโน้ต',text:'พาหมาไปคลินิกตามที่แนะนำในนี้ บริการดีมาก ขอบคุณมากเลยครับ!',likes:8,isNew:false},
  {id:3,av:'🐰',bg:'#E8FFE8',name:'คุณเบลล์',text:'มีร้านฝากเลี้ยงกระต่ายด้วยมั้ยคะ? รอคอยฟีเจอร์นี้อยู่เลย 🐰',likes:5,isNew:false},
];
const EMOJIS = ['🐾','❤️','😻','🎉','👏','✨'];
const AVS = ['🐶','🐱','🐰','🐹','🐦','🐟'];
const BGS = ['#FFF0A0','#D8F5FF','#E8FFE8','#FFE8F5','#F0E8FF'];

export default function CommentSection() {
  const [comments, setComments] = useState(MOCK);
  const [text, setText] = useState('');
  const [liked, setLiked] = useState({});

  function send() {
    if (!text.trim()) return;
    setComments(p => [{id:Date.now(),av:AVS[Math.floor(Math.random()*AVS.length)],bg:BGS[Math.floor(Math.random()*BGS.length)],name:'คุณ (ฉัน)',text,likes:0,isNew:true},...p]);
    setText('');
  }

  function like(id) {
    setLiked(p => ({...p,[id]:!p[id]}));
    setComments(p => p.map(c => c.id===id ? {...c,likes:c.likes+(liked[id]?-1:1)} : c));
  }

  return (
    <div className={styles.box}>
      <div className={styles.label}>💬 ความคิดเห็น</div>
      <div className={styles.inputRow}>
        <div className={styles.myAv}>🐶</div>
        <div className={styles.inputWrap}>
          <textarea className={styles.textarea} placeholder="แชร์ประสบการณ์สัตว์เลี้ยงของคุณ..." value={text} onChange={e=>setText(e.target.value)} rows={2}/>
          <div className={styles.inputFooter}>
            <div className={styles.quickEmoji}>{EMOJIS.map(e=><button key={e} className={styles.ep} onClick={()=>setText(t=>t+e)}>{e}</button>)}</div>
            <button className={styles.sendBtn} disabled={!text.trim()} onClick={send}>ส่ง →</button>
          </div>
        </div>
      </div>
      <div className={styles.list}>
        {comments.map(c=>(
          <div key={c.id} className={styles.item}>
            <div className={styles.av} style={{background:c.bg}}>{c.av}</div>
            <div className={styles.body}>
              <div className={styles.name}>{c.name}{c.isNew&&<span className={styles.newBadge}>ใหม่</span>}</div>
              <div className={styles.text}>{c.text}</div>
              <div className={styles.meta}>
                <button className={`${styles.likeBtn} ${liked[c.id]?styles.liked:''}`} onClick={()=>like(c.id)}>{liked[c.id]?'❤️':'🤍'} {c.likes}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
