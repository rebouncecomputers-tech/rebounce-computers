"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { formatKes } from "@/lib/format";
import { updateCartItemQuantity, removeFromCart } from "@/app/cart/actions";

type CartItemData = {
  id: string;
  quantity: number;
  product: {
    slug: string;
    name: string;
    basePrice: unknown;
    images: { url: string }[];
  };
  variant: {
    name: string;
    priceDelta: unknown;
  } | null;
};

export default function CartItemRow({ item }: { item: CartItemData }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isPending, startTransition] = useTransition();

  const unitPrice = Number(item.product.basePrice) + Number(item.variant?.priceDelta ?? 0);
  const image = item.product.images[0];

  function changeQuantity(next: number) {
    setQuantity(next);
    startTransition(() => {
      updateCartItemQuantity(item.id, next);
    });
  }

  function remove() {
    startTransition(() => {
      removeFromCart(item.id);
    });
  }

  return (
    <div className={`flex items-center gap-4 py-4 border-b border-line ${isPending ? "opacity-50" : ""}`}>
      <Link href={`/product/${item.product.slug}`} className="relative w-20 h-20 rounded-lg overflow-hidden bg-sand shrink-0">
        {image && <Image src={image.url} alt={item.product.name} fill className="object-cover" sizes="80px" />}
      </Link>

      <div className="flex-1 min-w-0">
        <Link href={`/product/${item.product.slug}`} className="font-medium text-ink hover:text-harbor transition-colors line-clamp-1">
          {item.product.name}
        </Link>
        {item.variant && (
          <p className="text-sm text-ink/50">{item.variant.name}</p>
        )}
        <p className="font-mono font-semibold text-harbor mt-1">{formatKes(unitPrice)}</p>
      </div>

      <div className="flex items-center border border-line rounded-md">
        <button
          onClick={() => changeQuantity(quantity - 1)}
          className="px-3 py-1.5 hover:bg-sand transition-colors"
        >
          −
        </button>
        <span className="px-4 text-sm font-mono">{quantity}</span>
        <button
          onClick={() => changeQuantity(quantity + 1)}
          className="px-3 py-1.5 hover:bg-sand transition-colors"
        >
          +
        </button>
      </div>

      <p className="font-mono font-semibold text-ink w-24 text-right shrink-0">
        {formatKes(unitPrice * quantity)}
      </p>

      <button onClick={remove} aria-label="Remove item" className="text-ink/40 hover:text-coral transition-colors shrink-0">
        <X size={18} />
      </button>
    </div>
  );
}