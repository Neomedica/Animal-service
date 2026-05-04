import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import styles from './AdminPage.module.css';

const ADMIN_PASSWORD = 'furever2568';
const CATEGORIES = ['ข่าว Furever','คลินิก','ฝากเลี้ยง','กรูมมิ่ง','อาหารสัตว์','โรงแรม'];
const CAT_COLORS = {'ข่าว Furever':{ color:'#854F0B', bg:'#FAEEDA' },'คลินิก':{ color:'#185FA5', bg:'#E6F1FB' },'ฝากเลี้ยง':{ color:'#0F6E56', bg:'#E1F5EE' },'กรูมมิ่ง':{ color:'#3B6D11', bg:'#EAF3DE' },'อาหารสัตว์':{ color:'#712B13', bg:'#FAECE7' },'โรงแรม':{ color:'#5B3FA0', bg:'#F0EBFF' }};
const EMPTY = { title:'', excerpt:'', content:'', category:'ข่าว Furever', emoji:'📝', image_url:'', link_url:'', link_label:'', slug:'', is_hot:false, read_min:3, published_date:'', status:'active' };
        {tab==='shops'&&(
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}><div className={styles.pageTitle}>🏪 ร้านค้า ({shops.length})</div></div>
            <table className={styles.table}>
              <thead><tr><th>ร้านค้า</th><th>ประเภท</th><th>แพ็กเกจ</th><th>สถานะ</th><th>Action</th></tr></thead>
              <tbody>{shops.map(s=>(
                <tr key={s.id}>
                  <td><strong>{s.name}</strong><br/><span className={styles.meta}>{s.address}</span></td>
                  <td>{s.category}</td>
                  <td><span className={`${styles.badge} ${styles['plan_'+s.plan]}`}>{s.plan}</span></td>
                  <td><span className={`${styles.badge} ${styles['status_'+s.status]}`}>{s.status==='active'?'อนุมัติแล้ว':s.status==='pending'?'รออนุมัติ':'ระงับ'}</span></td>
                  <td><div className={styles.actions}>
                    {s.status==='pending'&&<button className={`${styles.btnSm} ${styles.btnApprove}`} onClick={()=>updateStatus('shops',s.id,'active',setShops)}>✓</button>}
                    {s.status==='active'&&<button className={`${styles.btnSm} ${styles.btnReject}`} onClick={()=>updateStatus('shops',s.id,'rejected',setShops)}>ระงับ</button>}
                    {s.status==='rejected'&&<button className={`${styles.btnSm} ${styles.btnApprove}`} onClick={()=>updateStatus('shops',s.id,'active',setShops)}>เปิด</button>}
                    <button className={`${styles.btnSm} ${styles.btnDelete}`} onClick={()=>deleteRow('shops',s.id,setShops)}>🗑</button>
                  </div></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
        {tab==='pets'&&(
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}><div className={styles.pageTitle}>🐾 สัตว์หาบ้าน ({pets.length})</div></div>
            <table className={styles.table}>
              <thead><tr><th>สัตว์</th><th>ประเภท</th><th>อายุ</th><th>สถานะ</th><th>Action</th></tr></thead>
              <tbody>{pets.map(p=>(
                <tr key={p.id}>
                  <td><span style={{fontSize:'20px'}}>{p.emoji}</span> <strong>{p.name}</strong></td>
                  <td>{p.type}</td><td>{p.age}</td>
                  <td><span className={`${styles.badge} ${styles['status_'+p.status]}`}>{p.status==='active'?'แสดงอยู่':'ซ่อน'}</span></td>
                  <td><div className={styles.actions}>
                    {p.status==='active'
                      ?<button className={`${styles.btnSm} ${styles.btnReject}`} onClick={()=>updateStatus('pets',p.id,'hidden',setPets)}>ซ่อน</button>
                      :<button className={`${styles.btnSm} ${styles.btnApprove}`} onClick={()=>updateStatus('pets',p.id,'active',setPets)}>แสดง</button>}
                    <button className={`${styles.btnSm} ${styles.btnDelete}`} onClick={()=>deleteRow('pets',p.id,setPets)}>🗑</button>
                  </div></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
        {tab==='partners'&&(
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}><div className={styles.pageTitle}>🤝 พาร์ทเนอร์ ({partners.length})</div></div>
            <table className={styles.table}>
              <thead><tr><th>บริษัท</th><th>ผู้ติดต่อ</th><th>เบอร์</th><th>แพ็กเกจ</th><th>สถานะ</th><th>Action</th></tr></thead>
              <tbody>{partners.map(p=>(
                <tr key={p.id}>
                  <td><strong>{p.company}</strong></td><td>{p.contact}</td><td>{p.phone}</td><td>{p.package}</td>
                  <td><span className={`${styles.badge} ${styles['status_'+p.status]}`}>{p.status==='active'?'อนุมัติแล้ว':'รออนุมัติ'}</span></td>
                  <td><div className={styles.actions}>
                    {p.status==='pending'&&<button className={`${styles.btnSm} ${styles.btnApprove}`} onClick={()=>updateStatus('partners',p.id,'active',setPartners)}>✓</button>}
                    {p.status==='active'&&<button className={`${styles.btnSm} ${styles.btnReject}`} onClick={()=>updateStatus('partners',p.id,'rejected',setPartners)}>ระงับ</button>}
                    <button className={`${styles.btnSm} ${styles.btnDelete}`} onClick={()=>deleteRow('partners',p.id,setPartners)}>🗑</button>
                  </div></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
        {tab==='founders'&&(
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}><div className={styles.pageTitle}>👥 Founders</div><div className={styles.hint}>แก้ไขได้ใน Supabase</div></div>
            <table className={styles.table}>
              <thead><tr><th>ชื่อ</th><th>ตำแหน่ง</th><th>Bio</th><th>Social</th></tr></thead>
              <tbody>{founders.map(f=>(
                <tr key={f.id}>
                  <td><span style={{fontSize:'20px'}}>{f.emoji}</span> <strong>{f.name}</strong></td>
                  <td>{f.role}</td>
                  <td style={{maxWidth:'200px',fontSize:'12px',color:'#7A8999'}}>{f.bio}</td>
                  <td>{f.social}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
        {tab==='shops'&&(
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}><div className={styles.pageTitle}>🏪 ร้านค้า ({shops.length})</div></div>
            <table className={styles.table}>
              <thead><tr><th>ร้านค้า</th><th>ประเภท</th><th>แพ็กเกจ</th><th>สถานะ</th><th>Action</th></tr></thead>
              <tbody>{shops.map(s=>(
                <tr key={s.id}>
                  <td><strong>{s.name}</strong><br/><span className={styles.meta}>{s.address}</span></td>
                  <td>{s.category}</td>
                  <td><span className={`${styles.badge} ${styles['plan_'+s.plan]}`}>{s.plan}</span></td>
                  <td><span className={`${styles.badge} ${styles['status_'+s.status]}`}>{s.status==='active'?'อนุมัติแล้ว':s.status==='pending'?'รออนุมัติ':'ระงับ'}</span></td>
                  <td><div className={styles.actions}>
                    {s.status==='pending'&&<button className={`${styles.btnSm} ${styles.btnApprove}`} onClick={()=>updateStatus('shops',s.id,'active',setShops)}>✓</button>}
                    {s.status==='active'&&<button className={`${styles.btnSm} ${styles.btnReject}`} onClick={()=>updateStatus('shops',s.id,'rejected',setShops)}>ระงับ</button>}
                    {s.status==='rejected'&&<button className={`${styles.btnSm} ${styles.btnApprove}`} onClick={()=>updateStatus('shops',s.id,'active',setShops)}>เปิด</button>}
                    <button className={`${styles.btnSm} ${styles.btnDelete}`} onClick={()=>deleteRow('shops',s.id,setShops)}>🗑</button>
                  </div></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
        {tab==='pets'&&(
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}><div className={styles.pageTitle}>🐾 สัตว์หาบ้าน ({pets.length})</div></div>
            <table className={styles.table}>
              <thead><tr><th>สัตว์</th><th>ประเภท</th><th>อายุ</th><th>สถานะ</th><th>Action</th></tr></thead>
              <tbody>{pets.map(p=>(
                <tr key={p.id}>
                  <td><span style={{fontSize:'20px'}}>{p.emoji}</span> <strong>{p.name}</strong></td>
                  <td>{p.type}</td><td>{p.age}</td>
                  <td><span className={`${styles.badge} ${styles['status_'+p.status]}`}>{p.status==='active'?'แสดงอยู่':'ซ่อน'}</span></td>
                  <td><div className={styles.actions}>
                    {p.status==='active'
                      ?<button className={`${styles.btnSm} ${styles.btnReject}`} onClick={()=>updateStatus('pets',p.id,'hidden',setPets)}>ซ่อน</button>
                      :<button className={`${styles.btnSm} ${styles.btnApprove}`} onClick={()=>updateStatus('pets',p.id,'active',setPets)}>แสดง</button>}
                    <button className={`${styles.btnSm} ${styles.btnDelete}`} onClick={()=>deleteRow('pets',p.id,setPets)}>🗑</button>
                  </div></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
        {tab==='partners'&&(
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}><div className={styles.pageTitle}>🤝 พาร์ทเนอร์ ({partners.length})</div></div>
            <table className={styles.table}>
              <thead><tr><th>บริษัท</th><th>ผู้ติดต่อ</th><th>เบอร์</th><th>แพ็กเกจ</th><th>สถานะ</th><th>Action</th></tr></thead>
              <tbody>{partners.map(p=>(
                <tr key={p.id}>
                  <td><strong>{p.company}</strong></td><td>{p.contact}</td><td>{p.phone}</td><td>{p.package}</td>
                  <td><span className={`${styles.badge} ${styles['status_'+p.status]}`}>{p.status==='active'?'อนุมัติแล้ว':'รออนุมัติ'}</span></td>
                  <td><div className={styles.actions}>
                    {p.status==='pending'&&<button className={`${styles.btnSm} ${styles.btnApprove}`} onClick={()=>updateStatus('partners',p.id,'active',setPartners)}>✓</button>}
                    {p.status==='active'&&<button className={`${styles.btnSm} ${styles.btnReject}`} onClick={()=>updateStatus('partners',p.id,'rejected',setPartners)}>ระงับ</button>}
                    <button className={`${styles.btnSm} ${styles.btnDelete}`} onClick={()=>deleteRow('partners',p.id,setPartners)}>🗑</button>
                  </div></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
        {tab==='founders'&&(
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}><div className={styles.pageTitle}>👥 Founders</div><div className={styles.hint}>แก้ไขได้ใน Supabase</div></div>
            <table className={styles.table}>
              <thead><tr><th>ชื่อ</th><th>ตำแหน่ง</th><th>Bio</th><th>Social</th></tr></thead>
              <tbody>{founders.map(f=>(
                <tr key={f.id}>
                  <td><span style={{fontSize:'20px'}}>{f.emoji}</span> <strong>{f.name}</strong></td>
                  <td>{f.role}</td>
                  <td style={{maxWidth:'200px',fontSize:'12px',color:'#7A8999'}}>{f.bio}</td>
                  <td>{f.social}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
