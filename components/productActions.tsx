"use client";

import { useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import { formatKes } from "@/lib/format";
import { addToCart } from "@/app/cart/actions";

type Variant = {
  id: string;
  name: string;
  priceDelta: unknown;
  stockQty: number;
  isDefault: boolean;
};

export default function ProductActions({
  productId,
  basePrice,
  variants,
}: {
  productId: string;
  basePrice: unknown;
  variants: Variant[];
}) {
  const pathname = usePathname();
  const defaultVariant = variants.find((v) => v.isDefault) ?? variants[0] ?? null;
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(defaultVariant);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [isPending, startTransition] = useTransition();

  const finalPrice = Number(basePrice) + Number(selectedVariant?.priceDelta ?? 0);

  function handleAddToCart() {
    startTransition(async () => {
      await addToCart(productId, selectedVariant?.id ?? null, quantity, pathname);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="font-mono text-2xl font-semibold text-harbor">
        {formatKes(finalPrice)}
      </div>

      {variants.length > 0 && (
        <div>
          <p className="text-sm font-medium text-ink mb-2">Configuration</p>
          <div className="flex flex-wrap gap-2">
            {variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
                disabled={variant.stockQty === 0}
                className={`text-sm px-3 py-2 rounded-md border transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                  selectedVariant?.id === variant.id
                    ? "border-harbor bg-harbor/5 text-harbor"
                    : "border-line text-ink/70 hover:border-harbor"
                }`}
              >
                {variant.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <p className="text-sm font-medium text-ink">Quantity</p>
        <div className="flex items-center border border-line rounded-md">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-1.5 hover:bg-sand transition-colors"
          >
            −
          </button>
          <span className="px-4 text-sm font-mono">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-1.5 hover:bg-sand transition-colors"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={isPending}
        className="bg-coral hover:bg-coral-dark transition-colors text-white font-semibold py-3 rounded-md disabled:opacity-60"
      >
        {isPending ? "Adding..." : justAdded ? "✓ Added to cart" : "Add to Cart"}
      </button>
    </div>
  );
}