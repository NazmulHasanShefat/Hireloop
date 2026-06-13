"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button, Form, toast } from "@heroui/react";
import { FiMapPin, FiUploadCloud, FiChevronDown, FiX } from "react-icons/fi";
import { CgSpinner } from "react-icons/cg"; // Spinner icon imported for the uploading status
import { createCompany } from "@/lib/api/companys";

export default function RegisterCompanyModal({recruiter}) {
  const [isOpen, setIsOpen] = useState(false);
  const [logoName, setLogoName] = useState("");
  const [logoPreview, setLogoPreview] = useState(""); 
  const [logoUrl, setLogoUrl] = useState(""); // Stores the hosted image URL from ImgBB
  const [isUploading, setIsUploading] = useState(false); // Manages loading spinner state

  // Select Dropdown States
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedRange, setSelectedRange] = useState("");
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);
  const [isRangeOpen, setIsRangeOpen] = useState(false);

  // Input Validation State
  const [errors, setErrors] = useState({
    companyName: "",
    companyIndustry: "",
    websiteUrl: "",
    companyLocation: "",
    employeeRange: "",
    companyLogo: "",
    companyDescription: "",
  });

  const industries = ["Technology", "Finance", "Healthcare", "Education"];
  const employeeRanges = ["1-10 employees", "11-50 employees", "51-200 employees", "201+ employees"];

  const industryRef = useRef(null);
  const rangeRef = useRef(null);
  const fileInputRef = useRef(null); 

  // Outside Click Handling Logic
  useEffect(() => {
    function handleClickOutside(event) {
      if (industryRef.current && !industryRef.current.contains(event.target)) {
        setIsIndustryOpen(false);
      }
      if (rangeRef.current && !rangeRef.current.contains(event.target)) {
        setIsRangeOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleInputChange = (field) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // --- IMGBB UPLOAD FUNCTION ---
  const uploadToImgBB = async (file) => {
    setIsUploading(true);
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY; // Recommended: Set this in your .env.local file

    if (!apiKey) {
      console.error("ImgBB API key is missing. Please check your environment variables.");
      setErrors((prev) => ({ ...prev, companyLogo: "Upload failed: Setup error." }));
      setIsUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setLogoUrl(result.data.url); // Saving hosted URL for database submission
      } else {
        setErrors((prev) => ({ ...prev, companyLogo: "Failed to upload logo to server." }));
        handleRemoveLogo();
      }
    } catch (error) {
      console.error("Error uploading to ImgBB:", error);
      setErrors((prev) => ({ ...prev, companyLogo: "Network error occurred during upload." }));
      handleRemoveLogo();
    } finally {
      setIsUploading(false);
    }
  };

  // Image File Selection & Local Preview Handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoName(file.name);
      handleInputChange("companyLogo");

      // Generate instant local blob preview
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);

      // Trigger the background upload to ImgBB
      uploadToImgBB(file);
    }
  };

  // Remove Logo Function
  const handleRemoveLogo = (e) => {
    if (e) e.preventDefault(); 
    setLogoName("");
    setLogoPreview("");
    setLogoUrl("");
    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; 
    }
  };

  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
    };
  }, [logoPreview]);

  // --- FORM SUBMIT HANDLER ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formProps = Object.fromEntries(formData);

    let hasError = false;
    const newErrors = { ...errors };

    if (!formProps.companyName || formProps.companyName.trim().length < 2) {
      newErrors.companyName = "Company name must be at least 2 characters.";
      hasError = true;
    }
    if (!selectedIndustry) {
      newErrors.companyIndustry = "Please select an industry.";
      hasError = true;
    }
    if (!formProps.websiteUrl || !formProps.websiteUrl.trim()) {
      newErrors.websiteUrl = "Website URL is required.";
      hasError = true;
    }
    if (!formProps.companyLocation || !formProps.companyLocation.trim()) {
      newErrors.companyLocation = "Location is required.";
      hasError = true;
    }
    if (!selectedRange) {
      newErrors.employeeRange = "Please select employee range.";
      hasError = true;
    }
    if (!logoUrl && isUploading) {
      newErrors.companyLogo = "Please wait for the logo to finish uploading.";
      hasError = true;
    } else if (!logoUrl) {
      newErrors.companyLogo = "Company logo is required.";
      hasError = true;
    }
    if (!formProps.companyDescription || formProps.companyDescription.trim().length < 10) {
      newErrors.companyDescription = "Description must be at least 10 characters.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return; 
    }

    // Hosted ImgBB URL sent here under `companyLogo` 
    console.log("Form Data Submitted Successfully:", {
      companyName: formProps.companyName,
      companyIndustry: selectedIndustry,
      websiteUrl: formProps.websiteUrl,
      companyLocation: formProps.companyLocation,
      employeeRange: selectedRange,
      companyLogo: logoUrl,
      companyDescription: formProps.companyDescription,
      recruiterId: recruiter.id
    });

    const newCompany = {
      companyName: formProps.companyName,
      companyIndustry: selectedIndustry,
      websiteUrl: formProps.websiteUrl,
      companyLocation: formProps.companyLocation,
      employeeRange: selectedRange,
      companyLogo: logoUrl,
      companyDescription: formProps.companyDescription,
      recruiterId: recruiter.id
    }

    const payload = await createCompany(newCompany);
    console.log("new company result",payload)
    if(payload.insertedId){
      toast.success("company Created successfullt")
    }

    
    // Put your backend database `fetch()` / `axios.post()` call right here using the payload above
    
    handleModalClose();
  };

  const handleModalClose = () => {
    setIsOpen(false);
    setIsIndustryOpen(false);
    setIsRangeOpen(false);
    setLogoName("");
    setLogoPreview("");
    setLogoUrl("");
    setIsUploading(false);
    setSelectedIndustry("");
    setSelectedRange("");
    setErrors({
      companyName: "",
      companyIndustry: "",
      websiteUrl: "",
      companyLocation: "",
      employeeRange: "",
      companyLogo: "",
      companyDescription: "",
    });
  };

  return (
    <div className="p-6 flex justify-center items-center bg-[#0d0d11]">
      <Button
        onPress={() => setIsOpen(true)}
        size="md"
        className="bg-white hover:bg-gray-100 text-[#0d0d11] text-xs font-medium px-6 py-2.5 rounded-lg shadow-sm transition-all duration-150"
      >
        Register your company
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={handleModalClose}
          />

          <Form 
            onSubmit={handleSubmit}
            className="relative bg-[#16161a] border border-white/5 rounded-xl shadow-2xl text-gray-200 w-full max-w-[620px] overflow-visible transform transition-all z-10 animate-in fade-in zoom-in-95 duration-150"
          >
            {/* Header */}
            <div className="flex items-center justify-between w-full px-6 pt-6 pb-4 border-b border-white/5">
              <div className="text-left">
                <h2 className="text-lg font-semibold text-white tracking-wide">
                  Register New Company
                </h2>
                <p className="text-xs text-gray-500 font-light mt-0.5">
                  Enter your business details to start hiring on HireLoop.
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
            <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto overflow-x-visible w-full">
              
              {/* Company Name */}
              <div className="w-full flex flex-col gap-1.5 text-left">
                <label className="text-xs font-medium text-gray-400">Company Name</label>
                <input 
                  name="companyName"
                  placeholder="e.g. Acme Corp" 
                  onChange={() => handleInputChange("companyName")}
                  className={`text-xs text-gray-200 bg-[#212127] hover:bg-[#26262d] focus:bg-[#26262d] h-10 px-3 rounded-lg border outline-none w-full transition-colors font-light placeholder:text-gray-600 ${
                    errors.companyName ? "border-danger" : "border-transparent focus:border-white/10"
                  }`}
                />
                {errors.companyName && <p className="text-[10px] text-danger mt-0.5">{errors.companyName}</p>}
              </div>

              {/* Industry / Category Dropdown */}
              <div ref={industryRef} className="flex flex-col gap-1.5 text-left relative w-full">
                <label className="text-xs font-medium text-gray-400">Industry / Category</label>
                <input type="hidden" name="companyIndustry" value={selectedIndustry} />
                
                <button
                  type="button"
                  onClick={() => {
                    setIsIndustryOpen(!isIndustryOpen);
                    setIsRangeOpen(false);
                  }}
                  className={`bg-[#212127] hover:bg-[#26262d] focus:bg-[#26262d] h-10 rounded-lg border px-3 flex items-center justify-between text-xs font-light transition-colors text-left w-full outline-none ring-0 ${
                    errors.companyIndustry ? "border-danger" : "border-transparent focus:border-white/10"
                  }`}
                >
                  <span className={selectedIndustry ? "text-gray-200" : "text-gray-500"}>
                    {selectedIndustry || "Select Industry"}
                  </span>
                  <FiChevronDown className={`text-gray-500 text-sm transition-transform duration-150 ${isIndustryOpen ? "rotate-180" : ""}`} />
                </button>
                
                {errors.companyIndustry && <p className="text-[10px] text-danger mt-0.5">{errors.companyIndustry}</p>}
                
                {isIndustryOpen && (
                  <div className="absolute top-[66px] left-0 w-full bg-[#212127] border border-white/5 rounded-lg shadow-xl py-1 z-50 max-h-40 overflow-y-auto">
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
              <div className="w-full flex flex-col gap-1.5 text-left">
                <label className="text-xs font-medium text-gray-400">Website URL</label>
                <div className={`flex items-center bg-[#212127] hover:bg-[#26262d] h-10 px-3 rounded-lg border transition-colors w-full ${
                  errors.websiteUrl ? "border-danger" : "border-transparent focus-within:border-white/10"
                }`}>
                  <span className="text-xs text-gray-600 pr-1 select-none font-light">https://</span>
                  <input 
                    name="websiteUrl"
                    placeholder="www.company.com" 
                    onChange={() => handleInputChange("websiteUrl")}
                    className="text-xs text-gray-200 bg-transparent outline-none w-full font-light placeholder:text-gray-600"
                  />
                </div>
                {errors.websiteUrl && <p className="text-[10px] text-danger mt-0.5">{errors.websiteUrl}</p>}
              </div>

              {/* Location */}
              <div className="w-full flex flex-col gap-1.5 text-left">
                <label className="text-xs font-medium text-gray-400">Location</label>
                <div className={`flex items-center bg-[#212127] hover:bg-[#26262d] h-10 px-3 rounded-lg border transition-colors w-full ${
                  errors.companyLocation ? "border-danger" : "border-transparent focus-within:border-white/10"
                }`}>
                  <FiMapPin className="text-gray-500 text-xs shrink-0 mr-2" />
                  <input 
                    name="companyLocation"
                    placeholder="City, Country" 
                    onChange={() => handleInputChange("companyLocation")}
                    className="text-xs text-gray-200 bg-transparent outline-none w-full font-light placeholder:text-gray-600"
                  />
                </div>
                {errors.companyLocation && <p className="text-[10px] text-danger mt-0.5">{errors.companyLocation}</p>}
              </div>

              {/* Employee Count Range Dropdown */}
              <div ref={rangeRef} className="flex flex-col gap-1.5 text-left relative w-full">
                <label className="text-xs font-medium text-gray-400">Employee Count Range</label>
                <input type="hidden" name="employeeRange" value={selectedRange} />

                <button
                  type="button"
                  onClick={() => {
                    setIsRangeOpen(!isRangeOpen);
                    setIsIndustryOpen(false);
                  }}
                  className={`bg-[#212127] hover:bg-[#26262d] focus:bg-[#26262d] h-10 rounded-lg border px-3 flex items-center justify-between text-xs font-light transition-colors text-left w-full outline-none ring-0 ${
                    errors.employeeRange ? "border-danger" : "border-transparent focus:border-white/10"
                  }`}
                >
                  <span className={selectedRange ? "text-gray-200" : "text-gray-500"}>
                    {selectedRange || "Select Range"}
                  </span>
                  <FiChevronDown className={`text-gray-500 text-sm transition-transform duration-150 ${isRangeOpen ? "rotate-180" : ""}`} />
                </button>

                {errors.employeeRange && <p className="text-[10px] text-danger mt-0.5">{errors.employeeRange}</p>}
                
                {isRangeOpen && (
                  <div className="absolute top-[66px] left-0 w-full bg-[#212127] border border-white/5 rounded-lg shadow-xl py-1 z-50 max-h-40 overflow-y-auto">
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

              {/* Company Logo File Upload with ImgBB integration */}
              <div className="flex flex-col gap-1.5 text-left w-full">
                <label className="text-xs font-medium text-gray-400">Company Logo</label>
                <label className={`flex items-center gap-3 bg-[#212127] border border-dashed rounded-lg p-2 h-10 cursor-pointer hover:bg-[#26262d] transition-colors outline-none relative overflow-hidden ${
                  errors.companyLogo ? "border-danger" : "border-white/10"
                }`}>
                  
                  {isUploading ? (
                    // 1. Pending Upload Loading Spinner View
                    <div className="flex items-center gap-3 w-full h-full z-10 select-none">
                      <div className="w-7 h-7 bg-white/[0.04] border border-white/5 rounded flex items-center justify-center text-white shrink-0">
                        <CgSpinner className="text-sm animate-spin" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-medium text-gray-300 truncate">Uploading logo...</p>
                        <p className="text-[9px] text-gray-500 font-light">Sending to ImgBB hosting</p>
                      </div>
                    </div>
                  ) : logoPreview ? (
                    // 2. Successful Upload Preview View
                    <div className="flex items-center justify-between w-full h-full z-10">
                      <div className="flex items-center gap-2 min-w-0">
                        <img 
                          src={logoPreview} 
                          alt="Logo Preview" 
                          className="w-7 h-7 object-cover rounded border border-white/10 bg-black"
                        />
                        <div className="flex flex-col min-w-0">
                          <p className="text-[11px] font-medium text-gray-200 truncate max-w-[140px]">
                            {logoName}
                          </p>
                          <p className="text-[9px] text-green-400 font-light select-none">Upload complete</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveLogo}
                        className="p-1 text-gray-400 hover:text-danger rounded hover:bg-white/5 transition-colors"
                      >
                        <FiX className="text-sm" />
                      </button>
                    </div>
                  ) : (
                    // 3. Default Upload Area
                    <>
                      <div className="w-7 h-7 bg-white/[0.04] border border-white/5 rounded flex items-center justify-center text-gray-400 shrink-0">
                        <FiUploadCloud className="text-xs" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-medium text-gray-300 truncate">
                          Upload image
                        </p>
                        <p className="text-[9px] text-gray-500 font-light">PNG, JPG up to 5MB</p>
                      </div>
                    </>
                  )}

                  <input 
                    ref={fileInputRef}
                    type="file" 
                    name="companyLogoInput"
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleFileChange}
                    disabled={isUploading || !!logoPreview} 
                  />
                </label>
                {errors.companyLogo && <p className="text-[10px] text-danger mt-0.5">{errors.companyLogo}</p>}
              </div>

              {/* Brief Description */}
              <div className="sm:col-span-2 flex flex-col gap-1.5 text-left w-full">
                <label className="text-xs font-medium text-gray-400">Brief Description</label>
                <textarea
                  name="companyDescription"
                  placeholder="Tell us about your company's mission and culture..."
                  rows={3}
                  onChange={() => handleInputChange("companyDescription")}
                  className={`text-xs text-gray-200 placeholder-gray-600 font-light bg-[#212127] hover:bg-[#26262d] focus:bg-[#26262d] rounded-lg border p-3 outline-none resize-none leading-relaxed transition-colors w-full ${
                    errors.companyDescription ? "border-danger" : "border-transparent focus:border-white/10"
                  }`}
                />
                {errors.companyDescription && <p className="text-[10px] text-danger mt-0.5">{errors.companyDescription}</p>}
              </div>

            </div>

            {/* Footer Action Bar */}
            <div className="px-6 py-4 border-t border-white/5 flex items-center justify-end gap-3 bg-[#1e1e24]/40 w-full rounded-b-xl">
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
                disabled={isUploading}
                className="bg-white hover:bg-gray-100 text-[#0d0d11] text-xs font-semibold px-5 h-9 rounded-lg shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Register Company
              </Button>
            </div>

          </Form>
        </div>
      )}
    </div>
  );
}