import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import CreateNewJobModal from "./CreateNewJob";

export default function page() {
  return (
 <section className="w-full">
      <DashboardNavbar />
       <CreateNewJobModal />
    </section>
  );
}