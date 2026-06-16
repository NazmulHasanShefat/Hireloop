"use client"
import React from 'react';
import { FaPlus, FaChevronDown, FaEye, FaTrashAlt } from 'react-icons/fa';

// Function to format MongoDB ISO dates nicely (e.g., "Jun 15, 2026")
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
};

// Helper to get initials if company Logo is missing
const getInitials = (name) => {
  if (!name) return 'J';
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
};

const ManageJobsTable = ({ jobs = [], onCreateJob, onView, onDelete }) => {
  return (
    <div className="w-full bg-white dark:bg-[#121212] p-4 md:p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 transition-colors duration-200">
      
      {/* Dashboard Top Header Section */}
      <div className="flex flex-col gap-1 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">Manage Jobs</h1>
            <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
              Oversee all active listings and historical job posts across the platform.
            </p>
          </div>
          <button 
            onClick={onCreateJob}
            className="inline-flex items-center justify-center gap-2 self-start sm:self-center px-4 py-2 text-sm font-semibold rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 shadow transition-all shrink-0"
          >
            <FaPlus className="text-xs" /> Create Job
          </button>
        </div>
      </div>

      {/* Control Panel Filters & Segmented Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          {/* Status Dropdown */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">Status</span>
            <button className="inline-flex items-center gap-3 px-3 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-all text-neutral-600 dark:text-neutral-300">
              All Statuses <FaChevronDown className="text-[10px] text-neutral-400" />
            </button>
          </div>
          {/* Category Dropdown */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">Category</span>
            <button className="inline-flex items-center gap-3 px-3 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-all text-neutral-600 dark:text-neutral-300">
              All Categories <FaChevronDown className="text-[10px] text-neutral-400" />
            </button>
          </div>
        </div>

        {/* Segment Tabs */}
        <div className="inline-flex p-1 rounded-lg bg-neutral-100 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800 text-xs self-start lg:self-end">
          <button className="px-4 py-1.5 font-medium rounded-md bg-white text-neutral-900 dark:bg-neutral-800 dark:text-white shadow-sm transition-all">
            Active <span className="opacity-60 font-normal">({jobs.filter(j => j.status?.toLowerCase() === 'active').length})</span>
          </button>
          <button className="px-4 py-1.5 font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-all">
            Closed <span className="opacity-60 font-normal">({jobs.filter(j => j.status?.toLowerCase() === 'closed').length})</span>
          </button>
        </div>
      </div>

      {/* 1. Desktop Layout: Main Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[950px] border-collapse text-left text-sm text-neutral-600 dark:text-neutral-300">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-400 dark:text-neutral-500 font-medium text-xs uppercase tracking-wider">
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Company</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Date Posted</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/40">
            {jobs.map((job) => {
              const isActive = job.status?.toLowerCase() === 'active';
              // Generates a dynamic reference ID using the end of the Mongo ID string
              const generatedRef = job._id? `HL-${job._id.slice(-5).toUpperCase()}` : 'N/A';

              return (
                <tr key={job?._id} className="hover:bg-neutral-50/60 dark:hover:bg-neutral-900/30 transition-colors">
                  {/* Title & Reference ID */}
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-neutral-800 dark:text-neutral-100">{job.jobTitle || 'Untitled Role'}</span>
                      <span className="text-[11px] text-neutral-400 font-mono mt-0.5">Ref: {generatedRef}</span>
                    </div>
                  </td>

                  {/* Company Name with Initial Avatar */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {job.companyLogo ? (
                        <img src={job.companyLogo} alt="" className="w-6 h-6 rounded bg-neutral-100 dark:bg-neutral-800 object-contain border border-neutral-200 dark:border-neutral-700 p-0.5" />
                      ) : (
                        <div className="w-6 h-6 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-[9px] font-bold text-neutral-500 dark:text-neutral-400 flex items-center justify-center shrink-0">
                          {getInitials(job.companyName)}
                        </div>
                      )}
                      <span className="font-medium text-neutral-700 dark:text-neutral-300">{job.companyName || 'Unknown'}</span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-4 text-neutral-500 dark:text-neutral-400">{job.jobCategory || 'General'}</td>

                  {/* Workplace Type (Handles remote override option too) */}
                  <td className="py-4 px-4 text-neutral-500 dark:text-neutral-400">
                    {job.isRemote ? 'Remote' : (job.jobType || 'N/A')}
                  </td>

                  {/* Date Posted */}
                  <td className="py-4 px-4 text-neutral-500 dark:text-neutral-400">
                    {formatDate(job.createdAt)}
                  </td>

                  {/* Status Pills */}
                  <td className="py-4 px-4">
                    {isActive ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold tracking-wide bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400 border border-green-200/60 dark:border-green-900/30 uppercase">
                        ● Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold tracking-wide bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 uppercase">
                        ● Closed
                      </span>
                    )}
                  </td>

                  {/* Actions (View/Delete Icons) */}
                  <td className="py-4 px-4 text-right">
                    <div className="inline-flex items-center gap-3 text-neutral-400">
                      <button onClick={() => onView?.(job)} className="p-1.5 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors" title="View Details">
                        <FaEye className="text-sm" />
                      </button>
                      <button onClick={() => onDelete?.(job)} className="p-1.5 hover:text-red-500 dark:hover:text-red-400 transition-colors" title="Delete Post">
                        <FaTrashAlt className="text-sm" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 2. Mobile Layout: Responsive Stacked Cards */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {jobs.map((job) => {
          const isActive = job.status?.toLowerCase() === 'active';
          const generatedRef = job._id ? `HL-${job._id.slice(-5).toUpperCase()}` : 'N/A';

          return (
            <div key={job?._id} className="p-4 rounded-lg bg-neutral-50/50 dark:bg-neutral-900/20 border border-neutral-100 dark:border-neutral-800/60 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-neutral-800 dark:text-neutral-100 text-sm leading-tight">{job.jobTitle || 'Untitled Role'}</h3>
                  <span className="text-[10px] text-neutral-400 font-mono">Ref: {generatedRef}</span>
                </div>
                {isActive ? (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400 border border-green-200/50 dark:border-green-900/30 uppercase">Active</span>
                ) : (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 uppercase">Closed</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-x-2 gap-y-3 text-xs pt-1 border-t border-neutral-100 dark:border-neutral-800/40">
                <div>
                  <span className="block text-[10px] uppercase font-semibold tracking-wider text-neutral-400 dark:text-neutral-500 mb-0.5">Company</span>
                  <span className="font-medium text-neutral-700 dark:text-neutral-300 break-words">{job.companyName || 'N/A'}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-semibold tracking-wider text-neutral-400 dark:text-neutral-500 mb-0.5">Category</span>
                  <span className="font-medium text-neutral-700 dark:text-neutral-300">{job.jobCategory || 'N/A'}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-semibold tracking-wider text-neutral-400 dark:text-neutral-500 mb-0.5">Type</span>
                  <span className="font-medium text-neutral-700 dark:text-neutral-300">
                    {job.isRemote ? 'Remote' : (job.jobType || 'N/A')}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-semibold tracking-wider text-neutral-400 dark:text-neutral-500 mb-0.5">Posted</span>
                  <span className="font-medium text-neutral-700 dark:text-neutral-300">{formatDate(job.createdAt)}</span>
                </div>
              </div>

              {/* Mobile Actions */}
              <div className="flex items-center justify-end gap-2 mt-1 pt-2 border-t border-neutral-100 dark:border-neutral-800/40">
                <button onClick={() => onView?.(job)} className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 text-xs font-medium border border-neutral-200 dark:border-neutral-700 w-full sm:w-auto">
                  <FaEye /> View
                </button>
                <button onClick={() => onDelete?.(job)} className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400 text-xs font-medium border border-red-100 dark:border-red-900/30 w-full sm:w-auto">
                  <FaTrashAlt /> Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default ManageJobsTable;