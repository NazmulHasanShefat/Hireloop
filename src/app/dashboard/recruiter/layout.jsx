import Sidebar from "@/components/dashboard/Sidebar";

export default function RecruiterLayout({children}) {
  return (
    <section className="flex h-screen w-full">
      <Sidebar />
      <div className="flex-1 lg:ml-50">
      {children}
      </div>
    </section>
  );
}