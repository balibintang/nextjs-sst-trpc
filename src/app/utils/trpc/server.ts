
import "server-only";
import { appRouter } from "@/services/controllers/base/router";
import { headers } from "next/headers";


export const createServerApi = async () => {
  return  appRouter.createCaller({headers: headers()})
}