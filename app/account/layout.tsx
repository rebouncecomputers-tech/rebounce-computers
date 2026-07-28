import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/customerAuth";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AccountSidebar from "@/components/accountSidebar";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/account/login");

  return (
    <>
      <Header />
      <section className="max-w-6xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-6">
        <AccountSidebar />
        <div className="flex-1 min-w-0">{children}</div>
      </section>
      <Footer />
    </>
  );
}