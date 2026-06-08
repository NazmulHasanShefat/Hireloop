"use client"
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchJob = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="w-full bg-[#121212] pt-30 py-12 px-6 flex justify-center items-center">
      {/* Outer Wrapper Container */}
      <div className="w-full max-w-5xl bg-[#1e1e1e] border border-[#2d2d2d] rounded-xl p-5 md:p-6 shadow-xl">
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 w-full">
          
          {/* Input Field Container */}
          <div className="relative flex-grow w-full">
            {/* Search Icon */}
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <FiSearch className="text-[#666666] text-lg md:text-xl" />
            </div>
            
            {/* Search Input */}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by job title, keywords..."
              className="w-full bg-[#161616] text-white placeholder-[#555555] text-sm md:text-base pl-12 pr-4 py-3.5 rounded-lg border border-[#2d2d2d] focus:outline-none focus:border-[#444444] transition-colors duration-200"
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-full sm:w-auto bg-white text-[#121212] font-medium text-sm md:text-base px-8 py-3.5 rounded-lg hover:bg-gray-200 active:scale-[0.98] transition-all duration-200 shrink-0 whitespace-nowrap"
          >
            Search Jobs
          </button>

        </form>

      </div>
    </div>
  );
};

export default SearchJob;