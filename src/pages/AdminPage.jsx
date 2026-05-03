import React, { useState } from 'react';
import styles from './AdminPage.module.css';

const ADMIN_PASSWORD = 'pawpal2568';

const INIT_SHOPS = [
  { id:1, name:'คลินิกหมอปลา', area:'นิมมาน', type:'คลินิก', plan:'basic', status:'pending' },
  { id:2, name:'Happy Groom', area:'ช้างคลาน', type:'กรูมมิ่ง', plan:'free', status:'pending' },
  { id:3, name:'PetHotel CM', area:'สันทราย', type:'โรงแรม', plan:'sponsored', status:'active' },
  { id:4, name:'คลินิกนิมมาน พรีเมียม', area:'นิมมาน', type:'คลินิก', plan:'sponsored', status:'active' },
];

const INIT_PETS = [
  { id:1, emoji:'🐱', name:'มะลิ', type:'แมวเมีย', age:'1 ปี', badge:'ฉีดวัคซีนแล้ว', status:'active' },
  { id:2, emoji:'🐶', name:'ดาว', type:'สุนัขผสม', age:'2 ปี', badge:'ทำหมันแล้ว', status:'active' },
  { id:3, emoji:'🐰', name:'บัตเตอร์', type:'กระต่าย', age:'8 เดือน', badge:'สุขภาพดี', status:'pending' },
  { id:4, emoji:'🐱', name:'โมจิ', type:'แมวเมีย', age:'3 ปี', badge:'ฉีดวัคซีนแล้ว', status:'active' },
];

const INIT_PARTNERS = [
  { id:1, company:'VetCare Thailand', contact:'คุณสมชาย', phone:'089-123-4567', package:'Gold', status:'pending' },
  { id:2, company:'PetFood Pro Co.', contact:'คุณมาลี', phone:'062-345-6789', package:'Silver', status:'pending' },
  { id:3, company:'FluffyGroom CM', contact:'คุณปิ่น', phone:'081-234-5678', package:'Bronze', status:'active' },
];

const INIT_POSTS = [
  { id:1, title:'PawPal เปิดตัวแล้ว!', type:'ประกาศ', date:'2 พ.ค. 2568', status:'active' },
  { id:2, title:'วิธีเลือกคลินิกสัตว์ที่ดี', type:'บทความ', date:'28 เม.ย. 2568', status:'active' },
  { id:3, title:'ร้านใหม่ 5 ร้านน่าลอง', type:'ประกาศ', date:'2 พ.ค. 2568', status:'active' },
];

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [shops, setShops] = useState(INIT_SHOPS);
  const [pets, setPets] = useState(INIT_PETS);
  const [partners, setPartners] = useState(INIT_PARTNERS);
  const [posts, setPosts] = useState(INIT_POSTS);
  const [showAddPet, setShowAddPet] = useState(false);
  const [newPet, setNewPet] = useState({ emoji:'🐶', name:'', type:'', age:'', badge:'สุขภาพดี' });

  function login() {
    if (pw === ADMIN_PASSWORD) { setLoggedIn(true); setPwError(false); }
    else { setPwError(true); }
  }

  function updateShop(id, status) { setShops(p => p.map(s => s.id===id ? {...s, status} : s)); }
  function deleteShop(id) { setShops(p => p.filter(s => s.id!==id)); }
  function updatePet(id, status) { setPets(p => p.map(s => s.id===id ? {...s, status} : s)); }
  function deletePet(id) { setPets(p => p.filter(s => s.id!==id)); }
  function updatePartner(id, status) { setPartners(p => p.map(s => s.id===id ? {...s, status} : s)); }
  function addPet() {
    if (!newPet.name) return;
    setPets(p => [...p, { ...newPet, id: Date.now(), status:'active' }]);
    setNewPet({ emoji:'🐶', name:'', type:'', age:'', badge:'สุขภาพดี' });
    setShowAddPet(false);
  }

  const pendingShops = shops.filter(s => s.status==='pending').length;
  const pendingPartners = partners.filter(s => s.status==='pending').length;
  const pendingPets = pets.filter(s => s.status==='pending').length;

  if (!loggedIn) return (
    <div className={styles.loginWrap}>
      <div className={styles.loginCard}>
        <div className={styles.loginEmoji}>🔐</div>
        <h2 className={styles.loginTitle}>PawPal Admin</h2>
        <p className={styles.loginSub}>กรอกรหัสผ่านเพื่อเข้าสู่ระบบ</p>
        <input
          type="password"
          placeholder="รหัสผ่าน..."
          value={pw}
          onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key==='Enter' && login()}
          className={`${styles.loginInput} ${pwError ? styles.inputError : ''}`}
        />
        {pwError && <div className={styles.errorMsg}>รหัสผ่านไม่ถูกต้อง</div>}
        <button className={styles.loginBtn} onClick={login}>เข้าสู่ระบบ →</button>
      </div>
    </div>
  );

  return (
    <div className={styles.admin}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <div className={styles.logoText}>Paw<span>Pal</span></div>
          <div className={styles.logoSub}>Admin Dashboard</div>
        </div>
        {[
          { id:'overview', icon:'📊', label:'ภาพรวม' },
          { id:'shops', icon:'🏪', label:`ร้านค้า ${pendingShops>0?`(${pendingShops})`:''}`},
          { id:'pets', icon:'🐾', label:`สัตว์หาบ้าน ${pendingPets>0?`(${pendingPets})`:''}`},
          { id:'partners', icon:'🤝', label:`พาร์ทเนอร์ ${pendingPartners>0?`(${pendingPartners})`:''}`},
          { id:'posts', icon:'📝', label:'Blog/ประกาศ' },
        ].map(t => (
          <div key={t.id} className={`${styles.navItem} ${activeTab===t.id?styles.navActive:''}`} onClick={()=>setActiveTab(t.id)}>
            <span className={styles.navIcon}>{t.icon}</span>{t.label}
          </div>
        ))}
        <div className={styles.sidebarBottom}>
          <div className={styles.adminName}>🔐 Admin</div>
          <button className={styles.logoutBtn} onClick={()=>setLoggedIn(false)}>ออกจากระบบ</button>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.topBar}>
          <div className={styles.pageTitle}>
            {activeTab==='overview'&&'📊 ภาพรวม'}
            {activeTab==='shops'&&'🏪 จัดการร้านค้า'}
            {activeTab==='pets'&&'🐾 สัตว์หาบ้าน'}
            {activeTab==='partners'&&'🤝 พาร์ทเนอร์'}
            {activeTab==='posts'&&'📝 Blog/ประกาศ'}
          </div>
          <div className={styles.adminBadge}>🔐 Admin Mode</div>
        </div>

        {activeTab==='overview' && (
          <>
            <div className={styles.statsRow}>
              {[
                { icon:'🏪', num:shops.length, label:'ร้านค้าทั้งหมด', sub:`${pendingShops} รออนุมัติ` },
                { icon:'🐾', num:pets.length, label:'สัตว์หาบ้าน', sub:`${pendingPets} รอตรวจสอบ` },
                { icon:'🤝', num:partners.length, label:'พาร์ทเนอร์', sub:`${pendingPartners} รออนุมัติ` },
                { icon:'📝', num:posts.length, label:'บทความ/ประกาศ', sub:'เผยแพร่แล้ว' },
              ].map((s,i)=>(
                <div key={i} className={styles.statCard}>
                  <div className={styles.statIcon}>{s.icon}</div>
                  <div className={styles.statNum}>{s.num}</div>
                  <div className={styles.statLabel}>{s.label}</div>
                  <div className={styles.statSub}>{s.sub}</div>
                </div>
              ))}
            </div>
            <div className={styles.overviewGrid}>
              <div className={styles.sectionCard}>
                <div className={styles.sectionHeader}><div className={styles.sectionTitle}>ร้านค้ารออนุมัติ</div></div>
                {shops.filter(s=>s.status==='pending').map(s=>(
                  <div key={s.id} className={styles.quickRow}>
                    <div><strong>{s.name}</strong> <span className={styles.meta}>{s.area} · {s.type}</span></div>
                    <div className={styles.actions}>
                      <button className={`${styles.btnSm} ${styles.btnApprove}`} onClick={()=>updateShop(s.id,'active')}>✓</button>
                      <button className={`${styles.btnSm} ${styles.btnReject}`} onClick={()=>updateShop(s.id,'rejected')}>✗</button>
                    </div>
                  </div>
                ))}
                {shops.filter(s=>s.status==='pending').length===0&&<div className={styles.emptyMsg}>✅ ไม่มีรออนุมัติ</div>}
              </div>
              <div className={styles.sectionCard}>
                <div className={styles.sectionHeader}><div className={styles.sectionTitle}>พาร์ทเนอร์รออนุมัติ</div></div>
                {partners.filter(s=>s.status==='pending').map(s=>(
                  <div key={s.id} className={styles.quickRow}>
                    <div><strong>{s.company}</strong> <span className={styles.meta}>{s.contact} · {s.package}</span></div>
                    <div className={styles.actions}>
                      <button className={`${styles.btnSm} ${styles.btnApprove}`} onClick={()=>updatePartner(s.id,'active')}>✓</button>
                      <button className={`${styles.btnSm} ${styles.btnReject}`} onClick={()=>updatePartner(s.id,'rejected')}>✗</button>
                    </div>
                  </div>
                ))}
                {partners.filter(s=>s.status==='pending').length===0&&<div className={styles.emptyMsg}>✅ ไม่มีรออนุมัติ</div>}
              </div>
            </div>
          </>
        )}

        {activeTab==='shops' && (
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitle}>ร้านค้าทั้งหมด ({shops.length})</div>
            </div>
            <table className={styles.table}>
              <thead><tr><th>ร้านค้า</th><th>ประเภท</th><th>แพ็กเกจ</th><th>สถานะ</th><th>Action</th></tr></thead>
              <tbody>
                {shops.map(s=>(
                  <tr key={s.id}>
                    <td><strong>{s.name}</strong><br/><span className={styles.meta}>{s.area}</span></td>
                    <td>{s.type}</td>
                    <td><span className={`${styles.badge} ${styles['plan_'+s.plan]}`}>{s.plan}</span></td>
                    <td><span className={`${styles.badge} ${styles['status_'+s.status]}`}>{s.status==='active'?'อนุมัติแล้ว':s.status==='pending'?'รออนุมัติ':'ปฏิเสธ'}</span></td>
                    <td>
                      <div className={styles.actions}>
                        {s.status==='pending'&&<button className={`${styles.btnSm} ${styles.btnApprove}`} onClick={()=>updateShop(s.id,'active')}>✓ อนุมัติ</button>}
                        {s.status==='active'&&<button className={`${styles.btnSm} ${styles.btnReject}`} onClick={()=>updateShop(s.id,'rejected')}>ระงับ</button>}
                        {s.status==='rejected'&&<button className={`${styles.btnSm} ${styles.btnApprove}`} onClick={()=>updateShop(s.id,'active')}>เปิดใหม่</button>}
                        <button className={`${styles.btnSm} ${styles.btnDelete}`} onClick={()=>deleteShop(s.id)}>ลบ</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab==='pets' && (
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitle}>สัตว์หาบ้าน ({pets.length})</div>
              <button className={styles.btnAdd} onClick={()=>setShowAddPet(true)}>+ เพิ่มสัตว์</button>
            </div>
            {showAddPet && (
              <div className={styles.addForm}>
                <div className={styles.addFormTitle}>เพิ่มสัตว์ใหม่</div>
                <div className={styles.addFormGrid}>
                  <div className={styles.field}><label>Emoji</label><input value={newPet.emoji} onChange={e=>setNewPet({...newPet,emoji:e.target.value})}/></div>
                  <div className={styles.field}><label>ชื่อ</label><input placeholder="ชื่อน้อง..." value={newPet.name} onChange={e=>setNewPet({...newPet,name:e.target.value})}/></div>
                  <div className={styles.field}><label>ประเภท</label><input placeholder="แมวเมีย / สุนัขผสม..." value={newPet.type} onChange={e=>setNewPet({...newPet,type:e.target.value})}/></div>
                  <div className={styles.field}><label>อายุ</label><input placeholder="1 ปี / 8 เดือน..." value={newPet.age} onChange={e=>setNewPet({...newPet,age:e.target.value})}/></div>
                  <div className={styles.field}><label>ป้าย</label>
                    <select value={newPet.badge} onChange={e=>setNewPet({...newPet,badge:e.target.value})}>
                      <option>สุขภาพดี</option><option>ฉีดวัคซีนแล้ว</option><option>ทำหมันแล้ว</option>
                    </select>
                  </div>
                </div>
                <div className={styles.addFormActions}>
                  <button className={styles.btnAdd} onClick={addPet}>บันทึก</button>
                  <button className={styles.btnCancel} onClick={()=>setShowAddPet(false)}>ยกเลิก</button>
                </div>
              </div>
            )}
            <table className={styles.table}>
              <thead><tr><th>สัตว์</th><th>ประเภท</th><th>อายุ</th><th>ป้าย</th><th>สถานะ</th><th>Action</th></tr></thead>
              <tbody>
                {pets.map(p=>(
                  <tr key={p.id}>
                    <td><span style={{fontSize:'20px'}}>{p.emoji}</span> <strong>{p.name}</strong></td>
                    <td>{p.type}</td>
                    <td>{p.age}</td>
                    <td><span className={`${styles.badge} ${styles.status_active}`}>{p.badge}</span></td>
                    <td><span className={`${styles.badge} ${styles['status_'+p.status]}`}>{p.status==='active'?'แสดงอยู่':'รอตรวจสอบ'}</span></td>
                    <td>
                      <div className={styles.actions}>
                        {p.status==='pending'&&<button className={`${styles.btnSm} ${styles.btnApprove}`} onClick={()=>updatePet(p.id,'active')}>✓</button>}
                        <button className={`${styles.btnSm} ${styles.btnDelete}`} onClick={()=>deletePet(p.id)}>ลบ</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab==='partners' && (
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}><div className={styles.sectionTitle}>พาร์ทเนอร์/สปอนเซอร์ ({partners.length})</div></div>
            <table className={styles.table}>
              <thead><tr><th>บริษัท</th><th>ผู้ติดต่อ</th><th>เบอร์</th><th>แพ็กเกจ</th><th>สถานะ</th><th>Action</th></tr></thead>
              <tbody>
                {partners.map(p=>(
                  <tr key={p.id}>
                    <td><strong>{p.company}</strong></td>
                    <td>{p.contact}</td>
                    <td>{p.phone}</td>
                    <td><span className={`${styles.badge} ${styles.plan_sponsored}`}>{p.package}</span></td>
                    <td><span className={`${styles.badge} ${styles['status_'+p.status]}`}>{p.status==='active'?'อนุมัติแล้ว':'รออนุมัติ'}</span></td>
                    <td>
                      <div className={styles.actions}>
                        {p.status==='pending'&&<button className={`${styles.btnSm} ${styles.btnApprove}`} onClick={()=>updatePartner(p.id,'active')}>✓ อนุมัติ</button>}
                        {p.status==='active'&&<button className={`${styles.btnSm} ${styles.btnReject}`} onClick={()=>updatePartner(p.id,'rejected')}>ระงับ</button>}
                        <button className={`${styles.btnSm} ${styles.btnDelete}`} onClick={()=>setPartners(pp=>pp.filter(x=>x.id!==p.id))}>ลบ</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab==='posts' && (
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}><div className={styles.sectionTitle}>Blog/ประกาศ ({posts.length})</div></div>
            <table className={styles.table}>
              <thead><tr><th>หัวข้อ</th><th>ประเภท</th><th>วันที่</th><th>สถานะ</th></tr></thead>
              <tbody>
                {posts.map(p=>(
                  <tr key={p.id}>
                    <td><strong>{p.title}</strong></td>
                    <td>{p.type}</td>
                    <td>{p.date}</td>
                    <td><span className={`${styles.badge} ${styles.status_active}`}>เผยแพร่แล้ว</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
