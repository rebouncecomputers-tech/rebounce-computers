import Link from "next/link";
import Image from "next/image";
import { getAllProductsForAdmin } from "@/lib/queries";
import { formatKes } from "@/lib/format";

export default async function AdminDashboard() {
  const products = await getAllProductsForAdmin();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-ink">Products ({products.length})</h1>
        <Link
          href="/admin/products/new"
          className="bg-coral hover:bg-coral-dark transition-colors text-white text-sm font-semibold px-4 py-2 rounded-md"
        >
          + Add Product
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-line overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-sand border-b border-line">
            <tr className="text-left text-ink/60">
              <th className="px-4 py-3 font-medium">Image</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-line last:border-0">
                <td className="px-4 py-2">
                  {product.images[0] && (
                    <div className="relative w-10 h-10 rounded overflow-hidden bg-sand">
                      <Image
                        src={product.images[0].url}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </td>
                <td className="px-4 py-2 font-medium text-ink">{product.name}</td>
                <td className="px-4 py-2 text-ink/60">{product.category.name}</td>
                <td className="px-4 py-2 font-mono">{formatKes(product.basePrice)}</td>
                <td className="px-4 py-2">
                  <span
                    className={`text-xs px-2 py-1 rounded font-mono ${
                      product.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {product.isActive ? "Active" : "Hidden"}
                  </span>
                </td>
                <td className="px-4 py-2 text-right">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="text-harbor hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}