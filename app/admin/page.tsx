import Link from "next/link";
import Image from "next/image";
import { getAllProductsForAdmin } from "@/lib/queries";
import { formatKes } from "@/lib/format";

export default async function AdminDashboard() {
  const products = await getAllProductsForAdmin();

  const totalStock = products.reduce((sum, p) => {
    const variantStock = p.variants?.reduce((s, v) => s + v.stockQty, 0) ?? 0;
    return sum + variantStock;
  }, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-semibold text-2xl uppercase text-ink">
            Products
          </h1>
          <p className="text-sm text-ink/50 mt-1">
            {products.length} products · {totalStock} units in stock
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-coral hover:bg-coral-dark transition-colors text-white text-sm font-display font-semibold uppercase px-5 py-2.5 rounded-full"
        >
          + Add Product
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {products.map((product) => {
          const stock = product.variants?.reduce((s, v) => s + v.stockQty, 0) ?? 0;
          return (
            <Link
              key={product.id}
              href={`/admin/products/${product.id}/edit`}
              className="group flex flex-col bg-white border border-line rounded-lg overflow-hidden hover:border-harbor hover:shadow-md transition-all"
            >
              <div className="relative aspect-square bg-sand">
                {product.images[0] && (
                  <Image
                    src={product.images[0].url}
                    alt={product.name}
                    fill
                    sizes="200px"
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                )}
                <span
                  className={`absolute top-1.5 left-1.5 text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${
                    product.isActive ? "bg-green-600 text-white" : "bg-ink/60 text-white"
                  }`}
                >
                  {product.isActive ? "Live" : "Hidden"}
                </span>
              </div>

              <div className="p-2.5 flex flex-col gap-1 flex-1">
                <p className="text-[10px] font-mono uppercase text-ink/40">
                  {product.category.name}
                </p>
                <p className="text-xs font-medium text-ink line-clamp-2 leading-snug">
                  {product.name}
                </p>
                <p className="text-[11px] text-ink/50 line-clamp-2 leading-snug">
                  {product.shortDescription}
                </p>
                <div className="mt-auto pt-1.5 flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-harbor">
                    {formatKes(product.basePrice)}
                  </span>
                  <span className="text-[10px] font-mono text-ink/40">
                    {stock} left
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}