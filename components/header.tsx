import Link from "next/link";
import Image from "next/image";
import { Search, Menu, User } from "lucide-react";
import { getNavCategoriesWithBrands, getCartForUser, getWishlistForUser } from "@/lib/queries";
import { getCurrentUser } from "@/lib/customerAuth";
import TopBar from "./topBar";
import CategoryNav from "./categoryNav";
import AccountDropdown from "./accountDropdown";
import CartPreview from "./cartPreview";
import WishlistPreview from "./wishlistPreview";

export default async function Header() {
  const [navCategories, user] = await Promise.all([
    getNavCategoriesWithBrands(),
    getCurrentUser(),
  ]);

  const [cart, wishlistRaw] = user
    ? await Promise.all([getCartForUser(user.id), getWishlistForUser(user.id)])
    : [null, []];

  const wishlist = wishlistRaw.map((item) => ({
  ...item,
  product: {
    ...item.product,
    basePrice: Number(item.product.basePrice),
    compareAtPrice: item.product.compareAtPrice
      ? Number(item.product.compareAtPrice)
      : null,
  },
}));

  const cartItems = (cart?.items ?? []).map((item) => ({
    ...item,
    product: {
      ...item.product,
      basePrice: Number(item.product.basePrice),
    },
    variant: item.variant
      ? { ...item.variant, priceDelta: Number(item.variant.priceDelta) }
      : null,
  }));

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
          {user ? (
            <AccountDropdown firstName={user.firstName ?? "there"} />
          ) : (
            <Link
              href="/account/login"
              className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-harbor transition-colors"
            >
              <User size={20} />
              <span>Login / Register</span>
            </Link>
          )}
          <WishlistPreview items={wishlist} />
          <CartPreview items={cartItems} />
        </div>
      </div>

      <CategoryNav categories={navCategories} />
    </header>
  );
}