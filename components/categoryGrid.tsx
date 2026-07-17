import Link from "next/link";
import Image from "next/image";

type Category = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
};

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="font-display text-2xl font-bold text-ink mb-6">Shop by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/catalogue/${category.slug}`}
            className="group flex flex-col items-center gap-2 p-4 rounded-lg border border-line bg-white hover:border-harbor hover:shadow-md transition-all"
          >
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-sand">
              {category.imageUrl && (
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform"
                />
              )}
            </div>
            <span className="text-sm font-medium text-ink text-center">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}