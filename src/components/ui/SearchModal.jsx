"use client";

import React, { useState } from "react";
// react-icons থেকে প্রয়োজনীয় আইকনগুলো নেওয়া হয়েছে
import { FiSearch, FiStar, FiX } from "react-icons/fi";
import { SiAlgolia } from "react-icons/si";
import { Button, Modal } from "@heroui/react";

export default function SearchModal() {
  // মডাল ওপেন/ক্লোজ স্টেট ম্যানেজমেন্টের জন্য (যদি প্রয়োজন হয়)
  const [isOpen, setIsOpen] = useState(false);

  // ডামি সার্চ ডেটা
  const recentSearches = [
    { id: 1, title: "line-height" },
    { id: 2, title: "font-size" },
    { id: 3, title: "background-image" },
    { id: 4, title: "background-image", subtitle: "Adding a linear gradient" },
    { id: 5, title: "background-position", subtitle: "Examples" },
  ];

  return (
    <div className="flex justify-center">
      {/* টগল বাটন: সার্চ আইকন সহ */}
      <Modal>
        <Button 
          isIconOnly 
          className="bg-zinc-800 text-white hover:bg-zinc-700 rounded-full p-0"
          aria-label="Search"
        >
          <FiSearch className="size-6 p-0" />
        </Button>

        {/* মডাল ব্যাকড্রপ (বাইরে ক্লিক করলে ক্লোজ হবে) */}
        <Modal.Backdrop className="bg-black/70 backdrop-blur-sm">
          <Modal.Container className="flex items-end sm:items-center justify-center p-0 sm:p-4">
            
            {/* মডাল ডায়ালগ - মোবাইল ফ্রেন্ডলি ও পিউর ব্ল্যাক থিম */}
            <Modal.Dialog 
              className="w-full max-w-md bg-zinc-950 text-zinc-100 border border-zinc-800 rounded-t-2xl sm:rounded-2xl overflow-hidden"
            >
              {/* মডাল ক্লোজ বাটন */}
              <Modal.CloseTrigger className="absolute right-4 top-4 text-zinc-400 hover:text-white" />

              {/* মডাল হেডার - সার্চ ইনপুট ফিল্ড */}
              <Modal.Header className="flex flex-col gap-1 p-4 border-b border-zinc-900 mt-4">
                <div className="relative flex items-center w-full">
                  <FiSearch className="absolute left-3 text-zinc-400 size-5" />
                  <input
                    type="text"
                    placeholder="Search documentation"
                    className="w-full bg-zinc-900 text-zinc-100 pl-11 pr-12 py-3 rounded-xl border border-zinc-800 focus:outline-none focus:border-zinc-700 placeholder-zinc-500 text-sm"
                  />
                  <span className="absolute right-3 text-xs bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-700">
                    esc
                  </span>
                </div>
              </Modal.Header>

              {/* মডাল বডি - রিসেন্ট সার্চ লিস্ট */}
              <Modal.Body className="p-0 max-h-[60vh] overflow-y-auto">
                {/* 'Recent' লেবেল */}
                <div className="px-4 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider bg-zinc-900/50">
                  Recent
                </div>

                {/* সার্চ লিস্ট আইটেমসমূহ */}
                <div className="divide-y divide-zinc-900/60">
                  {recentSearches.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between px-4 py-3 hover:bg-zinc-900 transition-colors cursor-pointer group"
                    >
                      <div className="flex flex-col min-w-0">
                        <span className={`text-sm ${item.subtitle ? 'text-zinc-400 font-medium' : 'text-zinc-300'}`}>
                          {item.title}
                        </span>
                        {item.subtitle && (
                          <span className="text-sm text-zinc-100 font-semibold mt-0.5">
                            {item.subtitle}
                          </span>
                        )}
                      </div>

                      {/* অ্যাকশন বাটন (Star এবং Close) */}
                      <div className="flex items-center gap-3 text-zinc-500">
                        <button className="hover:text-amber-400 transition-colors">
                          <FiStar className="size-4" />
                        </button>
                        <div className="h-4 w-[1px] bg-zinc-800" />
                        <button className="hover:text-red-400 transition-colors">
                          <FiX className="size-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Modal.Body>

              {/* মডাল ফুটার - Algolia ব্র্যান্ডিং */}
              <Modal.Footer className="flex justify-end items-center gap-1.5 p-4 border-t border-zinc-900 bg-zinc-950">
                <span className="text-xs text-zinc-500">Search by</span>
                <div className="flex items-center gap-1 text-zinc-400 font-medium text-sm">
                  <SiAlgolia className="text-[#003DFF] size-4" /> 
                  <span className="text-zinc-300 font-semibold tracking-tight">algolia</span>
                </div>
              </Modal.Footer>

            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}