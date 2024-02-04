import { type AppRouter } from "@/services/controllers/base/router";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { cookies } from "next/headers";

export const createApiCaller = () => {
  const proxyClient = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/trpc`,
        headers: {
          Authorization: `Bearer ${cookies().get("session")?.value}`,
        },
      }),
    ],
  });

  const api = createServerSideHelpers({
    client: proxyClient,
  });

  return api;
};
