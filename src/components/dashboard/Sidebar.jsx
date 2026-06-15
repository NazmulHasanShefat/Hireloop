"use client";
import {
  FiHome,
  FiBriefcase,
  FiFileText,
  FiSettings,
} from "react-icons/fi";
import { FiSearch, FiBookmark, FiCreditCard ,FiUser, FiUsers } from "react-icons/fi";

import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FiGrid } from "react-icons/fi";

import { Avatar } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function Sidebar() {
  const currentPath = usePathname();
  const { data: session, isPending, error } = authClient.useSession();

  const navItemsRecruiter = [
    { icon: FiHome, label: "Dashboard", href: "/dashboard/recruiter" },
    {
      icon: HiOutlineBuildingOffice2,
      label: "My Company",
      href: "/dashboard/recruiter/my-company",
    },
    {
      icon: FiBriefcase,
      label: "Manage jobs",
      href: "/dashboard/recruiter/manage-jobs",
    },
    {
      icon: FiFileText,
      label: "Applications",
      href: "/dashboard/recruiter/applications",
    },
    { icon: FiUser, label: "Profile", href: "/dashboard/recruiter/profile" },
    {
      icon: FiSettings,
      label: "Settings",
      href: "/dashboard/recruiter/settings",
    },
  ];

  const navItemsSeeker = [
    { icon: FiHome, label: "Dashboard", href: "/dashboard/seeker" },
    { icon: FiSearch, label: "Jobs", href: "/dashboard/seeker/jobs" },
    {
      icon: FiBookmark,
      label: "Saved Jobs",
      href: "/dashboard/seeker/saved-jobs",
    },
    {
      icon: FiFileText,
      label: "Applications",
      href: "/dashboard/seeker/applications",
    },
    { icon: FiCreditCard, label: "Billing", href: "/dashboard/seeker/billing" },
    { icon: FiSettings, label: "Settings", href: "/dashboard/seeker/settings" },
  ];
  const navItemsAdmin = [
    {
      icon: FiGrid,
      label: "Dashboard",
      href: "/dashboard/admin",
    },
    {
      icon: FiUsers,
      label: "Users",
      href: "/dashboard/admin/users",
    },
    {
      icon: HiOutlineBuildingOffice2,
      label: "Companies",
      href: "/dashboard/admin/companies",
    },
    {
      icon: FiBriefcase,
      label: "Jobs",
      href: "/dashboard/admin/jobs",
    },
    {
      icon: FiCreditCard,
      label: "Payments",
      href: "/dashboard/admin/payments",
    },
    {
      icon: FiSettings,
      label: "Settings",
      href: "/dashboard/admin/settings",
    },
  ];

  const navItems = {
    recruiter: navItemsRecruiter,
    seeker: navItemsSeeker,
    admin: navItemsAdmin
  };

  // সেফটি বা ব্যাকআপ রোল হিসেবে 'seeker' রাখা হয়েছে যদি সেশন না থাকে বা লোড হতে থাকে
  const userRole = session?.user?.role || "seeker";

  return (
    <aside className="border hidden lg:block border-r-gray-500 pl-3 pr-5 fixed top-0 left-0 h-screen bg-white dark:bg-[#0a0a0a] w-[200px]">
      <div>
        <Link href={"/"} className="px-3">
          <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={50}
            className="mb-3 mt-4"
          />
        </Link>
        <div className="profile">
          <div className="px-3 pt-1 pb-1">
            <div className="flex items-center gap-2">
              <Avatar size="sm">
                <Avatar.Image
                  alt="Jane"
                  src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
                />
                <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
              </Avatar>
              <div className="flex flex-col gap-0">
                <p className="text-sm leading-5 font-medium">Jane Doe</p>
                <p className="text-xs leading-none text-muted">
                  jane@example.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="flex flex-col gap-1 mt-8">
        {isPending ? (
          // --- Loading Skeleton Start ---
          <>
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 border border-transparent animate-pulse"
              >
                {/* আইকনের জন্য গোল Skeleton */}
                <div className="size-5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                {/* লেখার জন্য লম্বা Skeleton */}
                <div className="h-4 w-24 rounded bg-gray-300 dark:bg-gray-700"></div>
              </div>
            ))}
          </>
        ) : (
          // --- Actual Navigation Links ---
          <>
            {/* সেশন থেকে রোল না পেলে বা কোনো কারণে আনডিফাইনড হলে ক্র্যাশ এড়াতে 'userRole' ব্যবহার করা হয়েছে */}
            {(navItems[session?.user?.role] || navItems[userRole]).map(
              (item) => (
                <Link
                  href={item.href}
                  key={item.label}
                  className={`flex text-left cursor-pointer ${
                    currentPath === item.href
                      ? "bg-gray-400/15 border-r-gray-200"
                      : "border-transparent"
                  } items-center border gap-3 rounded-md px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default`}
                  type="button"
                >
                  <item.icon className="size-5 text-muted" />
                  {item.label}
                </Link>
              ),
            )}
          </>
        )}
      </nav>
    </aside>
  );
}
