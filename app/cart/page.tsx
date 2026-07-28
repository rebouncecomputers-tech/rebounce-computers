import Link from "next/link";
import { getCurrentUser } from "@/lib/customerAuth";
import { getCartForUser } from "@/lib/queries";
import { formatKes } from "@/lib/format";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CartItemRow from "@/components/cartItemRow";

export default async function CartPage() {
  const user = await getCurrentUser();
  const cart = user ? await getCartForUser(user.id) : null;
  const items = cart?.items ?? [];

  const subtotal = items.reduce((sum, item) => {
    const unitPrice = Number(item.product.basePrice) + Number(item.variant?.priceDelta ?? 0);
    return sum + unitPrice * item.quantity;
  }, 0);

  return (
    <>
      <Header />
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="font-display font-semibold text-3xl uppercase text-ink mb-8">
          Your Cart
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-ink/60 mb-4">Your cart is empty.</p>
            <Link
              href="/"
              className="inline-block bg-coral hover:bg-coral-dark transition-colors text-white font-display font-semibold uppercase text-sm px-6 py-3 rounded-full"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>

            <div className="bg-white border border-line rounded-xl p-6 h-fit">
              <h2 className="font-display font-semibold uppercase text-lg text-ink mb-4">
                Order Summary
              </h2>
              <div className="flex justify-between text-sm text-ink/70 mb-2">
                <span>Subtotal</span>
                <span className="font-mono">{formatKes(subtotal)}</span>
              </div>
              <p className="text-xs text-ink/50 mb-4">
                Delivery fee calculated at checkout
              </p>
              <div className="border-t border-line pt-4 flex justify-between font-semibold text-ink mb-6">
                <span>Total</span>
                <span className="font-mono">{formatKes(subtotal)}</span>
              </div>
              <Link
                href="/checkout"
                className="block text-center bg-coral hover:bg-coral-dark transition-colors text-white font-display font-semibold uppercase text-sm py-3.5 rounded-full"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}