import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { SHOPS } from '../data/shops';
import ShopCard from '../components/ui/ShopCard';
import styles from './SearchPage.module.css';

const PET_FILTERS = ['ทั้งหมด', 'สุนัข', 'แมว', 'กระต่าย', 'นก', 'อื่นๆ'];
const SORT_OPTIONS = [
  { value: 'recommended', label: 'แนะนำ' },
  { value: 'rating',      label: 'คะแนนสูงสุด' },
  { value: 'distance',    label: 'ใกล้ที่สุด' },
  { value: 'reviews',     label: 'รีวิวมากสุด' },
];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState('recommended');
  const [petFilter, setPetFilter] = useState('ทั้งหมด');
  const [query, setQuery] = useState('');

  const activeCat = searchParams.get('cat') || 'all';

  const setCategory = (id) => {
    if (id === 'all') searchParams.delete('cat');
    else searchParams.set('cat', id);
    setSearchParams(searchParams);
  };

  const filtered = useMemo(() => {
    let shops = [...SHOPS];
    if (activeCat !== 'all') shops = shops.filter(s => s.category === activeCat);
    if (query) shops = shops.filter(s => s.name.toLowerCase().includes(query.toLowerCase()));
    if (sort === 'rating')   shops.sort((a, b) => b.rating - a.rating);
    if (sort === 'distance') shops.sort((a, b) => a.distance - b.distance);
    if (sort === 'reviews')  shops.sort((a, b) => b.reviewCount - a.reviewCount);
    // promoted always first
    shops.sort((a, b) => {
      const rank = { sponsored: 0, basic: 1, free: 2 };
      return rank[a.plan] - rank[b.plan];
    });
// eslint-disable-next-line
    return shops;
  }, [activeCat, sort, query]);

  return (
    <main className={styles.page}>
      <div className={styles.sidebar}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="ค้นหาร้านค้า..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterGroup}>
          <div className={styles.filterLabel}>หมวดหมู่</div>
          <div
            className={`${styles.catItem} ${activeCat === 'all' ? styles.catActive : ''}`}
            onClick={() => setCategory('all')}
          >
            🐾 ทั้งหมด
          </div>
          {CATEGORIES.map(cat => (
            <div
              key={cat.id}
              className={`${styles.catItem} ${activeCat === cat.id ? styles.catActive : ''}`}
              onClick={() => setCategory(cat.id)}
            >
              {cat.icon} {cat.label}
              {cat.count && <span className={styles.catBadge}>{cat.count}</span>}
            </div>
          ))}
        </div>

        <div className={styles.filterGroup}>
          <div className={styles.filterLabel}>สัตว์เลี้ยงของคุณ</div>
          {PET_FILTERS.map(p => (
            <div
              key={p}
              className={`${styles.catItem} ${petFilter === p ? styles.catActive : ''}`}
              onClick={() => setPetFilter(p)}
            >
              {p}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.results}>
        <div className={styles.resultsHeader}>
          <div className={styles.resultsCount}>
            พบ <strong>{filtered.length}</strong> ร้านค้า
            {activeCat !== 'all' && ` ในหมวด "${CATEGORIES.find(c => c.id === activeCat)?.label}"`}
          </div>
          <div className={styles.sortRow}>
            <span>เรียงโดย</span>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className={styles.sortSelect}
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.grid}>
          {filtered.length > 0
            ? filtered.map(shop => <ShopCard key={shop.id} shop={shop} />)
            : <div className={styles.empty}>ไม่พบร้านค้าที่ตรงกับการค้นหา</div>
          }
        </div>
      </div>
    </main>
  );
}
