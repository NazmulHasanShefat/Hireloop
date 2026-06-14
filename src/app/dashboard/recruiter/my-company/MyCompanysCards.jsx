import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FiUsers, FiCheckCircle, FiBriefcase } from "react-icons/fi";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaLeaf, FaBolt } from "react-icons/fa6";
import Image from "next/image";

// ডাইনামিক ডাটা অ্যারে
const companyData = [
  {
    id: 1,
    name: "NovaStream AI",
    description: "Pioneering generative media for the enterprise sector.",
    status: "VERIFIED",
    location: "San Francisco",
    employees: "50-200",
    logoType: "text",
    logoText: "NV",
  },
  {
    id: 2,
    name: "GreenRoot Tech",
    description: "Sustainable logistics and supply chain optimization.",
    status: "PENDING",
    location: "London, UK",
    employees: "11-50",
    logoType: "icon",
    logoIcon: <FaLeaf className="text-white text-xl" />,
  },
  {
    id: 3,
    name: "Volt Dynamics",
    description: "Next-gen energy storage solutions for smart cities.",
    status: "VERIFIED",
    location: "Berlin, DE",
    employees: "201-500",
    logoType: "icon",
    logoIcon: <FaBolt className="text-white text-xl" />,
  },
];

const MyCompanysCards = ({ recruiterCompany }) => {
  console.log(recruiterCompany);
  return (
    <div className="w-full min-h-screen bg-[#121212] flex justify-center p-6">
      {/* কার্ড গ্রিড কন্টেইনার */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {recruiterCompany.map((company) => (
          <div
            key={company._id}
            className="bg-[#1e1e1e] border h-max border-[#2d2d2d] rounded-2xl p-6 flex flex-col justify-between hover:border-[#3d3d3d] transition-all duration-300"
          >
            {/* উপরের অংশ: লোগো এবং স্ট্যাটাস ট্যাগ */}
            <div className="flex justify-between items-start mb-6">
              {/* লোগো কন্টেইনার */}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#2d2d2d] border border-[#3d3d3d]">
                {company.companyLogo ? (
                  <Image
                    width={50}
                    height={50}
                    src={company?.companyLogo}
                    alt={company?.companyName}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <FiBriefcase className="text-white text-xl" />
                )}
              </div>

              {/* স্ট্যাটাস ব্যাজ */}
              <span className="flex items-center gap-1 text-[11px] font-bold tracking-wider px-2.5 py-1 rounded-md border bg-[#142918] text-[#4ade80] border-[#1e4620]">
                <FiCheckCircle className="text-xs" />
                VERIFIED
              </span>
            </div>

            {/* মাঝের অংশ: নাম এবং বিবরণ */}
            <div className="mb-6 flex-grow">
              <h2 className="text-white text-xl hover:underline cursor-pointer font-semibold mb-2 tracking-tight">
                {company.companyName}
              </h2>
              <p className="text-[#999999] text-sm leading-relaxed">
                {company.companyDescription}
              </p>
            </div>

            {/* নিচের অংশ: লোকেশন এবং এমপ্লয়ি সংখ্যা */}
            <div className="flex items-center gap-3 mt-auto">
              {/* লোকেশন ট্যাগ */}
              <div className="flex items-center gap-1.5 bg-[#252525] border border-[#2d2d2d] px-3 py-1.5 rounded-full text-[#cccccc] text-xs">
                <IoLocationOutline className="text-sm text-[#888888]" />
                <span>{company.companyLocation}</span>
              </div>

              {/* এমপ্লয়ি ট্যাগ */}
              <div className="flex items-center gap-1.5 bg-[#252525] border border-[#2d2d2d] px-3 py-1.5 rounded-full text-[#cccccc] text-xs">
                <FiUsers className="text-sm text-[#888888]" />
                <span>{company.employeeRange}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCompanysCards;
