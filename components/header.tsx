import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, Heart, Menu, User } from "lucide-react";
import { getNavCategoriesWithBrands } from "@/lib/queries";
import TopBar from "./topBar";
import CategoryNav from "./categoryNav";

export default async function Header() {
  const navCategories = await getNavCategoriesWithBrands();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-line">
      <TopBar />

      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-6">
        <button className="lg:hidden">
          <Menu size={22} />
        </button>

        <Link href="/" className="flex items-center shrink-0">
          <Image src="/logo.png" alt="Rebounce" width={70} height={30} priority />
        </Link>

        <div className="flex-1 hidden md:flex items-center bg-sand rounded-md px-3 py-2 border border-line focus-within:border-harbor transition-colors">
          <Search size={18} className="text-ink/70" />
          <input
            type="text"
            placeholder="Search laptops, printers, accessories..."
            className="bg-transparent outline-none px-2 flex-1 text-sm"
          />
        </div>

        <div className="flex items-center gap-5 shrink-0">
          <Link
            href="/account/login"
            className="hidden sm:flex items-center gap-1.5 text-sm text-ink hover:text-harbor transition-colors"
          >
            <User size={20} />
            <span>Login / Register</span>
          </Link>
          <Link href="/wishlist" aria-label="Wishlist">
            <Heart size={22} className="text-ink hover:text-coral transition-colors" />
          </Link>
          <Link href="/cart" aria-label="Cart" className="relative">
            <ShoppingCart size={22} className="text-ink hover:text-coral transition-colors" />
          </Link>
        </div>
      </div>

      <CategoryNav categories={navCategories} />
    </header>
  );
}