import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug } from "@/lib/queries";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProductGallery from "@/components/productGallery";
import ProductPurchasePanel from "@/components/productPurchasePanel";
import ProductCard from "@/components/productCard";
import CountdownTimer from "@/components/countdownTimer";
import { Zap } from "lucide-react";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getProductBySlug(slug);

  if (!data) {
    notFound();
  }

  const { product, relatedProducts } = data;

  const basePrice = Number(product.basePrice);
  const compareAtPrice = product.compareAtPrice ? Number(product.compareAtPrice) : null;

  const reviewCount = product.reviews?.length ?? 0;
  const avgRating =
    reviewCount > 0
      ? product.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviewCount
      : 0;

  // Static content passed into ProductPurchasePanel (a client component) so
  // variant/quantity state can be shared across columns 2 and 3.
  const headerBlock = (
    <>
      {product.brand && (
        <span className="text-xs text-ink/50 font-mono uppercase tracking-wide">
          {product.brand.name}
        </span>
      )}
      <h1 className="font-display text-2xl font-bold text-ink">{product.name}</h1>

      <div className="flex items-center gap-2 flex-wrap">
        {product.condition === "REFURBISHED" && (
          <span className="bg-gold text-white text-xs font-mono px-2 py-1 rounded">
            Refurbished
          </span>
        )}
        {product.condition === "NEW" && (
          <span className="bg-harbor text-white text-xs font-mono px-2 py-1 rounded">
            Brand New
          </span>
        )}
        <span className="text-xs text-ink/50">{product.warrantyMonths}-month warranty</span>
      </div>

      {reviewCount > 0 && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gold font-mono">
            {"★".repeat(Math.round(avgRating))}
            {"☆".repeat(5 - Math.round(avgRating))}
          </span>
          <span className="text-ink/50">
            {avgRating.toFixed(1)} ({reviewCount} review{reviewCount !== 1 ? "s" : ""})
          </span>
        </div>
      )}
    </>
  );

  const descriptionBlock = (
    <>
      <p className="text-sm text-ink/70 leading-relaxed border-t border-line pt-4 mt-2">
        {product.description}
      </p>

      {product.specs.length > 0 && (
        <div className="mt-4">
          <h2 className="font-display text-xl font-bold text-ink mb-4">Specifications</h2>
          <table className="w-full text-sm">
            <tbody>
              {product.specs.map((spec) => (
                <tr key={spec.id} className="border-b border-line">
                  <td className="py-2.5 text-ink/50 font-mono w-1/3">{spec.label}</td>
                  <td className="py-2.5 text-ink font-medium">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );

  const countdownBlock = product.saleEndsAt ? (
    <div className="flex items-center justify-between bg-harbor text-white rounded-md px-3 py-2">
      <span className="flex items-center gap-2 text-sm font-semibold">
        <Zap size={16} className="text-coral" />
        Limited offer
      </span>
      <CountdownTimer endsAt={product.saleEndsAt} />
    </div>
  ) : null;

  const paymentBlock = (
    <div className="border-t border-line pt-4 flex flex-col gap-2 text-xs text-ink/50">
      <p className="font-medium text-ink/70">Accepted payment methods</p>
      <div className="flex flex-wrap gap-2">
        <span className="border border-line rounded px-2 py-1">M-Pesa</span>
        <span className="border border-line rounded px-2 py-1">Visa</span>
        <span className="border border-line rounded px-2 py-1">Mastercard</span>
        <span className="border border-line rounded px-2 py-1">Cash on Delivery</span>
      </div>
      <p className="mt-2">
        Secure checkout · {product.warrantyMonths}-month warranty included
      </p>
    </div>
  );

  const sellerBlock = product.vendor ? (
    <div className="border-t border-line pt-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="font-display font-bold text-ink text-sm">{product.vendor.name}</span>
        <span className="text-xs text-ink/50">
          Score <span className="text-harbor font-semibold">{product.vendor.score}</span>
        </span>
      </div>
      <div className="flex gap-2">
        <Link
          href={`/store/${product.vendor.slug}`}
          className="flex-1 text-center text-sm font-semibold border border-line rounded-md py-2 hover:border-harbor transition-colors"
        >
          Visit Store
        </Link>
        <button className="flex-1 text-sm font-semibold border border-line rounded-md py-2 hover:border-harbor transition-colors">
          Chat Seller
        </button>
      </div>
    </div>
  ) : null;

  return (
    <>
      <Header />
      <section className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-ink/50 mb-6 font-mono">
          <Link href="/" className="hover:text-harbor">Home</Link>
          {" / "}
          <Link href={`/catalogue/${product.category.slug}`} className="hover:text-harbor">
            {product.category.name}
          </Link>
          {" / "}
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-[1fr_1fr_380px] gap-10 items-start">
          {/* Column 1: gallery — not sticky, scrolls normally */}
          <ProductGallery images={product.images} productName={product.name} />

          {/* Columns 2 + 3 rendered together so variant/quantity state is shared */}
          <ProductPurchasePanel
            productId={product.id}
            basePrice={basePrice}
            compareAtPrice={compareAtPrice}
            warrantyMonths={product.warrantyMonths}
            variants={product.variants.map((v) => ({
              id: v.id,
              name: v.name,
              priceDelta: Number(v.priceDelta),
              stockQty: v.stockQty,
              isDefault: v.isDefault,
            }))}
            headerBlock={headerBlock}
            descriptionBlock={descriptionBlock}
            countdownBlock={countdownBlock}
            paymentBlock={paymentBlock}
            sellerBlock={sellerBlock}
          />
        </div>

        {/* Reviews — full width, below the gallery/details/checkout grid */}
        {reviewCount > 0 && (
          <div className="mt-14 border-t border-line pt-8">
            <h2 className="font-display text-xl font-bold text-ink mb-6">
              Reviews ({reviewCount})
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {product.reviews.map((review: any) => (
                <div key={review.id} className="border border-line rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-gold font-mono text-sm">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </span>
                    <span className="text-sm font-medium text-ink">{review.authorName}</span>
                  </div>
                  <p className="text-sm text-ink/70">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-xl font-bold text-ink mb-6">
              You might also like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}