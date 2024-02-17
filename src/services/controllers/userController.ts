import { z } from "zod";
import {
  changeUserName,
  getUserDetails,
} from "../repositories/user/userRepository";
import { createTRPCRouter, privateProcedure } from "./base/trpc";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { Bucket } from "sst/node/bucket";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const userRouter = createTRPCRouter({
  getS3UploadUrl: privateProcedure.query(async (opts) => {
    const command = new PutObjectCommand({
      ACL: "public-read-write",
      Key: randomUUID(),
      Bucket: Bucket["bucket-general"].bucketName,
    });
    const preSignUploadUrl = await getSignedUrl(new S3Client({}), command);
    return preSignUploadUrl;
  }),

  userDetails: privateProcedure.query(async (opts) => {
    const { ctx } = opts;
    const { userId } = ctx.properties;
    const user = await getUserDetails(userId);
    return user;
  }),
  changeUserName: privateProcedure.input(z.string()).mutation(async (opts) => {
    const { ctx, input: userName } = opts;
    const { userId } = ctx.properties;
    const updatedUser = await changeUserName(userId, userName);
    return updatedUser;
  }),
});
