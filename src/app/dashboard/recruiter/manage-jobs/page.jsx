import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import CreateNewJobModal from "./CreateNewJob";
import { JobApplicationsTable } from "./AllCompanyjobs";
import { getLogdinRecruiterCompany } from "@/lib/api/companys";
import { getUserSession } from "@/lib/core/session";

export default async function page() {
  const company = await getLogdinRecruiterCompany();
  const user = await getUserSession();
  
  return (
    <section className="w-full">
      <DashboardNavbar />
      <CreateNewJobModal recruiterCompany={company} user={user}/>
      <JobApplicationsTable />
    </section>
  );
}
