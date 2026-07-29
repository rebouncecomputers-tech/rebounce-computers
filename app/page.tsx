import { getHomepageData } from "@/lib/queries";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import CategoryStrip from "@/components/categoryStrip";
import DealsSection from "@/components/dealsSection";
import ProductCard from "@/components/productCard";
import BrandStrip from "@/components/brandStrip";
import CategoryRow from "@/components/categoryRow";

export default async function HomePage() {
 const { categories, hotDeals, featuredProducts, brands, categoryRows = [] } =
  await getHomepageData();

  return (
    <>
      <Header />
      <Hero />
      <CategoryStrip categories={categories} />
      <DealsSection deal={hotDeals} />

      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="font-display text-2xl font-bold text-ink mb-6">Featured Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <BrandStrip brands={brands} />

      {categoryRows.map(({ category, products }) => (
        <CategoryRow
          key={category.id}
          title={category.name}
          viewAllHref={`/catalogue/${category.slug}`}
          products={products}
        />
      ))}

      <Footer />
    </>
  );
}