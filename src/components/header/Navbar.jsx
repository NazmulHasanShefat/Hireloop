"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { FaArrowsSpin } from "react-icons/fa6";
import SignOutButton from "../ui/SignOutButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { data, isPending } = authClient.useSession();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setShowNav(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling Down
        setShowNav(false);
      } else {
        // Scrolling Up
        setShowNav(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const navLinks = [
    { name: "Browse Jobs", href: "/browse-jobs" },
    { name: "Company", href: "#" },
    { name: "Pricing", href: "/pricing" },
  ];

  const dashboardLinks = {
    seeker: "/dashboard/seeker",
    recruiter: "/dashboard/recruiter",
    admin: "/dashboard/admin",
  }


  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-transform duration-500 ease-in-out ${
        showNav ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full mx-auto max-w-7xl px-4 py-4">
        <nav className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#222222] px-6 py-4 backdrop-blur-xl">
          {/* Logo */}
          <div>
            <Link href="/" className="text-2xl font-bold">
              <span className="text-sky-500">hire</span>
              <span className="text-orange-500">loop</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden items-center gap-8 text-sm text-white md:flex">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="transition hover:text-violet-400"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-5 md:flex">
            {!data ? (
              isPending ? (
                <FaArrowsSpin className="text-violet-400 animate-spin" />
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="text-sm cursor-pointer text-white transition hover:text-violet-400"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/sign-up"
                    className="rounded-xl cursor-pointer bg-violet-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-violet-700"
                  >
                    Sign Up
                  </Link>
                </>
              )
            ) : (
              <>
                <Link
                  href={dashboardLinks[data?.user?.role] || "seeker"}
                  className="rounded-xl cursor-pointer bg-violet-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-violet-700"
                >
                  dashboard
                </Link>
                <SignOutButton />
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white md:hidden"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            isOpen
              ? "mt-2 max-h-96 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl"
              : "max-h-0"
          }`}
        >
          <div className="flex flex-col p-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="border-b border-white/10 py-3 text-white last:border-none"
              >
                {link.name}
              </a>
            ))}

            <Link href="/sign-in" className="mt-4 text-left text-white">
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="mt-3 rounded-xl bg-violet-600 px-4 py-3 text-white"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
