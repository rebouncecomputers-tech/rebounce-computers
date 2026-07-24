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

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug, isActive: true },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      specs: { orderBy: { sortOrder: "asc" } },
      variants: true,
      brand: true,
      category: true,
      reviews: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!product) return null;

  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      isActive: true,
      id: { not: product.id },
    },
    include: { images: true, brand: true },
    take: 6,
  });

  return { product, relatedProducts };
}

export async function getAllProductsForAdmin() {
  return prisma.product.findMany({
    include: { category: true, brand: true, images: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getCategoriesAndBrands() {
  const [categories, brands] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
  ]);
  return { categories, brands };
}

export async function getProductForEdit(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: { images: true },
  });
}

export async function getNavCategoriesWithBrands() {
  const categories = await prisma.category.findMany({
    where: { parentId: null, isActive: true },
    orderBy: { displayOrder: "asc" },
    include: {
      products: {
        where: { isActive: true },
        include: { brand: true },
      },
    },
  });

  return categories.map((category) => {
    const brandMap = new Map<string, { name: string; slug: string }>();
    const productLinks: { name: string; slug: string }[] = [];

    for (const product of category.products) {
      if (product.brand) {
        brandMap.set(product.brand.slug, {
          name: product.brand.name,
          slug: product.brand.slug,
        });
      }
      productLinks.push({ name: product.name, slug: product.slug });
    }

    return {
      name: category.name,
      slug: category.slug,
      brands: Array.from(brandMap.values()).slice(0, 8),
      products: productLinks.slice(0, 6),
    };
  });
}