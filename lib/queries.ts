import { prisma } from "./prisma";
import { unstable_cache } from "next/cache";

export const getHomepageData = unstable_cache(
  async () => {
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
              product: { include: { images: true, brand: true, variants: true  } },
            },
          },
        },
      }),
      prisma.product.findMany({
        where: { isFeatured: true, isActive: true },
        include: { images: true, brand: true, variants: true  },
        take: 8,
      }),
      prisma.brand.findMany(),
    ]);

    const topCategories = categories.slice(0, 4);
    const topCategoryIds = topCategories.map((c) => c.id);

    // One query for all children across all top categories, instead of one per category
    const allChildren = await prisma.category.findMany({
      where: { parentId: { in: topCategoryIds } },
      select: { id: true, parentId: true },
    });

    const childrenByParent = new Map<string, string[]>();
    for (const child of allChildren) {
      const list = childrenByParent.get(child.parentId!) ?? [];
      list.push(child.id);
      childrenByParent.set(child.parentId!, list);
    }

    // One query for all products across every top category + its children combined
    const allCategoryIds = [
      ...topCategoryIds,
      ...allChildren.map((c) => c.id),
    ];

    const allProducts = await prisma.product.findMany({
      where: { categoryId: { in: allCategoryIds }, isActive: true },
      include: { images: true, brand: true, variants: true  },
      orderBy: { createdAt: "desc" },
    });

    const categoryRows = topCategories.map((category) => {
      const relevantIds = [category.id, ...(childrenByParent.get(category.id) ?? [])];
      const products = allProducts
        .filter((p) => relevantIds.includes(p.categoryId))
        .slice(0, 8);
      return { category, products };
    });

    return { categories, hotDeals, featuredProducts, brands, categoryRows };
  },
  ["homepage-data"],
  { revalidate: 60 }
);

export async function getDealBySlug(slug: string) {
  return prisma.deal.findUnique({
    where: { slug },
    include: {
      products: {
        include: {
          product: { include: { images: true, brand: true , variants: true  } },
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
    include: { images: true, brand: true , variants: true  },
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
      // Soonest-ending active deal for this product, if any.
      // product.deals is DealProduct[] (the join row), so the actual
      // Deal is one level deeper via .deal — see page.tsx usage.
      deals: {
        where: {
          deal: {
            isActive: true,
            endsAt: { gt: new Date() },
          },
        },
        include: { deal: true },
        orderBy: { deal: { endsAt: "asc" } },
        take: 1,
      },
    },
  });

  if (!product) return null;

  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      isActive: true,
      id: { not: product.id },
    },
    include: { images: true, brand: true, variants: true  },
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

export const getNavCategoriesWithBrands = unstable_cache(
  async () => {
    const categories = await prisma.category.findMany({
      where: { parentId: null, isActive: true },
      orderBy: { displayOrder: "asc" },
      include: {
        products: {
          where: { isActive: true },
          include: { brand: true },
          take: 20,
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
  },
  ["nav-categories"],
  { revalidate: 300 }
);

export async function getCartForUser(userId: string) {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: { include: { images: true } },
          variant: true,
        },
        orderBy: { id: "asc" },
      },
    },
  });
  return cart;
}

export async function getWishlistForUser(userId: string) {
  return prisma.wishlistItem.findMany({
    where: { userId },
    include: {
      product: { include: { images: true } },
    },
    orderBy: { addedAt: "desc" },
  });
}

export async function getAllCategoriesForAdmin() {
  const categories = await prisma.category.findMany({
    orderBy: [{ parentId: "asc" }, { displayOrder: "asc" }],
    include: {
      parent: { select: { name: true } },
      _count: { select: { products: true } },
    },
  });
  return categories;
}

export async function getCategoryForEdit(id: string) {
  return prisma.category.findUnique({ where: { id } });
}

export async function getAllCustomers() {
  return prisma.user.findMany({
    where: { role: "CUSTOMER" },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { orders: true } },
    },
  });
}

function generateOrderNumber() {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `RBC-${year}-${random}`;
}

export { generateOrderNumber };

export async function getOrderById(id: string) {
  return prisma.order.findUnique({
    where: { id },
    include: {
      address: true,
      items: {
        include: {
          product: { include: { images: true } },
          variant: true,
        },
      },
    },
  });
}

export async function getOrdersForUser(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      items: { include: { product: { include: { images: true } } } },
    },
  });
}

export async function getOrdersForAdmin() {
  return prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      items: { include: { product: true } },
    },
  });
}

export async function getAddressesForUser(userId: string) {
  return prisma.address.findMany({
    where: { userId },
    orderBy: { isDefault: "desc" },
  });
}