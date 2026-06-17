"use client";
import { updateUser } from "@/lib/actions/users";
import { toast } from "@heroui/react";
import React from "react";
import { FaUser, FaBriefcase, FaUserShield } from "react-icons/fa";

// Mock function to format MongoDB ISO dates nicely (e.g., "Jun 15, 2026")
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

// Helper to get initials if there is no profile image
const getInitials = (name) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const UsersTable = ({ users = [] }) => {
  // Unified action handler for debugging/logging
  const handleAction = async (actionType, user) => {
    // console.log(`Action Triggers: [${actionType}] for User:`, {
    //   id: user.id || user._id,
    //   name: user.name,
    //   email: user.email,
    //   currentRole: user.role,
    // });
    if (actionType === "make_Recruiter") {
      const result = await updateUser(user.id, "recruiter");
      if(result?.user?.id){
        toast.success("updated successfully")
      }
    }
    if (actionType === "make_Seeker") {
      const result = await updateUser(user.id, "seeker");
      if(result?.user?.id){
        toast.success("updated successfully")
      }
    }
    if (actionType === "make_Admin") {
      const result = await updateUser(user.id, "admin");
      if(result?.user?.id){
        toast.success("updated successfully")
      }
    }
  };

  return (
    <div className="w-full bg-white dark:bg-[#121212] p-4 md:p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 transition-colors duration-200">
      {/* 1. Desktop Layout: Standard Table (visible on md screens and up) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse text-left text-sm text-neutral-600 dark:text-neutral-300">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 font-medium">
              <th className="py-4 px-4">User Name</th>
              <th className="py-4 px-4">Email Address</th>
              <th className="py-4 px-4">Role</th>
              <th className="py-4 px-4">Join Date</th>
              <th className="py-4 px-4">Status</th>
              <th className="py-4 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/50">
            {users.map((user) => {
              const isAdmin = user.role === "admin";
              const isRecruiter =
                user.role === "recruiter" || user.plan?.includes("recruiter");
              const isSuspended = user.status === "suspended";
              const joinDate = user?.createdAt?.$date || user?.createdAt;

              return (
                <tr
                  key={user?.id || user?._id}
                  className="hover:bg-neutral-50 dark:hover:bg-neutral-900/40 transition-colors duration-150"
                >
                  {/* User Name with Avatar */}
                  <td className="py-4 px-4 flex items-center gap-3">
                    {user?.image ? (
                      <img
                        src={user?.image}
                        alt={user?.name}
                        className="w-9 h-9 rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-600 dark:text-neutral-200 flex items-center justify-center">
                        {getInitials(user?.name)}
                      </div>
                    )}
                    <span className="font-medium text-neutral-800 dark:text-neutral-200">
                      {user.name || "N/A"}
                    </span>
                  </td>

                  {/* Email Address */}
                  <td className="py-4 px-4 text-neutral-500 dark:text-neutral-400 font-mono text-xs">
                    {user.email}
                  </td>

                  {/* Dynamic Role Badges */}
                  <td className="py-4 px-4">
                    {isAdmin ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/50">
                        <FaUserShield className="text-[10px]" /> Admin
                      </span>
                    ) : isRecruiter ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-900 dark:bg-neutral-200 text-white dark:text-neutral-900 shadow-sm">
                        <FaBriefcase className="text-[10px]" /> Recruiter
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-50 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700/50">
                        <FaUser className="text-[10px]" /> Seeker
                      </span>
                    )}
                  </td>

                  {/* Join Date */}
                  <td className="py-4 px-4 text-neutral-500 dark:text-neutral-400">
                    {formatDate(joinDate)}
                  </td>

                  {/* Dynamic Status Tags */}
                  <td className="py-4 px-4">
                    {isSuspended ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-500 border border-red-200 dark:border-red-900/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                        Suspended
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-500 border border-green-200 dark:border-green-900/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Active
                      </span>
                    )}
                  </td>

                  {/* Actions Column */}
                  <td className="py-4 px-4 text-right">
                    <div className="inline-flex items-center gap-3 text-xs font-medium">
                      {isSuspended ? (
                        <>
                          <button
                            onClick={() => handleAction("Activate", user)}
                            className="text-green-600 dark:text-green-500 hover:underline transition-all"
                          >
                            Activate
                          </button>
                          <button
                            onClick={() => handleAction("Delete", user)}
                            className="text-neutral-500 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-500 hover:underline transition-all"
                          >
                            Delete
                          </button>
                        </>
                      ) : (
                        <>
                          {/* Role Toggle Action */}
                          {!isAdmin && (
                            <button
                              onClick={() =>
                                handleAction(
                                  isRecruiter
                                    ? "make_Seeker"
                                    : "make_Recruiter",
                                  user,
                                )
                              }
                              className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:underline transition-all"
                            >
                              {isRecruiter ? "Make Seeker" : "Make Recruiter"}
                            </button>
                          )}

                          {/* Make Admin Action (Only if they aren't already admin) */}
                          {!isAdmin && (
                            <button
                              onClick={() => handleAction("make_Admin", user)}
                              className="text-purple-600 dark:text-purple-400 hover:underline transition-all font-semibold"
                            >
                              Make Admin
                            </button>
                          )}

                          <button
                            onClick={() => handleAction("Suspend", user)}
                            className="text-red-600 dark:text-red-500 hover:underline transition-all"
                          >
                            Suspend
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 2. Mobile Layout: Card-Based List (visible on small screens below md) */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {users.map((user) => {
          const isAdmin = user.role === "admin";
          const isRecruiter =
            user.role === "recruiter" || user.plan?.includes("recruiter");
          const isSuspended = user.status === "suspended";
          const joinDate = user?.createdAt?.$date || user?.createdAt;

          return (
            <div
              key={user?.id || user?._id}
              className="p-4 rounded-lg bg-neutral-50/50 dark:bg-neutral-900/20 border border-neutral-100 dark:border-neutral-800/60 flex flex-col gap-3"
            >
              {/* Header: Identity & Status */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-600 dark:text-neutral-200 flex items-center justify-center shrink-0">
                      {getInitials(user.name)}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200 text-sm">
                      {user.name || "N/A"}
                    </span>
                    <span className="text-neutral-500 dark:text-neutral-400 font-mono text-[11px] break-all max-w-[180px] sm:max-w-none">
                      {user.email}
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="shrink-0">
                  {isSuspended ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-500 border border-red-200 dark:border-red-900/50">
                      Suspended
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-500 border border-green-200 dark:border-green-900/30">
                      Active
                    </span>
                  )}
                </div>
              </div>

              <hr className="border-neutral-200/60 dark:border-neutral-800/50" />

              {/* Core Details metadata row */}
              <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-semibold mb-0.5">
                    Role
                  </span>
                  {isAdmin ? (
                    <span className="inline-flex items-center gap-1 text-purple-600 dark:text-purple-400 font-medium">
                      <FaUserShield className="text-[10px]" /> Admin
                    </span>
                  ) : isRecruiter ? (
                    <span className="inline-flex items-center gap-1 text-neutral-800 dark:text-neutral-200 font-medium">
                      <FaBriefcase className="text-[10px]" /> Recruiter
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-neutral-600 dark:text-neutral-400 font-medium">
                      <FaUser className="text-[10px]" /> Seeker
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="block text-[10px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-semibold mb-0.5">
                    Joined
                  </span>
                  <span className="font-medium text-neutral-700 dark:text-neutral-300">
                    {formatDate(joinDate)}
                  </span>
                </div>
              </div>

              {/* Action Buttons row */}
              <div className="mt-1 pt-2 border-t border-neutral-100 dark:border-neutral-800/40 flex items-center justify-end flex-wrap gap-2 text-xs font-semibold">
                {isSuspended ? (
                  <>
                    <button
                      onClick={() => handleAction("Activate", user)}
                      className="px-3 py-1.5 rounded-md bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-900/30 active:bg-green-100"
                    >
                      Activate
                    </button>
                    <button
                      onClick={() => handleAction("Delete", user)}
                      className="px-3 py-1.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-red-500 dark:hover:text-red-400 border border-neutral-200 dark:border-neutral-700"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <>
                    {/* Role Toggles */}
                    {!isAdmin && (
                      <button
                        onClick={() =>
                          handleAction(
                            isRecruiter ? "make_Seeker" : "make_Recruiter",
                            user,
                          )
                        }
                        className="px-3 py-1.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                      >
                        {isRecruiter ? "Make Seeker" : "Make Recruiter"}
                      </button>
                    )}

                    {/* Make Admin Button */}
                    {!isAdmin && (
                      <button
                        onClick={() => handleAction("make_Admin", user)}
                        className="px-3 py-1.5 rounded-md bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/30"
                      >
                        Make Admin
                      </button>
                    )}

                    <button
                      onClick={() => handleAction("Suspend", user)}
                      className="px-3 py-1.5 rounded-md bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30"
                    >
                      Suspend
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UsersTable;
