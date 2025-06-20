import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("refresh_token");
  const url = req.nextUrl;

  const protectedRoutes = ["/generate", "/analytic", "/history"];
  const isProtected = protectedRoutes.some((route) =>
    url.pathname.startsWith(route)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/generate/:path*", "/analytic/:path*", "/history/:path*"],
};
