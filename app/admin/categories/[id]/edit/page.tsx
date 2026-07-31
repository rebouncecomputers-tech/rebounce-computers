import { notFound } from "next/navigation";
import { getAllCategoriesForAdmin, getCategoryForEdit } from "@/lib/queries";
import { updateCategory } from "../../actions";
import CategoryForm from "@/components/admin/categoryForm";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [categories, category] = await Promise.all([
    getAllCategoriesForAdmin(),
    getCategoryForEdit(id),
  ]);

  if (!category) notFound();

  const updateWithId = updateCategory.bind(null, id);
  const otherCategories = categories.filter((c) => c.id !== id);

  return (
    <div>
      <h1 className="font-display font-semibold text-2xl uppercase text-ink mb-6">
        Edit Category
      </h1>
      <CategoryForm categories={otherCategories} action={updateWithId} initialData={category} />
    </div>
  );
}