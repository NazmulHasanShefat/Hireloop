"use client"
import React, { useState } from 'react';
// Importing icons from react-icons (Lucide & Bootstrap sets)
import { FiBriefcase, FiTrendingUp, FiZap, FiAward, FiPieChart, FiUsers } from 'react-icons/fi';
import { HiPlus } from 'react-icons/hi';

export default function PricingPage() {
  // State to toggle between 'seekers' and 'recruiters'
  const [userType, setUserType] = useState('seekers');
  // State to toggle between 'monthly' and 'yearly' (as seen in the design)
  const [billingCycle, setBillingCycle] = useState('monthly');

  // Pricing Data from Image 1
  const pricingData = {
    seekers: [
      {
        plan: 'Free',
        price: 0,
        icon: <FiBriefcase className="text-pink-500 w-5 h-5" />,
        description: 'Browse & save up to 10 jobs, apply to up to 3 jobs per month, basic profile, email alerts',
        features: ['Browse & save up to 10 jobs', 'Apply to up to 3 jobs per month', 'Basic profile setup', 'Email alerts']
      },
      {
        plan: 'Pro',
        price: 19,
        icon: <FiTrendingUp className="text-purple-500 w-5 h-5" />,
        description: 'Apply to up to 30 jobs per month, unlimited saved jobs, application tracking, salary insights',
        features: ['Apply to up to 30 jobs/month', 'Unlimited saved jobs', 'Application tracking', 'Salary insights'],
        popular: true // Middle card highlighted like the design
      },
      {
        plan: 'Premium',
        price: 39,
        icon: <FiZap className="text-indigo-500 w-5 h-5" />,
        description: 'Everything in Pro + unlimited applications, profile boost to recruiters, early access to new jobs, priority support',
        features: ['Everything in Pro', 'Unlimited applications', 'Profile boost to recruiters', 'Early access & Priority support']
      }
    ],
    recruiters: [
      {
        plan: 'Free',
        price: 0,
        icon: <FiAward className="text-pink-500 w-5 h-5" />,
        description: 'Up to 3 active job posts, basic applicant management, standard listing visibility',
        features: ['Up to 3 active job posts', 'Basic applicant management', 'Standard listing visibility', 'Great for 1st year of hiring']
      },
      {
        plan: 'Growth',
        price: 49,
        icon: <FiPieChart className="text-purple-500 w-5 h-5" />,
        description: 'Up to 10 active job posts, applicant tracking, basic analytics, email support',
        features: ['Up to 10 active job posts', 'Applicant tracking system', 'Basic analytics', 'Email support'],
        popular: true
      },
      {
        plan: 'Enterprise',
        price: 149,
        icon: <FiUsers className="text-indigo-500 w-5 h-5" />,
        description: 'Up to 50 active job posts, advanced analytics dashboard, featured job listings, team collaboration, custom branding',
        features: ['Up to 50 active job posts', 'Advanced analytics dashboard', 'Featured job listings', 'Team collaboration & branding']
      }
    ]
  };

  const currentPlans = pricingData[userType];

  return (
    <div className="min-h-screen mt-20 bg-[#09090b] text-white py-16 px-4 flex flex-col items-center font-sans">
      
      {/* Target Audience Toggle (Seekers vs Recruiters) */}
      <div className="flex bg-[#18181b] p-1 rounded-full border border-zinc-800 mb-8 max-w-xs w-full transition-all">
        <button
          onClick={() => setUserType('seekers')}
          className={`flex-1 py-2 text-sm font-medium rounded-full transition-all ${
            userType === 'seekers' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-400 hover:text-white'
          }`}
        >
          For Job Seekers
        </button>
        <button
          onClick={() => setUserType('recruiters')}
          className={`flex-1 py-2 text-sm font-medium rounded-full transition-all ${
            userType === 'recruiters' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-400 hover:text-white'
          }`}
        >
          For Recruiters
        </button>
      </div>

      {/* Monthly / Yearly Switcher (Matching Image 2 Style) */}
      <div className="flex items-center bg-[#18181b] p-1 rounded-full border border-zinc-800 mb-12">
        <button 
          onClick={() => setBillingCycle('monthly')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
            billingCycle === 'monthly' ? 'bg-white text-black' : 'text-zinc-400'
          }`}
        >
          Monthly
        </button>
        <button 
          onClick={() => setBillingCycle('yearly')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 ${
            billingCycle === 'yearly' ? 'bg-white text-black' : 'text-zinc-400'
          }`}
        >
          <span>Yearly</span>
          <span className="bg-magenta-gradient bg-[#d946ef] text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
            25%
          </span>
        </button>
      </div>

      {/* 3-Tier Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full px-4">
        {currentPlans.map((tier, idx) => {
          // Dynamic billing calculation based on billingCycle state
          const displayPrice = billingCycle === 'yearly' ? Math.floor(tier.price * 0.75) : tier.price;

          return (
            <div
              key={idx}
              className={`bg-[#121214] border rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 ${
                tier.popular 
                  ? 'border-zinc-700 shadow-[0_0_30px_rgba(255,255,255,0.03)] ring-1 ring-zinc-600' 
                  : 'border-zinc-900'
              }`}
            >
              <div>
                {/* Header: Title, Icon and Price */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800">
                      {tier.icon}
                    </div>
                    <h3 className="text-xl font-medium tracking-tight text-zinc-200">{tier.plan}</h3>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold tracking-tight">${displayPrice}</span>
                    <span className="text-xs text-zinc-500 ml-1">/month</span>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 font-medium mb-6 leading-relaxed">
                  Start building your insights hub:
                </p>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-sm text-zinc-400">
                      <span className="p-0.5 bg-zinc-800 border border-zinc-700 rounded text-zinc-300 mt-0.5 flex-shrink-0">
                        <HiPlus className="w-3 h-3" />
                      </span>
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                className={`w-full py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                  tier.popular
                    ? 'bg-white text-black hover:bg-zinc-200'
                    : 'bg-[#27272a] text-zinc-200 hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                <span>Choose This Plan</span>
                <span className="text-base font-normal">→</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}