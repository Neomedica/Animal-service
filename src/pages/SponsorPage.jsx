import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SponsorPage.module.css';

const PACKAGES = [
  { id:'bronze', name:'Bronze', price:'฿1,500', period:'/เดือน', color:'#CD7F32', bg:'#FFF5E8', perks:['โลโก้บนหน้าแรก','ลิงก์ไปเว็บไซต์','1 เดือน'] },
  { id:'silver', name:'Silver', price:'฿3,500', period:'/เดือน', color:'#A8A9AD', bg:'#F5F5F5', perks:['โลโก้ขนาดใหญ่ขึ้น','Banner ในหน้าค้นหา','3 เดือน','ป้าย Partner ในหน้าร้าน'] },
  { id:'gold', name:'Gold', price:'฿7,000', period:'/เดือน', color:'#F5C200', bg:'#FFFDE8', perks:['โลโก้ตำแหน่งพรีเมียม','Banner ทุกหน้า','6 เดือน','Feature story ใน Blog','Analytics report'] },
];

export default function SponsorPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', company:'', phone:'', line:'', email:'', package:'silver' });
  const [submitted, setSubmitted] = useState(false);

  if (submitted) return (
    <main style={{minHeight:'80vh',display:'flex',alignItems:'center',justifyContent:'center',padding:'40px 20px'}}>
      <div className={styles.successCard}>
        <div className={styles.successEmoji}>🤝</div>
        <h2>ขอบคุณที่สนใจ!</h2>
        <p>ทีมงาน Furever จะติดต่อกลับภายใน 24 ชั่วโมง เพื่อพูดคุยรายละเอียดการเป็นพันธมิตร</p>
        <button className={styles.btnBack} onClick={() => navigate('/')}>กลับหน้าหลัก</button>
      </div>
    </main>
  );

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.label}>พันธมิตร & สปอนเซอร์</div>
          <h1 className={styles.title}>เติบโตไปด้วยกันกับ Furever 🤝</h1>
          <p className={styles.sub}>เข้าถึงกลุ่มเจ้าของสัตว์เลี้ยงในเชียงใหม่กว่า 10,000 คน/เดือน ผ่านแพลตฟอร์มที่พวกเขาไว้ใจ</p>
        </div>

        <div className={styles.packages}>
          {PACKAGES.map(pkg => (
            <div key={pkg.id} className={`${styles.pkgCard} ${form.package===pkg.id?styles.pkgSelected:''}`} onClick={()=>setForm({...form,package:pkg.id})} style={form.package===pkg.id?{borderColor:pkg.color}:{}}>
              <div className={styles.pkgHeader} style={{background:pkg.bg}}>
                <div className={styles.pkgName} style={{color:pkg.color}}>{pkg.name}</div>
                <div className={styles.pkgPrice}>{pkg.price}<span>{pkg.period}</span></div>
              </div>
              <ul className={styles.pkgPerks}>
                {pkg.perks.map((p,i)=><li key={i}>✓ {p}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.formCard}>
          <div className={styles.formTitle}>ติดต่อเพื่อเป็นพันธมิตร</div>
          <div className={styles.formGrid}>
            <div className={styles.field}><label>ชื่อผู้ติดต่อ *</label><input placeholder="ชื่อ-นามสกุล" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
            <div className={styles.field}><label>ชื่อบริษัท/แบรนด์ *</label><input placeholder="PetCare Co., Ltd." value={form.company} onChange={e=>setForm({...form,company:e.target.value})}/></div>
            <div className={styles.field}><label>เบอร์โทร *</label><input placeholder="08X-XXX-XXXX" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div>
            <div className={styles.field}><label>LINE ID</label><input placeholder="@yourline" value={form.line} onChange={e=>setForm({...form,line:e.target.value})}/></div>
            <div className={`${styles.field} ${styles.fullCol}`}><label>อีเมล</label><input placeholder="email@company.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div>
          </div>
          <button className={styles.btnSubmit} disabled={!form.name||!form.company||!form.phone} onClick={()=>setSubmitted(true)}>ส่งข้อมูลติดต่อ →</button>
        </div>
      </div>
    </main>
  );
}
