"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  hashPassword,
  verifyPassword,
  createCustomerSession,
  destroyCustomerSession,
} from "@/lib/customerAuth";

export async function registerCustomer(formData: FormData) {
  const email = (formData.get("email") as string).toLowerCase().trim();
  const password = formData.get("password") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const callbackUrl = (formData.get("callbackUrl") as string) || "/";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    redirect(`/account/register?error=exists&callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, passwordHash, firstName, lastName, role: "CUSTOMER" },
  });

  await createCustomerSession(user.id);
  redirect(callbackUrl);
}

export async function loginCustomer(formData: FormData) {
  const email = (formData.get("email") as string).toLowerCase().trim();
  const password = formData.get("password") as string;
  const callbackUrl = (formData.get("callbackUrl") as string) || "/";

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.passwordHash) {
    redirect(`/account/login?error=invalid&callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    redirect(`/account/login?error=invalid&callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  await createCustomerSession(user.id);
  redirect(callbackUrl);
}

export async function logoutCustomer() {
  await destroyCustomerSession();
  redirect("/");
}