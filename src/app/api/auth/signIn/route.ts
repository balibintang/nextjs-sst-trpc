// https://github.com/iway1/trpc-panel

import { NextResponse } from "next/server";

function parseJwt (token: string) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

export async function GET(request: Request) {
  const parsedUrl = new URL(request.url);
  const code = parsedUrl.searchParams.get("code");
  
  if (!code) throw Error("No auth coded found");

  const codeData = parseJwt(code)
  const token = codeData?.token

  if(!token) throw Error("No token found");

  const destinationUrl = new URL("/", new URL(request.url).origin);

  const response = NextResponse.redirect(destinationUrl, { status: 302 });
  response.cookies.set("session", token, {
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  return response;
}
