import Link from "next/link";
import { getCurrentUser } from "@/lib/customerAuth";
import { getCartForUser, getWishlistForUser } from "@/lib/queries";
import { Pencil } from "lucide-react";

export default async function AccountOverviewPage() {
  const user = await getCurrentUser();
  if (!user) return null; // layout already handles the redirect

  const [cart, wishlist, addresses] = await Promise.all([
    getCartForUser(user.id),
    getWishlistForUser(user.id),
    Promise.resolve([] as { label: string | null; street: string; city: string; county: string; phone?: string }[]), // address book UI not built yet
  ]);

  return (
    <div>
      <h1 className="font-display font-semibold text-2xl uppercase text-ink mb-6">
        Account Overview
      </h1>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="border border-line rounded-xl bg-white p-5">
          <h2 className="text-xs font-mono uppercase tracking-wide text-ink/50 mb-3">
            Account Details
          </h2>
          <p className="font-medium text-ink">{user.firstName} {user.lastName}</p>
          <p className="text-sm text-harbor">{user.email}</p>
        </div>

        <div className="border border-line rounded-xl bg-white p-5 relative">
          <h2 className="text-xs font-mono uppercase tracking-wide text-ink/50 mb-3">
            Address Book
          </h2>
          <Link href="/account/addresses" className="absolute top-5 right-5 text-ink/40 hover:text-harbor">
            <Pencil size={16} />
          </Link>
          {addresses.length === 0 ? (
            <p className="text-sm text-ink/50">
              No saved address yet.{" "}
              <Link href="/account/addresses" className="text-harbor hover:underline">
                Add one
              </Link>
            </p>
          ) : (
            <p className="text-sm text-ink/70">{addresses[0].street}, {addresses[0].city}</p>
          )}
        </div>

        <div className="border border-line rounded-xl bg-white p-5">
          <h2 className="text-xs font-mono uppercase tracking-wide text-ink/50 mb-3">
            Wishlist
          </h2>
          <p className="text-2xl font-mono font-semibold text-harbor mb-1">
            {wishlist.length}
          </p>
          <Link href="/wishlist" className="text-sm text-harbor hover:underline">
            View wishlist
          </Link>
        </div>

        <div className="border border-line rounded-xl bg-white p-5">
          <h2 className="text-xs font-mono uppercase tracking-wide text-ink/50 mb-3">
            Cart
          </h2>
          <p className="text-2xl font-mono font-semibold text-harbor mb-1">
            {cart?.items.length ?? 0}
          </p>
          <Link href="/cart" className="text-sm text-harbor hover:underline">
            View cart
          </Link>
        </div>
      </div>
    </div>
  );
}