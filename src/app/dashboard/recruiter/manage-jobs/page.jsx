import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import CreateNewJobModal from "./CreateNewJob";
import { JobApplicationsTable } from "./AllCompanyjobs";
import { getLogdinRecruiterCompany } from "@/lib/api/companys";

export default async function page() {
  const company = await getLogdinRecruiterCompany();
  
  return (
    <section className="w-full">
      <DashboardNavbar />
      <CreateNewJobModal recruiterCompany={company}/>
      <JobApplicationsTable />
    </section>
  );
}
