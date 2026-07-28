"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { formatKes } from "@/lib/format";

type PreviewItem = {
  id: string;
  product: {
    slug: string;
    name: string;
    basePrice: unknown;
    images: { url: string }[];
  };
};

export default function WishlistPreview({ items }: { items: PreviewItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link href="/wishlist" aria-label="Wishlist" className="relative block">
        <Heart size={22} className="text-ink hover:text-coral transition-colors" />
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-coral text-white text-[10px] font-mono w-4 h-4 rounded-full flex items-center justify-center">
            {items.length}
          </span>
        )}
      </Link>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-line rounded-lg shadow-lg py-3 z-50">
          {items.length === 0 ? (
            <p className="text-sm text-ink/50 text-center py-6">No saved items yet.</p>
          ) : (
            <>
              <div className="max-h-72 overflow-y-auto px-3 flex flex-col gap-3">
                {items.slice(0, 4).map((item) => {
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
                        <p className="text-xs font-mono text-harbor">{formatKes(item.product.basePrice)}</p>
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
                <Link
                  href="/wishlist"
                  className="block text-center bg-harbor hover:bg-harbor-dark transition-colors text-white text-sm font-semibold py-2.5 rounded-full"
                >
                  View All
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}