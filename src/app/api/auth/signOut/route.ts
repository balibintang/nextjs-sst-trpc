// https://github.com/iway1/trpc-panel

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const destinationUrl = new URL("/", new URL(request.url).origin);

  const response = NextResponse.redirect(destinationUrl, { status: 302 });
  response.cookies.set("session", "", {
    path: "/",
    httpOnly: true,
    maxAge: 0,
    expires: new Date(0),
  });

  return response;
}
