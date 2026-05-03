import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PETS_FOR_ADOPTION } from '../data/blog';
import styles from './AdoptionPage.module.css';

const ALL_PETS = [
  ...PETS_FOR_ADOPTION,
  { id:7, name:'ลูกู', type:'สุนัขพันธุ์เล็ก', age:'4 เดือน', emoji:'🐶', bg:'#FFF0E0', badge:'ฉีดวัคซีนแล้ว', history:'ถูกพบหน้าวัด ไม่มีเจ้าของ', contact:'LINE: @furever_adopt' },
  { id:8, name:'พีช', type:'แมวเมีย', age:'1.5 ปี', emoji:'🐱', bg:'#FFE0F0', badge:'ทำหมันแล้ว', history:'เจ้าของย้ายบ้านไม่สามารถเลี้ยงต่อได้', contact:'LINE: @furever_adopt' },
];

export default function AdoptionPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name:'', phone:'', line:'', reason:'' });
  const [submitted, setSubmitted] = useState(false);

  if (submitted) return (
    <main style={{minHeight:'80vh',display:'flex',alignItems:'center',justifyContent:'center',padding:'40px 20px'}}>
      <div className={styles.successCard}>
        <div className={styles.successEmoji}>🐾</div>
        <h2>ส่งคำขอแล้ว!</h2>
        <p>ขอบคุณที่สนใจรับเลี้ยง <strong>{selected?.name}</strong><br/>ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง</p>
        <button className={styles.btnBack} onClick={() => navigate('/')}>กลับหน้าหลัก</button>
      </div>
    </main>
  );

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.label}>หาบ้านใหม่</div>
          <h1 className={styles.title}>สัตว์เลี้ยงรอบ้าน 🏠</h1>
          <p className={styles.sub}>น้องๆ เหล่านี้กำลังรอเจ้าของที่รักและห่วงใย ช่วยกันหาบ้านให้น้องได้เลย</p>
        </div>

        {!selected ? (
          <div className={styles.grid}>
            {ALL_PETS.map(pet => (
              <div key={pet.id} className={styles.card} onClick={() => setSelected(pet)}>
                <div className={styles.cardImg} style={{background:pet.bg}}>
                  <span className={styles.cardEmoji}>{pet.emoji}</span>
                  <span className={styles.cardBadge}>{pet.badge}</span>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardName}>{pet.name}</div>
                  <div className={styles.cardDetail}>{pet.type} · {pet.age}</div>
                  {pet.history && <div className={styles.cardHistory}>{pet.history}</div>}
                  <button className={styles.btnAdopt}>ขอรับเลี้ยง →</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.detailWrap}>
            <button className={styles.btnBack2} onClick={() => setSelected(null)}>← กลับ</button>
            <div className={styles.detailCard}>
              <div className={styles.detailImg} style={{background:selected.bg}}>
                <span className={styles.detailEmoji}>{selected.emoji}</span>
              </div>
              <div className={styles.detailInfo}>
                <span className={styles.detailBadge}>{selected.badge}</span>
                <h2 className={styles.detailName}>{selected.name}</h2>
                <div className={styles.detailMeta}>{selected.type} · {selected.age}</div>
                {selected.history && <p className={styles.detailHistory}>{selected.history}</p>}
                <div className={styles.detailContact}>ติดต่อ: {selected.contact || 'LINE: @furever_adopt'}</div>

                <div className={styles.formSection}>
                  <div className={styles.formTitle}>กรอกข้อมูลเพื่อขอรับเลี้ยง</div>
                  <div className={styles.formGrid}>
                    <div className={styles.field}><label>ชื่อ-นามสกุล</label><input placeholder="คุณ..." value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
                    <div className={styles.field}><label>เบอร์โทร</label><input placeholder="08X-XXX-XXXX" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div>
                    <div className={styles.field}><label>LINE ID</label><input placeholder="@yourline" value={form.line} onChange={e=>setForm({...form,line:e.target.value})}/></div>
                  </div>
                  <div className={styles.field}><label>เหตุผลที่อยากรับเลี้ยง</label><textarea rows={3} placeholder="บอกเล่าเกี่ยวกับตัวคุณและสภาพแวดล้อมที่บ้าน..." value={form.reason} onChange={e=>setForm({...form,reason:e.target.value})}/></div>
                  <button className={styles.btnSubmit} disabled={!form.name||!form.phone} onClick={()=>setSubmitted(true)}>ส่งคำขอรับเลี้ยง 🐾</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
