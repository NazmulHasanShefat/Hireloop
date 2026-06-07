import { FiFileText, FiUsers } from "react-icons/fi";
import { HiCheckCircle } from "react-icons/hi2";
import { PiLightningBold } from "react-icons/pi";

export default function RecruiterStatesComponent() {
  // Stats data matching Screenshot 2026-06-06 114422.png
  const stats = [
    {
      id: 1,
      title: "Total Job Posts",
      value: "48",
      icon: FiFileText,
    },
    {
      id: 2,
      title: "Total Applicants",
      value: "1,284",
      icon: FiUsers,
    },
    {
      id: 3,
      title: "Active Jobs",
      value: "18",
      icon: PiLightningBold,
    },
    {
      id: 4,
      title: "Jobs Closed",
      value: "32",
      icon: HiCheckCircle,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-5 py-6 select-none">
      {/* Welcome Heading */}
      <h1 className="text-xl sm:text-2xl font-medium text-gray-100 tracking-wide mb-6">
        Welcome back, Alex Sterling
      </h1>

      {/* Grid Layout Container */}
      <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={stat.id}
              className="bg-[#16161a] border border-white/5 rounded-xl p-5 flex flex-col justify-between min-h-[140px] shadow-md transition-all duration-200 hover:border-white/10"
            >
              {/* Icon Container with subtle backdrop wrap */}
              <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.02] flex items-center justify-center text-gray-400">
                <IconComponent className="text-base" />
              </div>

              {/* Text & Values Wrapper */}
              <div className="mt-4 text-left">
                <p className="text-[11px] font-light text-gray-500 tracking-wide uppercase sm:normal-case sm:text-xs">
                  {stat.title}
                </p>
                <p className="text-xl sm:text-2xl font-semibold text-gray-100 tracking-tight mt-1">
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}