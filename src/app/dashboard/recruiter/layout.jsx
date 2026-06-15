import Sidebar from "@/components/dashboard/Sidebar";
import { requireRole } from "@/lib/core/session";

export default async function RecruiterLayout({children}) {
  await requireRole("recruiter");
  return (
    <section className="flex h-screen w-full">
      <Sidebar />
      <div className="flex-1 lg:ml-50">
      {children}
      </div>
    </section>
  );
}