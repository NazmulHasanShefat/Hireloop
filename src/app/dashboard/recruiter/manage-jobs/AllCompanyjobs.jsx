import { getCompanyJobs } from "@/lib/api/jobs";
import JobsTable from "./jobsTable";

export async function JobApplicationsTable() {
const jobs = await getCompanyJobs("mycompany53");
  return (
    <div className="flex w-full justify-center p-8 bg-[#0D0D10] min-h-screen">
      <div className="w-full max-w-7xl">
       <JobsTable jobs={jobs} />
      </div>
    </div>
  );
}
