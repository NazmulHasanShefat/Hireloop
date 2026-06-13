import { getCompanyJobs } from "@/lib/api/jobs";
import JobsTable from "./jobsTable";

export async function JobApplicationsTable() {
  // আপনার API প্রপার্টি নেম অনুযায়ী আপডেট করা ডাটা অ্যারে
  // const jobs = [
  //   {
  //     jobTitle: "Senior Frontend Engineer",
  //     jobType: "Full-time",
  //     jobCategory: "Technology",
  //     jobLocation: "Dhaka",
  //     status: "active",
  //     applicationDeadline: "2026-06-23",
  //     benefits: "hello",
  //     companyId: "mycompanyid",
  //     currency: "EUR",
  //     isPubliclyVisible: true,
  //     isRemote: true,
  //     maxSalary: "34",
  //     minSalary: "543",
  //     requirements: "hyello",
  //     responsibilities: "hello",
  //   },
  //   {
  //     jobTitle: "Product Designer",
  //     jobType: "Contract",
  //     jobCategory: "Design",
  //     jobLocation: "Chittagong",
  //     status: "pending",
  //     applicationDeadline: "2026-07-15",
  //     benefits: "health insurance",
  //     companyId: "designco",
  //     currency: "USD",
  //     isPubliclyVisible: true,
  //     isRemote: false,
  //     maxSalary: "40",
  //     minSalary: "600",
  //     requirements: "Figma expert",
  //     responsibilities: "UI/UX design",
  //   },
  //   {
  //     jobTitle: "Lead Data Scientist",
  //     jobType: "Full-time",
  //     jobCategory: "Data Science",
  //     jobLocation: "Dhaka",
  //     status: "inactive",
  //     applicationDeadline: "2026-06-30",
  //     benefits: "bonus",
  //     companyId: "datatech",
  //     currency: "BDT",
  //     isPubliclyVisible: true,
  //     isRemote: false,
  //     maxSalary: "80",
  //     minSalary: "1200",
  //     requirements: "Python, ML",
  //     responsibilities: "Data analysis",
  //   },
  // ];

const jobs = await getCompanyJobs("mycompany33");
// console.log("this is job",jobs)
  return (
    <div className="flex w-full justify-center p-8 bg-[#0D0D10] min-h-screen">
      <div className="w-full max-w-7xl">
       <JobsTable jobs={jobs} />
      </div>
    </div>
  );
}
