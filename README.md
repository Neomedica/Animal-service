# 🐾 PawPal

แพลตฟอร์มบริการสัตว์เลี้ยงครบวงจร เริ่มต้นจากเชียงใหม่

## เริ่มใช้งาน

```bash
npm install
npm start
```

เปิด [http://localhost:3000](http://localhost:3000)

## โครงสร้างโปรเจกต์

```
src/
├── components/
│   ├── layout/       # Navbar, Footer
│   └── ui/           # ShopCard (shared components)
├── data/
│   ├── categories.js # หมวดหมู่บริการ + ประเภทสัตว์
│   └── shops.js      # Mock shop data
├── pages/
│   ├── HomePage.jsx        # Landing page
│   ├── SearchPage.jsx      # ค้นหา + filter
│   ├── ShopDetailPage.jsx  # หน้ารายละเอียดร้าน
│   └── RegisterPage.jsx    # ลงทะเบียนร้านค้า (4 steps)
├── styles/
│   ├── global.css    # Reset + utilities
│   └── variables.css # Design tokens (colors, fonts)
└── App.jsx           # Router setup
```

## Pages

| Path | หน้า |
|------|------|
| `/` | Landing page |
| `/search` | ค้นหาบริการ + filter |
| `/search?cat=clinic` | กรองตามหมวด |
| `/shop/:id` | รายละเอียดร้านค้า |
| `/register` | ลงทะเบียนร้าน (4-step form) |

## แนวทางขยายต่อ (Roadmap)

- [ ] Backend API (Node.js / Supabase)
- [ ] ระบบ Auth สำหรับร้านค้า
- [ ] Upload รูปภาพร้าน
- [ ] ระบบ Boost / Sponsored (Payment)
- [ ] แผนที่จริง (Google Maps API)
- [ ] Push notification
- [ ] Mobile app (React Native)

## Design System

- **Primary**: `#3AA8D8` (Blue pastel)
- **Accent**: `#FFD94D` (Yellow pastel)
- **Font Display**: Nunito (headings)
- **Font Body**: Sora (body text)
