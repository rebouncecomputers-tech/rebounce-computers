"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const parentId = formData.get("parentId") as string;

  await prisma.category.create({
    data: {
      name,
      slug: slugify(name),
      description: (formData.get("description") as string) || null,
      imageUrl: (formData.get("imageUrl") as string) || null,
      parentId: parentId || null,
      displayOrder: Number(formData.get("displayOrder")) || 0,
      isActive: formData.get("isActive") === "on",
    },
  });

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function updateCategory(id: string, formData: FormData) {
  const parentId = formData.get("parentId") as string;

  await prisma.category.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      description: (formData.get("description") as string) || null,
      imageUrl: (formData.get("imageUrl") as string) || null,
      parentId: parentId || null,
      displayOrder: Number(formData.get("displayOrder")) || 0,
      isActive: formData.get("isActive") === "on",
    },
  });

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function deleteCategory(id: string) {
  const productCount = await prisma.product.count({ where: { categoryId: id } });
  if (productCount > 0) {
    throw new Error(
      `Cannot delete: ${productCount} product(s) still assigned to this category. Reassign them first.`
    );
  }
  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
}