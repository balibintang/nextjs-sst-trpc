import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";
import { ApiHandler } from "sst/node/api";
import { userRouter } from "../userController";
import { createContext, createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  user: userRouter,
});

export type AppRouter = typeof appRouter;

// The handlers for API gateway
export const handler = ApiHandler(
  awsLambdaRequestHandler({
    router: appRouter,
    createContext,
  }) as any,
);
