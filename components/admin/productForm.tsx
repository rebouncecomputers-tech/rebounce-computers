"use client";

import ImageUploader from "./imageUploader";

type Category = { id: string; name: string };
type Brand = { id: string; name: string };
type ProductData = {
  name: string;
  description: string;
  shortDescription: string | null;
  categoryId: string;
  brandId: string | null;
  basePrice: unknown;
  compareAtPrice: unknown;
  sku: string;
  condition: string;
  warrantyMonths: number;
  isFeatured: boolean;
  isActive: boolean;
  images: { url: string }[];
} | null;

export default function ProductForm({
  categories,
  brands,
  action,
  initialData = null,
}: {
  categories: Category[];
  brands: Brand[];
  action: (formData: FormData) => void;
  initialData?: ProductData;
}) {
  return (
    <form action={action} className="flex flex-col gap-5 max-w-2xl">
      <div>
        <label className="text-sm font-medium text-ink block mb-1">Product Name</label>
        <input
          name="name"
          required
          defaultValue={initialData?.name}
          className="w-full border border-line rounded-md px-3 py-2 text-sm outline-none focus:border-harbor"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-ink block mb-1">Short Description</label>
        <input
          name="shortDescription"
          defaultValue={initialData?.shortDescription ?? ""}
          className="w-full border border-line rounded-md px-3 py-2 text-sm outline-none focus:border-harbor"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-ink block mb-1">Full Description</label>
        <textarea
          name="description"
          required
          rows={4}
          defaultValue={initialData?.description}
          className="w-full border border-line rounded-md px-3 py-2 text-sm outline-none focus:border-harbor"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-ink block mb-1">Category</label>
          <select
            name="categoryId"
            required
            defaultValue={initialData?.categoryId}
            className="w-full border border-line rounded-md px-3 py-2 text-sm outline-none focus:border-harbor"
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-ink block mb-1">Brand</label>
          <select
            name="brandId"
            defaultValue={initialData?.brandId ?? ""}
            className="w-full border border-line rounded-md px-3 py-2 text-sm outline-none focus:border-harbor"
          >
            <option value="">No brand</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium text-ink block mb-1">Price (KES)</label>
          <input
            name="basePrice"
            type="number"
            required
            defaultValue={initialData ? Number(initialData.basePrice) : ""}
            className="w-full border border-line rounded-md px-3 py-2 text-sm outline-none focus:border-harbor"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-ink block mb-1">Compare-at Price</label>
          <input
            name="compareAtPrice"
            type="number"
            defaultValue={initialData?.compareAtPrice ? Number(initialData.compareAtPrice) : ""}
            className="w-full border border-line rounded-md px-3 py-2 text-sm outline-none focus:border-harbor"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-ink block mb-1">SKU</label>
          <input
            name="sku"
            required
            defaultValue={initialData?.sku}
            className="w-full border border-line rounded-md px-3 py-2 text-sm outline-none focus:border-harbor"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-ink block mb-1">Condition</label>
          <select
            name="condition"
            defaultValue={initialData?.condition ?? "NEW"}
            className="w-full border border-line rounded-md px-3 py-2 text-sm outline-none focus:border-harbor"
          >
            <option value="NEW">New</option>
            <option value="REFURBISHED">Refurbished</option>
            <option value="USED">Used</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-ink block mb-1">Warranty (months)</label>
          <input
            name="warrantyMonths"
            type="number"
            defaultValue={initialData?.warrantyMonths ?? 12}
            className="w-full border border-line rounded-md px-3 py-2 text-sm outline-none focus:border-harbor"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-ink block mb-2">Product Images</label>
        <ImageUploader initialImages={initialData?.images.map((i) => i.url) ?? []} />
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isFeatured" defaultChecked={initialData?.isFeatured} />
          Featured product
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isActive" defaultChecked={initialData?.isActive ?? true} />
          Active (visible on site)
        </label>
      </div>

      <button
        type="submit"
        className="bg-coral hover:bg-coral-dark transition-colors text-white font-semibold py-3 rounded-md"
      >
        {initialData ? "Save Changes" : "Create Product"}
      </button>
    </form>
  );
}