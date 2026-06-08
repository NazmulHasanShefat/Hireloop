import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardRecentTable from "@/components/dashboard/RecentSection";
import RecruiterStatesComponent from "@/components/dashboard/RecruiterStatesComponent";

export default function page() {
  return (
    <section className="w-full">
      <DashboardNavbar />
      <RecruiterStatesComponent />
      <DashboardRecentTable />
    </section>
  );
}