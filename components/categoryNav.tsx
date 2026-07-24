"use client";

import { useState } from "react";
import Link from "next/link";

type NavCategory = {
  name: string;
  slug: string;
  brands: { name: string; slug: string }[];
  products: { name: string; slug: string }[];
};

export default function CategoryNav({ categories }: { categories: NavCategory[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <nav className="hidden lg:block border-t border-line relative">
      <div className="max-w-7xl mx-auto px-4 flex gap-6 text-sm">
        {categories.map((category) => (
          <div
            key={category.slug}
            className="relative"
            onMouseEnter={() => setOpenSlug(category.slug)}
            onMouseLeave={() => setOpenSlug(null)}
          >
            <Link
              href={`/catalogue/${category.slug}`}
              className="py-3 flex items-center text-ink/70 hover:text-harbor font-medium transition-colors"
            >
              {category.name}
            </Link>

            {openSlug === category.slug &&
              (category.brands.length > 0 || category.products.length > 0) && (
                <div className="absolute top-full left-0 bg-white border border-line rounded-md shadow-lg py-3 px-4 min-w-[200px] z-50">
                  <p className="text-xs font-mono uppercase text-ink/40 mb-2">
                    {category.brands.length > 0 ? "Shop by Brand" : "Popular Items"}
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {category.brands.length > 0
                      ? category.brands.map((brand) => (
                          <li key={brand.slug}>
                            <Link
                              href={`/catalogue/${category.slug}?brand=${brand.slug}`}
                              className="text-sm text-ink/80 hover:text-harbor transition-colors"
                            >
                              {brand.name}
                            </Link>
                          </li>
                        ))
                      : category.products.map((product) => (
                          <li key={product.slug}>
                            <Link
                              href={`/product/${product.slug}`}
                              className="text-sm text-ink/80 hover:text-harbor transition-colors"
                            >
                              {product.name}
                            </Link>
                          </li>
                        ))}
                  </ul>
                  <Link
                    href={`/catalogue/${category.slug}`}
                    className="text-xs text-coral font-semibold mt-3 block hover:underline"
                  >
                    View all →
                  </Link>
                </div>
              )}
          </div>
        ))}

        <Link
          href="/deals/hot-deals"
          className="py-3 text-coral font-semibold hover:text-coral-dark transition-colors"
        >
          🔥 Hot Deals
        </Link>
      </div>
    </nav>
  );
}