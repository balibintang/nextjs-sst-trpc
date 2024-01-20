import { z } from "zod";
import {
  changeUserName,
  getUserDetails,
} from "../repositories/user/userRepository";
import { createTRPCRouter, publicProcedure } from "./base/trpc";

export const userRouter = createTRPCRouter({
  userDetails: publicProcedure.query(async (opts) => {
    const { ctx } = opts;
    const user = await getUserDetails("106288185312220007524");
    return user;
  }),
  changeUserName: publicProcedure.input(z.string()).mutation(async (opts) => {
    const { ctx, input: userName } = opts;

    const updatedUser = await changeUserName("106288185312220007524", userName);
    return updatedUser;
  }),
});
