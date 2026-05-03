import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { SHOPS } from '../data/shops';

export function useShops(categoryFilter = null) {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchShops(); }, [categoryFilter]);

  async function fetchShops() {
    if (!process.env.REACT_APP_SUPABASE_URL) {
      setShops(categoryFilter ? SHOPS.filter(s => s.category === categoryFilter) : SHOPS);
      setLoading(false);
      return;
    }
    try {
      let query = supabase.from('shops').select('*').eq('status','active').order('plan');
      if (categoryFilter) query = query.eq('category', categoryFilter);
      const { data, error } = await query;
      if (error) throw error;
      const mapped = (data || []).map(s => ({
        ...s,
        isOpen: true,
        isVerified: s.is_verified,
        priceFrom: s.price_from,
        reviewCount: s.review_count,
        bgGradient: 'linear-gradient(135deg,#D8F5FF,#FFF0A0)',
        distance: (Math.random()*3+0.1).toFixed(1),
        services: [],
        reviews: [],
        pets: s.pet_types || [],
      }));
      setShops(mapped);
    } catch (err) {
      console.error(err);
      setShops(categoryFilter ? SHOPS.filter(s => s.category === categoryFilter) : SHOPS);
    } finally {
      setLoading(false);
    }
  }

  return { shops, loading, refetch: fetchShops };
}
