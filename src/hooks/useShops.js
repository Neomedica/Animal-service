import { useState, useEffect } from 'react';
import { SHOPS } from '../data/shops';

export function useShops(categoryFilter = null) {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = categoryFilter ? SHOPS.filter(s => s.category === categoryFilter) : SHOPS;
    setShops(data);
    setLoading(false);
  }, [categoryFilter]);

  return { shops, loading };
}
