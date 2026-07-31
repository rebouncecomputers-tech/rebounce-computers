"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/customerAuth";
import { generateOrderNumber } from "@/lib/queries";

export async function placeOrder(formData: FormData) {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/account/login?callbackUrl=/checkout");

  const addressId = formData.get("addressId") as string;
  const paymentMethod = formData.get("paymentMethod") as "MPESA" | "CARD" | "CASH_ON_DELIVERY";

  if (!addressId) {
    redirect("/checkout?error=no-address");
  }

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: { product: true, variant: true },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    redirect("/cart");
  }

  const subtotal = cart!.items.reduce((sum, item) => {
    const unitPrice = Number(item.product.basePrice) + Number(item.variant?.priceDelta ?? 0);
    return sum + unitPrice * item.quantity;
  }, 0);

  const deliveryFee = subtotal >= 5000 ? 0 : 300;
  const total = subtotal + deliveryFee;

  const order = await prisma.order.create({
    data: {
      orderNumber: generateOrderNumber(),
      userId,
      addressId,
      status: "PENDING",
      paymentMethod,
      paymentStatus: "PENDING",
      subtotal,
      deliveryFee,
      total,
      items: {
        create: cart!.items.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          unitPrice:
            Number(item.product.basePrice) + Number(item.variant?.priceDelta ?? 0),
        })),
      },
    },
  });

  // Clear the cart now that the order has been created
  await prisma.cartItem.deleteMany({ where: { cartId: cart!.id } });

  redirect(`/checkout/confirmation/${order.id}`);
}