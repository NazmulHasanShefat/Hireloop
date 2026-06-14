"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button, Input, TextField, Label, TextArea, toast } from "@heroui/react";
import { FiMapPin, FiUploadCloud, FiChevronDown, FiX, FiDollarSign, FiCalendar } from "react-icons/fi";
import { createNewJob } from "@/lib/actions/jobs";
import { useRouter } from "next/navigation";

export default function CreateNewJobModal({ recruiterCompany, user }) {
  console.log(recruiterCompany)

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  // --- ADDITIONAL FIELDS STATES ---
  const [IsCompanyOpen, setIsCompanyOpen] = useState(false);
  const [SelectedCompany, setSelectedCompany] = useState("");
  const [isCompanyId, setCompanyId] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const [selectedJobType, setSelectedJobType] = useState("");
  const [isJobTypeOpen, setIsJobTypeOpen] = useState(false);

  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

  const [isRemote, setIsRemote] = useState(false);

  const categories = ["Technology", "Finance", "Healthcare", "Education", "Design"];
  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];
  const currencies = ["USD", "EUR", "GBP", "BDT"];

  // --- REFS FOR CLICK OUTSIDE ---
  const companyRef = useRef(null);
  const categoryRef = useRef(null);
  const jobTypeRef = useRef(null);
  const currencyRef = useRef(null);

  // --- CLICK OUTSIDE HANDLER ---
  useEffect(() => {
    function handleClickOutside(event) {
      if (companyRef.current && !companyRef.current.contains(event.target)) setIsCompanyOpen(false);
      if (categoryRef.current && !categoryRef.current.contains(event.target)) setIsCategoryOpen(false);
      if (jobTypeRef.current && !jobTypeRef.current.contains(event.target)) setIsJobTypeOpen(false);
      if (currencyRef.current && !currencyRef.current.contains(event.target)) setIsCurrencyOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- VALIDATION ERRORS STATE ---
  const [errors, setErrors] = useState({});

  const companyInfo = {
    name: "Acme Corp",
    isApproved: true,
    plan: "Free",
    activeJobsCount: 2
  };

  const maxLimit = companyInfo.plan === "Free" ? 3 : companyInfo.plan === "Growth" ? 10 : 50;
  const isPostingAllowed = companyInfo.isApproved && companyInfo.activeJobsCount < maxLimit;

  const handleInputChange = (fieldName) => {
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isPostingAllowed) return;

    const formData = new FormData(e.currentTarget);
    const formProps = Object.fromEntries(formData);
    formProps.isRemote = formData.get("isRemote") === "on";

    const validationErrors = {};
    if (!formProps.jobTitle?.trim()) validationErrors.jobTitle = "Job title is required";
    if (!selectedCategory) validationErrors.jobCategory = "Please select a job category";
    if (!selectedJobType) validationErrors.jobType = "Please select a job type";
    if (!formProps.minSalary) validationErrors.minSalary = "Minimum salary is required";
    if (!formProps.maxSalary) validationErrors.maxSalary = "Maximum salary is required";
    if (!isRemote && !formProps.jobLocation?.trim()) validationErrors.jobLocation = "Job location is required for non-remote roles";
    if (!formProps.applicationDeadline) validationErrors.applicationDeadline = "Application deadline is required";
    if (!formProps.responsibilities?.trim()) validationErrors.responsibilities = "Job responsibilities are required";
    if (!formProps.requirements?.trim()) validationErrors.requirements = "Job requirements are required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      ...formProps,
      isRemote: isRemote,
      companyId: isCompanyId,
      recruiterId: user.id,
      status: "active",
      isPubliclyVisible: true,
      applyedUsers: []
    };

    const res = await createNewJob(payload);
    if (res?.insertedId) {
      router.refresh();
      toast.success("Job posted successfully!");
      handleModalClose();
    }
  };

  const handleModalClose = () => {
    setIsOpen(false);
    setErrors({});
    setIsCompanyOpen(false);
    setIsCategoryOpen(false);
    setIsJobTypeOpen(false);
    setIsCurrencyOpen(false);
  };

  return (
    <div className="p-6 flex justify-center items-center bg-[#0d0d11]">
      <Button
        onPress={() => setIsOpen(true)}
        size="md"
        className="bg-white hover:bg-gray-100 text-[#0d0d11] text-xs font-medium px-6 py-2.5 rounded-lg shadow-sm transition-all duration-150"
      >
        Create a new job
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={handleModalClose}
          />

          <form
            onSubmit={handleSubmit}
            noValidate
            className="relative bg-[#16161a] border border-white/5 rounded-xl shadow-2xl text-gray-200 w-full max-w-[620px] overflow-visible transform transition-all z-10 animate-in fade-in zoom-in-95 duration-150"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/5">
              <div className="text-left">
                <h2 className="text-lg font-semibold text-white tracking-wide">
                  Register New Company & Post Job
                </h2>
                <p className="text-xs text-gray-500 font-light mt-0.5">
                  Enter your business and job details to start hiring on HireLoop.
                </p>
              </div>
              <Button
                isIconOnly
                type="button"
                onClick={handleModalClose}
                className="bg-transparent hover:bg-white/5 text-gray-400 hover:text-white min-w-8 h-8 rounded-lg"
              >
                <FiX className="text-base" />
              </Button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto overflow-x-visible">
              
              {/* Job Title */}
              <TextField className="sm:col-span-2 w-full flex flex-col gap-1.5 text-left">
                <Label className="text-xs font-medium text-gray-400">Job Title *</Label>
                <Input
                  name="jobTitle"
                  onChange={() => handleInputChange("jobTitle")}
                  placeholder="e.g. Senior Frontend Developer"
                  className={`text-xs text-gray-200 bg-[#212127] hover:bg-[#26262d] focus-within:bg-[#26262d] h-10 px-3 rounded-lg border ${errors.jobTitle ? 'border-red-500/50 focus-within:border-red-500' : 'border-transparent focus-within:border-white/50'} outline-none ring-0 focus:outline-none focus:ring-0 w-full transition-colors font-light placeholder:text-gray-600`}
                />
                {errors.jobTitle && <span className="text-[11px] text-red-500 font-light mt-0.5">{errors.jobTitle}</span>}
              </TextField>

              {/* Job Company Dropdown */}
              <div className="flex flex-col gap-1.5 text-left relative" ref={companyRef}>
                <label className="text-xs font-medium text-gray-400">Select Company *</label>
                <button
                  type="button"
                  onClick={() => setIsCompanyOpen(!IsCompanyOpen)}
                  className="bg-[#212127] hover:bg-[#26262d] focus:bg-[#26262d] h-10 rounded-lg border border-transparent focus:border-white/50 px-3 flex items-center justify-between text-xs font-light transition-colors text-left w-full outline-none ring-0"
                >
                  <span className={SelectedCompany ? "text-gray-200" : "text-gray-500"}>
                    {SelectedCompany || "Select Company"}
                  </span>
                  <FiChevronDown className={`text-gray-500 text-sm transition-transform duration-150 ${IsCompanyOpen ? "rotate-180" : ""}`} />
                </button>
                {IsCompanyOpen && (
                  <div className="absolute top-[62px] left-0 w-full bg-[#212127] border border-white/50 rounded-lg shadow-xl py-1 z-50 max-h-40 overflow-y-auto">
                    {recruiterCompany.map((item) => (
                      <button
                        key={item?._id}
                        type="button"
                        onClick={() => {
                          setSelectedCompany(item?.companyName);
                          setCompanyId(item?._id);
                          setIsCompanyOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                      >
                        {item?.companyName}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Job Category Dropdown */}
              <div className="flex flex-col gap-1.5 text-left relative" ref={categoryRef}>
                <label className="text-xs font-medium text-gray-400">Job Category *</label>
                <input type="hidden" name="jobCategory" value={selectedCategory} />
                <button
                  type="button"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className={`bg-[#212127] hover:bg-[#26262d] focus:bg-[#26262d] h-10 rounded-lg border ${errors.jobCategory ? 'border-red-500/50 focus:border-red-500' : 'border-transparent focus:border-white/50'} px-3 flex items-center justify-between text-xs font-light transition-colors text-left w-full outline-none ring-0`}
                >
                  <span className={selectedCategory ? "text-gray-200" : "text-gray-500"}>
                    {selectedCategory || "Select Category"}
                  </span>
                  <FiChevronDown className={`text-gray-500 text-sm transition-transform duration-150 ${isCategoryOpen ? "rotate-180" : ""}`} />
                </button>
                {isCategoryOpen && (
                  <div className="absolute top-[62px] left-0 w-full bg-[#212127] border border-white/50 rounded-lg shadow-xl py-1 z-50 max-h-40 overflow-y-auto">
                    {categories.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(item);
                          setIsCategoryOpen(false);
                          handleInputChange("jobCategory");
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
                {errors.jobCategory && <span className="text-[11px] text-red-500 font-light mt-0.5">{errors.jobCategory}</span>}
              </div>

              {/* Job Type Dropdown */}
              <div className="flex flex-col gap-1.5 text-left relative" ref={jobTypeRef}>
                <label className="text-xs font-medium text-gray-400">Job Type *</label>
                <input type="hidden" name="jobType" value={selectedJobType} />
                <button
                  type="button"
                  onClick={() => setIsJobTypeOpen(!isJobTypeOpen)}
                  className={`bg-[#212127] hover:bg-[#26262d] focus:bg-[#26262d] h-10 rounded-lg border ${errors.jobType ? 'border-red-500/50 focus:border-red-500' : 'border-transparent focus:border-white/50'} px-3 flex items-center justify-between text-xs font-light transition-colors text-left w-full outline-none ring-0`}
                >
                  <span className={selectedJobType ? "text-gray-200" : "text-gray-500"}>
                    {selectedJobType || "Select Job Type"}
                  </span>
                  <FiChevronDown className={`text-gray-500 text-sm transition-transform duration-150 ${isJobTypeOpen ? "rotate-180" : ""}`} />
                </button>
                {isJobTypeOpen && (
                  <div className="absolute top-[62px] left-0 w-full bg-[#212127] border border-white/50 rounded-lg shadow-xl py-1 z-50 max-h-40 overflow-y-auto">
                    {jobTypes.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setSelectedJobType(item);
                          setIsJobTypeOpen(false);
                          handleInputChange("jobType");
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
                {errors.jobType && <span className="text-[11px] text-red-500 font-light mt-0.5">{errors.jobType}</span>}
              </div>

              {/* Salary Range & Currency */}
              <div className="sm:col-span-2 grid grid-cols-3 gap-3 items-start">
                <TextField className="w-full flex flex-col gap-1.5 text-left">
                  <Label className="text-xs font-medium text-gray-400">Min Salary *</Label>
                  <div className={`flex items-center bg-[#212127] hover:bg-[#26262d] focus-within:bg-[#26262d] h-10 px-3 rounded-lg border ${errors.minSalary ? 'border-red-500/50 focus-within:border-red-500' : 'border-transparent focus-within:border-white/50'} transition-colors w-full`}>
                    <FiDollarSign className="text-gray-500 text-xs shrink-0 mr-1" />
                    <Input type="number" name="minSalary" onChange={() => handleInputChange("minSalary")} placeholder="Min" className="text-xs text-gray-200 bg-transparent outline-none w-full" />
                  </div>
                  {errors.minSalary && <span className="text-[11px] text-red-500 font-light mt-0.5">{errors.minSalary}</span>}
                </TextField>

                <TextField className="w-full flex flex-col gap-1.5 text-left">
                  <Label className="text-xs font-medium text-gray-400">Max Salary *</Label>
                  <div className={`flex items-center bg-[#212127] hover:bg-[#26262d] focus-within:bg-[#26262d] h-10 px-3 rounded-lg border ${errors.maxSalary ? 'border-red-500/50 focus-within:border-red-500' : 'border-transparent focus-within:border-white/50'} transition-colors w-full`}>
                    <FiDollarSign className="text-gray-500 text-xs shrink-0 mr-1" />
                    <Input type="number" name="maxSalary" onChange={() => handleInputChange("maxSalary")} placeholder="Max" className="text-xs text-gray-200 bg-transparent outline-none w-full" />
                  </div>
                  {errors.maxSalary && <span className="text-[11px] text-red-500 font-light mt-0.5">{errors.maxSalary}</span>}
                </TextField>

                <div className="flex flex-col gap-1.5 text-left relative" ref={currencyRef}>
                  <label className="text-xs font-medium text-gray-400">Currency</label>
                  <input type="hidden" name="currency" value={selectedCurrency} />
                  <button
                    type="button"
                    onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                    className="bg-[#212127] hover:bg-[#26262d] h-10 rounded-lg border border-transparent focus:border-white/50 px-3 flex items-center justify-between text-xs font-light w-full outline-none"
                  >
                    <span className="text-gray-200">{selectedCurrency}</span>
                    <FiChevronDown className="text-gray-500 text-sm" />
                  </button>
                  {isCurrencyOpen && (
                    <div className="absolute top-[62px] left-0 w-full bg-[#212127] border border-white/50 rounded-lg shadow-xl py-1 z-50">
                      {currencies.map((curr) => (
                        <button
                          key={curr}
                          type="button"
                          onClick={() => {
                            setSelectedCurrency(curr);
                            setIsCurrencyOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:bg-white/5"
                        >
                          {curr}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Location & Remote */}
              <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                <TextField className={`sm:col-span-2 w-full flex flex-col gap-1.5 text-left transition-opacity ${isRemote ? "opacity-30 pointer-events-none" : "opacity-100"}`}>
                  <Label className="text-xs font-medium text-gray-400">Job Location {!isRemote && "*"}</Label>
                  <div className={`flex items-center bg-[#212127] h-10 px-3 rounded-lg border ${!isRemote && errors.jobLocation ? 'border-red-500/50' : 'border-transparent focus-within:border-white/50'} transition-colors w-full`}>
                    <FiMapPin className="text-gray-500 text-xs shrink-0 mr-2" />
                    <Input name="jobLocation" onChange={() => handleInputChange("jobLocation")} placeholder="City, Country" className="text-xs text-gray-200 bg-transparent outline-none w-full" />
                  </div>
                  {!isRemote && errors.jobLocation && <span className="text-[11px] text-red-500 font-light mt-0.5">{errors.jobLocation}</span>}
                </TextField>

                <div className="flex flex-col gap-1.5 w-full">
                  <span className="text-xs font-medium text-transparent select-none">Spacer</span>
                  <div className="h-10 flex items-center justify-between bg-[#212127] px-3 rounded-lg border border-transparent">
                    <span className="text-xs text-gray-400 font-light">Remote Work</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="isRemote"
                        checked={isRemote}
                        onChange={(e) => {
                          setIsRemote(e.target.checked);
                          if (e.target.checked && errors.jobLocation) {
                            setErrors(prev => ({ ...prev, jobLocation: null }));
                          }
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-7 h-4 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 peer-checked:after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-white/30"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Deadline */}
              <TextField className="w-full flex flex-col gap-1.5 text-left">
                <Label className="text-xs font-medium text-gray-400">Application Deadline *</Label>
                <div className={`flex items-center bg-[#212127] h-10 px-3 rounded-lg border ${errors.applicationDeadline ? 'border-red-500/50' : 'border-transparent'} w-full`}>
                  <FiCalendar className="text-gray-500 text-xs shrink-0 mr-2" />
                  <Input type="date" name="applicationDeadline" onChange={() => handleInputChange("applicationDeadline")} className="text-xs text-gray-200 bg-transparent outline-none w-full [color-scheme:dark]" />
                </div>
                {errors.applicationDeadline && <span className="text-[11px] text-red-500 font-light mt-0.5">{errors.applicationDeadline}</span>}
              </TextField>

              {/* Responsibilities */}
              <TextField className="sm:col-span-2 flex flex-col gap-1.5 text-left mt-4">
                <Label className="text-xs font-medium text-gray-400">Responsibilities *</Label>
                <TextArea
                  name="responsibilities"
                  onChange={() => handleInputChange("responsibilities")}
                  placeholder="List the key responsibilities..."
                  rows={3}
                  className={`text-xs text-gray-200 bg-[#212127] rounded-lg border ${errors.responsibilities ? 'border-red-500/50' : 'border-transparent focus:border-white/50'} p-3 outline-none resize-none`}
                />
                {errors.responsibilities && <span className="text-[11px] text-red-500 font-light mt-0.5">{errors.responsibilities}</span>}
              </TextField>

              {/* Requirements */}
              <TextField className="sm:col-span-2 flex flex-col gap-1.5 text-left">
                <Label className="text-xs font-medium text-gray-400">Requirements *</Label>
                <TextArea
                  name="requirements"
                  onChange={() => handleInputChange("requirements")}
                  placeholder="List job requirements..."
                  rows={3}
                  className={`text-xs text-gray-200 bg-[#212127] rounded-lg border ${errors.requirements ? 'border-red-500/50' : 'border-transparent focus:border-white/50'} p-3 outline-none resize-none`}
                />
                {errors.requirements && <span className="text-[11px] text-red-500 font-light mt-0.5">{errors.requirements}</span>}
              </TextField>

              {!isPostingAllowed && (
                <div className="sm:col-span-2 text-left bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-xs font-light">
                  ⚠️ Cannot post job. Limit exceeded ({companyInfo.activeJobsCount}/{maxLimit} for {companyInfo.plan} Plan).
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/5 flex items-center justify-end gap-3 bg-[#1e1e24]/40">
              <Button type="button" onClick={handleModalClose} className="bg-[#212127] text-gray-300 text-xs px-5 h-9 rounded-lg">Cancel</Button>
              <Button type="submit" disabled={!isPostingAllowed} className={`text-xs font-semibold px-5 h-9 rounded-lg ${isPostingAllowed ? "bg-white text-[#0d0d11]" : "bg-white/10 text-gray-500 cursor-not-allowed"}`}>
                Register & Post Job
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}