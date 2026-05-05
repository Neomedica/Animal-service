import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { CATEGORIES } from "../data/categories";

export function useCategories() {
  const [categories, setCategories] = useState(CATEGORIES);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("shops").select("category").eq("status","active");
      if (!data) return;
      const counts = {};
      data.forEach(s => { counts[s.category] = (counts[s.category]||0) + 1; });
      setCategories(CATEGORIES.map(c => ({
        ...c,
        count: counts[c.id] || 0
      })));
    }
    load();

    const sub = supabase.channel("shops_count")
      .on("postgres_changes", {event:"*", schema:"public", table:"shops"}, load)
      .subscribe();

    return () => supabase.removeChannel(sub);
  }, []);

  return { categories };
}
