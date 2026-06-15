"use client";

import Link from "next/link";
import { FiAlertTriangle, FiArrowLeft, FiHome } from "react-icons/fi";

export default function UnauthorizedPage() {
  // Function to navigate to the previous page
  const handleGoBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a] px-4 transition-colors duration-200">
      <div className="max-w-md w-full text-center p-8 bg-white dark:bg-[#121212] rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 transition-all">
        
        {/* Warning Icon with Animation */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-full text-red-500 dark:text-red-400 animate-bounce">
            <FiAlertTriangle className="size-12" />
          </div>
        </div>

        {/* Headings */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Access Denied!
        </h1>
        <h2 className="text-sm font-semibold text-red-500 dark:text-red-400 uppercase tracking-wide mb-4">
          401 - Unauthorized Access
        </h2>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-8 leading-relaxed">
          Sorry, you do not have the required permissions to view this page. Please log in with a correct account or return to the homepage.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          
          {/* Home Button (Primary Action) */}
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <FiHome className="size-4" />
            Go to Homepage
          </Link>
          
          {/* Back Button (Secondary Action) */}
          <button
            onClick={handleGoBack}
            className="flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-lg transition-colors border border-gray-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-gray-500/50"
            type="button"
          >
            <FiArrowLeft className="size-4" />
            Previous Page
          </button>
        </div>

      </div>
    </div>
  );
}