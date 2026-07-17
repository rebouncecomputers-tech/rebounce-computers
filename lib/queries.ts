import { prisma } from "./prisma";

export async function getHomepageData() {
  const [categories, hotDeals, featuredProducts, brands] = await Promise.all([
    prisma.category.findMany({
      where: { parentId: null, isActive: true },
      orderBy: { displayOrder: "asc" },
    }),
    prisma.deal.findUnique({
      where: { slug: "hot-deals" },
      include: {
        products: {
          include: {
            product: {
              include: { images: true, brand: true },
            },
          },
        },
      },
    }),
    prisma.product.findMany({
      where: { isFeatured: true, isActive: true },
      include: { images: true, brand: true },
      take: 8,
    }),
    prisma.brand.findMany(),
  ]);

  const topCategories = categories.slice(0, 4);

  const categoryRows = await Promise.all(
    topCategories.map(async (category) => {
      const children = await prisma.category.findMany({
        where: { parentId: category.id },
        select: { id: true },
      });
      const categoryIds = [category.id, ...children.map((c) => c.id)];

      const products = await prisma.product.findMany({
        where: { categoryId: { in: categoryIds }, isActive: true },
        include: { images: true, brand: true },
        take: 8,
      });

      return { category, products };
    })
  );

  return { categories, hotDeals, featuredProducts, brands, categoryRows };
}

export async function getDealBySlug(slug: string) {
  return prisma.deal.findUnique({
    where: { slug },
    include: {
      products: {
        include: {
          product: {
            include: { images: true, brand: true },
          },
        },
      },
    },
  });
}

export async function getCategoryWithProducts(slug: string) {
  const category = await prisma.category.findUnique({
    where: { slug },
    include: { children: true },
  });

  if (!category) return null;

  const categoryIds = [category.id, ...category.children.map((c) => c.id)];

  const products = await prisma.product.findMany({
    where: { categoryId: { in: categoryIds }, isActive: true },
    include: { images: true, brand: true },
    orderBy: { createdAt: "desc" },
  });

  return { category, products };
}