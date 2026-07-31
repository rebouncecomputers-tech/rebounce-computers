"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  TrendingUp,
  Users,
  FolderTree,
  Truck,
  Bell,
  LogOut,
} from "lucide-react";

const navLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard, enabled: true },
  { name: "Products", href: "/admin", icon: Package, enabled: true },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag, enabled: true },
  { name: "Sales", href: "/admin/sales", icon: TrendingUp, enabled: true },
  { name: "Customers", href: "/admin/customers", icon: Users, enabled: true },
  { name: "Categories", href: "/admin/categories", icon: FolderTree, enabled: true },
  { name: "Shipping", href: "/admin/shipping", icon: Truck, enabled: true },
  { name: "Notifications", href: "/admin/notifications", icon: Bell, enabled: true },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-ink text-white min-h-screen flex flex-col">
      <div className="px-6 py-5 border-b border-white/10">
        <span className="font-display font-semibold text-lg uppercase">Rebounce Admin</span>
      </div>

      <nav className="flex-1 py-4">
        {navLinks.map(({ name, href, icon: Icon, enabled }) => {
          const active = pathname === href;
          return (
            <Link
              key={name}
              href={enabled ? href : "#"}
              className={`flex items-center justify-between px-6 py-3 text-sm transition-colors ${
                active
                  ? "bg-white/10 text-white font-semibold border-l-4 border-coral"
                  : enabled
                  ? "text-white/70 hover:bg-white/5 hover:text-white border-l-4 border-transparent"
                  : "text-white/30 cursor-not-allowed border-l-4 border-transparent"
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon size={18} />
                {name}
              </span>
            </Link>
          );
        })}
      </nav>

      <form action="/admin/logout" method="POST" className="border-t border-white/10">
        <button
          type="submit"
          className="w-full flex items-center gap-3 px-6 py-4 text-sm text-white/70 hover:text-coral transition-colors"
        >
          <LogOut size={18} />
          Log Out
        </button>
      </form>
    </aside>
  );
}