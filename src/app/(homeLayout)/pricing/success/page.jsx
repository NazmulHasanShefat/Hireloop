import React from 'react';
import Link from 'next/link';
// Importing specific icons to match the design elements in "Screenshot 2026-06-15 112918.png"
import { HiCheck } from 'react-icons/hi';
import { GoShieldCheck } from 'react-icons/go';
import { HiArrowRight } from 'react-icons/hi2';

export default function PaymentSuccess() {
  // Hardcoded mock session ID matching the visual format of the Stripe session token in the image
  const stripeSessionId = "cs_test_a1b2c3...4d5e6f";

  return (
    <div className="relative min-h-screen bg-[#0b0c10] text-white flex items-center justify-center p-4 overflow-hidden font-sans">
      
      {/* Background Top Radial Glow mimicking the exact blue lighting effect in the image */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Success Card container */}
      <div className="relative z-10 w-full max-w-md bg-[#131418] border border-zinc-800/60 rounded-3xl p-8 flex flex-col items-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
        {/* Green Accent Circle with Checkmark */}
        <div className="w-14 h-14 bg-emerald-950/40 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 mb-5">
          <HiCheck className="w-6 h-6 stroke-[1.5]" />
        </div>

        {/* Upgrade Successful Small Badge */}
        <span className="text-[10px] tracking-[0.15em] font-bold text-blue-400 bg-blue-950/40 border border-blue-900/50 px-3 py-1 rounded-full uppercase mb-4">
          Upgrade Successful
        </span>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-100 mb-4">
          Welcome to Hireloop Pro
        </h1>

        {/* Paragraph Details with subtle text dimming and green emphasis text */}
        <div className="space-y-4 text-sm text-zinc-400 max-w-[320px] mb-6 leading-relaxed">
          <p>
            Your payment of <span className="text-white font-semibold">$20.00</span> was received perfectly.
          </p>
          <p>
            All advanced premium recruiting modules are unlocked on your account.{' '}
            <span className="text-emerald-400 font-medium block mt-1">
              You may need to re-authenticate to see the effect.
            </span>
          </p>
        </div>

        {/* Session ID Token Badge Component */}
        <div className="w-full bg-[#191a20] border border-zinc-800/80 rounded-xl p-3.5 flex items-center justify-between mb-8 text-xs">
          <div className="flex items-center gap-2 text-zinc-400 font-medium">
            <GoShieldCheck className="w-4 h-4 text-zinc-500" />
            <span>Session ID verified</span>
          </div>
          <code className="bg-[#21232c] text-zinc-500 font-mono px-2 py-1 rounded border border-zinc-800 tracking-wide max-w-[130px] truncate">
            {stripeSessionId}
          </code>
        </div>

        {/* Main Navigation CTA Link / Button */}
        <Link href="/dashboard" className="w-full">
          <button className="w-full bg-white text-black hover:bg-zinc-200 active:scale-[0.99] transition-all py-3.5 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg">
            <span>Go to Workspace Dashboard</span>
            <HiArrowRight className="w-4 h-4 stroke-[1.5]" />
          </button>
        </Link>
        
      </div>
    </div>
  );
}