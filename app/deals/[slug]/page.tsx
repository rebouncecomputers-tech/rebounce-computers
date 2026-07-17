import { notFound } from "next/navigation";
import { getDealBySlug } from "@/lib/queries";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProductCard from "@/components/productCard";
import CountdownTimer from "@/components/countdownTimer";

export default async function DealPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const deal = await getDealBySlug(slug);

  if (!deal || !deal.isActive) {
    notFound();
  }

  return (
    <>
      <Header />
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-3xl font-bold text-ink">🔥 {deal.title}</h1>
          {deal.endsAt && <CountdownTimer endsAt={deal.endsAt} />}
        </div>

        {deal.products.length === 0 ? (
          <p className="text-ink/60">No products in this deal right now.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {deal.products.map(({ product }) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}