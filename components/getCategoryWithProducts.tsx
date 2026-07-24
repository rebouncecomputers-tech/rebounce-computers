export async function getCategoryWithProducts(slug: string, brandSlug?: string) {
  const category = await prisma.category.findUnique({
    where: { slug, isActive: true },
  });

  if (!category) return null;

  const products = await prisma.product.findMany({
    where: {
      categoryId: category.id,
      isActive: true,
      ...(brandSlug ? { brand: { slug: brandSlug } } : {}),
    },
    include: { images: true, brand: true },
    orderBy: { createdAt: "desc" },
  });

  return { category, products };
}