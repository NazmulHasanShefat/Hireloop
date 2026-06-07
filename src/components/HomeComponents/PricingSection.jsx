"use client";
import React, { useState } from "react";
import { CrownDiamond, ChartColumn, Thunderbolt, Plus, ArrowRight } from "@gravity-ui/icons";

const plans = [
  {
    icon: CrownDiamond,
    name: "Starter",
    price: "$0",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    icon: ChartColumn,
    name: "Growth",
    price: "$17",
    featured: true,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    icon: Thunderbolt,
    name: "Premium",
    price: "$99",
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
  },
];

export default function PricingSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="bg-[#0a0a0a] text-white py-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] text-violet-400 uppercase mb-4">
            <span>•</span> PRICING <span>•</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
            Pay for the leverage,
            <br />
            not the listings
          </h2>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-1 bg-[#161616] border border-[#222] rounded-full p-1">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-1.5 text-sm rounded-full transition ${
                !yearly ? "bg-white text-black" : "text-neutral-400"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-1.5 text-sm rounded-full transition flex items-center gap-2 ${
                yearly ? "bg-white text-black" : "text-neutral-400"
              }`}
            >
              Yearly
              <span className="text-[10px] bg-violet-500 text-white px-2 py-0.5 rounded-full">
                25%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map(({ icon: Icon, name, price, features, featured }, i) => (
            <div
              key={i}
              className={`rounded-2xl border p-6 flex flex-col ${
                featured
                  ? "bg-[#161616] border-violet-500/40"
                  : "bg-[#0f0f0f] border-[#1f1f1f]"
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Icon width={16} height={16} className="text-violet-400" />
                  <span className="text-sm font-medium">{name}</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-semibold">{price}</span>
                  <span className="text-xs text-neutral-500"> /month</span>
                </div>
              </div>

              <p className="text-sm text-neutral-300 mb-4">
                Start building your insights hub:
              </p>

              <ul className="space-y-3 mb-8 flex-1">
                {features.map((f, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-2 text-sm text-neutral-300"
                  >
                    <span className="w-4 h-4 rounded-full bg-[#1f1f1f] flex items-center justify-center">
                      <Plus width={10} height={10} className="text-violet-400" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full rounded-xl py-3 px-4 flex items-center justify-between text-sm font-medium transition ${
                  featured
                    ? "bg-white text-black hover:bg-neutral-200"
                    : "bg-[#1a1a1a] text-white border border-[#262626] hover:bg-[#222]"
                }`}
              >
                Choose This Plan
                <ArrowRight width={16} height={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}