import { getCategoriesAndBrands } from "@/lib/queries";
import { createProduct } from "../actions";
import ProductForm from "@/components/admin/productForm";

export default async function NewProductPage() {
  const { categories, brands } = await getCategoriesAndBrands();

  return (
    <div>
      <h1 className="font-display font-semibold text-2xl uppercase text-ink mb-6">
        Add New Product
      </h1>
      <ProductForm categories={categories} brands={brands} action={createProduct} />
    </div>
  );
}