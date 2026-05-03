import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { FOUNDERS } from '../data/blog';

export function useFounders() {
  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchFounders(); }, []);

  async function fetchFounders() {
    if (!process.env.REACT_APP_SUPABASE_URL) {
      setFounders(FOUNDERS);
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from('founders')
        .select('*')
        .order('sort_order');
      if (error) throw error;
      setFounders(data || []);
    } catch (err) {
      console.error(err);
      setFounders(FOUNDERS);
    } finally {
      setLoading(false);
    }
  }

  return { founders, loading };
}
