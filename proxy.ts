import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";

function verifyAdmin(token: string | undefined) {
  if (!token) return false;
  const hmac = createHmac("sha256", process.env.ADMIN_SESSION_SECRET!);
  hmac.update(process.env.ADMIN_EMAIL!);
  return token === hmac.digest("hex");
}

function verifyCustomer(value: string | undefined) {
  if (!value) return false;
  const [userId, signature] = value.split(".");
  if (!userId || !signature) return false;
  const hmac = createHmac("sha256", process.env.CUSTOMER_SESSION_SECRET!);
  hmac.update(userId);
  return hmac.digest("hex") === signature;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get("admin_session")?.value;
    if (!verifyAdmin(token)) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  const customerProtectedPaths = ["/cart", "/wishlist", "/account"];
  const isCustomerProtected =
    customerProtectedPaths.some((p) => pathname.startsWith(p)) &&
    pathname !== "/account/login" &&
    pathname !== "/account/register";

  if (isCustomerProtected) {
    const session = request.cookies.get("customer_session")?.value;
    if (!verifyCustomer(session)) {
      const loginUrl = new URL("/account/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/cart/:path*", "/wishlist/:path*", "/account/:path*"],
};