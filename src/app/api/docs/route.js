// JS file so it doesn't get included in the build ?

import { renderTrpcPanel } from "trpc-panel";
import { NextResponse } from "next/server";
import { appRouter } from "@/services/controllers/base/router";

// https://github.com/iway1/trpc-panel

export async function GET(request) {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse(null, { status: 404 });
  }

  return new NextResponse(
    renderTrpcPanel(appRouter, {
      url: "/api/trpc",
    }),
    { headers: { "Content-Type": "text/html" } },
  );
}
