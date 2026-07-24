"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const images = formData.getAll("images") as string[];

  await prisma.product.create({
    data: {
      name,
      slug: slugify(name) + "-" + Date.now().toString().slice(-5),
      description: formData.get("description") as string,
      shortDescription: (formData.get("shortDescription") as string) || null,
      categoryId: formData.get("categoryId") as string,
      brandId: (formData.get("brandId") as string) || null,
      basePrice: Number(formData.get("basePrice")),
      compareAtPrice: formData.get("compareAtPrice")
        ? Number(formData.get("compareAtPrice"))
        : null,
      sku: formData.get("sku") as string,
      condition: formData.get("condition") as "NEW" | "REFURBISHED" | "USED",
      warrantyMonths: Number(formData.get("warrantyMonths")) || 12,
      isFeatured: formData.get("isFeatured") === "on",
      isActive: formData.get("isActive") === "on",
      publishedAt: new Date(),
      images: {
        create: images.map((url, i) => ({
          url,
          isPrimary: i === 0,
          sortOrder: i,
        })),
      },
    },
  });

  redirect("/admin");
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const images = formData.getAll("images") as string[];

  await prisma.product.update({
    where: { id },
    data: {
      name,
      description: formData.get("description") as string,
      shortDescription: (formData.get("shortDescription") as string) || null,
      categoryId: formData.get("categoryId") as string,
      brandId: (formData.get("brandId") as string) || null,
      basePrice: Number(formData.get("basePrice")),
      compareAtPrice: formData.get("compareAtPrice")
        ? Number(formData.get("compareAtPrice"))
        : null,
      sku: formData.get("sku") as string,
      condition: formData.get("condition") as "NEW" | "REFURBISHED" | "USED",
      warrantyMonths: Number(formData.get("warrantyMonths")) || 12,
      isFeatured: formData.get("isFeatured") === "on",
      isActive: formData.get("isActive") === "on",
      images: {
        deleteMany: {},
        create: images.map((url, i) => ({
          url,
          isPrimary: i === 0,
          sortOrder: i,
        })),
      },
    },
  });

  redirect("/admin");
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  redirect("/admin");
}