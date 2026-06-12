import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import CreateNewJobModal from "./CreateNewJob";
import { JobApplicationsTable } from "./Alljobs";

export default function page() {
  return (
 <section className="w-full">
      <DashboardNavbar />
       <CreateNewJobModal />
       <JobApplicationsTable />
    </section>
  );
}