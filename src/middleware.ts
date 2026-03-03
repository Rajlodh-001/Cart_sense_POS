import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "http://localhost:4000/api/v1";

// Routes that require authentication
const protectedPaths = ["/pos", "/form", "/place-order"];
// Routes only for unauthenticated users
const authPaths = ["/auth/login", "/auth"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Forward the session cookie to the backend to check auth status
  const cookieHeader = request.headers.get("cookie") || "";

  let isAuthenticated = false;

  try {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: { cookie: cookieHeader },
    });
    isAuthenticated = res.ok;
  } catch {
    // Backend unreachable — treat as not authenticated
    isAuthenticated = false;
  }

  // If accessing a protected route without auth → redirect to login
  const isProtected = protectedPaths.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );
  if (isProtected && !isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // If accessing auth routes while already authenticated → redirect to dashboard
  const isAuthRoute = authPaths.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/pos", request.url));
  }

  // Root page → redirect based on auth status
  if (pathname === "/") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/pos", request.url));
    } else {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/pos/:path*",
    "/form/:path*",
    "/place-order/:path*",
    "/auth/:path*",
  ],
};
