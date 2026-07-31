import Link from "next/link";
import { getAllCategoriesForAdmin } from "@/lib/queries";
import { deleteCategory } from "./actions";

export default async function CategoriesPage() {
  const categories = await getAllCategoriesForAdmin();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-semibold text-2xl uppercase text-ink">
          Categories
        </h1>
        <Link
          href="/admin/categories/new"
          className="bg-coral hover:bg-coral-dark transition-colors text-white text-sm font-display font-semibold uppercase px-5 py-2.5 rounded-full"
        >
          + Add Category
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-line overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-sand border-b border-line">
            <tr className="text-left text-ink/60">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Parent</th>
              <th className="px-4 py-3 font-medium">Products</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b border-line last:border-0">
                <td className="px-4 py-2.5 font-medium text-ink">{cat.name}</td>
                <td className="px-4 py-2.5 text-ink/50">{cat.parent?.name ?? "—"}</td>
                <td className="px-4 py-2.5 font-mono text-ink/70">{cat._count.products}</td>
                <td className="px-4 py-2.5">
                  <span
                    className={`text-xs px-2 py-1 rounded font-mono ${
                      cat.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {cat.isActive ? "Active" : "Hidden"}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/categories/${cat.id}/edit`} className="text-harbor hover:underline">
                      Edit
                    </Link>
                    <form action={deleteCategory.bind(null, cat.id)}>
                      <button type="submit" className="text-coral hover:underline">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}