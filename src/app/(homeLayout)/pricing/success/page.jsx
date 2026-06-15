import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { stripe } from '@/lib/stripe';

// Icons from react-icons library
import { HiCheck } from 'react-icons/hi';
import { GoShieldCheck } from 'react-icons/go';
import { HiArrowRight } from 'react-icons/hi2';

export default async function Success({ searchParams }) {
  // Await searchParams as required by newer Next.js versions
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)');
  }

  // Retrieve details directly from Stripe
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  });

  const status = session.status;
  const customerEmail = session.customer_details?.email;
  
  // Calculate dynamic total from Stripe metadata (converted from cents to dollars)
  const amountTotal = session.amount_total ? (session.amount_total / 100).toFixed(2) : '20.00';

  // Fallback to safety redirect if check isn't finalized
  if (status === 'open') {
    return redirect('/');
  }

  if (status === 'complete') {
    return (
      <div className="relative min-h-screen bg-[#0b0c10] text-white flex items-center justify-center p-4 overflow-hidden font-sans">
        
        {/* Background Top Radial Glow effect */}
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

          {/* Dynamic Content Block parsed cleanly from Stripe response payloads */}
          <div className="space-y-4 text-sm text-zinc-400 max-w-[340px] mb-6 leading-relaxed">
            <p>
              Your payment of <span className="text-white font-semibold">${amountTotal}</span> was received perfectly.
            </p>
            <p>
              A confirmation receipt will be delivered shortly to{' '}
              <span className="text-zinc-200 font-medium break-all">{customerEmail}</span>.
            </p>
            <p className="text-emerald-400 font-medium text-xs pt-1">
              You may need to re-authenticate to see the effect.
            </p>
          </div>

          {/* Verified Session ID Section using real dynamic Stripe Token */}
          <div className="w-full bg-[#191a20] border border-zinc-800/80 rounded-xl p-3.5 flex items-center justify-between mb-8 text-xs">
            <div className="flex items-center gap-2 text-zinc-400 font-medium">
              <GoShieldCheck className="w-4 h-4 text-zinc-500" />
              <span>Session ID verified</span>
            </div>
            <code 
              title={session_id} 
              className="bg-[#21232c] text-zinc-500 font-mono px-2 py-1 rounded border border-zinc-800 tracking-wide max-w-[150px] truncate"
            >
              {session_id}
            </code>
          </div>

          {/* Main Action Button */}
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

  // Fallback rendering state
  return null;
}