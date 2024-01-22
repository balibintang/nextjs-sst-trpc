import "server-only";

import { appRouter } from "@/services/controllers/base/router";
import { createCallerFactory, createTRPCContext } from "@/services/controllers/base/trpc";
import { headers } from "next/headers";
import { cache } from "react";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(() => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: heads,
  });
});


const createCaller = createCallerFactory(appRouter);
 
// 2. create a caller using your `Context`
export const api = createCaller(createContext);