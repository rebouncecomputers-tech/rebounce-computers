"use client";

import { useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import { Heart } from "lucide-react";
import { toggleWishlistItem } from "@/app/wishlist/actions";

export default function WishlistButton({
  productId,
  initiallySaved = false,
}: {
  productId: string;
  initiallySaved?: boolean;
}) {
  const pathname = usePathname();
  const [saved, setSaved] = useState(initiallySaved);
  const [isPending, startTransition] = useTransition();

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setSaved((v) => !v);
    startTransition(() => {
      toggleWishlistItem(productId, pathname);
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
      className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
    >
      <Heart
        size={16}
        className={saved ? "fill-coral text-coral" : "text-ink/50"}
      />
    </button>
  );
}