import Image from "next/image";
import Link from "next/link";
import WishlistButton from "./wishlistButton";

type ProductCardProduct = {
  id: string;
  slug: string;
  name: string;
  shortDescription?: string | null;
  basePrice: unknown;
  compareAtPrice: unknown;
  condition: string;
  images: { url: string; altText: string | null }[];
  brand: { name: string } | null;
  variants?: { stockQty: number }[];
};

function formatKes(amount: unknown) {
  const value = Number(amount);
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ProductCard({ product }: { product: ProductCardProduct }) {
  const primaryImage = product.images[0];
  const hasDiscount =
    product.compareAtPrice && Number(product.compareAtPrice) > Number(product.basePrice);
  const stock = product.variants?.reduce((sum, v) => sum + v.stockQty, 0);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group relative flex flex-col rounded-lg border border-line bg-white overflow-hidden hover:shadow-md hover:border-harbor transition-all"
    >
      <div className="relative aspect-square bg-sand overflow-hidden">
        <WishlistButton productId={product.id} />
        {primaryImage && (
          <Image
            src={primaryImage.url}
            alt={primaryImage.altText ?? product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        {product.condition === "REFURBISHED" && (
          <span className="absolute top-2 left-2 bg-gold text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
            Refurbished
          </span>
        )}
        {hasDiscount && (
          <span className="absolute bottom-2 right-2 bg-coral text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
            Sale
          </span>
        )}
      </div>
      <div className="p-2.5 flex flex-col gap-1 flex-1">
        {product.brand && (
          <span className="text-[10px] text-ink/40 font-mono uppercase tracking-wide">
            {product.brand.name}
          </span>
        )}
        <h3 className="text-xs font-medium text-ink line-clamp-2 leading-snug">
          {product.name}
        </h3>
        {product.shortDescription && (
          <p className="text-[11px] text-ink/50 line-clamp-2 leading-snug">
            {product.shortDescription}
          </p>
        )}
        <div className="mt-auto pt-1 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono text-xs font-semibold text-harbor">
              {formatKes(product.basePrice)}
            </span>
            {hasDiscount && (
              <span className="font-mono text-[10px] text-ink/40 line-through">
                {formatKes(product.compareAtPrice)}
              </span>
            )}
          </div>
          {stock !== undefined && stock > 0 && (
            <span className="text-[10px] font-mono text-ink/40">{stock} left</span>
          )}
        </div>
      </div>
    </Link>
  );
}