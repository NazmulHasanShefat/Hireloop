import React from "react";
import {
  Magnifier,
  ChartLine,
  BarsAscendingAlignLeft,
  Bookmark,
  ArrowChevronRight,
  FileText,
  Sparkles,
  ChartTreemap,
} from "@gravity-ui/icons";

const features = [
  {
    icon: Magnifier,
    title: "Smart Search",
    desc: "Find your ideal job with advanced filters.",
  },
  {
    icon: ChartLine,
    title: "Salary Insights",
    desc: "Get real salary data to negotiate confidently.",
  },
  {
    icon: BarsAscendingAlignLeft,
    title: "Top Companies",
    desc: "Apply to vetted companies that are hiring.",
  },
  {
    icon: Bookmark,
    title: "Saved Jobs",
    desc: "Manage apps & favorites on your dashboard.",
  },
  {
    icon: ArrowChevronRight,
    title: "One-Click Apply",
    desc: "Simplify your job applications for an easier process!",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    desc: "Create professional resumes with modern templates.",
  },
  {
    icon: Sparkles,
    title: "Skill-Based Matching",
    desc: "Discover jobs that match your skills and experience.",
  },
  {
    icon: ChartTreemap,
    title: "Career Growth Resources",
    desc: "Boost your career with quick interview tips.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-[#0a0a0a] text-white py-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] text-violet-400 uppercase mb-4">
            <span className="text-violet-400">•</span>
            Features Job
            <span className="text-violet-400">•</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
            Everything you need
            <br />
            to succeed
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#161616] border border-[#222] flex items-center justify-center">
                <Icon width={18} height={18} className="text-violet-400" />
              </div>
              <h3 className="text-[15px] font-semibold">{title}</h3>
              <p className="text-[13px] text-neutral-400 leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}