import SearchJob from "@/components/ui/SearchJob";
import JobBoard from "./jobsBoard";
import { getAllJobs } from "@/lib/api/jobs";


export default async function page() {
  const allJobs = await getAllJobs()
  return (
    <section>
      <SearchJob />
      <JobBoard jobs={allJobs}/>
    </section>
  );
}