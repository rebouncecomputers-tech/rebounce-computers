"use client";

import { useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Heart, Share2 } from "lucide-react";
import { formatKes } from "@/lib/format";
import { addToCart } from "@/app/cart/actions";
import { toggleWishlistItem } from "@/app/wishlist/actions";

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
  compareAtPrice,
  variants,
  initialInWishlist = false,
}: {
  productId: string;
  basePrice: unknown;
  compareAtPrice?: unknown;
  variants: Variant[];
  initialInWishlist?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const defaultVariant = variants.find((v) => v.isDefault) ?? variants[0] ?? null;
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(defaultVariant);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [inWishlist, setInWishlist] = useState(initialInWishlist);
  const [isPending, startTransition] = useTransition();
  const [isBuyingNow, startBuyNowTransition] = useTransition();

  const finalPrice = Number(basePrice) + Number(selectedVariant?.priceDelta ?? 0);
  const finalCompareAt = compareAtPrice
    ? Number(compareAtPrice) + Number(selectedVariant?.priceDelta ?? 0)
    : null;
  const hasDiscount = finalCompareAt !== null && finalCompareAt > finalPrice;
  const discountPct = hasDiscount
    ? Math.round(((finalCompareAt! - finalPrice) / finalCompareAt!) * 100)
    : 0;

  function handleAddToCart() {
    startTransition(async () => {
      await addToCart(productId, selectedVariant?.id ?? null, quantity, pathname);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    });
  }

  function handleBuyNow() {
    startBuyNowTransition(async () => {
      await addToCart(productId, selectedVariant?.id ?? null, quantity, pathname);
      router.push("/checkout");
    });
  }

  function handleToggleWishlist() {
    setInWishlist((prev) => !prev); // optimistic
    startTransition(async () => {
      try {
        await toggleWishlistItem(productId, pathname);
      } catch {
        setInWishlist((prev) => !prev); // revert on failure
      }
    });
  }

  async function handleShare() {
    const shareData = {
      title: document.title,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled share sheet — no-op
      }
    } else {
      await navigator.clipboard.writeText(shareData.url);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Price + discount */}
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="font-mono text-2xl font-semibold text-harbor">
          {formatKes(finalPrice)}
        </span>
        {hasDiscount && (
          <>
            <span className="font-mono text-sm text-ink/40 line-through">
              {formatKes(finalCompareAt!)}
            </span>
            <span className="bg-coral/10 text-coral text-xs font-mono font-semibold px-2 py-1 rounded">
              {discountPct}% off
            </span>
          </>
        )}
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

      {/* Add to Cart / Buy Now / Wishlist / Share row */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleAddToCart}
          disabled={isPending}
          className="flex-1 border-2 border-coral text-coral hover:bg-coral/5 transition-colors font-semibold py-3 rounded-md disabled:opacity-60"
        >
          {isPending && !isBuyingNow ? "Adding..." : justAdded ? "✓ Added" : "Add to Cart"}
        </button>
        <button
          onClick={handleBuyNow}
          disabled={isBuyingNow}
          className="flex-1 bg-coral hover:bg-coral-dark transition-colors text-white font-semibold py-3 rounded-md disabled:opacity-60"
        >
          {isBuyingNow ? "Processing..." : "Buy Now"}
        </button>
        <button
          onClick={handleToggleWishlist}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className="shrink-0 w-11 h-11 flex items-center justify-center border border-line rounded-md hover:border-harbor transition-colors"
        >
          <Heart
            size={18}
            className={inWishlist ? "fill-coral text-coral" : "text-ink/60"}
          />
        </button>
        <button
          onClick={handleShare}
          aria-label="Share this product"
          className="shrink-0 w-11 h-11 flex items-center justify-center border border-line rounded-md hover:border-harbor transition-colors"
        >
          <Share2 size={18} className="text-ink/60" />
        </button>
      </div>
    </div>
  );
}