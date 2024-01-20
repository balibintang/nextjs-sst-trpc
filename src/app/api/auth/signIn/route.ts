// https://github.com/iway1/trpc-panel

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const parsedUrl = new URL(request.url);
  const code = parsedUrl.searchParams.get("code");

  if (!code) {
    throw Error("No code auth found");
  }

  const destinationUrl = new URL("/", new URL(request.url).origin);

  const response = NextResponse.redirect(destinationUrl, { status: 302 });
  response.cookies.set("session", code, {
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  return response;
}
