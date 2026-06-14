import React from 'react';
import { Link } from "@heroui/react";
import { 
  FaMapMarkerAlt, 
  FaBriefcase, 
  FaEuroSign, 
  FaCalendarAlt, 
  FaBuilding, 
  FaCheckCircle, 
  FaClipboardList, 
  FaExternalLinkAlt 
} from "react-icons/fa";
import { getJobDetails } from '@/lib/api/jobs';

// // ডাটা ফেচ করার জন্য একটি ডামি ফাংশন (আপনার বাস্তব API বা DB Query দিয়ে এটি পরিবর্তন করবেন)
// async function getJobDetails(id) {
//   // উদাহরণস্বরূপ আপনার দেওয়া ডাটা স্ট্রাকচারটি এখানে রিটার্ন করা হচ্ছে
//   return {
//     _id: id,
//     jobTitle: "web developer",
//     jobCategory: "Technology",
//     jobType: "Internship",
//     minSalary: "323",
//     maxSalary: "32",
//     currency: "EUR",
//     jobLocation: "new yourk",
//     applicationDeadline: "2026-06-30",
//     responsibilities: "1. Develop and maintain modern web applications using the MERN stack.\n2. Collaborate with cross-functional teams to define and ship new features.\n3. Write clean, scalable, and well-documented code.",
//     requirements: "1. Strong understanding of JavaScript, React, and Node.js.\n2. Experience with responsive UI development using Tailwind CSS.\n3. Familiarity with MongoDB or relational databases.",
//     isRemote: false,
//     companyId: "6a2e4f3f870710482c35768b",
//     recruiterId: "6a2e4efe6aaad13c23aaf88b",
//     status: "active",
//     isPubliclyVisible: true,
//     applyedUsers: []
//   };
// }

const JobDetailspage = async ({ params }) => {
  const { id } = await params;

const job = await getJobDetails(id);
console.log(job)

  if (!job || job.status !== "active") {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <h2 className="text-xl font-semibold text-zinc-400">Job not found or inactive.</h2>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#0a0a0a] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Top Header Section */}
        <div className="border-b border-zinc-800 pb-8 mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="bg-purple-500/10 text-purple-400 text-xs font-semibold px-3 py-1 rounded-full border border-purple-500/20 capitalize">
              {job.jobCategory}
            </span>
            {job.isRemote && (
              <span className="bg-green-500/10 text-green-400 text-xs font-semibold px-3 py-1 rounded-full border border-green-500/20">
                Remote Available
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white capitalize mb-2">
            {job.jobTitle}
          </h1>
          <p className="text-zinc-400 flex items-center gap-2 text-sm">
            <FaBuilding className="text-zinc-500" /> Company ID: <span className="font-mono text-zinc-300">{job.companyId}</span>
          </p>
        </div>

        {/* Two-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT COLUMN: Main Detailed Content (Takes 2 columns on large screens) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Responsibilities Section */}
            <div className="bg-[#121212] border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                <FaClipboardList className="text-purple-400 size-5" />
                Responsibilities
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line">
                {job.responsibilities}
              </p>
            </div>

            {/* Requirements Section */}
            <div className="bg-[#121212] border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                <FaCheckCircle className="text-purple-400 size-5" />
                Requirements
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line">
                {job.requirements}
              </p>
            </div>
            
          </div>

          {/* RIGHT COLUMN: Sidebar / Overview Card (Sticky on scroll) */}
          <div className="lg:sticky lg:top-6 space-y-6">
            <div className="bg-[#121212] border border-zinc-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold mb-6 text-white border-b border-zinc-800 pb-3">
                Job Overview
              </h3>

              {/* Overview Meta Data list */}
              <div className="space-y-5">
                {/* Location */}
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-purple-400 size-4 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-zinc-500 font-medium">Location</p>
                    <p className="text-sm text-zinc-200 capitalize">{job.jobLocation}</p>
                  </div>
                </div>

                {/* Job Type */}
                <div className="flex items-start gap-3">
                  <FaBriefcase className="text-purple-400 size-4 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-zinc-500 font-medium">Job Type</p>
                    <p className="text-sm text-zinc-200 capitalize">{job.jobType}</p>
                  </div>
                </div>

                {/* Salary */}
                <div className="flex items-start gap-3">
                  <FaEuroSign className="text-purple-400 size-4 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-zinc-500 font-medium">Salary Range</p>
                    <p className="text-sm text-zinc-200 font-mono">
                      {job.minSalary} - {job.maxSalary} ({job.currency})
                    </p>
                  </div>
                </div>

                {/* Application Deadline */}
                <div className="flex items-start gap-3">
                  <FaCalendarAlt className="text-purple-400 size-4 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-zinc-500 font-medium">Application Deadline</p>
                    <p className="text-sm text-zinc-200 font-mono">{job.applicationDeadline}</p>
                  </div>
                </div>
              </div>

              {/* Apply Now Dynamic Link Button */}
              <div className="mt-8">
                <Link
                  href={`/browse-jobs/jobs/${job._id}/apply`}
                  className="w-full inline-flex items-center justify-center bg-white text-black font-bold text-sm py-3 px-6 rounded-full transition-all duration-200 hover:bg-zinc-200 text-center shadow-lg hover:shadow-zinc-500/10"
                >
                  Apply Now
                  <Link.Icon className="ml-2 text-black size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default JobDetailspage;