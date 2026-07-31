import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/customerAuth";
import { getCartForUser, getAddressesForUser } from "@/lib/queries";
import { formatKes } from "@/lib/format";
import { placeOrder } from "./action";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { MapPin } from "lucide-react";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const user = await getCurrentUser();
  if (!user) redirect("/account/login?callbackUrl=/checkout");

  const [cart, addresses] = await Promise.all([
    getCartForUser(user.id),
    getAddressesForUser(user.id),
  ]);

  const items = cart?.items ?? [];

  if (items.length === 0) {
    redirect("/cart");
  }

  const subtotal = items.reduce((sum, item) => {
    const unitPrice = Number(item.product.basePrice) + Number(item.variant?.priceDelta ?? 0);
    return sum + unitPrice * item.quantity;
  }, 0);

  const deliveryFee = subtotal >= 5000 ? 0 : 300;
  const total = subtotal + deliveryFee;
  const defaultAddress = addresses.find((a) => a.isDefault) ?? addresses[0];

  return (
    <>
      <Header />
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="font-display font-semibold text-3xl uppercase text-ink mb-8">
          Checkout
        </h1>

        {error === "no-address" && (
          <p className="text-sm text-coral bg-coral/10 px-4 py-3 rounded mb-6">
            Please select a delivery address before placing your order.
          </p>
        )}

        {addresses.length === 0 ? (
          <div className="bg-white border border-line rounded-xl p-8 text-center">
            <MapPin size={32} className="text-ink/30 mx-auto mb-3" />
            <p className="text-ink/60 mb-4">
              You need a delivery address before you can check out.
            </p>
            <Link
              href="/account/addresses"
              className="inline-block bg-coral hover:bg-coral-dark transition-colors text-white font-display font-semibold uppercase text-sm px-6 py-3 rounded-full"
            >
              Add an Address
            </Link>
          </div>
        ) : (
          <form action={placeOrder} className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Address selection */}
              <div className="bg-white border border-line rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-semibold uppercase text-lg text-ink">
                    Delivery Address
                  </h2>
                  <Link href="/account/addresses" className="text-sm text-harbor hover:underline">
                    + Add New
                  </Link>
                </div>
                <div className="flex flex-col gap-3">
                  {addresses.map((addr) => (
                    <label
                      key={addr.id}
                      className="flex items-start gap-3 border border-line rounded-lg p-4 cursor-pointer has-[:checked]:border-harbor has-[:checked]:bg-harbor/5 transition-colors"
                    >
                      <input
                        type="radio"
                        name="addressId"
                        value={addr.id}
                        defaultChecked={addr.id === defaultAddress?.id}
                        required
                        className="mt-1"
                      />
                      <div className="text-sm">
                        <p className="font-medium text-ink">
                          {addr.firstName} {addr.lastName}
                          {addr.label && (
                            <span className="text-xs font-mono text-ink/40 ml-2">
                              {addr.label}
                            </span>
                          )}
                        </p>
                        <p className="text-ink/60">
                          {addr.street}{addr.apartment ? `, ${addr.apartment}` : ""}
                        </p>
                        <p className="text-ink/60">{addr.city}, {addr.county}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment method */}
              <div className="bg-white border border-line rounded-xl p-6">
                <h2 className="font-display font-semibold uppercase text-lg text-ink mb-4">
                  Payment Method
                </h2>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-3 border border-line rounded-lg p-4 cursor-pointer has-[:checked]:border-harbor has-[:checked]:bg-harbor/5 transition-colors">
                    <input type="radio" name="paymentMethod" value="MPESA" defaultChecked required />
                    <span className="text-sm font-medium text-ink">M-Pesa (Paybill)</span>
                  </label>
                  <label className="flex items-center gap-3 border border-line rounded-lg p-4 cursor-pointer has-[:checked]:border-harbor has-[:checked]:bg-harbor/5 transition-colors">
                    <input type="radio" name="paymentMethod" value="CASH_ON_DELIVERY" required />
                    <span className="text-sm font-medium text-ink">Cash on Delivery</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="bg-white border border-line rounded-xl p-6 h-fit">
              <h2 className="font-display font-semibold uppercase text-lg text-ink mb-4">
                Order Summary
              </h2>
              <div className="flex flex-col gap-2 mb-4 max-h-56 overflow-y-auto">
                {items.map((item) => {
                  const unitPrice = Number(item.product.basePrice) + Number(item.variant?.priceDelta ?? 0);
                  return (
                    <div key={item.id} className="flex justify-between text-xs text-ink/70">
                      <span className="line-clamp-1 pr-2">
                        {item.quantity} × {item.product.name}
                      </span>
                      <span className="font-mono shrink-0">{formatKes(unitPrice * item.quantity)}</span>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-line pt-3 flex flex-col gap-1.5 text-sm">
                <div className="flex justify-between text-ink/70">
                  <span>Subtotal</span>
                  <span className="font-mono">{formatKes(subtotal)}</span>
                </div>
                <div className="flex justify-between text-ink/70">
                  <span>Delivery</span>
                  <span className="font-mono">{deliveryFee === 0 ? "Free" : formatKes(deliveryFee)}</span>
                </div>
                <div className="border-t border-line pt-2 mt-1 flex justify-between font-semibold text-ink">
                  <span>Total</span>
                  <span className="font-mono">{formatKes(total)}</span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-5 bg-coral hover:bg-coral-dark transition-colors text-white font-display font-semibold uppercase text-sm py-3.5 rounded-full"
              >
                Place Order
              </button>
            </div>
          </form>
        )}
      </section>
      <Footer />
    </>
  );
}