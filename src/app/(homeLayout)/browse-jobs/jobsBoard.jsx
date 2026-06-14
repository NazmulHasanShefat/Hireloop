"use client";

import React, { useState } from "react";
// Importing components directly from Hero UI based on your reference styles
import { Card, Link, Label, ListBox, Select } from "@heroui/react";
// React Icons
import { FaMapMarkerAlt, FaBriefcase, FaEuroSign, FaUserTie } from "react-icons/fa";

const initialJobs = [
  {
    _id: "6a2e5388eb3a782e791f469b",
    jobTitle: "web developer",
    jobCategory: "Technology",
    jobType: "Internship",
    minSalary: "32",
    maxSalary: "323",
    currency: "EUR",
    jobLocation: "new yourk",
    isRemote: false,
    status: "active",
  },
  {
    _id: "6a2e545feb3a782e791f469d",
    jobTitle: "Sinior Softower enginear",
    jobCategory: "Finance",
    jobType: "Full-time",
    minSalary: "32",
    maxSalary: "323",
    currency: "EUR",
    jobLocation: "Dhaka",
    isRemote: false,
    status: "active",
  }
];

export default function JobBoard({jobs}) {
  // Using an array-based selection matching Hero UI's state management style
  const [selectedKeys, setSelectedKeys] = useState(new Set(["all"]));

  // Get current raw value string out of the state set
  const currentCategory = Array.from(selectedKeys)[0] || "all";

  // Create unique filter options array
  const categories = ["all", ...new Set(jobs.map((job) => job.jobCategory))];

  // Filter application data logic
  const filteredJobs = currentCategory === "all" 
    ? jobs 
    : jobs.filter((job) => job.jobCategory.toLowerCase() === currentCategory.toLowerCase());

  return (
    <div className="max-w-6xl mx-auto p-6 bg-[#0a0a0a] min-h-screen text-white">
      
      {/* Header and Filter Control Toolbar Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Opportunities</h1>
          <p className="text-zinc-400 text-sm mt-1">Explore openings or filter by industry</p>
        </div>

        {/* Reconstructed Select Component exactly matching your provided snippet */}
        <div className="w-[256px]">
          <Select 
            className="w-full dark text-white" 
            placeholder="Select category"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
          >
            <Label className="text-zinc-400 text-xs mb-1 block font-medium">Category</Label>
            <Select.Trigger className="bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-white">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className="bg-zinc-900 border border-zinc-800 text-white rounded-lg shadow-xl">
              <ListBox className="p-1">
                {categories.map((category) => (
                  <ListBox.Item 
                    key={category} 
                    id={category} 
                    textValue={category}
                    className="capitalize text-white p-2 rounded hover:bg-zinc-800 data-[selected=true]:bg-purple-600 transition-colors cursor-pointer flex justify-between items-center"
                  >
                    {category === "all" ? "All Categories" : category}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>
      </div>

      {/* Structured Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <Card 
            key={job._id} 
            className="w-full max-w-[400px] border border-zinc-800 bg-[#121212] p-5 rounded-2xl flex flex-col gap-4"
          >
            {/* Header subcomponents structure */}
            <Card.Header className="flex flex-col items-start p-0 gap-2">
              <Card.Title className="text-2xl font-bold text-white capitalize tracking-wide">
                {job.jobTitle}
              </Card.Title>
              <Card.Description className="text-zinc-400 text-sm leading-relaxed">
                Showcase your commitment to diversity and inclusion by highlighting initiatives
              </Card.Description>
            </Card.Header>

            {/* Visual Metadata Chip Wrappers */}
            <div className="flex flex-wrap gap-2 py-1">
              {/* Location */}
              <div className="inline-flex items-center gap-1.5 bg-zinc-800/70 border border-zinc-700/40 text-zinc-300 text-xs font-medium px-2.5 py-1 rounded-md capitalize">
                <FaMapMarkerAlt className="text-purple-400 size-3.5" />
                {job.jobLocation}
              </div>

              {/* Position Type */}
              <div className="inline-flex items-center gap-1.5 bg-zinc-800/70 border border-zinc-700/40 text-zinc-300 text-xs font-medium px-2.5 py-1 rounded-md capitalize">
                {job.jobType === "Internship" ? (
                  <FaBriefcase className="text-purple-400 size-3.5" />
                ) : (
                  <FaUserTie className="text-purple-400 size-3.5" />
                )}
                {job.jobType}
              </div>

              {/* Calculated Salary Compensation */}
              <div className="inline-flex items-center gap-1.5 bg-zinc-800/70 border border-zinc-700/40 text-zinc-300 text-xs font-medium px-2.5 py-1 rounded-md">
                <FaEuroSign className="text-purple-400 size-3" />
                <span>{job.minSalary}-{job.maxSalary}/hour</span>
              </div>
            </div>

            {/* Footer subcomponents structure */}
            <Card.Footer className="p-0 mt-2">
              <Link
                aria-label={`Apply Now for ${job.jobTitle}`}
                href={`/browse-jobs/jobs/${job._id}`} 
                className="inline-flex items-center justify-center bg-white text-black font-semibold text-sm px-6 py-2 rounded-full transition-all duration-200 hover:bg-zinc-200"
              >
                Apply Now
                <Link.Icon className="ml-1 text-black size-3.5" aria-hidden="true" />
              </Link>
            </Card.Footer>
          </Card>
        ))}
      </div>

      {/* Grid Fallback UI */}
      {filteredJobs.length === 0 && (
        <div className="text-center py-16 text-zinc-500 text-lg">
          No listed jobs match the chosen filter option.
        </div>
      )}
    </div>
  );
}