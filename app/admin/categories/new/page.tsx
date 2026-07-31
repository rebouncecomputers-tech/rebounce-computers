import { getAllCategoriesForAdmin } from "@/lib/queries";
import { createCategory } from "../actions";
import CategoryForm from "@/components/admin/categoryForm";

export default async function NewCategoryPage() {
  const categories = await getAllCategoriesForAdmin();

  return (
    <div>
      <h1 className="font-display font-semibold text-2xl uppercase text-ink mb-6">
        Add New Category
      </h1>
      <CategoryForm categories={categories} action={createCategory} />
    </div>
  );
}