import {
  AuthHandler,
  GoogleAdapter,
  createSessionBuilder,
} from "sst/node/future/auth";
import { addUser, getUserDetails } from "../repositories/user/userRepository";
import { Config } from "sst/node/config";

// define session types
export const sessions = createSessionBuilder<{
  user: {
    userId: string;
  };
}>();

export const handler = AuthHandler({
  sessions,
  clients: async () => ({
    local: "http://localhost", // This allows local clients to redirect back to localhost
  }),
  providers: {
    google: GoogleAdapter({
      mode: "oidc",
      clientID: process.env.VERCEL === "1" ? Config.GOOGLE_CLIENT_ID : "",
    }),
  },
  callbacks: {
    auth: {
      async allowClient() {
        return true;
      },
      async success(input, response) {
        let user;

        if (input.provider === "google") {
          const claims = input.tokenset.claims();
          let user = await getUserDetails(claims.sub);
          if (!user) {
            user = await addUser({
              userId: claims.sub,
              email: claims.email,
              picture: claims.picture,
              name: claims.given_name,
            });
          }

          return response.session({
            type: "user",
            properties: {
              userId: user.userId,
            },
          });
        }

        throw new Error("Unknown provider");
      },
    },
  },
});
