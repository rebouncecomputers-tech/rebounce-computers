import Link from "next/link";
import ProductCard from "./productCard";
import CountdownTimer from "./countdownTimer";

type Deal = {
  title: string;
  endsAt: Date | null;
  products: {
    product: {
      slug: string;
      name: string;
      basePrice: unknown;
      compareAtPrice: unknown;
      condition: string;
      images: { url: string; altText: string | null }[];
      brand: { name: string } | null;
    };
  }[];
} | null;

export default function DealsSection({ deal }: { deal: Deal }) {
  if (!deal || deal.products.length === 0) return null;

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold text-ink">🔥 {deal.title}</h2>
          <div className="flex items-center gap-4">
            {deal.endsAt && <CountdownTimer endsAt={deal.endsAt} />}
            <Link href="/deals/hot-deals" className="text-sm font-medium text-ink/70 hover:text-ink hover:underline">
              View all
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {deal.products.map(({ product }) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}