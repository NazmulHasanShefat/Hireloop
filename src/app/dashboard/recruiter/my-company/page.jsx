import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardRecentTable from "@/components/dashboard/RecentSection";
import CompanyRegisterEmptyState from "./CompanyEmptyState";
import MyCompanysCards from "./MyCompanysCards";

export default function page() {
  return (
 <section className="w-full">
      <DashboardNavbar />
      <CompanyRegisterEmptyState />
      <MyCompanysCards />
    </section>
  );
}