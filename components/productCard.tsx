import Image from "next/image";
import Link from "next/link";

type ProductCardProduct = {
  slug: string;
  name: string;
  basePrice: unknown; // Prisma Decimal, formatted below
  compareAtPrice: unknown;
  condition: string;
  images: { url: string; altText: string | null }[];
  brand: { name: string } | null;
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

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col rounded-lg border border-line bg-white overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-square bg-sand overflow-hidden">
        {primaryImage && (
          <Image
            src={primaryImage.url}
            alt={primaryImage.altText ?? product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        {product.condition === "REFURBISHED" && (
          <span className="absolute top-2 left-2 bg-gold text-white text-xs font-mono px-2 py-1 rounded">
            Refurbished
          </span>
        )}
        {hasDiscount && (
          <span className="absolute top-2 right-2 bg-coral text-white text-xs font-mono px-2 py-1 rounded">
            Sale
          </span>
        )}
      </div>
      <div className="p-3 flex flex-col gap-1">
        {product.brand && (
          <span className="text-xs text-ink/50 font-mono uppercase tracking-wide">
            {product.brand.name}
          </span>
        )}
        <h3 className="text-sm font-medium text-ink line-clamp-2">{product.name}</h3>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-mono font-semibold text-harbor">
            {formatKes(product.basePrice)}
          </span>
          {hasDiscount && (
            <span className="font-mono text-xs text-ink/40 line-through">
              {formatKes(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}