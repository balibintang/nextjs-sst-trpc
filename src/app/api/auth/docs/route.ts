import { renderTrpcPanel } from "trpc-panel";
import { NextResponse } from "next/server";
import { appRouter } from "@/services/controllers/base/router";

// https://github.com/iway1/trpc-panel

export async function GET(request: Request) {
  return new NextResponse(
    renderTrpcPanel(appRouter, {
      url: "/api/trpc/",
    }),
    { headers: { "Content-Type": "text/html" } },
  );
}
