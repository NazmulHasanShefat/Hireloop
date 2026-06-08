"use client"
// import { useEffect, useRef } from "react";
// import {
//   FiGlobe,
//   FiUserPlus,
//   FiUsers,
//   FiMapPin,
//   FiCheckCircle,
//   FiMail,
//   FiChevronRight,
//   FiImage,
// } from "react-icons/fi";
// import {
//   HiOutlineBriefcase,
//   HiOutlineOfficeBuilding,
// } from "react-icons/hi";
// import { BsStars } from "react-icons/bs";
// import { MdVerified } from "react-icons/md";
 
// const ACTIVE_ROLES = [
//   {
//     id: 1,
//     title: "Senior Distributed Systems Engineer",
//     tags: [
//       { label: "Full-time", color: "blue" },
//       { label: "Remote", color: "green" },
//       { label: "$120k–$160k", color: "purple" },
//     ],
//     openings: 5,
//   },
//   {
//     id: 2,
//     title: "Product Design Lead",
//     tags: [
//       { label: "Full-time", color: "blue" },
//       { label: "$100k–$130k", color: "purple" },
//     ],
//     openings: 2,
//   },
//   {
//     id: 3,
//     title: "DevOps Architect (30%)",
//     tags: [
//       { label: "Remote", color: "green" },
//       { label: "$110k", color: "purple" },
//     ],
//     openings: 1,
//   },
// ];
 
// const GALLERY_IMAGES = [
//   "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80",
//   "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&q=80",
//   "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=400&q=80",
// ];
 
// const TAG_CLASSES = {
//   blue: "bg-blue-500/15 border border-blue-500/30 text-blue-400",
//   green: "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400",
//   purple: "bg-violet-500/15 border border-violet-500/30 text-violet-400",
// };
 
// export default function MyCompanyDetails() {
//   const starsRef = useRef(null);
 
//   useEffect(() => {
//     const container = starsRef.current;
//     if (!container) return;
//     for (let i = 0; i < 80; i++) {
//       const star = document.createElement("div");
//       const size = Math.random() * 2.5 + 0.5;
//       Object.assign(star.style, {
//         position: "absolute",
//         width: `${size}px`,
//         height: `${size}px`,
//         borderRadius: "50%",
//         background: "white",
//         top: `${Math.random() * 100}%`,
//         left: `${Math.random() * 100}%`,
//         opacity: "0.4",
//         animation: `twinkle ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 4}s infinite`,
//       });
//       container.appendChild(star);
//     }
 
//     // inject keyframes once
//     if (!document.getElementById("lumina-keyframes")) {
//       const style = document.createElement("style");
//       style.id = "lumina-keyframes";
//       style.textContent = `
//         @keyframes twinkle {
//           0%, 100% { opacity: 0.3; transform: scale(1); }
//           50% { opacity: 1; transform: scale(1.5); }
//         }
//         @keyframes earthSpin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//         @keyframes pulseDot {
//           0%, 100% { opacity: 1; transform: scale(1); }
//           50% { opacity: 0.5; transform: scale(0.8); }
//         }
//         @keyframes fadeSlideUp {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//       `;
//       document.head.appendChild(style);
//     }
//   }, []);
 
//   return (
//     <div className="lg:ml-50 w-full relative overflow-y-scroll min-h-screen overflow-hidden font-sans"
//       style={{ background: "linear-gradient(135deg, #0a0f1e 0%, #0d1a3a 45%, #0a1628 100%)" }}>
 
//       {/* Stars */}
//       <div ref={starsRef} className="absolute inset-0 pointer-events-none" />
 
//       {/* Grid lines */}
//       <div className="absolute inset-0 pointer-events-none"
//         style={{
//           backgroundImage: "linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)",
//           backgroundSize: "60px 60px",
//         }} />
 
//       {/* Earth globe */}
//       <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
//         style={{
//           background: "radial-gradient(circle at 35% 35%, #1a3a6e 0%, #0f2450 25%, #071530 60%, #030b1a 100%)",
//           boxShadow: "inset -30px -30px 60px rgba(0,0,0,0.8), 0 0 80px rgba(30,90,200,0.3), 0 0 200px rgba(15,50,150,0.15)",
//           opacity: 0.85,
//           animation: "earthSpin 40s linear infinite",
//         }} />
 
//       {/* Content */}
//       <div className="relative z-10 max-w-5xl mx-auto px-5 py-6 grid gap-6"
//         style={{ gridTemplateColumns: "1fr 300px" }}>
 
//         {/* ── HEADER (full width) ── */}
//         <header className="col-span-2 flex items-center justify-between px-7 py-5 rounded-2xl"
//           style={{
//             background: "rgba(15,30,60,0.7)",
//             border: "1px solid rgba(59,130,246,0.2)",
//             backdropFilter: "blur(20px)",
//             boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
//             animation: "fadeSlideUp 0.5s ease 0.1s both",
//           }}>
//           <div className="flex items-center gap-4">
//             <div className="w-13 h-13 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
//               style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", boxShadow: "0 4px 16px rgba(245,158,11,0.4)", width: 52, height: 52 }}>
//               🔬
//             </div>
//             <div>
//               <div className="flex items-center gap-2 flex-wrap">
//                 <span className="text-white font-black text-xl tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
//                   LuminaTech Systems
//                 </span>
//                 <span className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full text-blue-400"
//                   style={{ background: "rgba(59,130,246,0.2)", border: "1px solid rgba(59,130,246,0.4)" }}>
//                   <MdVerified size={12} /> VERIFIED
//                 </span>
//               </div>
//               <p className="text-slate-400 text-xs mt-1 max-w-sm">
//                 Empowering the future of enterprise cloud intelligence and distributed edge solutions.
//               </p>
//             </div>
//           </div>
//           <div className="flex gap-3">
//             <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-slate-300 transition-all hover:text-blue-400"
//               style={{ border: "1px solid rgba(148,163,184,0.3)" }}>
//               <FiUserPlus size={14} /> Follow
//             </button>
//             <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all"
//               style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)", boxShadow: "0 4px 12px rgba(59,130,246,0.4)" }}>
//               <FiGlobe size={14} /> Visit Website
//             </button>
//           </div>
//         </header>
 
//         {/* ── LEFT COLUMN ── */}
//         <div className="flex flex-col gap-5">
 
//           {/* About */}
//           <section className="rounded-2xl p-6"
//             style={{
//               background: "rgba(15,30,60,0.65)",
//               border: "1px solid rgba(59,130,246,0.15)",
//               backdropFilter: "blur(16px)",
//               boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
//               animation: "fadeSlideUp 0.5s ease 0.2s both",
//             }}>
//             <h2 className="flex items-center gap-2 font-black text-lg text-slate-100 mb-3"
//               style={{ fontFamily: "'Syne', sans-serif" }}>
//               <BsStars className="text-blue-400" /> About <span className="text-blue-400">LuminaTech</span>
//             </h2>
//             <p className="text-slate-400 text-sm leading-relaxed">
//               Founded in 2014, LuminaTech Systems has emerged as a global leader in high-performance cloud
//               infrastructure and decentralised computing systems. We bridge the gap between traditional
//               enterprise legacy architectures and the next generation of intelligent, automated cloud ecosystems.
//             </p>
//             <p className="text-slate-400 text-sm leading-relaxed mt-3">
//               Our mission is to empower organisations with resilient, scalable, and secure technologies that drive
//               meaningful progress. With a focus on R&D, LuminaTech holds over 100 patents in data encryption and
//               real-time processing, standing at the bleeding edge of the digital revolution.
//             </p>
//           </section>
 
//           {/* Stats */}
//           <section className="rounded-2xl p-6"
//             style={{
//               background: "rgba(15,30,60,0.65)",
//               border: "1px solid rgba(59,130,246,0.15)",
//               backdropFilter: "blur(16px)",
//               boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
//               animation: "fadeSlideUp 0.5s ease 0.3s both",
//             }}>
//             <h2 className="font-black text-lg text-slate-100 mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
//               Company <span className="text-blue-400">Stats</span>
//             </h2>
//             <div className="grid grid-cols-3 gap-3">
//               {[
//                 { icon: <FiUsers size={22} />, value: "12,400+", label: "Employees" },
//                 { icon: <FiMapPin size={22} />, value: "San Francisco", label: "Headquarters" },
//                 { icon: <FiGlobe size={22} />, value: "24", label: "Countries" },
//               ].map((s) => (
//                 <div key={s.label}
//                   className="rounded-xl p-4 text-center transition-all cursor-default"
//                   style={{ background: "rgba(30,50,90,0.5)", border: "1px solid rgba(59,130,246,0.12)" }}>
//                   <div className="text-blue-400 flex justify-center mb-1">{s.icon}</div>
//                   <div className="text-white font-black text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>{s.value}</div>
//                   <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mt-1">{s.label}</div>
//                 </div>
//               ))}
//             </div>
//           </section>
 
//           {/* Gallery */}
//           <section className="rounded-2xl p-6"
//             style={{
//               background: "rgba(15,30,60,0.65)",
//               border: "1px solid rgba(59,130,246,0.15)",
//               backdropFilter: "blur(16px)",
//               boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
//               animation: "fadeSlideUp 0.5s ease 0.4s both",
//             }}>
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="flex items-center gap-2 font-black text-lg text-slate-100" style={{ fontFamily: "'Syne', sans-serif" }}>
//                 <FiImage className="text-blue-400" /> Life at <span className="text-blue-400">LuminaTech</span>
//               </h2>
//               <button className="text-blue-400 text-xs font-semibold flex items-center gap-1 hover:text-blue-300 transition-colors">
//                 View Gallery <FiChevronRight size={13} />
//               </button>
//             </div>
//             <div className="grid grid-cols-3 gap-3">
//               {GALLERY_IMAGES.map((src, i) => (
//                 <div key={i} className="relative overflow-hidden rounded-xl group" style={{ height: 110 }}>
//                   <img src={src} alt={`Gallery ${i + 1}`}
//                     className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 brightness-75 group-hover:brightness-100" />
//                   <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
//                     style={{ background: "linear-gradient(to top, rgba(10,15,40,0.6) 0%, transparent 60%)" }} />
//                 </div>
//               ))}
//             </div>
//           </section>
//         </div>
 
//         {/* ── RIGHT COLUMN ── */}
//         <div className="flex flex-col gap-4">
 
//           {/* Active Roles */}
//           <section className="rounded-2xl p-5"
//             style={{
//               background: "rgba(15,30,60,0.65)",
//               border: "1px solid rgba(59,130,246,0.15)",
//               backdropFilter: "blur(16px)",
//               boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
//               animation: "fadeSlideUp 0.5s ease 0.2s both",
//             }}>
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="font-black text-base text-slate-100 flex items-center gap-2" style={{ fontFamily: "'Syne', sans-serif" }}>
//                 <HiOutlineBriefcase className="text-blue-400" /> Active Roles
//               </h2>
//               <span className="text-xs font-bold text-white px-2 py-0.5 rounded-full"
//                 style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}>14</span>
//             </div>
 
//             {ACTIVE_ROLES.map((role) => (
//               <div key={role.id}
//                 className="rounded-xl p-3 mb-3 last:mb-0 transition-all"
//                 style={{ background: "rgba(20,40,80,0.6)", border: "1px solid rgba(59,130,246,0.12)" }}>
//                 <p className="font-bold text-slate-200 text-sm mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
//                   {role.title}
//                 </p>
//                 <div className="flex flex-wrap gap-1 mb-3">
//                   {role.tags.map((t) => (
//                     <span key={t.label} className={`text-xs font-semibold px-2 py-0.5 rounded-full ${TAG_CLASSES[t.color]}`}>
//                       {t.label}
//                     </span>
//                   ))}
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-slate-400 text-xs">
//                     <span className="text-blue-400 font-bold">{role.openings}</span> opening{role.openings !== 1 ? "s" : ""}
//                   </span>
//                   <button className="text-xs font-bold text-blue-400 px-3 py-1 rounded-md transition-all hover:bg-blue-500/20"
//                     style={{ border: "1px solid rgba(59,130,246,0.4)" }}>
//                     Book Apply
//                   </button>
//                 </div>
//               </div>
//             ))}
 
//             <div className="text-center text-blue-400 text-xs font-semibold mt-2 py-2 rounded-lg cursor-pointer hover:bg-blue-500/10 transition-colors flex items-center justify-center gap-1">
//               See All 14 Openings <FiChevronRight size={12} />
//             </div>
//           </section>
 
//           {/* Hiring Team */}
//           <section className="rounded-2xl p-5"
//             style={{
//               background: "rgba(15,30,60,0.65)",
//               border: "1px solid rgba(59,130,246,0.15)",
//               backdropFilter: "blur(16px)",
//               boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
//               animation: "fadeSlideUp 0.5s ease 0.35s both",
//             }}>
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="font-black text-base text-slate-100 flex items-center gap-2" style={{ fontFamily: "'Syne', sans-serif" }}>
//                 <HiOutlineOfficeBuilding className="text-blue-400" /> Hiring Team
//               </h2>
//               <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
//                 <span style={{
//                   display: "inline-block", width: 7, height: 7, borderRadius: "50%",
//                   background: "#22c55e", boxShadow: "0 0 7px rgba(34,197,94,0.8)",
//                   animation: "pulseDot 2s ease-in-out infinite",
//                 }} />
//                 Active
//               </span>
//             </div>
 
//             <div className="flex items-center gap-3">
//               <div className="w-11 h-11 rounded-full flex items-center justify-center font-black text-base text-white flex-shrink-0"
//                 style={{
//                   background: "linear-gradient(135deg, #1d4ed8, #0f2450)",
//                   border: "2px solid rgba(59,130,246,0.4)",
//                   fontFamily: "'Syne', sans-serif",
//                 }}>
//                 SC
//               </div>
//               <div>
//                 <p className="font-bold text-sm text-slate-100" style={{ fontFamily: "'Syne', sans-serif" }}>Sarah Chen</p>
//                 <p className="text-slate-500 text-xs mt-0.5">Head of Talent Acquisition</p>
//               </div>
//             </div>
 
//             <button className="w-full mt-4 py-2.5 rounded-lg text-sm font-bold text-blue-400 flex items-center justify-center gap-2 transition-all hover:bg-blue-500/20"
//               style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)" }}>
//               <FiMail size={15} /> Message Team
//             </button>
//           </section>
 
//           {/* Quick Verification */}
//           <section className="rounded-2xl p-5"
//             style={{
//               background: "rgba(15,30,60,0.65)",
//               border: "1px solid rgba(59,130,246,0.15)",
//               backdropFilter: "blur(16px)",
//               boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
//               animation: "fadeSlideUp 0.5s ease 0.45s both",
//             }}>
//             <h2 className="font-black text-base text-slate-100 mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
//               Why <span className="text-blue-400">Join Us?</span>
//             </h2>
//             {["Remote-first culture", "Equity & stock options", "World-class R&D labs", "Global relocation support"].map((perk) => (
//               <div key={perk} className="flex items-center gap-2 text-slate-400 text-sm mb-2 last:mb-0">
//                 <FiCheckCircle className="text-emerald-400 flex-shrink-0" size={14} />
//                 {perk}
//               </div>
//             ))}
//           </section>
//         </div>
 
//       </div>
//     </div>
//   );
// }


import { useEffect } from "react";
import {
  FiGlobe,
  FiUserPlus,
  FiUsers,
  FiMapPin,
  FiCheckCircle,
  FiMail,
  FiChevronRight,
} from "react-icons/fi";
import { HiOutlineBriefcase } from "react-icons/hi";
import { MdVerified } from "react-icons/md";
 
const ACTIVE_ROLES = [
  {
    id: 1,
    title: "Senior Distributed Systems Engineer",
    tags: [
      { label: "Full-time", color: "blue" },
      { label: "Remote", color: "green" },
      { label: "$120k–$160k", color: "grey" },
    ],
    openings: 5,
  },
  {
    id: 2,
    title: "Product Design Lead",
    tags: [
      { label: "Full-time", color: "blue" },
      { label: "$100k–$130k", color: "grey" },
    ],
    openings: 2,
  },
  {
    id: 3,
    title: "DevOps Architect (30%)",
    tags: [
      { label: "Remote", color: "green" },
      { label: "$110k", color: "grey" },
    ],
    openings: 1,
  },
];
 
const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&q=80",
  "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=400&q=80",
];
 
const TAG_STYLES = {
  blue:  { background: "rgba(59,130,246,0.18)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.3)" },
  green: { background: "rgba(16,185,129,0.18)", color: "#34d399", border: "1px solid rgba(16,185,129,0.3)" },
  grey:  { background: "rgba(100,116,139,0.18)", color: "#94a3b8", border: "1px solid rgba(100,116,139,0.3)" },
};
 
/* ─── shared card style ─────────────────────────────── */
const cardStyle = {
  background: "#161b27",
  border: "1px solid #1e2535",
  borderRadius: 12,
  padding: "20px 22px",
};
 
export default function MyCompanyDetails() {
  /* inject keyframes once */
  useEffect(() => {
    if (document.getElementById("lmt-kf")) return;
    const s = document.createElement("style");
    s.id = "lmt-kf";
    s.textContent = `
      @keyframes pulseDot {
        0%,100% { opacity:1; transform:scale(1); }
        50%      { opacity:.5; transform:scale(.8); }
      }
    `;
    document.head.appendChild(s);
  }, []);
 
  return (
    /* ── root: plain dark background, NO glow / grid / stars ── */
    <div className="lg:ml-50" style={{ minHeight: "100vh", background: "#0d1117", color: "#c9d1d9", fontFamily: "system-ui, sans-serif" }}>
 
      {/* ════════════════════════════════
          HEADER  –  earth globe only here
          ════════════════════════════════ */}
      <header style={{
        position: "relative",
        background: "linear-gradient(135deg, #0d1f3c 0%, #0a1628 60%, #0d1117 100%)",
        borderBottom: "1px solid #1e2535",
        overflow: "hidden",
        padding: "18px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        {/* Earth globe — only in header top-right */}
        <div style={{
          position: "absolute",
          top: -60, right: -60,
          width: 220, height: 220,
          borderRadius: "50%",
          background: "radial-gradient(circle at 38% 38%, #1a4080 0%, #0f2a5a 30%, #061428 65%, #020810 100%)",
          boxShadow: "inset -20px -20px 50px rgba(0,0,0,0.85), 0 0 60px rgba(20,70,180,0.25)",
          opacity: 0.9,
          pointerEvents: "none",
        }} />
 
        {/* Logo + name */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, position: "relative", zIndex: 1 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 10, flexShrink: 0,
            background: "linear-gradient(135deg, #f59e0b, #b45309)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, boxShadow: "0 4px 14px rgba(245,158,11,0.35)",
          }}>🔬</div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#ffffff", fontWeight: 800, fontSize: 18, letterSpacing: "-0.3px" }}>
                LuminaTech Systems
              </span>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 3,
                fontSize: 10, fontWeight: 700, color: "#60a5fa",
                background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.35)",
                padding: "2px 8px", borderRadius: 20, letterSpacing: "0.4px",
              }}>
                <MdVerified size={11} /> VERIFIED
              </span>
            </div>
            <p style={{ color: "#6b7280", fontSize: 12, marginTop: 3 }}>
              Empowering the future of enterprise cloud intelligence and distributed edge solutions.
            </p>
          </div>
        </div>
 
        {/* Buttons */}
        <div style={{ display: "flex", gap: 10, position: "relative", zIndex: 1 }}>
          <button style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "7px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600,
            background: "transparent", border: "1px solid #2d3748", color: "#9ca3af", cursor: "pointer",
          }}>
            <FiUserPlus size={13} /> Follow
          </button>
          <button style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "7px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600,
            background: "#1d4ed8", border: "none", color: "#ffffff", cursor: "pointer",
          }}>
            <FiGlobe size={13} /> Visit Website
          </button>
        </div>
      </header>
 
      {/* ════════════════════════════
          BODY  –  plain #0d1117
          ════════════════════════════ */}
      <div style={{
        maxWidth: 1060, margin: "0 auto", padding: "24px 20px",
        display: "grid", gridTemplateColumns: "1fr 288px", gap: 20,
      }}>
 
        {/* ── LEFT COLUMN ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
 
          {/* About */}
          <section style={cardStyle}>
            <h2 style={{ color: "#f0f4f8", fontWeight: 700, fontSize: 16, marginBottom: 12 }}>
              About LuminaTech
            </h2>
            <p style={{ color: "#6b7280", fontSize: 13.5, lineHeight: 1.75, margin: 0 }}>
              Founded in 2014, LuminaTech Systems has emerged as a global leader in high-performance cloud
              infrastructure and decentralised computing systems. We bridge the gap between traditional
              enterprise legacy architectures and the next generation of intelligent, automated cloud ecosystems.
            </p>
            <p style={{ color: "#6b7280", fontSize: 13.5, lineHeight: 1.75, marginTop: 10 }}>
              Our mission is to empower organisations with resilient, scalable, and secure technologies that drive
              meaningful progress. With a focus on R&D, LuminaTech holds over 100 patents in data encryption and
              real-time processing, standing at the bleeding edge of the digital revolution.
            </p>
          </section>
 
          {/* Company Stats */}
          <section style={cardStyle}>
            <h2 style={{ color: "#f0f4f8", fontWeight: 700, fontSize: 16, marginBottom: 14 }}>
              Company Stats
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
              {[
                { icon: <FiUsers size={20} />, value: "12,400+", label: "EMPLOYEES" },
                { icon: <FiMapPin size={20} />, value: "San Francisco", label: "HEADQUARTERS" },
                { icon: <FiGlobe size={20} />, value: "24 Countries", label: "PRESENCE" },
              ].map((s) => (
                <div key={s.label} style={{
                  background: "#1a2130", border: "1px solid #1e2535",
                  borderRadius: 10, padding: "14px 12px", textAlign: "center",
                }}>
                  <div style={{ color: "#9ca3af", display: "flex", justifyContent: "center", marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ color: "#f0f4f8", fontWeight: 700, fontSize: 15 }}>{s.value}</div>
                  <div style={{ color: "#4b5563", fontSize: 10, fontWeight: 600, letterSpacing: "0.7px", marginTop: 3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </section>
 
          {/* Life at LuminaTech */}
          <section style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h2 style={{ color: "#f0f4f8", fontWeight: 700, fontSize: 16, margin: 0 }}>Life at LuminaTech</h2>
              <button style={{
                background: "none", border: "none", color: "#60a5fa",
                fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 3,
              }}>
                View Gallery <FiChevronRight size={12} />
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
              {GALLERY_IMAGES.map((src, i) => (
                <div key={i} style={{ height: 105, borderRadius: 8, overflow: "hidden" }}>
                  <img
                    src={src} alt={`Office ${i + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(0.75)" }}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
 
        {/* ── RIGHT COLUMN ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
 
          {/* Active Roles */}
          <section style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h2 style={{ color: "#f0f4f8", fontWeight: 700, fontSize: 15, margin: 0, display: "flex", alignItems: "center", gap: 6 }}>
                <HiOutlineBriefcase /> Active Roles
              </h2>
              <span style={{
                background: "#1d4ed8", color: "#fff", fontSize: 11,
                fontWeight: 700, padding: "1px 8px", borderRadius: 20,
              }}>14</span>
            </div>
 
            {ACTIVE_ROLES.map((role) => (
              <div key={role.id} style={{
                background: "#1a2130", border: "1px solid #1e2535",
                borderRadius: 10, padding: "12px 14px", marginBottom: 10,
              }}>
                <p style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 13, margin: "0 0 8px 0" }}>
                  {role.title}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
                  {role.tags.map((t) => (
                    <span key={t.label} style={{
                      fontSize: 10, fontWeight: 600, padding: "2px 8px",
                      borderRadius: 20, ...TAG_STYLES[t.color],
                    }}>
                      {t.label}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#4b5563", fontSize: 11 }}>
                    {role.openings} {role.openings === 1 ? "opening" : "openings"}
                  </span>
                  <button style={{
                    fontSize: 11, fontWeight: 700, color: "#60a5fa",
                    background: "transparent", border: "1px solid rgba(59,130,246,0.35)",
                    padding: "4px 12px", borderRadius: 6, cursor: "pointer",
                  }}>
                    Book Apply
                  </button>
                </div>
              </div>
            ))}
 
            <div style={{ textAlign: "center", color: "#60a5fa", fontSize: 12, fontWeight: 600, marginTop: 4, cursor: "pointer" }}>
              See All 14 Openings →
            </div>
          </section>
 
          {/* Hiring Team */}
          <section style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h2 style={{ color: "#f0f4f8", fontWeight: 700, fontSize: 15, margin: 0 }}># HIRING TEAM</h2>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
                background: "linear-gradient(135deg, #1e40af, #1e3a8a)",
                border: "2px solid #1e2535",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontWeight: 800, fontSize: 14,
              }}>SC</div>
              <div>
                <p style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 13, margin: 0 }}>Sarah Chen</p>
                <p style={{ color: "#4b5563", fontSize: 11, margin: "2px 0 0 0" }}>Head of Talent Acquisition</p>
              </div>
            </div>
            <button style={{
              width: "100%", marginTop: 14, padding: "9px 0",
              background: "#1a2130", border: "1px solid #1e2535",
              borderRadius: 8, color: "#9ca3af", fontSize: 13, fontWeight: 600,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}>
              <FiMail size={14} /> Message Team
            </button>
          </section>
 
        </div>
      </div>
    </div>
  );
}