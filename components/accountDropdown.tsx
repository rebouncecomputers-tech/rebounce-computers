"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { User, LayoutDashboard, Package, MessageSquare, Heart, HelpCircle, LogOut } from "lucide-react";
import { logoutCustomer } from "@/app/account/actions";

export default function AccountDropdown({ firstName }: { firstName: string }) {
  const [open, setOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleEnter() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpen(true);
  }

  function handleLeave() {
    closeTimeout.current = setTimeout(() => setOpen(false), 150);
  }

  const menuItems = [
    { name: "My Account", href: "/account", icon: LayoutDashboard },
    { name: "My Orders", href: "/account/orders", icon: Package },
    { name: "Messages", href: "/account/messages", icon: MessageSquare },
    { name: "Favourites", href: "/wishlist", icon: Heart },
    { name: "FAQ", href: "/faq", icon: HelpCircle },
  ];

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-harbor transition-colors">
        <User size={20} />
        <span>Hi, {firstName}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full pt-2 w-56 z-50">
          <div className="bg-white border border-line rounded-lg shadow-lg py-2">
            <div className="px-4 py-2 border-b border-line mb-1">
              <p className="text-sm font-semibold text-ink">Hi, {firstName}</p>
              <p className="text-xs text-ink/50">Welcome back</p>
            </div>
            {menuItems.map(({ name, href, icon: Icon }) => (
              <Link
                key={name}
                href={href}
                className="flex items-center gap-3 px-4 py-2 text-sm text-ink/80 hover:bg-sand hover:text-harbor transition-colors"
              >
                <Icon size={16} />
                {name}
              </Link>
            ))}
            <form action={logoutCustomer}>
              <button
                type="submit"
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-coral hover:bg-coral/5 transition-colors"
              >
                <LogOut size={16} />
                Log Out
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}