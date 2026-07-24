import Image from "next/image";

type Brand = {
  id: string;
  name: string;
  logoUrl: string | null;
};

// Set to true once real logos are uploaded via logoUrl —
// until then, styled wordmark badges look more intentional
// than stretched placeholder images.
const USE_REAL_LOGOS = false;

export default function BrandStrip({ brands }: { brands: Brand[] }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
<p className="text-center text-sm font-display uppercase tracking-widest text-ink/90 mb-8">        Brands We Stock
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="group flex items-center justify-center h-20 rounded-lg border border-line bg-white hover:border-harbor hover:shadow-md transition-all cursor-pointer"
          >
            {USE_REAL_LOGOS && brand.logoUrl ? (
              <div className="relative w-full h-full p-4 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all">
                <Image
                  src={brand.logoUrl}
                  alt={brand.name}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <span className="font-display font-semibold text-ink/50 group-hover:text-harbor transition-colors text-base tracking-tight">
                {brand.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}