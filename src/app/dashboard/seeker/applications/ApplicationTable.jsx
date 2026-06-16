"use client";
import React from "react";
import { FiBriefcase, FiArrowRight } from "react-icons/fi";

// Helper function to calculate human-readable relative time (e.g., "2 hours ago", "1 day ago")
const getRelativeTime = (dateString) => {
  if (!dateString) return "N/A";
  const now = new Date();
  const past = new Date(dateString);
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerWeek = msPerDay * 7;

  const elapsed = now - past;

  if (elapsed < msPerMinute) {
    return "Just now";
  } else if (elapsed < msPerHour) {
    const mins = Math.round(elapsed / msPerMinute);
    return `${mins} minute${mins > 1 ? "s" : ""} ago`;
  } else if (elapsed < msPerDay) {
    const hours = Math.round(elapsed / msPerHour);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (elapsed < msPerWeek) {
    const days = Math.round(elapsed / msPerDay);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else {
    return past.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  }
};

const SeekerApplicationTable = ({ applications = [], onDetailsClick }) => {
  return (
    <div className="w-full bg-white dark:bg-[#121212] rounded-xl border border-neutral-200 dark:border-neutral-800/80 text-neutral-800 dark:text-neutral-200 shadow-sm transition-colors duration-200">
      
      {/* 1. Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse text-left text-sm text-neutral-600 dark:text-neutral-300">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-400 dark:text-neutral-500 font-medium bg-neutral-50/50 dark:bg-[#161616]/30">
              <th className="py-4 px-6">Job Title</th>
              <th className="py-4 px-6">Company</th>
              <th className="py-4 px-6">Applied</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Action</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/40">
            {applications.map((app) => {
              const appId = app._id?.$oid || app._id;
              
              // Normalize data properties from schema; support status string configurations safely
              const currentStatus = app.status?.toLowerCase() || "applied";
              const appliedTime = app.createdAt?.$date || app.createdAt;

              return (
                <tr 
                  key={appId} 
                  className="hover:bg-neutral-50/60 dark:hover:bg-neutral-900/30 transition-colors duration-150"
                >
                  {/* Job Title Stacked with Sub-metadata details */}
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 shrink-0">
                        <FiBriefcase className="text-base" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-neutral-800 dark:text-neutral-100 leading-snug">
                          {app.jobTitle || "General Manager"}
                        </span>
                        <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium mt-0.5">
                          {app.jobType || "Full-time"} • {app.isRemote !== false ? "Remote" : "On-site"}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Company Column */}
                  <td className="py-5 px-6 font-medium text-neutral-700 dark:text-neutral-300">
                    {app.companyName || "Adobe"}
                  </td>

                  {/* Applied Relative Timestamp Column */}
                  <td className="py-5 px-6 text-neutral-500 dark:text-neutral-400">
                    {getRelativeTime(appliedTime)}
                  </td>

                  {/* Application Custom Status Badge Column */}
                  <td className="py-5 px-6">
                    {currentStatus === "applied" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-700 dark:bg-transparent dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700">
                        Applied
                      </span>
                    )}
                    {currentStatus === "review" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-transparent dark:text-amber-500 border border-amber-300 dark:border-amber-500/40">
                        Review
                      </span>
                    )}
                    {currentStatus === "shortlisted" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-transparent dark:text-emerald-500 border border-emerald-300 dark:border-emerald-500/40">
                        Shortlisted
                      </span>
                    )}
                    {currentStatus === "rejected" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 dark:bg-transparent dark:text-red-500 border border-red-300 dark:border-red-500/40">
                        Rejected
                      </span>
                    )}
                    {currentStatus === "offered" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 dark:bg-transparent dark:text-purple-400 border border-purple-300 dark:border-purple-500/40">
                        Offered
                      </span>
                    )}
                  </td>

                  {/* Desktop Action Row Column */}
                  <td className="py-5 px-6 text-right">
                    <button 
                      onClick={() => onDetailsClick?.(app)}
                      className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white underline underline-offset-4 transition-colors"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 2. Mobile Responsive Stacked List Card View */}
      <div className="grid grid-cols-1 divide-y divide-neutral-100 dark:divide-neutral-800/60 md:hidden">
        {applications.map((app) => {
          const appId = app._id?.$oid || app._id;
          const currentStatus = app.status?.toLowerCase() || "applied";
          const appliedTime = app.createdAt?.$date || app.createdAt;

          return (
            <div key={appId} className="p-4 flex flex-col gap-3.5 bg-white dark:bg-transparent">
              {/* Identity Header Row */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 mt-0.5 shrink-0">
                    <FiBriefcase className="text-base" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-semibold text-neutral-800 dark:text-neutral-100 text-sm leading-snug">
                      {app.jobTitle || "General Manager"}
                    </h3>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-0.5">
                      {app.companyName || "Adobe"}
                    </span>
                  </div>
                </div>

                {/* Status Badging Row for Mobile */}
                <div className="shrink-0 text-xs">
                  {currentStatus === "applied" && (
                    <span className="px-2.5 py-0.5 rounded-full font-semibold border bg-neutral-50 dark:bg-transparent text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700">Applied</span>
                  )}
                  {currentStatus === "review" && (
                    <span className="px-2.5 py-0.5 rounded-full font-semibold border bg-amber-50 dark:bg-transparent text-amber-700 dark:text-amber-500 border-amber-200 dark:border-amber-500/30">Review</span>
                  )}
                  {currentStatus === "shortlisted" && (
                    <span className="px-2.5 py-0.5 rounded-full font-semibold border bg-emerald-50 dark:bg-transparent text-emerald-700 dark:text-emerald-500 border-emerald-200 dark:border-emerald-500/30">Shortlisted</span>
                  )}
                  {currentStatus === "rejected" && (
                    <span className="px-2.5 py-0.5 rounded-full font-semibold border bg-red-50 dark:bg-transparent text-red-700 dark:text-red-500 border-red-200 dark:border-red-500/30">Rejected</span>
                  )}
                  {currentStatus === "offered" && (
                    <span className="px-2.5 py-0.5 rounded-full font-semibold border bg-purple-50 dark:bg-transparent text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-500/30">Offered</span>
                  )}
                </div>
              </div>

              {/* Meta Data Parameters Row */}
              <div className="flex items-center justify-between gap-2 text-xs text-neutral-400 dark:text-neutral-500 bg-neutral-50/50 dark:bg-neutral-900/30 border border-neutral-100 dark:border-neutral-800/40 p-2.5 rounded-lg">
                <div>
                  <span className="font-semibold text-neutral-600 dark:text-neutral-400">Type:</span>{" "}
                  {app.jobType || "Full-time"} • {app.isRemote !== false ? "Remote" : "On-site"}
                </div>
                <div className="text-right">
                  <span className="font-semibold text-neutral-600 dark:text-neutral-400">Applied:</span>{" "}
                  {getRelativeTime(appliedTime)}
                </div>
              </div>

              {/* Mobile CTA Row */}
              <button
                onClick={() => onDetailsClick?.(app)}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700 dark:bg-neutral-800/60 dark:hover:bg-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-700/80 transition-all"
              >
                View Details <FiArrowRight className="text-xs" />
              </button>
            </div>
          );
        })}
      </div>
      
    </div>
  );
};

export default SeekerApplicationTable;