import Sidebar from "@/components/dashboard/Sidebar";

export default function RecruiterLayout({children}) {
  return (
    <section className="flex h-screen w-full">
      <Sidebar />
      {children}
    </section>
  );
}