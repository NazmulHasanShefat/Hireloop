import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FiUsers, FiCheckCircle, FiBriefcase, FiXCircle } from "react-icons/fi";
import { MdOutlinePendingActions } from "react-icons/md";
import Image from "next/image";

const MyCompanysCards = ({ recruiterCompany = [] }) => {
  console.log(recruiterCompany);

  return (
    <div className="w-full min-h-screen bg-white dark:bg-[#121212] flex justify-center p-4 md:p-6 transition-colors duration-200">
      {/* Card Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {recruiterCompany.map((company) => {
          // Normalize the status string to handle lowercase safely
          const currentStatus = company?.status?.toLowerCase() || 'pending';
          
          const isApproved = currentStatus === 'approved' || currentStatus === 'verified';
          const isRejected = currentStatus === 'rejected';
          const isPending = currentStatus === 'pending';

          return (
            <div
              key={company._id?.$oid || company._id}
              className="bg-neutral-50 dark:bg-[#1e1e1e] border h-max border-neutral-200 dark:border-[#2d2d2d] rounded-2xl p-6 flex flex-col justify-between hover:border-neutral-300 dark:hover:border-[#3d3d3d] shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Top Section: Logo and Status Tag */}
              <div className="flex justify-between items-start mb-6 gap-2">
                {/* Logo Container */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white dark:bg-[#2d2d2d] border border-neutral-200 dark:border-[#3d3d3d] shrink-0">
                  {company.companyLogo ? (
                    <Image
                      width={50}
                      height={50}
                      src={company?.companyLogo}
                      alt={company?.companyName || "Company logo"}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <FiBriefcase className="text-neutral-500 dark:text-white text-xl" />
                  )}
                </div>

                {/* Dynamic Status Badge */}
                <div className="shrink-0">
                  {isApproved && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wider px-2.5 py-1 rounded-md border bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-[#142918] dark:text-[#4ade80] dark:border-[#1e4620]">
                      <FiCheckCircle className="text-xs" />
                      Approved
                    </span>
                  )}
                  
                  {isPending && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wider px-2.5 py-1 rounded-md border bg-amber-50 text-amber-600 border-amber-200 dark:bg-[#2e220f] dark:text-[#fbbf24] dark:border-[#4b3512]">
                      <MdOutlinePendingActions className="text-xs text-amber-500" />
                      Pending
                    </span>
                  )}

                  {isRejected && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wider px-2.5 py-1 rounded-md border bg-red-50 text-red-600 border-red-200 dark:bg-[#2a1414] dark:text-[#f87171] dark:border-[#4c1d1d]">
                      <FiXCircle className="text-xs" />
                      Rejected
                    </span>
                  )}
                </div>
              </div>

              {/* Middle Section: Name and Description */}
              <div className="mb-6 flex-grow">
                <h2 className="text-neutral-800 dark:text-white text-xl hover:underline cursor-pointer font-semibold mb-2 tracking-tight line-clamp-1">
                  {company.companyName || 'N/A'}
                </h2>
                <p className="text-neutral-500 dark:text-[#999999] text-sm leading-relaxed line-clamp-3">
                  {company.companyDescription || 'No description provided.'}
                </p>
              </div>

              {/* Bottom Section: Location and Employee Count Tags */}
              <div className="flex flex-wrap items-center gap-2 mt-auto">
                {/* Location Tag */}
                {company.companyLocation && (
                  <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-[#252525] border border-neutral-200 dark:border-[#2d2d2d] px-3 py-1.5 rounded-full text-neutral-600 dark:text-[#cccccc] text-xs">
                    <IoLocationOutline className="text-sm text-neutral-400 dark:text-[#888888]" />
                    <span>{company.companyLocation}</span>
                  </div>
                )}

                {/* Employees Tag */}
                {company.employeeRange && (
                  <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-[#252525] border border-neutral-200 dark:border-[#2d2d2d] px-3 py-1.5 rounded-full text-neutral-600 dark:text-[#cccccc] text-xs">
                    <FiUsers className="text-sm text-neutral-400 dark:text-[#888888]" />
                    <span>{company.employeeRange}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyCompanysCards;