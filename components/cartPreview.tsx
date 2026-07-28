"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { formatKes } from "@/lib/format";

type PreviewItem = {
  id: string;
  quantity: number;
  product: {
    slug: string;
    name: string;
    basePrice: unknown;
    images: { url: string }[];
  };
  variant: { priceDelta: unknown } | null;
};

export default function CartPreview({ items }: { items: PreviewItem[] }) {
  const [open, setOpen] = useState(false);

  const subtotal = items.reduce((sum, item) => {
    const unitPrice = Number(item.product.basePrice) + Number(item.variant?.priceDelta ?? 0);
    return sum + unitPrice * item.quantity;
  }, 0);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link href="/cart" aria-label="Cart" className="relative block">
        <ShoppingCart size={22} className="text-ink hover:text-coral transition-colors" />
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-coral text-white text-[10px] font-mono w-4 h-4 rounded-full flex items-center justify-center">
            {items.length}
          </span>
        )}
      </Link>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-line rounded-lg shadow-lg py-3 z-50">
          {items.length === 0 ? (
            <p className="text-sm text-ink/50 text-center py-6">Your cart is empty.</p>
          ) : (
            <>
              <div className="max-h-72 overflow-y-auto px-3 flex flex-col gap-3">
                {items.slice(0, 4).map((item) => {
                  const unitPrice = Number(item.product.basePrice) + Number(item.variant?.priceDelta ?? 0);
                  const image = item.product.images[0];
                  return (
                    <Link
                      key={item.id}
                      href={`/product/${item.product.slug}`}
                      className="flex items-center gap-3 hover:bg-sand rounded-md p-1.5 -mx-1.5 transition-colors"
                    >
                      <div className="relative w-12 h-12 rounded-md overflow-hidden bg-sand shrink-0">
                        {image && <Image src={image.url} alt={item.product.name} fill className="object-cover" sizes="48px" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-ink line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-ink/50 font-mono">
                          {item.quantity} × {formatKes(unitPrice)}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
              {items.length > 4 && (
                <p className="text-xs text-ink/40 text-center px-3 pt-2">
                  +{items.length - 4} more item{items.length - 4 > 1 ? "s" : ""}
                </p>
              )}
              <div className="border-t border-line mt-3 pt-3 px-3">
                <div className="flex justify-between text-sm font-semibold text-ink mb-3">
                  <span>Subtotal</span>
                  <span className="font-mono">{formatKes(subtotal)}</span>
                </div>
                <Link
                  href="/cart"
                  className="block text-center bg-coral hover:bg-coral-dark transition-colors text-white text-sm font-semibold py-2.5 rounded-full"
                >
                  View Cart
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}