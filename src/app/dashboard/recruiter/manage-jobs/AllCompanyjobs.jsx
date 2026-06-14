import { getCompanyJobs, getRecruiterJobs } from "@/lib/api/jobs";
import JobsTable from "./jobsTable";
import { getUserSession } from "@/lib/core/session";

export async function JobApplicationsTable() {
  const user = await getUserSession();
  const recruiterjobs = await getRecruiterJobs(user?.id);
  return (
    <div className="flex w-full justify-center p-8 bg-[#0D0D10] min-h-screen">
      <div className="w-full max-w-7xl">
        <JobsTable jobs={recruiterjobs} />
      </div>
    </div>
  );
}
