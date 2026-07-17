import { notFound } from "next/navigation";
import { getCategoryWithProducts } from "@/lib/queries";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProductCard from "@/components/productCard";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getCategoryWithProducts(slug);

  if (!data) {
    notFound();
  }

  const { category, products } = data;

  return (
    <>
      <Header />
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="font-display text-3xl font-bold text-ink mb-2">{category.name}</h1>
        {category.description && (
          <p className="text-ink/60 mb-6">{category.description}</p>
        )}

        {products.length === 0 ? (
          <p className="text-ink/60">No products in this category yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}