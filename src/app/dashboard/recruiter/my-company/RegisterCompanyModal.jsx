// "use client";

// import React, { useState } from "react";
// import { Button, Input, TextField, Label, TextArea } from "@heroui/react";
// import { FiMapPin, FiUploadCloud, FiChevronDown, FiX } from "react-icons/fi";

// export default function RegisterCompanyModal() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [logoName, setLogoName] = useState("");

//   // Form States
//   const [selectedIndustry, setSelectedIndustry] = useState("");
//   const [selectedRange, setSelectedRange] = useState("");

//   // Dropdown open/close toggles
//   const [isIndustryOpen, setIsIndustryOpen] = useState(false);
//   const [isRangeOpen, setIsRangeOpen] = useState(false);

//   const industries = ["Technology", "Finance", "Healthcare", "Education"];
//   const employeeRanges = ["1-10 employees", "11-50 employees", "51-200 employees", "201+ employees"];

//   return (
//     <div className="p-6 flex justify-center items-center bg-[#0d0d11]">
//       {/* Toggle Trigger Button */}
//       <Button
//         onPress={() => setIsOpen(true)}
//         size="md"
//         className="bg-white hover:bg-gray-100 text-[#0d0d11] text-xs font-medium px-6 py-2.5 rounded-lg shadow-sm transition-all duration-150"
//       >
//         Register your company
//       </Button>

//       {/* Custom Modal Backdrop Overlay */}
//       {isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div 
//             className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
//             onClick={() => {
//               setIsOpen(false);
//               setIsIndustryOpen(false);
//               setIsRangeOpen(false);
//             }}
//           />

//           {/* Modal Card Surface Wrapper */}
//           <div className="relative bg-[#16161a] border border-white/5 rounded-xl shadow-2xl text-gray-200 w-full max-w-[620px] overflow-visible transform transition-all z-10 animate-in fade-in zoom-in-95 duration-150">
            
//             {/* Header */}
//             <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/5">
//               <div className="text-left">
//                 <h2 className="text-lg font-semibold text-white tracking-wide">
//                   Register New Company
//                 </h2>
//                 <p className="text-xs text-gray-500 font-light mt-0.5">
//                   Enter your business details to start hiring on HireLoop.
//                 </p>
//               </div>
//               <Button 
//                 isIconOnly 
//                 onClick={() => setIsOpen(false)}
//                 className="bg-transparent hover:bg-white/5 text-gray-400 hover:text-white min-w-8 h-8 rounded-lg"
//               >
//                 <FiX className="text-base" />
//               </Button>
//             </div>

//             {/* Body Form Layout */}
//             <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto overflow-x-visible">
              
//               {/* Company Name */}
//               <div className="flex flex-col gap-1.5 text-left">
//                 <label className="text-xs font-medium text-gray-400">Company Name</label>
//                 <Input 
//                   placeholder="e.g. Acme Corp" 
//                   variant="flat"
//                   className={{
//                     input: "text-xs text-gray-200 placeholder-gray-600 font-light",
//                     inputWrapper: "bg-[#212127] hover:bg-[#26262d] group-data-[focus=true]:bg-[#26262d] h-10 rounded-lg border border-transparent group-data-[focus=true]:border-white/10"
//                   }}
//                 />
//               </div>

//               {/* Industry / Category Custom Selection Dropdown */}
//               <div className="flex flex-col gap-1.5 text-left relative">
//                 <label className="text-xs font-medium text-gray-400">Industry / Category</label>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setIsIndustryOpen(!isIndustryOpen);
//                     setIsRangeOpen(false);
//                   }}
//                   className="bg-[#212127] hover:bg-[#26262d] h-10 rounded-lg border border-transparent px-3 flex items-center justify-between text-xs text-gray-200 font-light transition-colors text-left w-full focus:border-white/10"
//                 >
//                   <span className={selectedIndustry ? "text-gray-200" : "text-gray-500"}>
//                     {selectedIndustry || "Select Industry"}
//                   </span>
//                   <FiChevronDown className={`text-gray-500 text-sm transition-transform duration-150 ${isIndustryOpen ? "rotate-180" : ""}`} />
//                 </button>
                
//                 {isIndustryOpen && (
//                   <div className="absolute top-[62px] left-0 w-full bg-[#212127] border border-white/5 rounded-lg shadow-xl py-1 z-50 max-h-40 overflow-y-auto">
//                     {industries.map((item) => (
//                       <button
//                         key={item}
//                         type="button"
//                         onClick={() => {
//                           setSelectedIndustry(item);
//                           setIsIndustryOpen(false);
//                         }}
//                         className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
//                       >
//                         {item}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Website URL */}
//               <div className="flex flex-col gap-1.5 text-left">
//                 <label className="text-xs font-medium text-gray-400">Website URL</label>
//                 <Input 
//                   placeholder="www.company.com" 
//                   variant="flat"
//                   className={{
//                     input: "text-xs text-gray-200 placeholder-gray-600 font-light",
//                     inputWrapper: "bg-[#212127] hover:bg-[#26262d] group-data-[focus=true]:bg-[#26262d] h-10 rounded-lg border border-transparent group-data-[focus=true]:border-white/10"
//                   }}
//                 />
//               </div>

//               {/* Location */}
//               <div className="flex flex-col gap-1.5 text-left">
//                 <label className="text-xs font-medium text-gray-400">Location</label>
//                 <Input 
//                   placeholder="City, Country" 
                
//                   variant="flat"
//                   className={{
//                     input: "text-xs text-gray-200 placeholder-gray-600 font-light",
//                     inputWrapper: "bg-[#212127] hover:bg-[#26262d] group-data-[focus=true]:bg-[#26262d] h-10 rounded-lg border border-transparent group-data-[focus=true]:border-white/10"
//                   }}
//                 />
//               </div>

//               {/* Employee Count Range Custom Selection Dropdown */}
//               <div className="flex flex-col gap-1.5 text-left relative">
//                 <label className="text-xs font-medium text-gray-400">Employee Count Range</label>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setIsRangeOpen(!isRangeOpen);
//                     setIsIndustryOpen(false);
//                   }}
//                   className="bg-[#212127] hover:bg-[#26262d] h-10 rounded-lg border border-transparent px-3 flex items-center justify-between text-xs text-gray-200 font-light transition-colors text-left w-full focus:border-white/10"
//                 >
//                   <span className={selectedRange ? "text-gray-200" : "text-gray-500"}>
//                     {selectedRange || "Select Range"}
//                   </span>
//                   <FiChevronDown className={`text-gray-500 text-sm transition-transform duration-150 ${isRangeOpen ? "rotate-180" : ""}`} />
//                 </button>
                
//                 {isRangeOpen && (
//                   <div className="absolute top-[62px] left-0 w-full bg-[#212127] border border-white/5 rounded-lg shadow-xl py-1 z-50 max-h-40 overflow-y-auto">
//                     {employeeRanges.map((item) => (
//                       <button
//                         key={item}
//                         type="button"
//                         onClick={() => {
//                           setSelectedRange(item);
//                           setIsRangeOpen(false);
//                         }}
//                         className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
//                       >
//                         {item}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Company Logo File Upload */}
//               <div className="flex flex-col gap-1.5 text-left">
//                 <label className="text-xs font-medium text-gray-400">Company Logo</label>
//                 <label className="flex items-center gap-3 bg-[#212127] border border-dashed border-white/10 rounded-lg p-2 h-10 cursor-pointer hover:bg-[#26262d] transition-colors">
//                   <div className="w-7 h-7 bg-white/[0.04] border border-white/5 rounded flex items-center justify-center text-gray-400 shrink-0">
//                     <FiUploadCloud className="text-xs" />
//                   </div>
//                   <div className="min-w-0 flex-1">
//                     <p className="text-[11px] font-medium text-gray-300 truncate">
//                       {logoName || "Upload image"}
//                     </p>
//                     {!logoName && (
//                       <p className="text-[9px] text-gray-500 font-light">PNG, JPG up to 5MB</p>
//                     )}
//                   </div>
//                   <input 
//                     type="file" 
//                     accept="image/*" 
//                     className="hidden" 
//                     onChange={(e) => setLogoName(e.target.files[0]?.name || "")}
//                   />
//                 </label>
//               </div>

//               {/* Brief Description */}
//               <TextField className="sm:col-span-2 flex flex-col gap-1.5 text-left">
//                 <Label className="text-xs font-medium text-gray-400">Brief Description</Label>
//                 <TextArea
//                   placeholder="Tell us about your company's mission and culture..."
//                   rows={3}
//                   className="text-xs text-gray-200 placeholder-gray-600 font-light bg-[#212127] hover:bg-[#26262d] focus:bg-[#26262d] rounded-lg border border-transparent focus:border-white/10 p-3 outline-none resize-none leading-relaxed transition-colors"
//                 />
//               </TextField>

//             </div>

//             {/* Footer Action Bar */}
//             <div className="px-6 py-4 border-t border-white/5 flex items-center justify-end gap-3 bg-[#1e1e24]/40">
//               <Button
//                 variant="flat"
//                 onClick={() => {
//                   setIsOpen(false);
//                   setIsIndustryOpen(false);
//                   setIsRangeOpen(false);
//                 }}
//                 className="bg-[#212127] hover:bg-[#26262d] text-gray-300 text-xs font-medium px-5 h-9 rounded-lg"
//               >
//                 Cancel
//               </Button>
//               <Button
//                 onClick={() => {
//                   console.log("Submitting Company Profile details:", { selectedIndustry, selectedRange });
//                   setIsOpen(false);
//                 }}
//                 className="bg-white hover:bg-gray-100 text-[#0d0d11] text-xs font-semibold px-5 h-9 rounded-lg shadow-sm"
//               >
//                 Register Company
//               </Button>
//             </div>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { Button, Input, TextField, Label, TextArea } from "@heroui/react";
import { FiMapPin, FiUploadCloud, FiChevronDown, FiX } from "react-icons/fi";

export default function RegisterCompanyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [logoName, setLogoName] = useState("");

  // Select Dropdown States
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedRange, setSelectedRange] = useState("");
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);
  const [isRangeOpen, setIsRangeOpen] = useState(false);

  const industries = ["Technology", "Finance", "Healthcare", "Education"];
  const employeeRanges = ["1-10 employees", "11-50 employees", "51-200 employees", "201+ employees"];

  return (
    <div className="p-6 flex justify-center items-center bg-[#0d0d11]">
      {/* Toggle Trigger Button */}
      <Button
        onPress={() => setIsOpen(true)}
        size="md"
        className="bg-white hover:bg-gray-100 text-[#0d0d11] text-xs font-medium px-6 py-2.5 rounded-lg shadow-sm transition-all duration-150"
      >
        Register your company
      </Button>

      {/* Custom Modal Backdrop Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => {
              setIsOpen(false);
              setIsIndustryOpen(false);
              setIsRangeOpen(false);
            }}
          />

          {/* Modal Card Surface Wrapper */}
          <div className="relative bg-[#16161a] border border-white/5 rounded-xl shadow-2xl text-gray-200 w-full max-w-[620px] overflow-visible transform transition-all z-10 animate-in fade-in zoom-in-95 duration-150">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/5">
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
                onClick={() => setIsOpen(false)}
                className="bg-transparent hover:bg-white/5 text-gray-400 hover:text-white min-w-8 h-8 rounded-lg"
              >
                <FiX className="text-base" />
              </Button>
            </div>

            {/* Body Form Layout */}
            <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto overflow-x-visible">
              
              {/* Company Name */}
              <TextField className="w-full flex flex-col gap-1.5 text-left">
                <Label className="text-xs font-medium text-gray-400">Company Name</Label>
                <Input 
                  placeholder="e.g. Acme Corp" 
                  className="text-xs text-gray-200 bg-[#212127] hover:bg-[#26262d] focus-within:bg-[#26262d] h-10 px-3 rounded-lg border border-transparent focus-within:border-white/10 outline-none ring-0 focus:outline-none focus:ring-0 w-full transition-colors font-light placeholder:text-gray-600"
                />
              </TextField>

              {/* Industry / Category Selection Dropdown */}
              <div className="flex flex-col gap-1.5 text-left relative">
                <label className="text-xs font-medium text-gray-400">Industry / Category</label>
                <button
                  type="button"
                  onClick={() => {
                    setIsIndustryOpen(!isIndustryOpen);
                    setIsRangeOpen(false);
                  }}
                  className="bg-[#212127] hover:bg-[#26262d] focus:bg-[#26262d] h-10 rounded-lg border border-transparent px-3 flex items-center justify-between text-xs font-light transition-colors text-left w-full focus:border-white/10 outline-none ring-0"
                >
                  <span className={selectedIndustry ? "text-gray-200" : "text-gray-500"}>
                    {selectedIndustry || "Select Industry"}
                  </span>
                  <FiChevronDown className={`text-gray-500 text-sm transition-transform duration-150 ${isIndustryOpen ? "rotate-180" : ""}`} />
                </button>
                
                {isIndustryOpen && (
                  <div className="absolute top-[62px] left-0 w-full bg-[#212127] border border-white/5 rounded-lg shadow-xl py-1 z-50 max-h-40 overflow-y-auto">
                    {industries.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setSelectedIndustry(item);
                          setIsIndustryOpen(false);
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
                <Label className="text-xs font-medium text-gray-400">Website URL</Label>
                <div className="flex items-center bg-[#212127] hover:bg-[#26262d] focus-within:bg-[#26262d] h-10 px-3 rounded-lg border border-transparent focus-within:border-white/10 transition-colors w-full ring-0 outline-none">
                  <span className="text-xs text-gray-600 pr-1 select-none font-light">https://</span>
                  <Input 
                    placeholder="www.company.com" 
                    className="text-xs text-gray-200 bg-transparent outline-none ring-0 focus:outline-none focus:ring-0 w-full font-light placeholder:text-gray-600"
                  />
                </div>
              </TextField>

              {/* Location */}
              <TextField className="w-full flex flex-col gap-1.5 text-left">
                <Label className="text-xs font-medium text-gray-400">Location</Label>
                <div className="flex items-center bg-[#212127] hover:bg-[#26262d] focus-within:bg-[#26262d] h-10 px-3 rounded-lg border border-transparent focus-within:border-white/10 transition-colors w-full ring-0 outline-none">
                  <FiMapPin className="text-gray-500 text-xs shrink-0 mr-2" />
                  <Input 
                    placeholder="City, Country" 
                    className="text-xs text-gray-200 bg-transparent outline-none ring-0 focus:outline-none focus:ring-0 w-full font-light placeholder:text-gray-600"
                  />
                </div>
              </TextField>

              {/* Employee Count Range Selection Dropdown */}
              <div className="flex flex-col gap-1.5 text-left relative">
                <label className="text-xs font-medium text-gray-400">Employee Count Range</label>
                <button
                  type="button"
                  onClick={() => {
                    setIsRangeOpen(!isRangeOpen);
                    setIsIndustryOpen(false);
                  }}
                  className="bg-[#212127] hover:bg-[#26262d] focus:bg-[#26262d] h-10 rounded-lg border border-transparent px-3 flex items-center justify-between text-xs font-light transition-colors text-left w-full focus:border-white/10 outline-none ring-0"
                >
                  <span className={selectedRange ? "text-gray-200" : "text-gray-500"}>
                    {selectedRange || "Select Range"}
                  </span>
                  <FiChevronDown className={`text-gray-500 text-sm transition-transform duration-150 ${isRangeOpen ? "rotate-180" : ""}`} />
                </button>
                
                {isRangeOpen && (
                  <div className="absolute top-[62px] left-0 w-full bg-[#212127] border border-white/5 rounded-lg shadow-xl py-1 z-50 max-h-40 overflow-y-auto">
                    {employeeRanges.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setSelectedRange(item);
                          setIsRangeOpen(false);
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
                <label className="flex items-center gap-3 bg-[#212127] border border-dashed border-white/10 rounded-lg p-2 h-10 cursor-pointer hover:bg-[#26262d] transition-colors focus-within:border-white/10 outline-none">
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
                  placeholder="Tell us about your company's mission and culture..."
                  rows={3}
                  className="text-xs text-gray-200 placeholder-gray-600 font-light bg-[#212127] hover:bg-[#26262d] focus:bg-[#26262d] rounded-lg border border-transparent focus:border-white/10 p-3 outline-none ring-0 focus:outline-none focus:ring-0 resize-none leading-relaxed transition-colors w-full"
                />
              </TextField>

            </div>

            {/* Footer Action Bar */}
            <div className="px-6 py-4 border-t border-white/5 flex items-center justify-end gap-3 bg-[#1e1e24]/40">
              <Button
                variant="flat"
                onClick={() => {
                  setIsOpen(false);
                  setIsIndustryOpen(false);
                  setIsRangeOpen(false);
                }}
                className="bg-[#212127] hover:bg-[#26262d] text-gray-300 text-xs font-medium px-5 h-9 rounded-lg"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("Submitting custom corporate entry form dataset...");
                  setIsOpen(false);
                }}
                className="bg-white hover:bg-gray-100 text-[#0d0d11] text-xs font-semibold px-5 h-9 rounded-lg shadow-sm"
              >
                Register Company
              </Button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}