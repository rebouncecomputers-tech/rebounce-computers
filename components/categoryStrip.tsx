import Link from "next/link";
import Image from "next/image";

type Category = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
};

export default function CategoryStrip({ categories }: { categories: Category[] }) {
  return (
    <section className="bg-white border-b border-line">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-22 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/catalogue/${category.slug}`}
              className="group flex flex-col items-center gap-1.5 shrink-0 w-16"
            >
              <div className="relative w-11 h-11 rounded-full overflow-hidden bg-sand border border-line group-hover:border-harbor transition-colors">
                {category.imageUrl && (
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    className="object-cover"
                    sizes="44px"
                  />
                )}
              </div>
              <span className="text-[12px] leading-tight text-center text-ink/90 group-hover:text-harbor transition-colors">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}   