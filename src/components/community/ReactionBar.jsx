import React, { useState } from 'react';
import styles from './ReactionBar.module.css';

const TYPES = [{emoji:'🐾',name:'น่ารัก',base:142},{emoji:'❤️',name:'รัก',base:89},{emoji:'🎉',name:'ยินดี',base:67},{emoji:'😻',name:'ปลื้ม',base:54},{emoji:'👏',name:'ปรบมือ',base:38},{emoji:'🔥',name:'เจ๋ง',base:29}];

export default function ReactionBar() {
  const [counts, setCounts] = useState(Object.fromEntries(TYPES.map(t => [t.emoji, t.base])));
  const [reacted, setReacted] = useState({});

  function toggle(emoji, e) {
    const was = reacted[emoji];
    setReacted(p => ({...p, [emoji]: !was}));
    setCounts(p => ({...p, [emoji]: p[emoji] + (was ? -1 : 1)}));
    if (!was) {
      const el = document.createElement('div');
      const rect = e.currentTarget.getBoundingClientRect();
      el.style.cssText = `position:fixed;left:${rect.left+rect.width/2-14}px;top:${rect.top}px;font-size:24px;pointer-events:none;z-index:9999;animation:floatUp 1.1s ease forwards;`;
      el.textContent = emoji;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1200);
    }
  }

  const total = Object.values(counts).reduce((a,b) => a+b, 0);
  return (
    <>
      <style>{`@keyframes floatUp{0%{opacity:1;transform:translateY(0) scale(1)}100%{opacity:0;transform:translateY(-100px) scale(1.5)}}`}</style>
      <div className={styles.box}>
        <div className={styles.label}>คุณรู้สึกยังไงกับ Furever?</div>
        <div className={styles.row}>
          {TYPES.map(({emoji,name}) => (
            <button key={emoji} className={`${styles.btn} ${reacted[emoji]?styles.reacted:''}`} onClick={e => toggle(emoji,e)}>
              <span className={styles.emoji}>{emoji}</span>
              <span className={styles.count}>{counts[emoji].toLocaleString()}</span>
              <span className={styles.name}>{name}</span>
            </button>
          ))}
        </div>
        <div className={styles.totalBar}>
          <span className={styles.totalNum}>{total.toLocaleString()}</span>
          <span className={styles.totalLabel}>คนแสดงความรู้สึก</span>
        </div>
      </div>
    </>
  );
}
