"use client"
import { updateCompany } from '@/lib/actions/company';
import { toast } from '@heroui/react';
import React from 'react';
import { FaCircle } from 'react-icons/fa';

// Mock function to format MongoDB ISO dates nicely (e.g., "Oct 12, 2023")
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
};

// Helper to get initials if companyLogo is missing
const getInitials = (name) => {
  if (!name) return 'C';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const CompaniesTable = ({ companies = [] }) => {
  
  const handleReject = async (id) => {
    const result = await updateCompany(id, {status: "rejected"});
    toast.success("updated successfullt")
  };
  
  const handleApprove = async (id) => {
    console.log("hell approve", id);
    // Forwarded the target ID variable directly into your imported Server Action
    const result = await updateCompany(id, {status: "approved"});
    toast.success("updated successfullt")
  };

  return (
    <div className="w-full bg-white dark:bg-[#121212] p-4 md:p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 transition-colors duration-200">
      
      {/* 1. Desktop Table View (Visible on md screens and up) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm text-neutral-600 dark:text-neutral-300">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 font-medium">
              <th className="py-4 px-4">Company Name</th>
              <th className="py-4 px-4">Recruiter Email</th>
              <th className="py-4 px-4">Industry</th>
              <th className="py-4 px-4">Status</th>
              <th className="py-4 px-4">Date Submitted</th>
              <th className="py-4 px-4 text-center">Actions</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/50">
            {companies.map((company) => {
              // Extract standard ID safely across varying raw MongoDB variations
              const companyId = company?._id?.$oid || company?._id;
              
              const status = company.status?.toLowerCase() || 'pending';
              const isPending = status === 'pending';
              const isApproved = status === 'approved';
              const isRejected = status === 'rejected';

              return (
                <tr 
                  key={companyId}
                  className="hover:bg-neutral-50 dark:hover:bg-neutral-900/40 transition-colors duration-150"
                >
                  {/* Company Profile (Logo + Name) */}
                  <td className="py-4 px-4 flex items-center gap-3">
                    {company.companyLogo ? (
                      <img
                        src={company.companyLogo}
                        alt={company.companyName}
                        className="w-8 h-8 rounded bg-white dark:bg-neutral-800 object-contain border border-neutral-200 dark:border-neutral-700 p-0.5"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-[11px] font-bold text-neutral-600 dark:text-neutral-300 flex items-center justify-center">
                        {getInitials(company.companyName)}
                      </div>
                    )}
                    <span className="font-medium text-neutral-800 dark:text-neutral-200">
                      {company.companyName || 'N/A'}
                    </span>
                  </td>

                  {/* Recruiter Email */}
                  <td className="py-4 px-4 text-neutral-500 dark:text-neutral-400 font-mono text-xs">
                    {company.recruiterEmail || 'recruiter@domain.com'}
                  </td>

                  {/* Industry */}
                  <td className="py-4 px-4 text-neutral-500 dark:text-neutral-400">
                    {company.companyIndustry || 'N/A'}
                  </td>

                  {/* Status Indicator */}
                  <td className="py-4 px-4">
                    {isPending && (
                      <span className="inline-flex items-center gap-2 font-medium text-amber-600 dark:text-amber-500">
                        <FaCircle className="text-[7px]" /> Pending
                      </span>
                    )}
                    {isApproved && (
                      <span className="inline-flex items-center gap-2 font-medium text-emerald-600 dark:text-emerald-500">
                        <FaCircle className="text-[7px]" /> Approved
                      </span>
                    )}
                    {isRejected && (
                      <span className="inline-flex items-center gap-2 font-medium text-red-600 dark:text-red-500">
                        <FaCircle className="text-[7px]" /> Rejected
                      </span>
                    )}
                  </td>

                  {/* Date Submitted */}
                  <td className="py-4 px-4 text-neutral-500 dark:text-neutral-400">
                    {formatDate(company?.createdAt?.$date || company?.createdAt)}
                  </td>

                  {/* Desktop Action Buttons */}
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-3 text-xs font-semibold">
                      {isPending && (
                        <>
                          <button onClick={() => handleApprove(companyId)} className="px-3 py-1 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-500 border border-emerald-200 dark:border-emerald-900/30 hover:opacity-80 transition-all">
                            Approve
                          </button>
                          <button onClick={() => handleReject(companyId)} className="px-3 py-1 rounded bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-500 border border-red-200 dark:border-red-900/30 hover:opacity-80 transition-all">
                            Reject
                          </button>
                        </>
                      )}
                      {isApproved && (
                        <button onClick={() => handleReject(companyId)} className="px-3 py-1 rounded bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-500 border border-red-200 dark:border-red-900/30 hover:opacity-80 transition-all">
                          Reject
                        </button>
                      )}
                      {isRejected && (
                        <button onClick={() => handleApprove(companyId)} className="px-3 py-1 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-500 border border-emerald-200 dark:border-emerald-900/30 hover:opacity-80 transition-all">
                          Approve
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 2. Mobile Card Layout (Visible below md breakpoint screens) */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {companies.map((company) => {
          const companyId = company?._id?.$oid || company?._id;
          
          const status = company.status?.toLowerCase() || 'pending';
          const isPending = status === 'pending';
          const isApproved = status === 'approved';
          const isRejected = status === 'rejected';

          return (
            <div 
              key={companyId}
              className="p-4 rounded-lg bg-neutral-50/50 dark:bg-neutral-900/20 border border-neutral-100 dark:border-neutral-800/60 flex flex-col gap-3"
            >
              {/* Identity Header */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  {company.companyLogo ? (
                    <img
                      src={company.companyLogo}
                      alt={company.companyName}
                      className="w-10 h-10 rounded bg-white dark:bg-neutral-800 object-contain border border-neutral-200 dark:border-neutral-700 p-0.5"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-neutral-600 dark:text-neutral-300 flex items-center justify-center shrink-0">
                      {getInitials(company.companyName)}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200 text-sm">
                      {company.companyName || 'N/A'}
                    </span>
                    <span className="text-neutral-500 dark:text-neutral-400 font-mono text-[11px] break-all max-w-[180px] sm:max-w-none">
                      {company.recruiterEmail || 'recruiter@domain.com'}
                    </span>
                  </div>
                </div>

                {/* Status Indicator Badge */}
                <div className="text-xs shrink-0">
                  {isPending && <span className="text-amber-600 dark:text-amber-500 font-medium">● Pending</span>}
                  {isApproved && <span className="text-emerald-600 dark:text-emerald-500 font-medium">● Approved</span>}
                  {isRejected && <span className="text-red-600 dark:text-red-500 font-medium">● Rejected</span>}
                </div>
              </div>

              <hr className="border-neutral-200/60 dark:border-neutral-800/50" />

              {/* Meta Parameters Block */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-semibold mb-0.5">Industry</span>
                  <span className="font-medium text-neutral-700 dark:text-neutral-300">{company.companyIndustry || 'N/A'}</span>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-semibold mb-0.5">Submitted</span>
                  <span className="font-medium text-neutral-700 dark:text-neutral-300">{formatDate(company?.createdAt?.$date || company?.createdAt)}</span>
                </div>
              </div>

              {/* Mobile Action Buttons */}
              <div className="mt-1 pt-2 border-t border-neutral-100 dark:border-neutral-800/40 flex items-center justify-end gap-2 text-xs font-semibold">
                {(isPending || isRejected) && (
                  <button onClick={() => handleApprove(companyId)} className="flex-1 sm:flex-none px-3 py-1.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/30 text-center">
                    Approve
                  </button>
                )}
                {(isPending || isApproved) && (
                  <button onClick={() => handleReject(companyId)} className="flex-1 sm:flex-none px-3 py-1.5 rounded bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400 border border-red-100 dark:border-red-900/30 text-center">
                    Reject
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default CompaniesTable;