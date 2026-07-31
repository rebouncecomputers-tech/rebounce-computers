import Link from "next/link";
import { getOrdersForAdmin } from "@/lib/queries";
import { formatKes } from "@/lib/format";
import { Package } from "lucide-react";

export default async function OrdersPage() {
  const orders = await getOrdersForAdmin();

  return (
    <div>
      <h1 className="font-display font-semibold text-2xl uppercase text-ink mb-6">
        Orders
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white border border-line rounded-lg py-20 flex flex-col items-center justify-center text-center">
          <Package size={40} className="text-ink/20 mb-3" />
          <p className="text-ink/60 font-medium">No orders yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-line overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-sand border-b border-line">
              <tr className="text-left text-ink/60">
                <th className="px-4 py-3 font-medium">Order #</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Items</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Payment</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-2.5 font-mono text-harbor">{order.orderNumber}</td>
                  <td className="px-4 py-2.5 text-ink">
                    {order.user.firstName} {order.user.lastName}
                  </td>
                  <td className="px-4 py-2.5 text-ink/60">{order.items.length}</td>
                  <td className="px-4 py-2.5 font-mono text-ink">{formatKes(order.total)}</td>
                  <td className="px-4 py-2.5 text-ink/60 text-xs font-mono">{order.paymentMethod}</td>
                  <td className="px-4 py-2.5">
                    <span className="text-xs px-2 py-1 rounded font-mono bg-yellow-100 text-yellow-700">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-ink/40 text-xs font-mono">
                    {new Date(order.createdAt).toLocaleDateString("en-KE")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}