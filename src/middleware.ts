import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "http://localhost:4000/api/v1";

// Routes that require authentication
const protectedPaths = ["/pos", "/form", "/place-order"];
// Routes only for unauthenticated users
const authPaths = ["/auth/login", "/auth"];

export async function middleware(request: NextRequest) {
  // Disabling server-side middleware check for JWT migration.
  // Authentication is now handled client-side via hooks and axios interceptors.
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
