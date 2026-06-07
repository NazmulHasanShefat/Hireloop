import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardRecentTable from "@/components/dashboard/RecentSection";
import CompanyRegisterEmptyState from "./CompanyEmptyState";

export default function page() {
  return (
 <section className="lg:ml-54 w-full">
      <DashboardNavbar />
      <CompanyRegisterEmptyState />
    </section>
  );
}