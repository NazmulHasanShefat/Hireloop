import { getUserSession } from "@/lib/core/session";
import { serialize } from "mongodb";
import { redirect } from "next/navigation";
import React from "react";
import ApplicationForm from "./applyForm";

const ApplyPage = async ({ params }) => {
  const user = await getUserSession();
  const { id } = await params;
  if (!user) {
    redirect(`/sign-in?redirect=/browse-jobs/jobs/${id}/apply`);
  }
  // console.log(user)
  if (user.role !== "seeker") {
    return (
      <>
        <p>you are not a job seeker </p>
      </>
    );
  }
  return (
    <div>
      <h2>Apply this job </h2>
      {/* <ApplicationForm /> */}
    </div>
  );
};

export default ApplyPage;
