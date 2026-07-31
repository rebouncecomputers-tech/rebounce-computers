import { notFound } from "next/navigation";
import { getCategoriesAndBrands, getProductForEdit } from "@/lib/queries";
import { updateProduct, deleteProduct } from "../../actions";
import ProductForm from "@/components/admin/productForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [{ categories, brands }, product] = await Promise.all([
    getCategoriesAndBrands(),
    getProductForEdit(id),
  ]);

  if (!product) notFound();

  const updateWithId = updateProduct.bind(null, id);
  const deleteWithId = deleteProduct.bind(null, id);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-semibold text-2xl uppercase text-ink">
          Edit Product
        </h1>
        <form action={deleteWithId}>
          <button type="submit" className="text-sm text-coral hover:underline">
            Delete Product
          </button>
        </form>
      </div>
      <ProductForm
        categories={categories}
        brands={brands}
        action={updateWithId}
        initialData={product}
      />
    </div>
  );
}