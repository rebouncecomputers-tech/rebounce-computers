import { notFound } from "next/navigation";
import Link from "next/link";
import { getOrderById } from "@/lib/queries";
import { formatKes } from "@/lib/format";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { CheckCircle2 } from "lucide-react";

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const order = await getOrderById(orderId);

  if (!order) notFound();

  return (
    <>
      <Header />
      <section className="max-w-2xl mx-auto px-4 py-16 text-center">
        <CheckCircle2 size={48} className="text-green-600 mx-auto mb-4" />
        <h1 className="font-display font-semibold text-2xl uppercase text-ink mb-2">
          Order Placed
        </h1>
        <p className="text-ink/60 mb-1">Order Number</p>
        <p className="font-mono font-semibold text-harbor text-lg mb-8">
          {order.orderNumber}
        </p>

        {order.paymentMethod === "MPESA" && (
          <div className="bg-harbor/5 border border-harbor/20 rounded-xl p-6 mb-8 text-left">
            <h2 className="font-display font-semibold uppercase text-sm text-harbor mb-3">
              Complete Your Payment via M-Pesa
            </h2>
            <ol className="text-sm text-ink/70 space-y-1.5 list-decimal list-inside">
              <li>Go to M-Pesa on your phone</li>
              <li>Select <strong>Lipa na M-Pesa</strong> → <strong>Pay Bill</strong></li>
              <li>
                Business Number: <span className="font-mono font-semibold text-ink">
                  {process.env.MPESA_PAYBILL_NUMBER}
                </span>
              </li>
              <li>
                Account Number: <span className="font-mono font-semibold text-ink">
                  {order.orderNumber}
                </span>
              </li>
              <li>
                Amount: <span className="font-mono font-semibold text-ink">
                  {formatKes(order.total)}
                </span>
              </li>
            </ol>
            <p className="text-xs text-ink/50 mt-3">
              Your order will be confirmed once payment is received.
            </p>
          </div>
        )}

        {order.paymentMethod === "CASH_ON_DELIVERY" && (
          <div className="bg-harbor/5 border border-harbor/20 rounded-xl p-6 mb-8">
            <p className="text-sm text-ink/70">
              Pay <strong className="text-ink">{formatKes(order.total)}</strong> in cash when your order is delivered.
            </p>
          </div>
        )}

        <div className="bg-white border border-line rounded-xl p-6 text-left mb-8">
          <h2 className="font-display font-semibold uppercase text-sm text-ink mb-3">
            Order Summary
          </h2>
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm py-1.5 border-b border-line last:border-0">
              <span className="text-ink/70">{item.quantity} × {item.product.name}</span>
              <span className="font-mono text-ink">{formatKes(Number(item.unitPrice) * item.quantity)}</span>
            </div>
          ))}
          <div className="flex justify-between font-semibold text-ink pt-3 mt-2 border-t border-line">
            <span>Total</span>
            <span className="font-mono">{formatKes(order.total)}</span>
          </div>
        </div>

        <Link
          href="/"
          className="inline-block bg-harbor hover:bg-harbor-dark transition-colors text-white font-display font-semibold uppercase text-sm px-6 py-3 rounded-full"
        >
          Continue Shopping
        </Link>
      </section>
      <Footer />
    </>
  );
}