import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";
import ApplicationForm from "./applyForm";
import { getJobDetails } from "@/lib/api/jobs";
import { getApplicationByApplicant } from "@/lib/api/applications";
import Link from "next/link";

// React Icons Imports
import { FaCrown, FaCheckCircle, FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";
import { getPlanById } from "@/lib/api/plans";

const ApplyPage = async ({ params }) => {
  const user = await getUserSession();
  const { id } = await params;
  
  if (!user) {
    redirect(`/sign-in?redirect=/browse-jobs/jobs/${id}/apply`);
  }

  if (user.role !== "seeker") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="text-center p-8 max-w-md border border-danger-200 bg-danger-50 rounded-xl shadow-sm">
          <FaExclamationTriangle className="text-danger text-4xl mx-auto mb-4" />
          <h3 className="text-lg font-bold text-danger-900">Access Denied</h3>
          <p className="text-sm text-danger-700 mt-2">
            You are logged in, but you are not registered as a job seeker. Only job seekers can apply for open positions.
          </p>
          <Link href="/" className="inline-block mt-4 text-sm font-semibold text-primary hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const jobDetails = await getJobDetails(id);
  const seekerApplications = await getApplicationByApplicant(user?.id);
  
  // 1. FIX: Fetch plan from database, or fallback to an object structure matching the schema definition
  const dbPlan = user?.plan ? await getPlanById(user.plan) : null;
  console.log(dbPlan)
  console.log("user plan", user?.plan)
  const currentPlan = dbPlan || {
    id: "seeker_free",
    name: "Free",
    maxApplicationsPerMonth: 3 // Fallback value matching original requirement
  };

  const appliedCount = seekerApplications ? seekerApplications.length : 0;
  const maxLimit = currentPlan.maxApplicationsPerMonth === -1 ? "unlimited": currentPlan.maxApplicationsPerMonth;

  // 2. FIX: Handle the industry standard "Unlimited (-1)" database rule safely
  const isUnlimited = maxLimit === -1;
  const isLimitReached = !isUnlimited && appliedCount >= maxLimit;

  // 3. FIX: Calculate progress safely. Ensures a fallback numeric value to prevent UI collapses from NaN.
  let usagePercentage = 0;
  if (isUnlimited) {
    usagePercentage = 100; // Unlimited profiles show full or loaded progress bars safely
  } else if (maxLimit > 0) {
    usagePercentage = Math.min((appliedCount / maxLimit) * 100, 100);
  }

  return (
    <div className="min-h-screen bg-content1-foreground/[0.02] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl mx-auto space-y-6">
        
        {/* Navigation Header */}
        <div className="flex items-center justify-between">
          <Link 
            href={`/browse-jobs/jobs/${id}`} 
            className="inline-flex items-center gap-2 text-sm font-medium text-default-500 hover:text-foreground transition-colors group"
          >
            <FaArrowLeft className="size-3 group-hover:-translate-x-0.5 transition-transform" />
            Back to Job Details
          </Link>
        </div>

        {/* --- Usage & Limits Tracker Dashboard Card --- */}
        <div className="p-6 bg-content1 border border-default-100 rounded-2xl shadow-sm flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-default-100 text-default-600">
                  {currentPlan.name} Plan
                </span>
                {isLimitReached && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-danger-50 text-danger border border-danger-100 flex items-center gap-1">
                    Limit Reached
                  </span>
                )}
              </div>
              <h3 className="text-base font-semibold text-foreground mt-1">Monthly Application Tracker</h3>
            </div>
            
            <p className="text-sm font-medium text-default-700">
              Applied <span className="text-lg font-bold text-foreground">{appliedCount}</span> / {isUnlimited ? "∞" : maxLimit} jobs
            </p>
          </div>

          {/* Progress Bar UI */}
          <div className="w-full bg-default-100 h-2.5 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                isLimitReached ? "bg-danger" : usagePercentage > 75 ? "bg-warning" : "bg-primary"
              }`}
              style={{ width: `${usagePercentage}%` }}
            />
          </div>

          {/* Conditional Limit Status Bar */}
          {isLimitReached ? (
            <div className="flex items-center justify-between p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl mt-1">
              <div className="flex items-center gap-2.5 text-amber-700 dark:text-amber-500 text-sm">
                <FaCrown className="size-4 flex-shrink-0 animate-pulse" />
                <span>Your application limit is exhausted for this cycle.</span>
              </div>
              <Link 
                className="text-sm font-bold text-amber-700 dark:text-amber-500 hover:underline inline-flex items-center gap-1" 
                href={`/pricing`}
              >
                Upgrade Plan
              </Link>
            </div>
          ) : (
            <p className="text-xs text-default-400">
              {isUnlimited 
                ? "Enjoy unlimited applications on your premium tier dashboard." 
                : "Your free quota resets at the end of the monthly billing window."}
            </p>
          )}
        </div>

        {/* --- Application Form Injection Render Condition --- */}
        {!isLimitReached ? (
          <ApplicationForm currentJob={jobDetails} applicant={user}/>
        ) : (
          <div className="text-center py-12 px-4 bg-content1 border border-dashed border-default-200 rounded-2xl flex flex-col items-center justify-center gap-3">
            <div className="p-4 bg-default-50 rounded-full text-default-400">
              <FaCheckCircle className="size-8" />
            </div>
            <h4 className="text-lg font-bold text-foreground">Ready to keep applying?</h4>
            <p className="text-sm text-default-500 max-w-sm mx-auto">
              Unlock unlimited monthly applications, direct messaging to employers, and premium resume badges.
            </p>
            <Link 
              className="mt-2 inline-flex items-center justify-center bg-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-xl text-sm shadow-md hover:opacity-90 active:scale-[0.99] transition-all" 
              href={`/pricing`}
            >
              View Pricing Plans
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default ApplyPage;