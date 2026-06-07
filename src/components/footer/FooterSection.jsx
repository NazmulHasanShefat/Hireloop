import { LogoFacebook, LogoLinkedin } from "@gravity-ui/icons";
import React from "react";
import { FiInstagram } from "react-icons/fi";
// import { LogoFacebook, LogoInstagram, LogoLinkedin } from "@gravity-ui/icons";

const FooterSection = () => {
  const columns = [
    {
      title: "Product",
      links: ["Job discovery", "Worker AI", "Companies", "Salary data"],
    },
    {
      title: "Navigations",
      links: ["Help center", "Career library", "Contact"],
    },
    {
      title: "Resources",
      links: ["Brand Guideline", "Newsroom"],
    },
  ];

  return (
    <footer className="relative bg-[#0a0a0a] text-white overflow-hidden">
      {/* Hero CTA with background image */}
     

      {/* Footer content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="text-2xl font-bold mb-4">
              <span className="text-violet-400">hire</span>
              <span className="text-orange-400">loop</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-[220px]">
              The AI-native career platform. Built for people who take their work seriously.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-violet-400 text-sm font-medium mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 text-sm hover:text-white transition"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a href="#" className="w-8 h-8 rounded-md bg-[#1a1a1a] flex items-center justify-center hover:bg-[#222] transition">
              <LogoFacebook className="w-4 h-4 text-white" />
            </a>
            <a href="#" className="w-8 h-8 rounded-md bg-violet-500 flex items-center justify-center hover:bg-violet-600 transition">
              <FiInstagram className="w-4 h-4 text-white" />
            </a>
            <a href="#" className="w-8 h-8 rounded-md bg-[#1a1a1a] flex items-center justify-center hover:bg-[#222] transition">
              <LogoLinkedin className="w-4 h-4 text-white" />
            </a>
          </div>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <span>Copyright 2026 — Programming Hero</span>
            <a href="#" className="hover:text-white transition">Terms & Policy</a>
            <a href="#" className="hover:text-white transition">Privacy Guideline</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;