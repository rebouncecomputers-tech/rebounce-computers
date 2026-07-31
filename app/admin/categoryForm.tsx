"use client";

type Category = { id: string; name: string };
type CategoryData = {
  name: string;
  description: string | null;
  imageUrl: string | null;
  parentId: string | null;
  displayOrder: number;
  isActive: boolean;
} | null;

export default function CategoryForm({
  categories,
  action,
  initialData = null,
}: {
  categories: Category[];
  action: (formData: FormData) => void;
  initialData?: CategoryData;
}) {
  return (
    <form action={action} className="flex flex-col gap-4 max-w-lg">
      <div>
        <label className="text-sm font-medium text-ink block mb-1">Category Name</label>
        <input
          name="name"
          required
          defaultValue={initialData?.name}
          className="w-full border border-line rounded-md px-3 py-2 text-sm outline-none focus:border-harbor"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-ink block mb-1">Description</label>
        <textarea
          name="description"
          rows={3}
          defaultValue={initialData?.description ?? ""}
          className="w-full border border-line rounded-md px-3 py-2 text-sm outline-none focus:border-harbor"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-ink block mb-1">Image URL</label>
        <input
          name="imageUrl"
          defaultValue={initialData?.imageUrl ?? ""}
          placeholder="Paste a Cloudinary URL, or leave blank"
          className="w-full border border-line rounded-md px-3 py-2 text-sm outline-none focus:border-harbor"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-ink block mb-1">Parent Category</label>
          <select
            name="parentId"
            defaultValue={initialData?.parentId ?? ""}
            className="w-full border border-line rounded-md px-3 py-2 text-sm outline-none focus:border-harbor"
          >
            <option value="">None (top-level)</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-ink block mb-1">Display Order</label>
          <input
            name="displayOrder"
            type="number"
            defaultValue={initialData?.displayOrder ?? 0}
            className="w-full border border-line rounded-md px-3 py-2 text-sm outline-none focus:border-harbor"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="isActive" defaultChecked={initialData?.isActive ?? true} />
        Active (visible on site)
      </label>

      <button
        type="submit"
        className="bg-coral hover:bg-coral-dark transition-colors text-white font-semibold py-3 rounded-md"
      >
        {initialData ? "Save Changes" : "Create Category"}
      </button>
    </form>
  );
}