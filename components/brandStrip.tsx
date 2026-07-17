// components/BrandStrip.tsx
type Brand = {
  id: string;
  name: string;
  logoUrl: string | null;
};

export default function BrandStrip({ brands }: { brands: Brand[] }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <p className="text-center text-sm text-ink/50 font-mono uppercase tracking-wide mb-6">
        Brands we stock
      </p>
      <div className="flex flex-wrap justify-center items-center gap-8">
        {brands.map((brand) => (
          <span
            key={brand.id}
            className="font-display font-semibold text-ink/40 hover:text-harbor transition-colors text-lg"
          >
            {brand.name}
          </span>
        ))}
      </div>
    </section>
  );
}