import { Truck } from "lucide-react";

export default function ShippingPage() {
  return (
    <div>
      <h1 className="font-display font-semibold text-2xl uppercase text-ink mb-2">
        Shipping
      </h1>
      <p className="text-sm text-ink/50 mb-6">
        Delivery zones and fees — preview only, not yet connected to checkout logic.
      </p>

      <div className="bg-white border border-line rounded-lg p-6 max-w-lg flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium text-ink block mb-1">Free delivery threshold (KES)</label>
          <input
            defaultValue={5000}
            disabled
            className="w-full border border-line rounded-md px-3 py-2 text-sm bg-sand text-ink/50"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-ink block mb-1">Standard delivery fee — Mombasa (KES)</label>
          <input
            defaultValue={300}
            disabled
            className="w-full border border-line rounded-md px-3 py-2 text-sm bg-sand text-ink/50"
          />
        </div>
        <div className="flex items-center gap-2 text-xs text-ink/40 mt-1">
          <Truck size={14} />
          These values are placeholders. Real configuration wires in alongside checkout.
        </div>
      </div>
    </div>
  );
}