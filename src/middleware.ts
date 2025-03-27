import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  request.headers.set("Cache-Control", "no-store");
  const token = request.cookies.get("access_token")?.value;
  const role = request.cookies.get("role")?.value;

  const path = request.nextUrl.pathname;

  if (
    !token &&
    [
      "/account_dashboard",
      "/account_edit",
      "/account_edit_address",
      "/account_orders",
      "/account_wishlist",
      "/shop_cart",
      "/shop_checkout",
      "/shop_order_complete",
    ].some((route) => path.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && path?.includes("admin/")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    token &&
    role === "user" &&
    ["/login_register"].some((route) => path.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token && role === "user" && path?.includes("admin/")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token && role === "admin" && path === "/admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/account_dashboard",
    "/account_edit",
    "/account_edit_address",
    "/account_orders",
    "/account_wishlist",
    "/shop_cart",
    "/shop_checkout",
    "/shop_order_complete",
    "/login_register",
    "/admin",
    "/admin/dashboard",
  ],
};
