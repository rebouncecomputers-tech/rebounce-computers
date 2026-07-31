import AdminSidebar from "@/components/admin/adminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-sand flex">
      <AdminSidebar />
      <main className="flex-1 p-8 max-w-7xl">{children}</main>
    </div>
  );
}