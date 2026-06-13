import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardRecentTable from "@/components/dashboard/RecentSection";
import CompanyRegisterEmptyState from "./CompanyEmptyState";
import MyCompanysCards from "./MyCompanysCards";
import { getUserSession } from "@/lib/core/session";
import { getRecruiterCompany } from "@/lib/api/companys";
import RegisterCompanyModal from "./RegisterCompanyModal";

export default async function page() {
  const user = await getUserSession();
  const company = await getRecruiterCompany(user?.id)
  // console.log(company.length)
  return (
    <section className="w-full">
      <DashboardNavbar />
       <RegisterCompanyModal recruiter={user}/>
      {company.length === 0 || !company && <CompanyRegisterEmptyState recruiter={user}/>}
      <MyCompanysCards recruiterCompany={company}/>
    </section>
  );
}
