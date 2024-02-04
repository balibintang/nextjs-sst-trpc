// https://github.com/iway1/trpc-panel

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const destinationUrl = request.nextUrl.protocol + request.headers.get('host') 

  const response = NextResponse.redirect(destinationUrl, { status: 302 });
  response.cookies.set("session", "", {
    path: "/",
    httpOnly: true,
    maxAge: 0,
    expires: new Date(0),
  });

  return response;
}
