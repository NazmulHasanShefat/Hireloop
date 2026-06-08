"use client";

import React, { useState } from "react";
import { Button, Input, TextField, Label, TextArea } from "@heroui/react";
import { FiMapPin, FiUploadCloud, FiChevronDown, FiX, FiDollarSign, FiCalendar } from "react-icons/fi";

export default function CreateNewJobModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [logoName, setLogoName] = useState("");

  // Select Dropdown States
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedRange, setSelectedRange] = useState("");
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);
  const [isRangeOpen, setIsRangeOpen] = useState(false);

  const industries = ["Technology", "Finance", "Healthcare", "Education"];
  const employeeRanges = ["1-10 employees", "11-50 employees", "51-200 employees", "201+ employees"];

  // --- ADDITIONAL FIELDS STATES ---
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

  // --- VALIDATION ERRORS STATE ---
  const [errors, setErrors] = useState({});

  // --- COMPANY PLAN LIMIT LOGIC ---
  const companyInfo = {
    name: "Acme Corp", 
    isApproved: true,   
    plan: "Free",       
    activeJobsCount: 2  
  };

  const maxLimit = companyInfo.plan === "Free" ? 3 : companyInfo.plan === "Growth" ? 10 : 50;
  const isPostingAllowed = companyInfo.isApproved && companyInfo.activeJobsCount < maxLimit;

  // --- INPUT ONCHANGE ERROR CLEAR HANDLER ---
  const handleInputChange = (fieldName) => {
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: null }));
    }
  };

  // --- FORM SUBMIT HANDLER WITH VALIDATION ---
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isPostingAllowed) return;

    const formData = new FormData(e.currentTarget);
    const formProps = Object.fromEntries(formData);
    
    // Checkbox Value Handling
    formProps.isRemote = formData.get("isRemote") === "on";

    // Custom Validation Logic
    const validationErrors = {};

    if (!formProps.companyName?.trim()) validationErrors.companyName = "Company name is required";
    if (!selectedIndustry) validationErrors.companyIndustry = "Please select an industry";
    if (!formProps.websiteUrl?.trim()) validationErrors.websiteUrl = "Website URL is required";
    if (!formProps.companyLocation?.trim()) validationErrors.companyLocation = "Company location is required";
    if (!selectedRange) validationErrors.employeeRange = "Please select an employee range";
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

    setErrors({});
    console.log("All Form Data using fromEntries:", formProps);
    setIsOpen(false);
    
  };

  const handleModalClose = () => {
    setIsOpen(false);
    setErrors({});
    setIsIndustryOpen(false);
    setIsRangeOpen(false);
    setIsCategoryOpen(false);
    setIsJobTypeOpen(false);
    setIsCurrencyOpen(false);
  };

  return (
    <div className="p-6 flex justify-center items-center bg-[#0d0d11]">
      {/* Toggle Trigger Button */}
      <Button
        onPress={() => setIsOpen(true)}
        size="md"
        className="bg-white hover:bg-gray-100 text-[#0d0d11] text-xs font-medium px-6 py-2.5 rounded-lg shadow-sm transition-all duration-150"
      >
        Register your company & Post Job
      </Button>

      {/* Custom Modal Backdrop Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={handleModalClose}
          />

          {/* Modal Card Surface Wrapper */}
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

            {/* Body Form Layout */}
            <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto overflow-x-visible">
              
              {/* --- COMPANY SECTION --- */}
              <div className="sm:col-span-2 text-left border-b border-white/5 pb-2 mt-2">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Company Details</h3>
              </div>

              {/* Company Name */}
              <TextField className="w-full flex flex-col gap-1.5 text-left">
                <Label className="text-xs font-medium text-gray-400">Company Name *</Label>
                <Input 
                  name="companyName"
                  onChange={() => handleInputChange("companyName")}
                  placeholder="e.g. Acme Corp" 
                  className={`text-xs text-gray-200 bg-[#212127] hover:bg-[#26262d] focus-within:bg-[#26262d] h-10 px-3 rounded-lg border ${errors.companyName ? 'border-red-500/50 focus-within:border-red-500' : 'border-transparent focus-within:border-white/50'} outline-none ring-0 focus:outline-none focus:ring-0 w-full transition-colors font-light placeholder:text-gray-600`}
                />
                {errors.companyName && <span className="text-[11px] text-red-500 font-light mt-0.5">{errors.companyName}</span>}
              </TextField>

              {/* Industry Selection Dropdown */}
              <div className="flex flex-col gap-1.5 text-left relative">
                <label className="text-xs font-medium text-gray-400">Industry / Category *</label>
                <input type="hidden" name="companyIndustry" value={selectedIndustry} />
                <button
                  type="button"
                  onClick={() => {
                    setIsIndustryOpen(!isIndustryOpen);
                    setIsRangeOpen(false);
                    setIsCategoryOpen(false);
                    setIsJobTypeOpen(false);
                    setIsCurrencyOpen(false);
                  }}
                  className={`bg-[#212127] hover:bg-[#26262d] focus:bg-[#26262d] h-10 rounded-lg border ${errors.companyIndustry ? 'border-red-500/50 focus:border-red-500' : 'border-transparent focus:border-white/50'} px-3 flex items-center justify-between text-xs font-light transition-colors text-left w-full outline-none ring-0`}
                >
                  <span className={selectedIndustry ? "text-gray-200" : "text-gray-500"}>
                    {selectedIndustry || "Select Industry"}
                  </span>
                  <FiChevronDown className={`text-gray-500 text-sm transition-transform duration-150 ${isIndustryOpen ? "rotate-180" : ""}`} />
                </button>
                {errors.companyIndustry && <span className="text-[11px] text-red-500 font-light mt-0.5">{errors.companyIndustry}</span>}
                
                {isIndustryOpen && (
                  <div className="absolute top-[62px] left-0 w-full bg-[#212127] border border-white/50 rounded-lg shadow-xl py-1 z-50 max-h-40 overflow-y-auto">
                    {industries.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setSelectedIndustry(item);
                          setIsIndustryOpen(false);
                          handleInputChange("companyIndustry");
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:bg-white/5 hover:text-white transition-colors outline-none ring-0"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Website URL */}
              <TextField className="w-full flex flex-col gap-1.5 text-left">
                <Label className="text-xs font-medium text-gray-400">Website URL *</Label>
                <div className={`flex items-center bg-[#212127] hover:bg-[#26262d] focus-within:bg-[#26262d] h-10 px-3 rounded-lg border ${errors.websiteUrl ? 'border-red-500/50 focus-within:border-red-500' : 'border-transparent focus-within:border-white/50'} transition-colors w-full ring-0 outline-none`}>
                  <span className="text-xs text-gray-600 pr-1 select-none font-light">https://</span>
                  <Input 
                    name="websiteUrl"
                    onChange={() => handleInputChange("websiteUrl")}
                    placeholder="www.company.com" 
                    className="text-xs text-gray-200 bg-transparent outline-none ring-0 focus:outline-none focus:ring-0 w-full font-light placeholder:text-gray-600"
                  />
                </div>
                {errors.websiteUrl && <span className="text-[11px] text-red-500 font-light mt-0.5">{errors.websiteUrl}</span>}
              </TextField>

              {/* Location */}
              <TextField className="w-full flex flex-col gap-1.5 text-left">
                <Label className="text-xs font-medium text-gray-400">Company Location *</Label>
                <div className={`flex items-center bg-[#212127] hover:bg-[#26262d] focus-within:bg-[#26262d] h-10 px-3 rounded-lg border ${errors.companyLocation ? 'border-red-500/50 focus-within:border-red-500' : 'border-transparent focus-within:border-white/50'} transition-colors w-full ring-0 outline-none`}>
                  <FiMapPin className="text-gray-500 text-xs shrink-0 mr-2" />
                  <Input 
                    name="companyLocation"
                    onChange={() => handleInputChange("companyLocation")}
                    placeholder="City, Country" 
                    className="text-xs text-gray-200 bg-transparent outline-none ring-0 focus:outline-none focus:ring-0 w-full font-light placeholder:text-gray-600"
                  />
                </div>
                {errors.companyLocation && <span className="text-[11px] text-red-500 font-light mt-0.5">{errors.companyLocation}</span>}
              </TextField>

              {/* Employee Count Range Selection Dropdown */}
              <div className="flex flex-col gap-1.5 text-left relative">
                <label className="text-xs font-medium text-gray-400">Employee Count Range *</label>
                <input type="hidden" name="employeeRange" value={selectedRange} />
                <button
                  type="button"
                  onClick={() => {
                    setIsRangeOpen(!isRangeOpen);
                    setIsIndustryOpen(false);
                    setIsCategoryOpen(false);
                    setIsJobTypeOpen(false);
                    setIsCurrencyOpen(false);
                  }}
                  className={`bg-[#212127] hover:bg-[#26262d] focus:bg-[#26262d] h-10 rounded-lg border ${errors.employeeRange ? 'border-red-500/50 focus:border-red-500' : 'border-transparent focus-within:border-white/50'} px-3 flex items-center justify-between text-xs font-light transition-colors text-left w-full outline-none ring-0`}
                >
                  <span className={selectedRange ? "text-gray-200" : "text-gray-500"}>
                    {selectedRange || "Select Range"}
                  </span>
                  <FiChevronDown className={`text-gray-500 text-sm transition-transform duration-150 ${isRangeOpen ? "rotate-180" : ""}`} />
                </button>
                {errors.employeeRange && <span className="text-[11px] text-red-500 font-light mt-0.5">{errors.employeeRange}</span>}
                
                {isRangeOpen && (
                  <div className="absolute top-[62px] left-0 w-full bg-[#212127] border border-white/50 rounded-lg shadow-xl py-1 z-50 max-h-40 overflow-y-auto">
                    {employeeRanges.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setSelectedRange(item);
                          setIsRangeOpen(false);
                          handleInputChange("employeeRange");
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:bg-white/5 hover:text-white transition-colors outline-none ring-0"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Company Logo File Upload */}
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-medium text-gray-400">Company Logo</label>
                <label className="flex items-center gap-3 bg-[#212127] border border-dashed border-white/10 rounded-lg p-2 h-10 cursor-pointer hover:bg-[#26262d] transition-colors focus-within:border-white/5 outline-none">
                  <div className="w-7 h-7 bg-white/[0.04] border border-white/5 rounded flex items-center justify-center text-gray-400 shrink-0">
                    <FiUploadCloud className="text-xs" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-medium text-gray-300 truncate">
                      {logoName || "Upload image"}
                    </p>
                    {!logoName && (
                      <p className="text-[9px] text-gray-500 font-light">PNG, JPG up to 5MB</p>
                    )}
                  </div>
                  <input 
                    type="file" 
                    name="companyLogo"
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => setLogoName(e.target.files[0]?.name || "")}
                  />
                </label>
              </div>

              {/* Brief Description */}
              <TextField className="sm:col-span-2 flex flex-col gap-1.5 text-left">
                <Label className="text-xs font-medium text-gray-400">Brief Description</Label>
                <TextArea
                  name="companyDescription"
                  placeholder="Tell us about your company's mission and culture..."
                  rows={2}
                  className="text-xs text-gray-200 placeholder-gray-600 font-light bg-[#212127] hover:bg-[#26262d] focus:bg-[#26262d] rounded-lg border border-transparent focus:border-white/50 p-3 outline-none ring-0 focus:outline-none focus:ring-0 resize-none leading-relaxed transition-colors w-full"
                />
              </TextField>


              {/* --- JOB INFO SECTION --- */}
              <div className="sm:col-span-2 text-left border-b border-white/5 pb-2 mt-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Job Info</h3>
              </div>

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

              {/* Job Category Dropdown */}
              <div className="flex flex-col gap-1.5 text-left relative">
                <label className="text-xs font-medium text-gray-400">Job Category *</label>
                <input type="hidden" name="jobCategory" value={selectedCategory} />
                <button
                  type="button"
                  onClick={() => {
                    setIsCategoryOpen(!isCategoryOpen);
                    setIsIndustryOpen(false);
                    setIsRangeOpen(false);
                    setIsJobTypeOpen(false);
                    setIsCurrencyOpen(false);
                  }}
                  className={`bg-[#212127] hover:bg-[#26262d] focus:bg-[#26262d] h-10 rounded-lg border ${errors.jobCategory ? 'border-red-500/50 focus:border-red-500' : 'border-transparent focus:border-white/50'} px-3 flex items-center justify-between text-xs font-light transition-colors text-left w-full outline-none ring-0`}
                >
                  <span className={selectedCategory ? "text-gray-200" : "text-gray-500"}>
                    {selectedCategory || "Select Category"}
                  </span>
                  <FiChevronDown className={`text-gray-500 text-sm transition-transform duration-150 ${isCategoryOpen ? "rotate-180" : ""}`} />
                </button>
                {errors.jobCategory && <span className="text-[11px] text-red-500 font-light mt-0.5">{errors.jobCategory}</span>}
                
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
                        className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:bg-white/5 hover:text-white transition-colors outline-none ring-0"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Job Type Dropdown */}
              <div className="flex flex-col gap-1.5 text-left relative">
                <label className="text-xs font-medium text-gray-400">Job Type *</label>
                <input type="hidden" name="jobType" value={selectedJobType} />
                <button
                  type="button"
                  onClick={() => {
                    setIsJobTypeOpen(!isJobTypeOpen);
                    setIsIndustryOpen(false);
                    setIsRangeOpen(false);
                    setIsCategoryOpen(false);
                    setIsCurrencyOpen(false);
                  }}
                  className={`bg-[#212127] hover:bg-[#26262d] focus:bg-[#26262d] h-10 rounded-lg border ${errors.jobType ? 'border-red-500/50 focus:border-red-500' : 'border-transparent focus:border-white/50'} px-3 flex items-center justify-between text-xs font-light transition-colors text-left w-full outline-none ring-0`}
                >
                  <span className={selectedJobType ? "text-gray-200" : "text-gray-500"}>
                    {selectedJobType || "Select Job Type"}
                  </span>
                  <FiChevronDown className={`text-gray-500 text-sm transition-transform duration-150 ${isJobTypeOpen ? "rotate-180" : ""}`} />
                </button>
                {errors.jobType && <span className="text-[11px] text-red-500 font-light mt-0.5">{errors.jobType}</span>}
                
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
                        className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:bg-white/5 hover:text-white transition-colors outline-none ring-0"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Salary Range & Currency */}
              <div className="sm:col-span-2 grid grid-cols-3 gap-3 items-start">
                <TextField className="w-full flex flex-col gap-1.5 text-left">
                  <Label className="text-xs font-medium text-gray-400">Min Salary *</Label>
                  <div className={`flex items-center bg-[#212127] hover:bg-[#26262d] focus-within:bg-[#26262d] h-10 px-3 rounded-lg border ${errors.minSalary ? 'border-red-500/50 focus-within:border-red-500' : 'border-transparent focus-within:border-white/50'} transition-colors w-full ring-0 outline-none`}>
                    <FiDollarSign className="text-gray-500 text-xs shrink-0 mr-1" />
                    <Input 
                      type="number"
                      name="minSalary"
                      onChange={() => handleInputChange("minSalary")}
                      placeholder="Min" 
                      className="text-xs text-gray-200 bg-transparent outline-none ring-0 focus:outline-none focus:ring-0 w-full font-light placeholder:text-gray-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  {errors.minSalary && <span className="text-[11px] text-red-500 font-light mt-0.5">{errors.minSalary}</span>}
                </TextField>

                <TextField className="w-full flex flex-col gap-1.5 text-left">
                  <Label className="text-xs font-medium text-gray-400">Max Salary *</Label>
                  <div className={`flex items-center bg-[#212127] hover:bg-[#26262d] focus-within:bg-[#26262d] h-10 px-3 rounded-lg border ${errors.maxSalary ? 'border-red-500/50 focus-within:border-red-500' : 'border-transparent focus-within:border-white/50'} transition-colors w-full ring-0 outline-none`}>
                    <FiDollarSign className="text-gray-500 text-xs shrink-0 mr-1" />
                    <Input 
                      type="number"
                      name="maxSalary"
                      onChange={() => handleInputChange("maxSalary")}
                      placeholder="Max" 
                      className="text-xs text-gray-200 bg-transparent outline-none ring-0 focus:outline-none focus:ring-0 w-full font-light placeholder:text-gray-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  {errors.maxSalary && <span className="text-[11px] text-red-500 font-light mt-0.5">{errors.maxSalary}</span>}
                </TextField>

                <div className="flex flex-col gap-1.5 text-left relative">
                  <label className="text-xs font-medium text-gray-400">Currency</label>
                  <input type="hidden" name="currency" value={selectedCurrency} />
                  <button
                    type="button"
                    onClick={() => {
                      setIsCurrencyOpen(!isCurrencyOpen);
                      setIsIndustryOpen(false);
                      setIsRangeOpen(false);
                      setIsCategoryOpen(false);
                      setIsJobTypeOpen(false);
                    }}
                    className="bg-[#212127] hover:bg-[#26262d] focus:bg-[#26262d] h-10 rounded-lg border border-transparent px-3 flex items-center justify-between text-xs font-light transition-colors text-left w-full focus:border-white/50 outline-none ring-0"
                  >
                    <span className="text-gray-200">{selectedCurrency}</span>
                    <FiChevronDown className="text-gray-500 text-sm" />
                  </button>
                  
                  {isCurrencyOpen && (
                    <div className="absolute top-[62px] left-0 w-full bg-[#212127] border border-white/50 rounded-lg shadow-xl py-1 z-50 max-h-30 overflow-y-auto">
                      {currencies.map((curr) => (
                        <button
                          key={curr}
                          type="button"
                          onClick={() => {
                            setSelectedCurrency(curr);
                            setIsCurrencyOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:bg-white/5 hover:text-white transition-colors outline-none ring-0"
                        >
                          {curr}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Location or Remote Toggle */}
              <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                <TextField className={`sm:col-span-2 w-full flex flex-col gap-1.5 text-left transition-opacity ${isRemote ? "opacity-30 pointer-events-none" : "opacity-100"}`}>
                  <Label className="text-xs font-medium text-gray-400">Job Location {!isRemote && "*"}</Label>
                  <div className={`flex items-center bg-[#212127] hover:bg-[#26262d] focus-within:bg-[#26262d] h-10 px-3 rounded-lg border ${!isRemote && errors.jobLocation ? 'border-red-500/50 focus-within:border-red-500' : 'border-transparent focus-within:border-white/50'} transition-colors w-full ring-0 outline-none`}>
                    <FiMapPin className="text-gray-500 text-xs shrink-0 mr-2" />
                    <Input 
                      name="jobLocation"
                      onChange={() => handleInputChange("jobLocation")}
                      placeholder="City, Country" 
                      className="text-xs text-gray-200 bg-transparent outline-none ring-0 focus:outline-none focus:ring-0 w-full font-light placeholder:text-gray-600"
                    />
                  </div>
                  {!isRemote && errors.jobLocation && <span className="text-[11px] text-red-500 font-light mt-0.5">{errors.jobLocation}</span>}
                </TextField>

                {/* Remote Toggle Switch */}
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
                          if(e.target.checked && errors.jobLocation) {
                            setErrors(prev => ({...prev, jobLocation: null}));
                          }
                        }}
                        className="sr-only peer" 
                      />
                      <div className="w-7 h-4 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 peer-checked:after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-white/30"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Application Deadline */}
              <TextField className="w-full flex flex-col gap-1.5 text-left">
                <Label className="text-xs font-medium text-gray-400">Application Deadline *</Label>
                <div className={`flex items-center bg-[#212127] hover:bg-[#26262d] focus-within:bg-[#26262d] h-10 px-3 rounded-lg border ${errors.applicationDeadline ? 'border-red-500/50 focus-within:border-red-500' : 'border-transparent focus-within:border-white/50'} transition-colors w-full ring-0 outline-none`}>
                  <FiCalendar className="text-gray-500 text-xs shrink-0 mr-2" />
                  <Input 
                    type="date" 
                    name="applicationDeadline"
                    onChange={() => handleInputChange("applicationDeadline")}
                    className="text-xs text-gray-200 bg-transparent outline-none ring-0 focus:outline-none focus:ring-0 w-full font-light [color-scheme:dark]"
                  />
                </div>
                {errors.applicationDeadline && <span className="text-[11px] text-red-500 font-light mt-0.5">{errors.applicationDeadline}</span>}
              </TextField>


              {/* --- JOB DESCRIPTION SECTION --- */}
              <div className="sm:col-span-2 text-left border-b border-white/5 pb-2 mt-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Job Description</h3>
              </div>

              {/* Responsibilities */}
              <TextField className="sm:col-span-2 flex flex-col gap-1.5 text-left">
                <Label className="text-xs font-medium text-gray-400">Responsibilities *</Label>
                <TextArea
                  name="responsibilities"
                  onChange={() => handleInputChange("responsibilities")}
                  placeholder="List the key responsibilities..."
                  rows={3}
                  className={`text-xs text-gray-200 placeholder-gray-600 font-light bg-[#212127] hover:bg-[#26262d] focus:bg-[#26262d] rounded-lg border ${errors.responsibilities ? 'border-red-500/50 focus-within:border-red-500' : 'border-transparent focus-within:border-white/50'} p-3 outline-none ring-0 focus:outline-none focus:ring-0 resize-none leading-relaxed transition-colors w-full`}
                />
                {errors.responsibilities && <span className="text-[11px] text-red-500 font-light mt-0.5">{errors.responsibilities}</span>}
              </TextField>

              {/* Requirements */}
              <TextField className="sm:col-span-2 flex flex-col gap-1.5 text-left">
                <Label className="text-xs font-medium text-gray-400">Requirements *</Label>
                <TextArea
                  name="requirements"
                  onChange={() => handleInputChange("requirements")}
                  placeholder="List job requirements and qualifications..."
                  rows={3}
                  className={`text-xs text-gray-200 placeholder-gray-600 font-light bg-[#212127] hover:bg-[#26262d] focus:bg-[#26262d] rounded-lg border ${errors.requirements ? 'border-red-500/50 focus-within:border-red-500' : 'border-transparent focus-within:border-white/50'} p-3 outline-none ring-0 focus:outline-none focus:ring-0 resize-none leading-relaxed transition-colors w-full`}
                />
                {errors.requirements && <span className="text-[11px] text-red-500 font-light mt-0.5">{errors.requirements}</span>}
              </TextField>

              {/* Benefits (Optional) */}
              <TextField className="sm:col-span-2 flex flex-col gap-1.5 text-left">
                <Label className="text-xs font-medium text-gray-400">Benefits (Optional)</Label>
                <TextArea
                  name="benefits"
                  placeholder="Describe employee benefits, perks, insurance etc..."
                  rows={2}
                  className="text-xs text-gray-200 placeholder-gray-600 font-light bg-[#212127] hover:bg-[#26262d] focus:bg-[#26262d] rounded-lg border border-transparent focus:border-white/50 p-3 outline-none ring-0 focus:outline-none focus:ring-0 resize-none leading-relaxed transition-colors w-full"
                />
              </TextField>

              {/* Plan Limit Warning Message */}
              {!isPostingAllowed && (
                <div className="sm:col-span-2 text-left bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-xs font-light">
                  ⚠️ Cannot post job. Either your company is not approved or you have exceeded your active job limit ({companyInfo.activeJobsCount}/{maxLimit} for {companyInfo.plan} Plan).
                </div>
              )}

            </div>

            {/* Footer Action Bar */}
            <div className="px-6 py-4 border-t border-white/5 flex items-center justify-end gap-3 bg-[#1e1e24]/40">
              <Button
                type="button"
                variant="flat"
                onClick={handleModalClose}
                className="bg-[#212127] hover:bg-[#26262d] text-gray-300 text-xs font-medium px-5 h-9 rounded-lg"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!isPostingAllowed}
                className={`text-xs font-semibold px-5 h-9 rounded-lg shadow-sm transition-all ${
                  isPostingAllowed 
                  ? "bg-white hover:bg-gray-100 text-[#0d0d11] cursor-pointer" 
                  : "bg-white/10 text-gray-500 cursor-not-allowed"
                }`}
              >
                Register & Post Job
              </Button>
            </div>

          </form>
        </div>
      )}
    </div>
  );
}