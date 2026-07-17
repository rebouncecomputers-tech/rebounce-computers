import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, Heart, Menu } from "lucide-react";

const navLinks = [
  { name: "Laptops", href: "/catalogue/laptops" },
  { name: "Desktops", href: "/catalogue/desktops" },
  { name: "Printers", href: "/catalogue/printers" },
  { name: "Networking", href: "/catalogue/networking" },
  { name: "Accessories", href: "/catalogue/accessories" },
  { name: "Mobile Phones", href: "/catalogue/mobile-phones" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-line">
      {/* Top utility bar */}
      <div className="bg-harbor text-white text-xs font-mono">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex justify-between items-center">
          <span>Free delivery in Mombasa on orders over KES 5,000</span>
          <span className="hidden sm:inline">M-Pesa · Card · Cash on Delivery</span>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-6">
        <button className="lg:hidden">
          <Menu size={22} />
        </button>

        <Link href="/" className="flex items-center shrink-0">
            <Image src="/logo.png" alt="Rebounce" width={70} height={30} priority />
        </Link>

        {/* Search bar */}
        <div className="flex-1 hidden md:flex items-center bg-sand rounded-md px-3 py-2 border border-line focus-within:border-harbor transition-colors">
          <Search size={18} className="text-ink/40" />
          <input
            type="text"
            placeholder="Search laptops, printers, accessories..."
            className="bg-transparent outline-none px-2 flex-1 text-sm"
          />
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <Link href="/wishlist" aria-label="Wishlist">
            <Heart size={22} className="text-ink hover:text-coral transition-colors" />
          </Link>
          <Link href="/cart" aria-label="Cart" className="relative">
            <ShoppingCart size={22} className="text-ink hover:text-coral transition-colors" />
          </Link>
        </div>
      </div>

      {/* Category nav */}
      <nav className="hidden lg:block border-t border-line">
        <div className="max-w-7xl mx-auto px-4 flex gap-6 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-3 text-ink/70 hover:text-harbor font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/deals/hot-deals"
            className="py-3 text-coral font-semibold hover:text-coral-dark transition-colors"
          >
            🔥 Hot Deals
          </Link>
        </div>
      </nav>
    </header>
  );
}