import { Package } from "lucide-react";

export default function OrdersPage() {
  return (
    <div>
      <h1 className="font-display font-semibold text-2xl uppercase text-ink mb-6">
        Orders
      </h1>
      <div className="bg-white border border-line rounded-lg py-20 flex flex-col items-center justify-center text-center">
        <Package size={40} className="text-ink/20 mb-3" />
        <p className="text-ink/60 font-medium">No orders yet</p>
        <p className="text-sm text-ink/40 mt-1">
          Orders will appear here once checkout goes live.
        </p>
      </div>
    </div>
  );
}