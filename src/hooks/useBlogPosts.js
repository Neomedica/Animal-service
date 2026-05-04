import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { BLOG_POSTS } from '../data/blog';

export function useBlogPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchPosts(); }, []);

  async function fetchPosts() {
    try {
      const { data, error } = await supabase.from('blog_posts').select('*').eq('status','active').order('created_at',{ascending:false});
      if (error) throw error;
      setPosts((data||[]).map(p=>({...p,categoryColor:p.category_color,categoryBg:p.category_bg,readMin:p.read_min,hot:p.is_hot,date:p.published_date})));
    } catch(err) {
      setPosts(BLOG_POSTS);
    } finally {
      setLoading(false);
    }
  }

  return { posts, loading };
}
