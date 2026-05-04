import React, { useState, useRef } from "react";
import { supabase } from "../lib/supabase";
import styles from "./AdminPage.module.css";
const PW = "furever2568";
const BCATS = ["ข่าว Furever","คลินิก","ฝากเลี้ยง","กรูมมิ่ง","อาหารสัตว์","โรงแรม"];
const CC = {"ข่าว Furever":{c:"#854F0B",b:"#FAEEDA"},"คลินิก":{c:"#185FA5",b:"#E6F1FB"},"ฝากเลี้ยง":{c:"#0F6E56",b:"#E1F5EE"},"กรูมมิ่ง":{c:"#3B6D11",b:"#EAF3DE"},"อาหารสัตว์":{c:"#712B13",b:"#FAECE7"},"โรงแรม":{c:"#5B3FA0",b:"#F0EBFF"}};
const EB = {title:"",excerpt:"",content:"",category:"ข่าว Furever",emoji:"📝",image_url:"",link_url:"",link_label:"",slug:"",is_hot:false,read_min:3,published_date:"",status:"active"};
const ES = {name:"",category:"clinic",address:"",phone:"",line_id:"",description:"",price_from:0,plan:"free",status:"active",emoji:"🏪",rating:0,hours:"09:00-18:00",parking:false,is_verified:false,image_url:""};
const EP = {name:"",type:"",age:"",emoji:"🐾",bg:"#FFF0A0",badge:"สุขภาพดี",status:"active",history:"",contact:"LINE: @furever_adopt",image_url:""};
export default function AdminPage() {
  const [ok,setOk]=useState(false);
  const [pw,setPw]=useState("");
  const [err,setErr]=useState(false);
  const [tab,setTab]=useState("blog");
  const [posts,setPosts]=useState([]);
  const [shops,setShops]=useState([]);
  const [pets,setPets]=useState([]);
  const [partners,setPartners]=useState([]);
  const [founders,setFounders]=useState([]);
  const [editB,setEditB]=useState(null);
  const [editS,setEditS]=useState(null);
  const [editP,setEditP]=useState(null);
  const [formB,setFormB]=useState(EB);
  const [formS,setFormS]=useState(ES);
  const [formP,setFormP]=useState(EP);
  const [uploading,setUploading]=useState(false);
  const [saving,setSaving]=useState(false);
  const [msg,setMsg]=useState("");
  const refB=useRef();
  const refS=useRef();
  const refP=useRef();

  function login(){if(pw===PW){setOk(true);load();}else setErr(true);}

  async function load(){
    const [b,s,p,pa,f]=await Promise.all([
      supabase.from("blog_posts").select("*").order("created_at",{ascending:false}),
      supabase.from("shops").select("*").order("created_at",{ascending:false}),
      supabase.from("pets").select("*").order("created_at",{ascending:false}),
      supabase.from("partners").select("*").order("created_at",{ascending:false}),
      supabase.from("founders").select("*").order("sort_order"),
    ]);
    if(b.data)setPosts(b.data);
    if(s.data)setShops(s.data);
    if(p.data)setPets(p.data);
    if(pa.data)setPartners(pa.data);
    if(f.data)setFounders(f.data);
  }

  function toast(m){setMsg(m);setTimeout(()=>setMsg(""),3000);}

  async function uploadImg(file,onDone){
    if(!file)return;
    setUploading(true);
    const path=Date.now()+"."+file.name.split(".").pop();
    const {error}=await supabase.storage.from("blog-images").upload(path,file);
    if(!error){const {data}=supabase.storage.from("blog-images").getPublicUrl(path);onDone(data.publicUrl);toast("อัปโหลดสำเร็จ");}
    setUploading(false);
  }

  async function saveB(){
    setSaving(true);
    const cat=CC[formB.category]||CC["ข่าว Furever"];
    const slug=formB.slug||formB.title.toLowerCase().replace(/\s+/g,"-").replace(/[^\w-]/g,"");
    const d={...formB,slug,category_color:cat.c,category_bg:cat.b};
    if(editB==="new")await supabase.from("blog_posts").insert(d);
    else await supabase.from("blog_posts").update(d).eq("id",editB);
    await load();setEditB(null);setSaving(false);toast("บันทึก Blog สำเร็จ");
  }

  async function saveS(){
    setSaving(true);
    if(editS==="new")await supabase.from("shops").insert(formS);
    else await supabase.from("shops").update(formS).eq("id",editS);
    await load();setEditS(null);setSaving(false);toast("บันทึกร้านค้าสำเร็จ");
  }

  async function saveP(){
    setSaving(true);
    if(editP==="new")await supabase.from("pets").insert(formP);
    else await supabase.from("pets").update(formP).eq("id",editP);
    await load();setEditP(null);setSaving(false);toast("บันทึกสัตว์สำเร็จ");
  }

  async function delB(id){if(!window.confirm("ลบ?"))return;await supabase.from("blog_posts").delete().eq("id",id);await load();toast("ลบแล้ว");}
  async function delS(id){if(!window.confirm("ลบ?"))return;await supabase.from("shops").delete().eq("id",id);await load();toast("ลบแล้ว");}
  async function delP(id){if(!window.confirm("ลบ?"))return;await supabase.from("pets").delete().eq("id",id);await load();toast("ลบแล้ว");}
  async function upStatus(t,id,st,set){await supabase.from(t).update({status:st}).eq("id",id);set(p=>p.map(x=>x.id===id?{...x,status:st}:x));toast("อัปเดตแล้ว");}
  async function delRow(t,id,set){if(!window.confirm("ลบ?"))return;await supabase.from(t).delete().eq("id",id);set(p=>p.filter(x=>x.id!==id));toast("ลบแล้ว");}
