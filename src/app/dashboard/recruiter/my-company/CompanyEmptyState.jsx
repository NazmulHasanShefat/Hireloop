"use client";

import React from "react";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FiPlus } from "react-icons/fi";
import RegisterCompanyModal from "./RegisterCompanyModal";

export default function CompanyRegisterEmptyState({recruiter}) {
  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-[#0d0d11] text-gray-200 px-6 py-12 select-none">
      
      {/* Central Illustration Block */}
      <div className="relative mb-8 flex items-center justify-center">
        {/* Subtle background glow effect */}
        <div className="absolute inset-0 bg-white/[0.02] blur-3xl rounded-full w-48 h-48 mx-auto" />
        
        {/* Abstract Dark Document Card Container */}
        <div className="relative w-44 h-44 bg-[#16161a] border-2 border-white/[0.03] rounded-2xl p-4 flex flex-col justify-between shadow-2xl opacity-75 transform -rotate-3">
          <div className="space-y-2.5">
            {/* Top Layout Grid Simulator */}
            <div className="w-10 h-8 rounded bg-white/[0.04]" />
            <div className="w-full h-2 rounded bg-white/[0.03]" />
            <div className="w-5/6 h-2 rounded bg-white/[0.03]" />
          </div>
          
          <div className="flex justify-end">
            <div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/[0.04]" />
          </div>
        </div>

        {/* Floating White Circular Badge Pin */}
        <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-white text-gray-900 shadow-xl flex items-center justify-center transform translate-x-1 -translate-y-1 z-10">
          <div className="relative">
            <HiOutlineBuildingOffice2 className="text-xl" />
            <FiPlus className="absolute -bottom-1 -right-1 text-[10px] bg-white rounded-full p-px stroke-[3]" />
          </div>
        </div>
      </div>

      {/* Copy / Typography Headers */}
      <div className="max-w-md text-center space-y-3 mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-wide">
          Company not registered yet
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed px-2">
          Set up your business profile to start posting high-performance job listings and manage your talent loop.
        </p>
      </div>

      {/* Primary Control Call To Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm px-4">
    
        <RegisterCompanyModal recruiter={recruiter}/>
        
        <button 
          onClick={() => console.log("Opening Help Center...")}
          className="w-full sm:w-auto flex-1 bg-[#1c1c21] hover:bg-[#25252c] border border-white/5 text-gray-300 hover:text-white text-xs font-medium py-3 px-6 rounded-lg transition-all duration-150"
        >
          View FAQ
        </button>
      </div>

      {/* Bottom Footer Help Context */}
      <p className="text-[11px] text-gray-600 font-light mt-12 tracking-wide">
        Need specialized assistance?{" "}
        <a href="#support" className="text-gray-500 hover:text-gray-400 underline transition-colors underline-offset-2">
          Contact our enterprise support team.
        </a>
      </p>

    </div>
  );
}