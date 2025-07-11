import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  { prefix: "/employer", allowedRoles: ["ROLE_EMPLOYER"] },
  { prefix: "/candidate", allowedRoles: ["ROLE_CANDIDATE"] },
  { prefix: "/admin", allowedRoles: ["ROLE_SUPER_ADMIN"] },
];

// These employer routes are public (no auth required)
const employerPublicPaths = ["/employer/signin", "/employer/signup"];
const adminPublicPaths = ["/admin/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("Request URL:", request.url);

  // Skip static assets and API
  if (pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Allow public paths (both employer and admin)
  if (
    employerPublicPaths.includes(pathname) ||
    adminPublicPaths.includes(pathname)
  ) {
    return NextResponse.next();
  }

  // Check if route is protected
  const matched = protectedRoutes.find((r) => pathname.startsWith(r.prefix));
  const token = request.cookies.get("jwt")?.value;

  if (matched && !token) {
    // No token and trying to access protected route → redirect to login or homepage
    return NextResponse.redirect(new URL("/", request.url));
  }
  console.log("Matched route:", matched?.prefix);

  if (matched && token) {
    console.log("Token found, validating...");
    try {
      const payload = parseJwt(token);
      const role = payload?.userType || payload?.role;
      console.log("User role:", role);

      // If user role not allowed for this route, redirect unauthorized
      if (!matched.allowedRoles.includes(role)) {
        const unauthorizedUrl = new URL("/unauthorized", request.url);
        unauthorizedUrl.searchParams.set("role", role); // Pass role to page
        return NextResponse.redirect(unauthorizedUrl);
      }
    } catch {
      // Invalid token, redirect to login
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Otherwise allow access
  return NextResponse.next();
}

function parseJwt(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const json = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
      .join("")
  );
  return JSON.parse(json);
}

export const config = {
  matcher: ["/employer/:path*", "/candidate/:path*", "/admin/:path*"],
};
