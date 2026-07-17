import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "./productCard";

type RowProduct = {
  slug: string;
  name: string;
  basePrice: unknown;
  compareAtPrice: unknown;
  condition: string;
  images: { url: string; altText: string | null }[];
  brand: { name: string } | null;
};

export default function CategoryRow({
  title,
  viewAllHref,
  products,
}: {
  title: string;
  viewAllHref: string;
  products: RowProduct[];
}) {
  if (products.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl font-bold text-ink">{title}</h2>
        <Link
          href={viewAllHref}
          className="flex items-center gap-1 text-sm font-medium text-harbor hover:underline"
        >
          View All <ArrowRight size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.slice(0, 5).map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}