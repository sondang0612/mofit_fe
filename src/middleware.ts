import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privateRoutes = [
  "/account_dashboard",
  "/account_edit",
  "/account_edit_address",
  "/account_orders",
  "/account_wishlist",
  "/shop_cart",
  "/shop_checkout",
  "/shop_order_complete",
];

export function middleware(request: NextRequest) {
  request.headers.set("Cache-Control", "no-store");
  const token = request.cookies.get("access_token")?.value;
  const path = request.nextUrl.pathname;

  if (!token && privateRoutes.some((route) => path.startsWith(route))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: privateRoutes,
};
