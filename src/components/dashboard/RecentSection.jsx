"use client";

import React from "react";
import { FiExternalLink, FiUsers } from "react-icons/fi";
import { SiGoogle, SiMeta, SiStripe, SiTesla } from "react-icons/si";

export default function DashboardRecentTable() {
  // Mock Data for Recent Applications
  const applications = [
    {
      id: 1,
      name: "Julianne Moore",
      role: "Senior Product Designer",
      date: "Oct 24, 2023",
      experience: "6 years",
      status: "Interviewing",
      statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      id: 2,
      name: "Robert Downey",
      role: "Backend Engineer",
      date: "Oct 23, 2023",
      experience: "4 years",
      status: "New",
      statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      id: 3,
      name: "Emma Stone",
      role: "Marketing Lead",
      date: "Oct 22, 2023",
      experience: "8 years",
      status: "Reviewing",
      statusColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      id: 4,
      name: "Chris Pratt",
      role: "Product Manager",
      date: "Oct 21, 2023",
      experience: "5 years",
      status: "Rejected",
      statusColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    },
  ];

  // Mock Data for Top Companies
  const topCompanies = [
    {
      id: 1,
      name: "Google Inc.",
      category: "Technology • Mountain View",
      activeJobs: "24",
      icon: SiGoogle,
      iconColor: "text-blue-400",
    },
    {
      id: 2,
      name: "Meta Platforms",
      category: "Social Media • Menlo Park",
      activeJobs: "18",
      icon: SiMeta,
      iconColor: "text-blue-500",
    },
    {
      id: 3,
      name: "Stripe",
      category: "Fintech • San Francisco",
      activeJobs: "12",
      icon: SiStripe,
      iconColor: "text-indigo-400",
    },
    {
      id: 4,
      name: "Tesla",
      category: "Automotive • Austin",
      activeJobs: "31",
      icon: SiTesla,
      iconColor: "text-rose-500",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-5 py-4 grid grid-cols-1 lg:grid-cols-3 gap-6 select-none">
      
      {/* Left Column: Recent Applications Panel (Takes up 2 cols on Desktop) */}
      <div className="lg:col-span-2 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-100 tracking-wide">
            Recent Applications
          </h2>
          <button className="text-xs text-gray-400 hover:text-gray-200 transition-colors">
            View all
          </button>
        </div>

        {/* Outer Panel Container */}
        <div className="bg-[#16161a] border border-white/5 rounded-xl p-4 flex-1 shadow-md">
          {/* Scrollable container for mobile support */}
          <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-white/5">
            <table className="w-full min-w-[600px] text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="pb-3 text-[11px] font-medium uppercase tracking-wider text-gray-500">Candidate Name</th>
                  <th className="pb-3 text-[11px] font-medium uppercase tracking-wider text-gray-500">Role</th>
                  <th className="pb-3 text-[11px] font-medium uppercase tracking-wider text-gray-500">Date Applied</th>
                  <th className="pb-3 text-[11px] font-medium uppercase tracking-wider text-gray-500">Experience</th>
                  <th className="pb-3 text-[11px] font-medium uppercase tracking-wider text-gray-500 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {applications.map((app) => (
                  <tr key={app.id} className="group hover:bg-white/[0.01] transition-colors">
                    {/* Name Column with Avatar circle */}
                    <td className="py-3.5 flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <span className="text-[10px] text-gray-300 font-semibold uppercase">
                          {app.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-gray-200 tracking-wide group-hover:text-white transition-colors">
                        {app.name}
                      </span>
                    </td>
                    {/* Role */}
                    <td className="py-3.5 text-xs text-gray-400 font-light">{app.role}</td>
                    {/* Date */}
                    <td className="py-3.5 text-xs text-gray-400 font-light">{app.date}</td>
                    {/* Experience */}
                    <td className="py-3.5 text-xs text-gray-400 font-light">{app.experience}</td>
                    {/* Status Pill Badge */}
                    <td className="py-3.5 text-right">
                      <span className={`inline-block text-[10px] font-medium px-2.5 py-0.5 rounded-full border ${app.statusColor}`}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right Column: Top Companies Panel (Takes up 1 col on Desktop) */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-100 tracking-wide">
            My Top Companies
          </h2>
          <button className="text-xs text-gray-400 hover:text-gray-200 transition-colors">
            View all
          </button>
        </div>

        {/* Companies Sidebar Card Container */}
        <div className="bg-[#16161a] border border-white/5 rounded-xl p-4 flex flex-col justify-between gap-5 flex-1 shadow-md">
          <div className="flex flex-col gap-4">
            {topCompanies.map((company) => {
              const CompanyIcon = company.icon;
              return (
                <div 
                  key={company.id} 
                  className="flex items-center justify-between p-1.5 rounded-lg hover:bg-white/[0.02] transition-all group duration-150"
                >
                  {/* Left: Brand Icon + Metadata */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/5 flex items-center justify-center shrink-0">
                      <CompanyIcon className={`text-base ${company.iconColor}`} />
                    </div>
                    <div className="text-left min-w-0">
                      <h4 className="text-xs font-medium text-gray-200 truncate tracking-wide group-hover:text-white transition-colors">
                        {company.name}
                      </h4>
                      <p className="text-[10px] text-gray-500 truncate font-light mt-0.5">
                        {company.category}
                      </p>
                    </div>
                  </div>

                  {/* Right: Counter Stats */}
                  <div className="text-right shrink-0">
                    <p className="text-xs font-semibold text-gray-200 tracking-tight">
                      {company.activeJobs}
                    </p>
                    <p className="text-[9px] text-gray-500 uppercase tracking-wider font-medium mt-0.5">
                      Active Jobs
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Footer Call to Action Button */}
          <button className="w-full mt-2 py-2 px-4 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] text-xs font-medium text-gray-300 hover:text-white transition-all duration-150 flex items-center justify-center gap-2">
            View All Companies
            <FiExternalLink className="text-xs text-gray-400" />
          </button>
        </div>
      </div>

    </div>
  );
}