"use client";

import { useState } from "react";
import Image from "next/image";

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "DevOps Engineer",
];

export default function HeroComponent() {
  const [jobSearch, setJobSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [currentPosition, setCurrentPosition] = useState("Product Designer");

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      {/* ── Stars (decorative dots via CSS) ── */}
      {/* <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
            style={{
          backgroundImage:
            "radial-gradient(circle, rgba(200,190,255,0.55) 1px, transparent 1px)," +
            "radial-gradient(circle, rgba(200,190,255,0.3) 1px, transparent 1px)",
          backgroundSize: "120px 120px, 80px 80px",
          backgroundPosition: "0 0, 40px 40px",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 65%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 65%)",
        }}
      /> */}

      {/* ── Purple radial glow — top ── */}
      {/* <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 z-[1]"
        style={{
          width: "700px",
          height: "320px",
          background:
            "radial-gradient(ellipse 55% 70% at 50% -10%, rgba(110,30,200,0.48) 0%, transparent 75%)",
        }}
      /> */}

      {/* ── Globe image ── */}
      {/* <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 z-[2]"
        style={{ width: "640px" }}
      >
        <Image
          src="/globe.png"
          alt=""
          width={640}
          height={640}
          className="w-full object-contain object-bottom"
          style={{
            maskImage:
              "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.95) 65%)",
            WebkitMaskImage:
              "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.95) 65%)",
          }}
          priority
        />
      </div> */}

      {/* ── CTA-bg grid arc ── */}
      {/* <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 z-[3] w-full"
      >
        <Image
          src="/cta-bg.png"
          alt=""
          width={1320}
          height={700}
          className="w-full object-contain object-bottom opacity-55"
          style={{
            maskImage: "linear-gradient(to top, transparent 0%, black 55%)",
            WebkitMaskImage:
              "linear-gradient(to top, transparent 0%, black 55%)",
          }}
        />
      </div> */}

      {/* ── Blue ambient glow — center bottom ── */}
      {/* <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 z-[4]"
        style={{
          width: "600px",
          height: "260px",
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(80,60,255,0.16) 0%, transparent 80%)",
        }}
      /> */}

      {/* ── Bottom fade overlay ── */}
      {/* <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[5] h-48"
        style={{
          background: "linear-gradient(to top, #06060e 0%, transparent 100%)",
        }}
      /> */}

      {/* ══ Main Content ══ */}
      <div className="relative z-[10] flex flex-col items-center text-center px-4 pb-12 pt-10 w-full max-w-[700px]">
        {/* Badge */}
        <div
          className="mb-6 flex items-center gap-2 text-[11px] tracking-widest"
          style={{
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.06)",
            borderRadius: "999px",
            padding: "5px 14px",
            backdropFilter: "blur(10px)",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          <span
            className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] shrink-0"
            style={{ background: "linear-gradient(135deg,#f97316,#ef4444)" }}
          >
            🔥
          </span>
          <span>
            <strong className="text-white font-semibold">80,000+</strong> NEW
            JOBS THIS MONTH
          </span>
        </div>

        {/* Headline */}
        <h1
          className="mb-4 font-bold leading-[1.12] tracking-[-0.02em] text-white"
          style={{
            fontSize: "clamp(36px, 5vw, 52px)",
            fontFamily: "'Sora', 'Inter', sans-serif",
          }}
        >
          Find Your Dream Job Today
        </h1>

        {/* Subtitle */}
        <p
          className="mb-10 max-w-[420px] leading-[1.7]"
          style={{
            fontSize: "13.5px",
            color: "rgba(255,255,255,0.42)",
            fontFamily: "'Sora', sans-serif",
          }}
        >
          Hireloop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search Bar */}
        <div
          className="flex w-full max-w-[600px] items-center gap-0 p-[5px]"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: "16px",
            backdropFilter: "blur(14px)",
          }}
        >
          {/* Job Field */}
          <div className="flex flex-1 items-center gap-2 px-3 py-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={jobSearch}
              onChange={(e) => setJobSearch(e.target.value)}
              placeholder="Job title, skill or company"
              className="w-full bg-transparent text-[13px] text-white outline-none"
              style={{
                fontFamily: "'Sora', sans-serif",
                caretColor: "#a78bfa",
              }}
            />
          </div>

          {/* Divider */}
          <div
            className="h-6 w-px shrink-0"
            style={{ background: "rgba(255,255,255,0.14)" }}
          />

          {/* Location Field */}
          <div className="flex flex-1 items-center gap-2 px-3 py-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
              aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <input
              type="text"
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
              placeholder="Location or Remote"
              className="w-full bg-transparent text-[13px] text-white outline-none"
              style={{
                fontFamily: "'Sora', sans-serif",
                caretColor: "#a78bfa",
              }}
            />
          </div>

          {/* Search Button */}
          <button
            type="button"
            aria-label="Search jobs"
            className="shrink-0 flex items-center justify-center transition-opacity hover:opacity-85 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
              borderRadius: "11px",
              width: "42px",
              height: "42px",
              border: "none",
              cursor: "pointer",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>

        {/* Trending Positions */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span
            className="text-[11.5px]"
            style={{ color: "rgba(255,255,255,0.32)" }}
          >
            Trending Position
          </span>
          {trendingPositions.map((pos) => (
            <button
              onClick={()=> setCurrentPosition(pos)}
              key={pos}
              type="button"
              className={`rounded-full border px-[13px] py-1 text-[11.5px] font-sora transition-all duration-300 cursor-pointer
    ${
                currentPosition === pos
                  ? "border-purple-500 text-white"
                  : "border-white/15 bg-white/5 text-white/55 hover:border-purple-500 hover:text-white"
              }
            `}
            >
              {pos}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
