import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicUrls = ["/login"];

export async function middleware(request: NextRequest) {
  // If no auth token, redirect to the login screen
  const sessionToken = request.cookies.get("session")?.value;

  // If theres no session token and theyre not on a public url, redirect them to login
  if (!sessionToken && !publicUrls.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If session token and they hit login then redirect to home page
  if (sessionToken && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
