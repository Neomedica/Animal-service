import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { SHOPS } from "../data/shops";

function calcDist(lat1,lng1,lat2,lng2){
  const R=6371;
  const dLat=(lat2-lat1)*Math.PI/180;
  const dLng=(lng2-lng1)*Math.PI/180;
  const a=Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)*Math.sin(dLng/2);
  return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}

export function useShops(categoryFilter=null){
  const [shops,setShops]=useState([]);
  const [loading,setLoading]=useState(true);
  const [userPos,setUserPos]=useState(null);

  useEffect(()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        pos=>setUserPos({lat:pos.coords.latitude,lng:pos.coords.longitude}),
        ()=>setUserPos({lat:18.7883,lng:98.9853})
      );
    } else {
      setUserPos({lat:18.7883,lng:98.9853});
    }
  },[]);

  useEffect(()=>{if(userPos)fetchShops();},[userPos,categoryFilter]);

  async function fetchShops(){
    if(!process.env.REACT_APP_SUPABASE_URL){
      setShops(categoryFilter?SHOPS.filter(s=>s.category===categoryFilter):SHOPS);
      setLoading(false);return;
    }
    try{
      let query=supabase.from("shops").select("*").eq("status","active");
      if(categoryFilter)query=query.eq("category",categoryFilter);
      const {data,error}=await query;
      if(error)throw error;
      const mapped=(data||[]).map(s=>{
        const dist=s.lat&&s.lng&&userPos?calcDist(userPos.lat,userPos.lng,s.lat,s.lng):null;
        return{
          ...s,
          isOpen:true,
          isVerified:s.is_verified,
          priceFrom:s.price_from,
          reviewCount:s.review_count||0,
          bgGradient:"linear-gradient(135deg,#D8F5FF,#FFF0A0)",
          distance:dist?dist.toFixed(1):null,
          distanceNum:dist||999,
          services:[],reviews:[],pets:s.pet_types||[],
        };
      }).sort((a,b)=>{
        if(a.plan==="sponsored"&&b.plan!=="sponsored")return -1;
        if(b.plan==="sponsored"&&a.plan!=="sponsored")return 1;
        return a.distanceNum-b.distanceNum;
      });
      setShops(mapped);
    }catch(err){
      setShops(categoryFilter?SHOPS.filter(s=>s.category===categoryFilter):SHOPS);
    }finally{setLoading(false);}
  }

  return{shops,loading,userPos,refetch:fetchShops};
}
