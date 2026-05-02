import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES, PET_TYPES } from '../data/categories';
import styles from './RegisterPage.module.css';

const STEPS = ['ข้อมูลเจ้าของ', 'ข้อมูลร้านค้า', 'บริการ & สัตว์', 'ยืนยัน'];

const DAYS = ['จันทร์','อังคาร','พุธ','พฤหัส','ศุกร์','เสาร์','อาทิตย์'];

export default function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    ownerName: '', ownerPhone: '', ownerEmail: '',
    shopName: '', categoryId: '', address: '', district: '', province: 'เชียงใหม่',
    phone: '', lineId: '', facebook: '', description: '',
    openDays: [], openTime: '08:00', closeTime: '20:00',
    parking: false, emergency: false,
    petTypes: [], services: [{ name: '', priceFrom: '', priceTo: '' }],
    agree: false,
  });

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const toggleArr = (key, val) => setForm(f => ({
    ...f,
    [key]: f[key].includes(val) ? f[key].filter(x => x !== val) : [...f[key], val],
  }));

  const addService = () => setForm(f => ({ ...f, services: [...f.services, { name: '', priceFrom: '', priceTo: '' }] }));
  const setService = (i, key, val) => setForm(f => {
    const s = [...f.services];
    s[i] = { ...s[i], [key]: val };
    return { ...f, services: s };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) return (
    <div className={styles.successPage}>
      <div className={styles.successCard}>
        <div className={styles.successIcon}>🎉</div>
        <h2>ลงทะเบียนสำเร็จ!</h2>
        <p>ขอบคุณที่เข้าร่วม PawPal<br />ทีมงานจะตรวจสอบและยืนยันร้านของคุณภายใน 24 ชั่วโมง</p>
        <div className={styles.successInfo}>
          <div><strong>ร้านค้า:</strong> {form.shopName}</div>
          <div><strong>อีเมล:</strong> {form.ownerEmail}</div>
          <div><strong>แพ็กเกจ:</strong> Free (Early Access)</div>
        </div>
        <button className={styles.btnHome} onClick={() => navigate('/')}>กลับหน้าหลัก</button>
      </div>
    </div>
  );

  return (
    <main className={styles.page}>
      <div className={styles.wrapper}>
        {/* Step Bar */}
        <div className={styles.stepBar}>
          {STEPS.map((label, i) => (
            <React.Fragment key={i}>
              <div className={styles.stepItem}>
                <div className={`${styles.stepCircle} ${i < step ? styles.done : i === step ? styles.active : styles.todo}`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className={`${styles.stepLabel} ${i < step ? styles.labelDone : i === step ? styles.labelActive : styles.labelTodo}`}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && <div className={`${styles.stepLine} ${i < step ? styles.lineDone : ''}`} />}
            </React.Fragment>
          ))}
        </div>

        <div className={styles.card}>
          {/* FREE BADGE */}
          <div className={styles.freeBadge}>✓ ลงทะเบียนฟรี · ไม่มีค่าใช้จ่าย</div>

          {/* STEP 0 */}
          {step === 0 && (
            <>
              <div className={styles.cardHeader}>
                <h2>ข้อมูลเจ้าของร้าน</h2>
                <p>ข้อมูลนี้ใช้สำหรับการติดต่อและยืนยันตัวตนเท่านั้น</p>
              </div>
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label>ชื่อ-นามสกุล <span className={styles.req}>*</span></label>
                  <input type="text" placeholder="คุณสมชาย ใจดี" value={form.ownerName} onChange={e => set('ownerName', e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>เบอร์โทรศัพท์ <span className={styles.req}>*</span></label>
                  <input type="tel" placeholder="08X-XXX-XXXX" value={form.ownerPhone} onChange={e => set('ownerPhone', e.target.value)} />
                </div>
              </div>
              <div className={`${styles.formRow} ${styles.full}`}>
                <div className={styles.field}>
                  <label>อีเมล <span className={styles.req}>*</span></label>
                  <input type="email" placeholder="email@example.com" value={form.ownerEmail} onChange={e => set('ownerEmail', e.target.value)} />
                  <span className={styles.hint}>ใช้สำหรับรับการยืนยันและแจ้งเตือนจากระบบ</span>
                </div>
              </div>
            </>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <div className={styles.cardHeader}>
                <h2>ข้อมูลร้านค้า</h2>
                <p>ข้อมูลที่จะแสดงบนแพลตฟอร์มให้ลูกค้าเห็น</p>
              </div>
              <div className={`${styles.formRow} ${styles.full}`}>
                <div className={styles.field}>
                  <label>ชื่อร้านค้า <span className={styles.req}>*</span></label>
                  <input type="text" placeholder="เช่น คลินิกสัตว์นิมมาน" value={form.shopName} onChange={e => set('shopName', e.target.value)} />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label>ประเภทธุรกิจ <span className={styles.req}>*</span></label>
                  <select value={form.categoryId} onChange={e => set('categoryId', e.target.value)}>
                    <option value="">เลือกประเภท...</option>
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
                  </select>
                </div>
                <div className={styles.field}>
                  <label>เบอร์โทรร้าน <span className={styles.req}>*</span></label>
                  <input type="tel" placeholder="053-XXX-XXX" value={form.phone} onChange={e => set('phone', e.target.value)} />
                </div>
              </div>
              <div className={`${styles.formRow} ${styles.full}`}>
                <div className={styles.field}>
                  <label>ที่อยู่ร้าน <span className={styles.req}>*</span></label>
                  <input type="text" placeholder="บ้านเลขที่ ถนน ซอย" value={form.address} onChange={e => set('address', e.target.value)} />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label>ตำบล / แขวง</label>
                  <input type="text" placeholder="ตำบล" value={form.district} onChange={e => set('district', e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>LINE ID</label>
                  <input type="text" placeholder="@shopline" value={form.lineId} onChange={e => set('lineId', e.target.value)} />
                </div>
              </div>
              <div className={`${styles.formRow} ${styles.full}`}>
                <div className={styles.field}>
                  <label>คำอธิบายร้านค้า</label>
                  <textarea
                    placeholder="บอกเล่าเกี่ยวกับร้านของคุณ เช่น จุดเด่น ประสบการณ์ บริการพิเศษ..."
                    value={form.description}
                    onChange={e => set('description', e.target.value)}
                    rows={4}
                  />
                  <span className={styles.hint}>แนะนำ 50-200 คำ ช่วยให้ลูกค้าตัดสินใจได้ง่ายขึ้น</span>
                </div>
              </div>

              <hr className={styles.divider} />
              <div className={styles.sectionLabelSm}>วันเวลาทำการ</div>
              <div className={styles.dayChips}>
                {DAYS.map(d => (
                  <button
                    key={d}
                    type="button"
                    className={`${styles.chip} ${form.openDays.includes(d) ? styles.chipActive : ''}`}
                    onClick={() => toggleArr('openDays', d)}
                  >
                    {d}
                  </button>
                ))}
              </div>
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label>เปิด</label>
                  <input type="time" value={form.openTime} onChange={e => set('openTime', e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>ปิด</label>
                  <input type="time" value={form.closeTime} onChange={e => set('closeTime', e.target.value)} />
                </div>
              </div>
              <div className={styles.checkRow}>
                <label className={styles.checkLabel}>
                  <input type="checkbox" checked={form.parking} onChange={e => set('parking', e.target.checked)} />
                  มีที่จอดรถ
                </label>
                <label className={styles.checkLabel}>
                  <input type="checkbox" checked={form.emergency} onChange={e => set('emergency', e.target.checked)} />
                  รับฉุกเฉินนอกเวลา
                </label>
              </div>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <div className={styles.cardHeader}>
                <h2>บริการและสัตว์เลี้ยงที่รับ</h2>
                <p>ข้อมูลนี้ช่วยให้ลูกค้าค้นหาร้านของคุณได้ตรงมากขึ้น</p>
              </div>

              <div className={styles.sectionLabelSm}>ประเภทสัตว์เลี้ยงที่รับ</div>
              <div className={styles.dayChips} style={{ marginBottom: '20px' }}>
                {PET_TYPES.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    className={`${styles.chip} ${form.petTypes.includes(p.id) ? styles.chipActive : ''}`}
                    onClick={() => toggleArr('petTypes', p.id)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <hr className={styles.divider} />
              <div className={styles.sectionLabelSm}>บริการและราคา</div>

              {form.services.map((s, i) => (
                <div key={i} className={styles.serviceRow}>
                  <div className={styles.serviceNum}>{i + 1}</div>
                  <div className={styles.serviceFields}>
                    <div className={styles.field} style={{ flex: 2 }}>
                      <label>ชื่อบริการ</label>
                      <input type="text" placeholder="เช่น ตรวจสุขภาพทั่วไป" value={s.name} onChange={e => setService(i, 'name', e.target.value)} />
                    </div>
                    <div className={styles.field}>
                      <label>ราคาเริ่มต้น (฿)</label>
                      <input type="number" placeholder="200" value={s.priceFrom} onChange={e => setService(i, 'priceFrom', e.target.value)} />
                    </div>
                    <div className={styles.field}>
                      <label>ราคาสูงสุด (฿)</label>
                      <input type="number" placeholder="500" value={s.priceTo} onChange={e => setService(i, 'priceTo', e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}

              <button type="button" className={styles.btnAddService} onClick={addService}>
                + เพิ่มบริการ
              </button>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <div className={styles.cardHeader}>
                <h2>ยืนยันข้อมูล</h2>
                <p>ตรวจสอบข้อมูลก่อนส่ง</p>
              </div>

              <div className={styles.summaryGrid}>
                <div className={styles.summaryItem}><span>เจ้าของ</span><strong>{form.ownerName || '—'}</strong></div>
                <div className={styles.summaryItem}><span>อีเมล</span><strong>{form.ownerEmail || '—'}</strong></div>
                <div className={styles.summaryItem}><span>ชื่อร้าน</span><strong>{form.shopName || '—'}</strong></div>
                <div className={styles.summaryItem}><span>ประเภท</span><strong>{CATEGORIES.find(c => c.id === form.categoryId)?.label || '—'}</strong></div>
                <div className={styles.summaryItem}><span>ที่อยู่</span><strong>{form.address || '—'}</strong></div>
                <div className={styles.summaryItem}><span>โทร</span><strong>{form.phone || '—'}</strong></div>
                <div className={styles.summaryItem}><span>LINE</span><strong>{form.lineId || '—'}</strong></div>
                <div className={styles.summaryItem}><span>จำนวนบริการ</span><strong>{form.services.filter(s => s.name).length} รายการ</strong></div>
              </div>

              <div className={styles.planInfo}>
                <div className={styles.planInfoLeft}>
                  <div className={styles.planInfoTitle}>แพ็กเกจที่เลือก: Free</div>
                  <div className={styles.planInfoSub}>ฟรีตลอดช่วง Early Access — อัปเกรดได้ทีหลัง</div>
                </div>
                <div className={styles.planPrice}>฿0</div>
              </div>

              <label className={`${styles.checkLabel} ${styles.agreeCheck}`}>
                <input type="checkbox" checked={form.agree} onChange={e => set('agree', e.target.checked)} />
                ยอมรับ <span style={{ color: 'var(--blue-deep)' }}>เงื่อนไขการให้บริการ</span> และ <span style={{ color: 'var(--blue-deep)' }}>นโยบายความเป็นส่วนตัว</span>
              </label>
            </>
          )}

          {/* NAV BUTTONS */}
          <div className={styles.navBtns}>
            {step > 0 && (
              <button type="button" className={styles.btnBack} onClick={() => setStep(s => s - 1)}>
                ← ย้อนกลับ
              </button>
            )}
            {step < STEPS.length - 1 ? (
              <button type="button" className={styles.btnNext} onClick={() => setStep(s => s + 1)}>
                ถัดไป →
              </button>
            ) : (
              <button
                type="button"
                className={styles.btnSubmit}
                disabled={!form.agree}
                onClick={handleSubmit}
              >
                🎉 ลงทะเบียนร้านค้าฟรี!
              </button>
            )}
          </div>
        </div>

        <div className={styles.sideNote}>
          <div className={styles.noteTitle}>ทำไมต้องลงทะเบียน?</div>
          {[
            '✓ ฟรี 100% ไม่มีค่าใช้จ่าย',
            '✓ เข้าถึงลูกค้าในเชียงใหม่ที่หาบริการสัตว์เลี้ยง',
            '✓ รับรีวิวจากลูกค้าจริง',
            '✓ อัปเกรดเพื่อเพิ่มการมองเห็นได้ทีหลัง',
            '✓ แก้ไขข้อมูลได้ตลอดเวลา',
          ].map((t, i) => <div key={i} className={styles.noteLine}>{t}</div>)}
        </div>
      </div>
    </main>
  );
}
