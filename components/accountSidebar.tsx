"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Package,
  MessageSquare,
  Heart,
  ShoppingCart,
  MapPin,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { logoutCustomer } from "@/app/account/actions";

const mainLinks = [
  { name: "My Account", href: "/account", icon: User },
  { name: "Orders", href: "/account/orders", icon: Package },
  { name: "Inbox", href: "/account/messages", icon: MessageSquare },
  { name: "Wishlist", href: "/wishlist", icon: Heart },
  { name: "Cart", href: "/cart", icon: ShoppingCart },
];

const settingsLinks = [
  { name: "Address Book", href: "/account/addresses" },
  { name: "Account Settings", href: "/account/settings" },
  { name: "FAQ", href: "/faq" },
];

export default function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-64 shrink-0 bg-white border border-line rounded-xl overflow-hidden h-fit">
      <nav className="py-2">
        {mainLinks.map(({ name, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={name}
              href={href}
              className={`flex items-center gap-3 px-5 py-3 text-sm transition-colors border-l-4 ${
                active
                  ? "border-harbor bg-harbor/5 text-harbor font-semibold"
                  : "border-transparent text-ink/70 hover:bg-sand"
              }`}
            >
              <Icon size={18} />
              {name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-line py-2">
        {settingsLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="block px-5 py-2.5 text-sm text-ink/70 hover:text-harbor hover:bg-sand transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="border-t border-line">
        <form action={logoutCustomer}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-5 py-3 text-sm text-coral font-semibold hover:bg-coral/5 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}