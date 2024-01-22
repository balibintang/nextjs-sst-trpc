// https://www.answeroverflow.com/m/1169761966248693810#solution-1169765457809645609

import "server-only";

import { appRouter } from "@/services/controllers/base/router";
import { createTRPCContext } from "@/services/controllers/base/trpc";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { headers } from "next/headers";

export const createHydratingApi = async () =>
  createServerSideHelpers({
    router: appRouter,
    ctx: await createTRPCContext({ headers: headers() }),
  });

