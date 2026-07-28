"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/customerAuth";

export async function toggleWishlistItem(productId: string, currentPath?: string) {
  const userId = await getCurrentUserId();
  if (!userId) {
    const callback = currentPath ? `?callbackUrl=${encodeURIComponent(currentPath)}` : "";
    redirect(`/account/login${callback}`);
  }

  const existing = await prisma.wishlistItem.findUnique({
    where: { userId_productId: { userId, productId } },
  });

  if (existing) {
    await prisma.wishlistItem.delete({ where: { id: existing.id } });
  } else {
    await prisma.wishlistItem.create({ data: { userId, productId } });
  }

  revalidatePath("/wishlist");
  revalidatePath("/");
}

export async function removeFromWishlist(itemId: string) {
  await prisma.wishlistItem.delete({ where: { id: itemId } });
  revalidatePath("/wishlist");
}